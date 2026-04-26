import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCarrinho } from '../context/CarrinhoContext';
import { useTheme } from '../context/ThemeContext';
import { SALGADOS } from '../data/salgados';
import { BEBIDAS } from '../data/bebidas';
import { SOBREMESAS } from '../data/sobremesas';

const TODOS_PRODUTOS = [...SALGADOS, ...BEBIDAS, ...SOBREMESAS];

export default function Carrinho() {
  const router = useRouter();
  const { carrinho, valorTotal, totalItens, alterarQuantidade } = useCarrinho();
  const { theme, isDark } = useTheme();
  const itensNoCarrinho = TODOS_PRODUTOS.filter(p => (carrinho[p.id] || 0) > 0);
  const totalFormatado = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const s = styles(theme);

  const content = (
    <View style={s.inner}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View style={s.header}>
        <TouchableOpacity style={s.backButton} onPress={() => router.canGoBack() ? router.back() : router.replace('/cardapio')}>
          <Ionicons name="chevron-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Carrinho</Text>
      </View>
      <View style={{ flex: 1 }}>
        {totalItens === 0 ? (
          <View style={s.vazioContainer}>
            <Ionicons name="cart-outline" size={60} color={theme.textMuted} />
            <Text style={s.emptyCartText}>Seu carrinho está vazio</Text>
            <TouchableOpacity style={s.emptyCartButton} onPress={() => router.push('/cardapio')}>
              <Text style={s.cartButtonText}>Ver Cardápio</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>
            {itensNoCarrinho.map((produto) => {
              const qtd = carrinho[produto.id] || 0;
              return (
                <View key={produto.id} style={s.card}>
                  <Image source={produto.imagem} style={s.productImage} resizeMode="cover" />
                  <View style={s.productInfo}>
                    <Text style={s.productName}>{produto.nome}</Text>
                    <Text style={s.productPrice}>
                      {(produto.preco * qtd).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </Text>
                  </View>
                  <View style={s.counterContainer}>
                    <TouchableOpacity style={s.counterButton} onPress={() => alterarQuantidade(produto.id, 'subtrai')}>
                      <Ionicons name="remove" size={18} color={theme.text} />
                    </TouchableOpacity>
                    <Text style={s.counterText}>{qtd}</Text>
                    <TouchableOpacity style={s.addButtonSmall} onPress={() => alterarQuantidade(produto.id, 'soma')}>
                      <Ionicons name="add" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        )}
      </View>
      <View style={s.footer}>
        <View style={s.totalContainer}>
          <Text style={s.totalLabel}>Total do pedido</Text>
          <Text style={s.totalValue}>{totalFormatado}</Text>
        </View>
        <TouchableOpacity
          style={[s.cartButton, totalItens === 0 && s.cartButtonDisabled]}
          disabled={totalItens === 0} activeOpacity={0.8}
          onPress={() => router.push('/pagamento')}
        >
          <Ionicons name="checkmark-outline" size={24} color={totalItens === 0 ? "#777" : "#fff"} style={{ marginRight: 8 }} />
          <Text style={[s.cartButtonText, totalItens === 0 && { color: '#777' }]}>Confirmar Pedido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isDark) return <ImageBackground source={require('../assets/backgroundImage.png')} style={s.container}>{content}</ImageBackground>;
  return <View style={[s.container, { backgroundColor: theme.background }]}>{content}</View>;
}

const styles = (theme) => StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, paddingTop: 60, justifyContent: 'space-between' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20 },
  backButton: { backgroundColor: theme.card, padding: 10, borderRadius: 12, borderWidth: 1, borderColor: theme.cardBorder },
  headerTitle: { color: theme.text, fontSize: 28, fontWeight: 'bold', marginLeft: 16 },
  vazioContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  emptyCartText: { color: theme.textSecondary, fontSize: 18 },
  emptyCartButton: { backgroundColor: theme.primary, height: 50, width: 150, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },
  card: { flexDirection: 'row', backgroundColor: theme.card, borderRadius: 16, padding: 12, marginBottom: 16, alignItems: 'center', borderWidth: 1, borderColor: theme.cardBorder },
  productImage: { width: 80, height: 80, borderRadius: 12 },
  productInfo: { flex: 1, marginLeft: 12 },
  productName: { color: theme.text, fontSize: 16, fontWeight: 'bold' },
  productPrice: { color: theme.primary, fontSize: 16, fontWeight: 'bold' },
  addButtonSmall: { backgroundColor: theme.primary, width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  counterContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.counterBg, borderRadius: 25, padding: 4, borderWidth: 1, borderColor: theme.cardBorder },
  counterButton: { width: 28, height: 28, backgroundColor: theme.card, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  counterText: { color: theme.text, marginHorizontal: 12, fontWeight: 'bold', fontSize: 16 },
  footer: { borderTopWidth: 1, borderTopColor: theme.footerBorder, paddingTop: 16, paddingBottom: 50, paddingHorizontal: 24, backgroundColor: theme.footerBg },
  totalContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  totalLabel: { color: theme.text, fontSize: 16 },
  totalValue: { color: theme.primary, fontSize: 22, fontWeight: 'bold' },
  cartButton: { backgroundColor: theme.primary, height: 55, borderRadius: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  cartButtonDisabled: { backgroundColor: theme.card },
  cartButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
