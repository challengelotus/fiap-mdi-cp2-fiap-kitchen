import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCarrinho } from '../context/CarrinhoContext';

const bgImage = require('../assets/backgroundImage.png');

function Loading({ visible }) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      </View>
    </Modal>
  );
}

export default function PagamentoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { valorTotal, totalItens } = useCarrinho();
  const totalFormatado = valorTotal.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const [selectedPayment, setSelectedPayment] = useState('PIX');

  const handleConfirm = async () => {
    simularRequisicao();
    await delay(3000);
    router.push('/codigoPedido');
  };

  const paymentMethods = ['PIX', 'Crédito', 'Débito', 'Dinheiro'];

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));   

  const [loading, setLoading] = useState(false);
  const simularRequisicao = async () => {
    setLoading(true);
    await delay(3000);
    setLoading(false);
  };

  return (
    <ImageBackground source={bgImage} style={styles.container}>
      {/* ScrollView agora contém apenas o conteúdo rolável */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pagamento</Text>
        </View>

        {/* RESUMO DO PEDIDO */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Total do pedido</Text>
          <Text style={styles.summaryPrice}>{totalFormatado}</Text>
          <Text style={styles.summaryDetails}>{totalItens}</Text>
          <Loading visible={loading} />
        </View>

        {/* FORMA DE PAGAMENTO */}
        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Forma de pagamento</Text>
          <View style={styles.paymentGrid}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method}
                style={[
                  styles.paymentOption,
                  selectedPayment === method && styles.paymentOptionSelected,
                ]}
                onPress={() => setSelectedPayment(method)}
              >
                <Text style={[
                  styles.paymentOptionText,
                  selectedPayment === method && styles.paymentOptionTextSelected
                ]}>{method}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>

      {/* BOTÃO CONFIRMAR */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirmar Pagamento</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    padding: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '700',
  },
  summaryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 24,
    marginBottom: 40,
  },
  summaryTitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginBottom: 8,
  },
  summaryPrice: {
    color: '#E31C5F',
    fontSize: 40,
    fontWeight: '700',
    marginBottom: 4,
  },
  summaryDetails: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
  },
  paymentSection: {
    marginBottom: 50,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  paymentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  paymentOption: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingVertical: 35,
    alignItems: 'center',
    marginBottom: 16,
  },
  paymentOptionSelected: {
    borderColor: '#E31C5F',
    backgroundColor: 'rgba(227, 28, 95, 0.05)',
  },
  paymentOptionText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontWeight: '500',
  },
  paymentOptionTextSelected: {
    color: '#FFF',
    fontWeight: '700',
  },
  // ESTILO PARA O CONTÊINER DO BOTÃO DE RODAPÉ
  footer: {
    paddingHorizontal: 24,
    marginTop: 'auto',
  },
  confirmButton: {
    backgroundColor: '#E31C5F',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingBox: {
    width: 150,
    height: 150,
    backgroundColor: '#151515',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    color: '#fff'
  }
});