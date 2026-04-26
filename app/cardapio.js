import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { useCarrinho } from '../context/CarrinhoContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function CardapioScreen() {
  const router = useRouter();
  const { totalItens, valorTotal } = useCarrinho();
  const { usuario, logout } = useAuth();
  const { theme, isDark, toggleTheme } = useTheme();

  const totalFormatado = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  const s = styles(theme);

  const inner = (
    <View style={s.inner}>
      {/* HEADER */}
      <View style={s.header}>
        <View>
          <Text style={s.bemVindo}>Bem-vindo,</Text>
          <Text style={s.titulo}>{usuario?.nome?.split(' ')[0] || 'Cliente'}</Text>
        </View>
        <View style={s.headerIcons}>
          <TouchableOpacity style={s.iconBtn} onPress={toggleTheme}>
            <Ionicons name={isDark ? 'sunny-outline' : 'moon-outline'} size={20} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity style={s.iconBtn} onPress={() => router.push('/historico')}>
            <Ionicons name="receipt-outline" size={20} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity style={[s.iconBtn, { position: 'relative' }]} onPress={() => router.push('/carrinho')}>
            <Ionicons name="cart-outline" size={20} color={theme.text} />
            {totalItens > 0 && (
              <View style={s.badge}>
                <Text style={s.badgeText}>{totalItens}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={s.iconBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color={theme.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* MENU */}
      <View style={s.menu}>
        {[
          { label: 'Salgados', rota: '/salgados' },
          { label: 'Bebidas', rota: '/bebidas' },
          { label: 'Sobremesas', rota: '/sobremesas' },
        ].map((item, i, arr) => (
          <View key={item.rota}>
            <TouchableOpacity style={s.menuItem} onPress={() => router.push(item.rota)}>
              <Text style={s.menuText}>{item.label}</Text>
              <Ionicons name="arrow-forward" size={18} color={theme.text} />
            </TouchableOpacity>
            {i < arr.length - 1 && <View style={s.divider} />}
          </View>
        ))}
      </View>

      {/* FOOTER */}
      <View style={s.footer}>
        <View style={s.totalContainer}>
          <Text style={s.totalLabel}>Total do pedido</Text>
          <Text style={s.totalValue}>{totalFormatado}</Text>
        </View>
        <TouchableOpacity
          style={[s.cartButton, totalItens === 0 && s.cartButtonDisabled]}
          disabled={totalItens === 0}
          activeOpacity={0.8}
          onPress={() => router.push('/carrinho')}
        >
          <Ionicons name="cart-outline" size={24} color={totalItens === 0 ? "#777" : "#fff"} style={{ marginRight: 8 }} />
          <Text style={[s.cartButtonText, totalItens === 0 && { color: '#777' }]}>
            Ver carrinho ({totalItens})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isDark) {
    return (
      <ImageBackground source={theme.backgroundImage} style={s.container}>
        <StatusBar barStyle="light-content" />
        {inner}
      </ImageBackground>
    );
  }

  return (
    <View style={[s.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="dark-content" />
      {inner}
    </View>
  );
}

const styles = (theme) => StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, paddingTop: 60, justifyContent: 'space-between' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 24,
  },
  bemVindo: { color: theme.textSecondary, fontSize: 15 },
  titulo: { color: theme.text, fontSize: 30, fontWeight: 'bold' },
  headerIcons: { flexDirection: 'row', gap: 8 },
  iconBtn: {
    width: 42, height: 42, borderRadius: 12,
    borderWidth: 1, borderColor: theme.cardBorder,
    backgroundColor: theme.card,
    alignItems: 'center', justifyContent: 'center',
  },
  badge: {
    position: 'absolute', top: -4, right: -4,
    backgroundColor: theme.primary,
    width: 18, height: 18, borderRadius: 9,
    alignItems: 'center', justifyContent: 'center',
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  menu: { paddingHorizontal: 24, marginTop: -300 },
  menuItem: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingVertical: 20,
  },
  menuText: { color: theme.text, fontSize: 20, fontWeight: '600' },
  divider: { height: 1, backgroundColor: theme.divider },
  footer: {
    borderTopWidth: 1, borderTopColor: theme.footerBorder,
    paddingTop: 16, paddingBottom: 50, paddingHorizontal: 24,
    backgroundColor: theme.footerBg,
  },
  totalContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  totalLabel: { color: theme.text, fontSize: 16 },
  totalValue: { color: theme.primary, fontSize: 22, fontWeight: 'bold' },
  cartButton: {
    backgroundColor: theme.primary, height: 55, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center', flexDirection: 'row',
  },
  cartButtonDisabled: { backgroundColor: theme.card },
  cartButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
