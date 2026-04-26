import { Stack } from 'expo-router';
import { CarrinhoProvider } from '../context/CarrinhoContext';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import { ActivityIndicator, View } from 'react-native';

function AppNavigator() {
  const { carregando } = useAuth();

  if (carregando) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0a0a0a', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#D21C56" />
      </View>
    );
  }

  return (
    <CarrinhoProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="cadastro" options={{ headerShown: false }} />
        <Stack.Screen name="cardapio" options={{ headerShown: false }} />
        <Stack.Screen name="salgados" options={{ headerShown: false }} />
        <Stack.Screen name="bebidas" options={{ headerShown: false }} />
        <Stack.Screen name="sobremesas" options={{ headerShown: false }} />
        <Stack.Screen name="carrinho" options={{ headerShown: false }} />
        <Stack.Screen name="pagamento" options={{ headerShown: false }} />
        <Stack.Screen name="codigoPedido" options={{ headerShown: false }} />
        <Stack.Screen name="historico" options={{ headerShown: false }} />
        <Stack.Screen name="detalhePedido" options={{ headerShown: false }} />
      </Stack>
    </CarrinhoProvider>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}