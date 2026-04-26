import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const USERS_KEY = '@usuarios';
const SESSION_KEY = '@sessao';

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Ao abrir o app, verifica sessão persistida
  useEffect(() => {
    AsyncStorage.getItem(SESSION_KEY).then((val) => {
      if (val) setUsuario(JSON.parse(val));
      setCarregando(false);
    });
  }, []);

  const cadastrar = async ({ nome, email, senha }) => {
    const raw = await AsyncStorage.getItem(USERS_KEY);
    const usuarios = raw ? JSON.parse(raw) : [];

    const existe = usuarios.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existe) return { sucesso: false, erro: 'E-mail já cadastrado.' };

    const novoUsuario = { nome, email: email.toLowerCase(), senha };
    usuarios.push(novoUsuario);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(usuarios));

    const sessao = { nome, email: email.toLowerCase() };
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(sessao));
    setUsuario(sessao);
    return { sucesso: true };
  };

  const login = async ({ email, senha }) => {
    const raw = await AsyncStorage.getItem(USERS_KEY);
    const usuarios = raw ? JSON.parse(raw) : [];

    const encontrado = usuarios.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha
    );

    if (!encontrado) return { sucesso: false, erro: 'E-mail ou senha incorretos.' };

    const sessao = { nome: encontrado.nome, email: encontrado.email };
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(sessao));
    setUsuario(sessao);
    return { sucesso: true };
  };

  const logout = async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, carregando, cadastrar, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
