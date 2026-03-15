import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(false);
  
  const fazerLogin = () => {
    if (usuario === "rm555332" && senha === "123456"){
      setErro(false);
      router.push('/cardapio');
    } else {
      setErro(true);
    }
  }

  return (
    <ImageBackground 
      source={require('../assets/backgroundImage.png')} 
      style={styles.container}
    >
      
      <View style={styles.overlay}>
        
        <Image source={require('../assets/imagemLogo.png')} style={styles.logo} />
        
        <Text style={styles.titulo}>Menu<Text style={{color: '#D21C56'}}>Digital</Text></Text>
        <Text style={styles.subtitulo}>Faça login para continuar</Text>

        <TextInput
          style={[styles.input, erro && styles.inputErro]}
          placeholder="Usuário"
          placeholderTextColor="#aaa"
          value={usuario}
          onChangeText={(text) => {setUsuario(text); setErro(false);}}
        />

        <TextInput
          style={[styles.input, erro && styles.inputErro]}
          placeholder="Senha"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={senha}
          onChangeText={(text) => {setSenha(text); setErro(false);}}
        />

        {erro && (
          <View style={styles.errorContainer}>
             <Text style={styles.errorIcon}>⚠️</Text>
             <Text style={styles.errorText}>
              Ops! Algo não está batendo. Tente novamente.
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.botao} onPress={fazerLogin}>
          <Text style={styles.botaoTexto}>Entrar {'>'}</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20 
  },
  logo: {
     width: 80, 
     height: 80, 
     alignSelf: 'center', 
     marginBottom: 20
     },
  titulo: {
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#fff', 
    textAlign: 'center' 
  },
  subtitulo: { 
    color: '#ccc', 
    textAlign: 'center', 
    marginBottom: 30 
  },
  input: { 
    backgroundColor: '#1f1f1f', 
    padding: 15, 
    borderRadius: 10, 
    color: '#fff', 
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333'
  },
  inputErro: { 
    borderColor: '#D21C56' 
  },
  botao: { 
    backgroundColor: '#D21C56', 
    padding: 16, borderRadius: 12, 
    alignItems: 'center' 
  },
  botaoTexto: { 
    color: '#fff',
    fontWeight: 'bold', 
    fontSize: 16 },

    errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(210, 28, 86, 0.15)', // Fundo rosa translúcido
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#D21C56',
  },
  errorIcon: {
    marginRight: 8,
    fontSize: 16,
  },
  errorText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
    
});