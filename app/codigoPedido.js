import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const bgImage = require('../assets/backgroundImage.png');

function gerarSenha() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let senha = '';

  for (let i = 0; i < 8; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    senha += caracteres[indice];
  }

  return senha;
}

export default function CodigoPagamentoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets(); 
  const senha = gerarSenha();

  const handleNewOrder = () => {
    router.replace('/');
  };

  return (
    <ImageBackground source={bgImage} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pedido Confirmado</Text>
        </View>

        {/* ÁREA DE SUCESSO */}
        <View style={styles.successArea}>
          <View style={styles.checkIcon}>
            <Ionicons name="checkmark" size={32} color="#34C759" />
          </View>
          <Text style={styles.successText}>Pedido realizado com sucesso</Text>
        </View>

        {/* CARTÃO DO CÓDIGO */}
        <View style={styles.codeCard}>
          <Text style={styles.codeTitle}>Código do pedido</Text>
          <Text style={styles.codeValue}>{senha}</Text>
          <Text style={styles.codeSubtitle}>Apresente este código ao retirar seu pedido</Text>
        </View>

      </ScrollView>

      {/* BOTÃO NOVO PEDIDO*/}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity style={styles.newOrderButton} onPress={handleNewOrder}>
          <Text style={styles.newOrderButtonText}>Novo pedido</Text>
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
    marginBottom: 60,
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
    fontSize: 24,
    fontWeight: '600',
  },
  successArea: {
    alignItems: 'center',
    marginBottom: 50,
  },
  checkIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#34C759',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  codeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    marginBottom: 60,
  },
  codeTitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginBottom: 15,
  },
  codeValue: {
    color: '#E31C5F',
    fontSize: 42,
    fontWeight: '700',
    letterSpacing: 4,
    marginBottom: 15,
  },
  codeSubtitle: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    textAlign: 'center',
  },
  // ESTILO PARA O CONTÊINER DO BOTÃO DE RODAPÉ
  footer: {
    paddingHorizontal: 24,
    marginTop: 'auto',
  },
  newOrderButton: {
    backgroundColor: '#E31C5F',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
  },
  newOrderButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});