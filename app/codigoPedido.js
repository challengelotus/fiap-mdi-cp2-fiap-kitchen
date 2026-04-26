import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

export default function CodigoPagamentoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { tema, isDark } = useTheme();
  const { theme } = useTheme();
  const { codigo } = useLocalSearchParams();
  const s = styles(theme);

  const content = (
    <>
      <ScrollView contentContainerStyle={s.scrollContent}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.replace('/cardapio')} style={s.backButton}>
            <Ionicons name="chevron-back" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Pedido Confirmado</Text>
        </View>
        <View style={s.successArea}>
          <View style={s.checkIcon}>
            <Ionicons name="checkmark" size={32} color={theme.success} />
          </View>
          <Text style={s.successText}>Pedido realizado com sucesso</Text>
        </View>
        <View style={s.codeCard}>
          <Text style={s.codeTitle}>Código do pedido</Text>
          <Text style={s.codeValue}>{codigo}</Text>
          <Text style={s.codeSubtitle}>Apresente este código ao retirar seu pedido</Text>
        </View>
      </ScrollView>
      <View style={[s.footer, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity style={s.newOrderButton} onPress={() => router.replace('/cardapio')}>
          <Text style={s.newOrderButtonText}>Novo pedido</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.histButton} onPress={() => router.push('/historico')}>
          <Text style={s.histButtonText}>Ver histórico</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  if (isDark) return <ImageBackground source={require('../assets/backgroundImage.png')} style={s.container}>{content}</ImageBackground>;
  return <View style={[s.container, { backgroundColor: theme.background }]}>{content}</View>;
}

const styles = (theme) => StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 24, paddingTop: 60 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 60 },
  backButton: { padding: 10, marginRight: 10, borderWidth: 1, borderColor: theme.cardBorder, borderRadius: 12, backgroundColor: theme.card },
  headerTitle: { color: theme.text, fontSize: 24, fontWeight: '600' },
  successArea: { alignItems: 'center', marginBottom: 50 },
  checkIcon: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: theme.success, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  successText: { color: theme.text, fontSize: 18, fontWeight: '600', textAlign: 'center' },
  codeCard: { backgroundColor: theme.paymentCard, borderWidth: 1, borderColor: theme.paymentBorder, borderRadius: 16, padding: 30, alignItems: 'center', marginBottom: 60 },
  codeTitle: { color: theme.textSecondary, fontSize: 14, marginBottom: 15 },
  codeValue: { color: theme.primary, fontSize: 42, fontWeight: '700', letterSpacing: 4, marginBottom: 15 },
  codeSubtitle: { color: theme.textMuted, fontSize: 12, textAlign: 'center' },
  footer: { paddingHorizontal: 24, gap: 12 },
  newOrderButton: { backgroundColor: theme.primary, borderRadius: 12, paddingVertical: 18, alignItems: 'center' },
  newOrderButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  histButton: { backgroundColor: theme.card, borderWidth: 1, borderColor: theme.cardBorder, borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  histButtonText: { color: theme.text, fontSize: 16, fontWeight: '500' },
});
