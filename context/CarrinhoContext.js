import { createContext, useContext, useState } from 'react';
import { SALGADOS } from '../data/salgados';
import { BEBIDAS } from '../data/bebidas';
import { SOBREMESAS } from '../data/sobremesas';

const CarrinhoContext = createContext();

const TODOS_PRODUTOS = [...SALGADOS, ...BEBIDAS, ...SOBREMESAS];

export function CarrinhoProvider({ children }) {

  const [carrinho, setCarrinho] = useState({});

  const alterarQuantidade = (id, operacao) => {
    setCarrinho((prev) => {
      const qtdAtual = prev[id] || 0;

      const novaQtd =
        operacao === 'soma'
          ? qtdAtual + 1
          : Math.max(0, qtdAtual - 1);

      return { ...prev, [id]: novaQtd };
    });
  };

  const limparCarrinho = () => setCarrinho({});

  // 📦 quantidade total de itens
  const totalItens = Object.values(carrinho).reduce(
    (acc, curr) => acc + curr,
    0
  );

  // 💰 valor total do carrinho
  const valorTotal = TODOS_PRODUTOS.reduce((acc, produto) => {
    const qtd = carrinho[produto.id] || 0;
    return acc + qtd * produto.preco;
  }, 0);

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        alterarQuantidade,
        limparCarrinho,
        totalItens,
        valorTotal,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export const useCarrinho = () => useContext(CarrinhoContext);