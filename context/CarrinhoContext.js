import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SALGADOS } from '../data/salgados';
import { BEBIDAS } from '../data/bebidas';
import { SOBREMESAS } from '../data/sobremesas';
import { useAuth } from './AuthContext';

const CarrinhoContext = createContext();

const TODOS_PRODUTOS = [...SALGADOS, ...BEBIDAS, ...SOBREMESAS];

function gerarCodigo() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

export function CarrinhoProvider({ children }) {
  const { usuario } = useAuth() || {};
  const [carrinho, setCarrinho] = useState({});
  const [historico, setHistorico] = useState([]);

  const HISTORICO_KEY = usuario ? `@historico_${usuario.email}` : null;

  useEffect(() => {
  if (usuario === undefined) return;
  if (!HISTORICO_KEY) {
    setHistorico([]);
    setCarrinho({});
    return;
  }

  AsyncStorage.getItem(HISTORICO_KEY).then((val) => {
    if (val) setHistorico(JSON.parse(val));
    else setHistorico([]);
  });
  setCarrinho({});
}, [usuario]);

  const salvarHistorico = async (novoHistorico) => {
    setHistorico(novoHistorico);
    await AsyncStorage.setItem(HISTORICO_KEY, JSON.stringify(novoHistorico));
  };

  const alterarQuantidade = (id, operacao) => {
    setCarrinho((prev) => {
      const qtdAtual = prev[id] || 0;
      const novaQtd = operacao === 'soma' ? qtdAtual + 1 : Math.max(0, qtdAtual - 1);
      return { ...prev, [id]: novaQtd };
    });
  };

  const limparCarrinho = () => setCarrinho({});

  const totalItens = Object.values(carrinho).reduce((acc, curr) => acc + curr, 0);

  const valorTotal = TODOS_PRODUTOS.reduce((acc, produto) => {
    const qtd = carrinho[produto.id] || 0;
    return acc + qtd * produto.preco;
  }, 0);

  const finalizarPedido = async () => {
    const itens = TODOS_PRODUTOS.filter((p) => (carrinho[p.id] || 0) > 0).map((p) => ({
      id: p.id,
      nome: p.nome,
      preco: p.preco,
      quantidade: carrinho[p.id],
    }));
    if (itens.length === 0) return null;

    const pedido = {
      codigo: gerarCodigo(),
      data: new Date().toISOString(),
      itens,
      total: valorTotal,
    };

    const novoHistorico = [pedido, ...historico];
    await salvarHistorico(novoHistorico);
    limparCarrinho();
    return pedido;
  };

  return (
    <CarrinhoContext.Provider
      value={{ carrinho, alterarQuantidade, limparCarrinho, finalizarPedido, totalItens, valorTotal, historico }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export const useCarrinho = () => useContext(CarrinhoContext);