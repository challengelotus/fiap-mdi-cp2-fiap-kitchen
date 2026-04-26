import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const THEMES = {
  dark: {
    name: 'dark',
    background: '#0a0a0a',
    backgroundImage: require('../assets/backgroundImage.png'),
    card: '#151515',
    cardBorder: '#252525',
    text: '#ffffff',
    textSecondary: '#aaaaaa',
    textMuted: '#666666',
    inputBg: '#0c0c0c',
    inputBorder: '#302f2f',
    footerBg: '#151515',
    footerBorder: '#333333',
    divider: '#333333',
    primary: '#D21C56',
    success: '#34C759',
    counterBg: '#000000',
    backButton: '#151515',
    backButtonBorder: '#252525',
    overlay: 'rgba(0,0,0,0.5)',
    paymentCard: 'rgba(255,255,255,0.05)',
    paymentBorder: 'rgba(255,255,255,0.1)',
  },
  light: {
    name: 'light',
    background: '#f2f2f7',
    backgroundImage: null,
    card: '#ffffff',
    cardBorder: '#e0e0e0',
    text: '#1c1c1e',
    textSecondary: '#555555',
    textMuted: '#999999',
    inputBg: '#ffffff',
    inputBorder: '#d0d0d0',
    footerBg: '#ffffff',
    footerBorder: '#e0e0e0',
    divider: '#e0e0e0',
    primary: '#D21C56',
    success: '#34C759',
    counterBg: '#f2f2f7',
    backButton: '#ffffff',
    backButtonBorder: '#e0e0e0',
    overlay: 'rgba(255,255,255,0.5)',
    paymentCard: 'rgba(0,0,0,0.04)',
    paymentBorder: 'rgba(0,0,0,0.1)',
  },
};

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('@theme').then((val) => {
      if (val !== null) setIsDark(val === 'dark');
    });
  }, []);

  const toggleTheme = async () => {
    const next = !isDark;
    setIsDark(next);
    await AsyncStorage.setItem('@theme', next ? 'dark' : 'light');
  };

  const theme = isDark ? THEMES.dark : THEMES.light;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
