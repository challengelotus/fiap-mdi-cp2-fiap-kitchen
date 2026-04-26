import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCarrinho } from '../context/CarrinhoContext';
import { useTheme } from '../context/ThemeContext';

function Loading({ visible, theme }) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: 150, height: 150, backgroundColor: theme.card, borderRadius: 16, justifyContent: 'center', alignItems: 'center', gap: 12 }}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={{ color: theme.text }}>Processando...</Text>
        </View>
      </View>
    </Modal>
  );
}

export default function PagamentoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { valorTotal, totalItens, finalizarPedido } = useCarrinho();
  const { theme, isDark } = useTheme();
  const [selectedPayment, setSelectedPayment] = useState('PIX');
  const [loading, setLoading] = useState(false);
  const s = styles(theme);

  const totalFormatado = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const paymentMethods = ['PIX', 'Crédito', 'Débito', 'Dinheiro'];

  const handleConfirm = async () => {
    setLoading(true);
    const pedido = await finalizarPedido();
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    if (pedido) router.push({ pathname: '/codigoPedido', params: { codigo: pedido.codigo } });
  };

  const content = (
    <>
      <ScrollView contentContainerStyle={s.scrollContent}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} style={s.backButton}>
            <Ionicons name="chevron-back" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Pagamento</Text>
        </View>
        <View style={s.summaryCard}>
          <Text style={s.summaryTitle}>Total do pedido</Text>
          <Text style={s.summaryPrice}>{totalFormatado}</Text>
          <Text style={s.summaryDetails}>{totalItens} itens selecionados</Text>
        </View>
        <View style={s.paymentSection}>
          <Text style={s.sectionTitle}>Forma de pagamento</Text>
          <View style={s.paymentGrid}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method}
                style={[s.paymentOption, selectedPayment === method && s.paymentOptionSelected]}
                onPress={() => setSelectedPayment(method)}
              >
                <Text style={[s.paymentOptionText, selectedPayment === method && s.paymentOptionTextSelected]}>{method}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={[s.footer, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity style={s.confirmButton} onPress={handleConfirm}>
          <Text style={s.confirmButtonText}>Confirmar Pagamento</Text>
        </TouchableOpacity>
      </View>
      <Loading visible={loading} theme={theme} />
    </>
  );

  if (isDark) return <ImageBackground source={require('../assets/backgroundImage.png')} style={s.container}>{content}</ImageBackground>;
  return <View style={[s.container, { backgroundColor: theme.background }]}>{content}</View>;
}

const styles = (theme) => StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 24, paddingTop: 60 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  backButton: { padding: 10, marginRight: 10, borderWidth: 1, borderColor: theme.cardBorder, borderRadius: 12, backgroundColor: theme.card },
  headerTitle: { color: theme.text, fontSize: 28, fontWeight: '700' },
  summaryCard: { backgroundColor: theme.paymentCard, borderWidth: 1, borderColor: theme.paymentBorder, borderRadius: 16, padding: 24, marginBottom: 40 },
  summaryTitle: { color: theme.textSecondary, fontSize: 14, marginBottom: 8 },
  summaryPrice: { color: theme.primary, fontSize: 40, fontWeight: '700', marginBottom: 4 },
  summaryDetails: { color: theme.textMuted, fontSize: 14 },
  paymentSection: { marginBottom: 50 },
  sectionTitle: { color: theme.text, fontSize: 18, fontWeight: '600', marginBottom: 20 },
  paymentGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  paymentOption: { width: '48%', backgroundColor: theme.paymentCard, borderWidth: 1, borderColor: theme.paymentBorder, borderRadius: 12, paddingVertical: 35, alignItems: 'center', marginBottom: 16 },
  paymentOptionSelected: { borderColor: theme.primary, backgroundColor: 'rgba(210,28,86,0.08)' },
  paymentOptionText: { color: theme.textSecondary, fontSize: 16, fontWeight: '500' },
  paymentOptionTextSelected: { color: theme.text, fontWeight: '700' },
  footer: { paddingHorizontal: 24 },
  confirmButton: { backgroundColor: theme.primary, borderRadius: 12, paddingVertical: 18, alignItems: 'center' },
  confirmButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
