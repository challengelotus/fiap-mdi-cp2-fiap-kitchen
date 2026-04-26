import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useCarrinho } from '../context/CarrinhoContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BEBIDAS } from '../data/bebidas';
import { useTheme } from '../context/ThemeContext';

export default function Bebidas() {
  const router = useRouter();
  const { carrinho, alterarQuantidade, totalItens, valorTotal } = useCarrinho();
  const { theme, isDark } = useTheme();
  const s = styles(theme);
  const totalFormatado = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const lista = (
    <View style={s.container}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View style={s.header}>
        <TouchableOpacity style={s.backButton} onPress={() => router.canGoBack() ? router.back() : router.replace('/cardapio')}>
          <Ionicons name="chevron-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <View style={s.headerTextContainer}>
          <Text style={s.headerTitle}>Bebidas</Text>
          <Text style={s.headerSubtitle}>{totalItens} itens</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>
        {BEBIDAS.map((produto) => {
          const qtd = carrinho[produto.id] || 0;
          return (
            <View key={produto.id} style={s.card}>
              <Image source={produto.imagem} style={s.productImage} resizeMode="cover" />
              <View style={s.productInfo}>
                <Text style={s.productName}>{produto.nome}</Text>
                <Text style={s.productDescription}>{produto.descricao}</Text>
                <Text style={s.productPrice}>{produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
              </View>
              {qtd === 0 ? (
                <TouchableOpacity style={s.addButton} onPress={() => alterarQuantidade(produto.id, 'soma')}>
                  <Ionicons name="add" size={20} color="#fff" />
                </TouchableOpacity>
              ) : (
                <View style={s.counterContainer}>
                  <TouchableOpacity style={s.counterButton} onPress={() => alterarQuantidade(produto.id, 'sub')}>
                    <Ionicons name="remove" size={18} color={theme.text} />
                  </TouchableOpacity>
                  <Text style={s.counterText}>{qtd}</Text>
                  <TouchableOpacity style={s.addButton} onPress={() => alterarQuantidade(produto.id, 'soma')}>
                    <Ionicons name="add" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
      <View style={s.footer}>
        <View style={s.totalRow}>
          <Text style={s.totalLabel}>Total do pedido</Text>
          <Text style={s.totalValue}>{totalFormatado}</Text>
        </View>
        <TouchableOpacity
          style={[s.cartButton, totalItens === 0 && s.cartButtonDisabled]}
          disabled={totalItens === 0} activeOpacity={0.8}
          onPress={() => router.push('/carrinho')}
        >
          <Ionicons name="cart-outline" size={24} color={totalItens === 0 ? "#777" : "#fff"} style={{ marginRight: 8 }} />
          <Text style={[s.cartButtonText, totalItens === 0 && { color: '#777' }]}>Ver carrinho ({totalItens})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isDark) return <ImageBackground source={require('../assets/backgroundImage.png')} style={s.safeArea}>{lista}</ImageBackground>;
  return <View style={[s.safeArea, { backgroundColor: theme.background }]}>{lista}</View>;
}

const styles = (theme) => StyleSheet.create({
  safeArea: { flex: 1, paddingTop: 60 },
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20 },
  backButton: { backgroundColor: theme.card, padding: 10, borderRadius: 12, borderWidth: 1, borderColor: theme.cardBorder },
  headerTextContainer: { flex: 1, marginLeft: 15 },
  headerTitle: { color: theme.text, fontSize: 24, fontWeight: 'bold' },
  headerSubtitle: { color: theme.textSecondary, fontSize: 14 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },
  card: { flexDirection: 'row', backgroundColor: theme.card, borderRadius: 16, padding: 12, marginBottom: 16, alignItems: 'center', borderWidth: 1, borderColor: theme.cardBorder },
  productImage: { width: 80, height: 80, borderRadius: 12 },
  productInfo: { flex: 1, marginLeft: 12 },
  productName: { color: theme.text, fontSize: 16, fontWeight: 'bold' },
  productDescription: { color: theme.textSecondary, fontSize: 11, marginVertical: 4 },
  productPrice: { color: theme.primary, fontSize: 16, fontWeight: 'bold' },
  addButton: { backgroundColor: theme.primary, width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  counterContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.counterBg, borderRadius: 25, padding: 4, borderWidth: 1, borderColor: theme.cardBorder },
  counterButton: { width: 28, height: 28, backgroundColor: theme.card, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  counterText: { color: theme.text, marginHorizontal: 12, fontWeight: 'bold', fontSize: 16 },
  footer: { borderTopWidth: 1, borderTopColor: theme.footerBorder, paddingTop: 16, paddingBottom: 50, paddingHorizontal: 24, backgroundColor: theme.footerBg },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  totalLabel: { color: theme.text, fontSize: 16 },
  totalValue: { color: theme.primary, fontSize: 22, fontWeight: 'bold' },
  cartButton: { backgroundColor: theme.primary, height: 55, borderRadius: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  cartButtonDisabled: { backgroundColor: theme.card },
  cartButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
