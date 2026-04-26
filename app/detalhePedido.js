import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCarrinho } from '../context/CarrinhoContext';
import { useTheme } from '../context/ThemeContext';

function formatarData(isoString) {
  const d = new Date(isoString);
  return (
    d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) +
    ' às ' +
    d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  );
}

export default function DetalhePedidoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { codigo } = useLocalSearchParams();
  const { historico } = useCarrinho();
  const { theme, isDark } = useTheme();

  const pedido = historico.find((p) => p.codigo === codigo);
  const s = styles(theme);

  if (!pedido) {
    return (
      <View style={[s.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: theme.text }}>Pedido não encontrado.</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 16 }}>
          <Text style={{ color: theme.primary }}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const subtotal = pedido.itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  const content = (
    <>
      <ScrollView contentContainerStyle={[s.scroll, { paddingBottom: insets.bottom + 100 }]}>

        {/* HEADER */}
        <View style={s.header}>
          <TouchableOpacity style={s.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Detalhe do Pedido</Text>
        </View>

        {/* CÓDIGO */}
        <View style={s.codigoCard}>
          <View style={s.checkCircle}>
            <Ionicons name="checkmark" size={28} color={theme.success} />
          </View>
          <Text style={s.codigoLabel}>Código do pedido</Text>
          <Text style={s.codigoValor}>{pedido.codigo}</Text>
          <Text style={s.dataTexto}>{formatarData(pedido.data)}</Text>
        </View>

        {/* ITENS */}
        <Text style={s.secaoTitulo}>Itens do pedido</Text>
        <View style={s.itensCard}>
          {pedido.itens.map((item, index) => (
            <View key={item.id}>
              <View style={s.itemRow}>
                <View style={s.itemQtdBadge}>
                  <Text style={s.itemQtdText}>{item.quantidade}×</Text>
                </View>
                <Text style={s.itemNome}>{item.nome}</Text>
                <Text style={s.itemPreco}>
                  {(item.preco * item.quantidade).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </Text>
              </View>
              {index < pedido.itens.length - 1 && <View style={s.divider} />}
            </View>
          ))}
        </View>

        {/* TOTAL */}
        <View style={s.totalCard}>
          <View style={s.totalRow}>
            <Text style={s.totalLabel}>Subtotal</Text>
            <Text style={s.totalValorSecundario}>
              {subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Text>
          </View>
          <View style={[s.totalRow, s.totalRowDestaque]}>
            <Text style={s.totalLabelDestaque}>Total</Text>
            <Text style={s.totalValorDestaque}>
              {pedido.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Text>
          </View>
        </View>

      </ScrollView>

      {/* BOTÃO FIXO */}
      <View style={[s.footer, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity style={s.botao} onPress={() => router.replace('/cardapio')}>
          <Ionicons name="restaurant-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={s.botaoTexto}>Fazer novo pedido</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  if (isDark) {
    return (
      <ImageBackground source={require('../assets/backgroundImage.png')} style={s.container}>
        {content}
      </ImageBackground>
    );
  }
  return (
    <View style={[s.container, { backgroundColor: theme.background }]}>
      {content}
    </View>
  );
}

const styles = (theme) => StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 20, paddingTop: 60 },

  header: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 28,
  },
  backButton: {
    backgroundColor: theme.card, padding: 10, borderRadius: 12,
    borderWidth: 1, borderColor: theme.cardBorder,
  },
  headerTitle: {
    color: theme.text, fontSize: 24, fontWeight: 'bold', marginLeft: 16,
  },

  // Código card
  codigoCard: {
    backgroundColor: theme.card, borderRadius: 20,
    borderWidth: 1, borderColor: theme.cardBorder,
    padding: 24, alignItems: 'center', marginBottom: 28,
  },
  checkCircle: {
    width: 56, height: 56, borderRadius: 28,
    borderWidth: 2, borderColor: theme.success,
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  codigoLabel: { color: theme.textSecondary, fontSize: 13, marginBottom: 8 },
  codigoValor: {
    color: theme.primary, fontSize: 38, fontWeight: '800',
    letterSpacing: 5, marginBottom: 8,
  },
  dataTexto: { color: theme.textMuted, fontSize: 12 },

  // Itens
  secaoTitulo: {
    color: theme.text, fontSize: 17, fontWeight: '700',
    marginBottom: 12,
  },
  itensCard: {
    backgroundColor: theme.card, borderRadius: 16,
    borderWidth: 1, borderColor: theme.cardBorder,
    paddingVertical: 4, paddingHorizontal: 16, marginBottom: 16,
  },
  itemRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14,
  },
  itemQtdBadge: {
    backgroundColor: theme.primary + '22',
    borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4,
    marginRight: 12,
  },
  itemQtdText: { color: theme.primary, fontWeight: '700', fontSize: 13 },
  itemNome: { flex: 1, color: theme.text, fontSize: 15 },
  itemPreco: { color: theme.text, fontWeight: '600', fontSize: 15 },
  divider: { height: 1, backgroundColor: theme.divider },

  // Total
  totalCard: {
    backgroundColor: theme.card, borderRadius: 16,
    borderWidth: 1, borderColor: theme.cardBorder,
    padding: 16, marginBottom: 12,
  },
  totalRow: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10,
  },
  totalRowDestaque: {
    borderTopWidth: 1, borderTopColor: theme.divider,
    paddingTop: 12, marginBottom: 0,
  },
  totalLabel: { color: theme.textSecondary, fontSize: 14 },
  totalValorSecundario: { color: theme.textSecondary, fontSize: 14 },
  totalLabelDestaque: { color: theme.text, fontSize: 17, fontWeight: '700' },
  totalValorDestaque: { color: theme.primary, fontSize: 20, fontWeight: '800' },

  // Footer
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: 20, paddingTop: 12,
    backgroundColor: theme.footerBg,
    borderTopWidth: 1, borderTopColor: theme.footerBorder,
  },
  botao: {
    backgroundColor: theme.primary, borderRadius: 14,
    paddingVertical: 16, alignItems: 'center',
    flexDirection: 'row', justifyContent: 'center',
  },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
