import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCarrinho } from '../context/CarrinhoContext';
import { useTheme } from '../context/ThemeContext';

function formatarData(isoString) {
  const d = new Date(isoString);
  return d.toLocaleDateString('pt-BR') + ', ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export default function HistoricoScreen() {
  const router = useRouter();
  const { historico } = useCarrinho();
  const { theme, isDark } = useTheme();
  const s = styles(theme);

  const content = (
    <View style={s.inner}>
      <View style={s.header}>
        <TouchableOpacity style={s.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Meus Pedidos</Text>
      </View>

      {historico.length === 0 ? (
        <View style={s.vazio}>
          <Ionicons name="receipt-outline" size={60} color={theme.textMuted} />
          <Text style={s.vazioTexto}>Nenhum pedido ainda</Text>
          <TouchableOpacity style={s.botao} onPress={() => router.push('/cardapio')}>
            <Text style={s.botaoTexto}>Ver cardápio</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={s.lista} showsVerticalScrollIndicator={false}>
          {historico.map((pedido) => (
            <TouchableOpacity
              key={pedido.codigo}
              style={s.card}
              activeOpacity={0.75}
              onPress={() => router.push({ pathname: '/detalhePedido', params: { codigo: pedido.codigo } })}
            >
              <View style={s.cardHeader}>
                <Text style={s.codigo}>{pedido.codigo}</Text>
                <View style={s.cardRight}>
                  <Text style={s.total}>
                    {pedido.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color={theme.textMuted} style={{ marginLeft: 4 }} />
                </View>
              </View>
              <Text style={s.data}>
                {formatarData(pedido.data)} · {pedido.itens.length} {pedido.itens.length === 1 ? 'item' : 'itens'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );

  if (isDark) {
    return (
      <ImageBackground source={require('../assets/backgroundImage.png')} style={s.container}>
        {content}
      </ImageBackground>
    );
  }
  return <View style={[s.container, { backgroundColor: theme.background }]}>{content}</View>;
}

const styles = (theme) => StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, paddingTop: 60 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingBottom: 20,
  },
  backButton: {
    backgroundColor: theme.card, padding: 10,
    borderRadius: 12, borderWidth: 1, borderColor: theme.cardBorder,
  },
  headerTitle: { color: theme.text, fontSize: 28, fontWeight: 'bold', marginLeft: 16 },
  vazio: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  vazioTexto: { color: theme.textSecondary, fontSize: 18 },
  botao: {
    backgroundColor: theme.primary, paddingHorizontal: 24,
    paddingVertical: 14, borderRadius: 14,
  },
  botaoTexto: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  lista: { paddingHorizontal: 20, paddingBottom: 40 },
  card: {
    backgroundColor: theme.card, borderRadius: 16,
    borderWidth: 1, borderColor: theme.cardBorder,
    padding: 16, marginBottom: 14,
  },
  cardHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 6,
  },
  cardRight: { flexDirection: 'row', alignItems: 'center' },
  codigo: { color: theme.primary, fontWeight: 'bold', fontSize: 15, letterSpacing: 1 },
  total: { color: theme.text, fontWeight: 'bold', fontSize: 15 },
  data: { color: theme.textSecondary, fontSize: 12 },
});
