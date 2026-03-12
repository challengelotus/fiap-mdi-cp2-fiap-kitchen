import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="cardapio" options={{ headerShown: false }} />
      <Stack.Screen name="salgados" options={{ headerShown: false }} />
      <Stack.Screen name="bebidas" options={{ headerShown: false }} />
      <Stack.Screen name="sobremesas" options={{ headerShown: false }} />
      <Stack.Screen name="carrinho" options={{ headerShown: false }} />
      <Stack.Screen name="pagamento" options={{ headerShown: false }} />
      <Stack.Screen name="codigoPedido" options={{ headerShown: false }} />
    </Stack>
  );
}