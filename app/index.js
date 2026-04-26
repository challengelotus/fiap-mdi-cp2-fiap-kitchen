import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const { login, usuario, carregando: sessaoCarregando } = useAuth();
  const { theme, isDark, toggleTheme } = useTheme();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [erros, setErros] = useState({});
  const [erroGeral, setErroGeral] = useState('');
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
  if (!sessaoCarregando && usuario) {
    router.replace('/cardapio');
  }
}, [sessaoCarregando, usuario]);

  const validar = () => {
    const novosErros = {};
    if (!email.trim()) novosErros.email = 'O e-mail é obrigatório';
    else if (!email.endsWith('@fiap.com.br')) novosErros.email = 'Use seu e-mail FIAP (@fiap.com.br)';
    if (!senha) novosErros.senha = 'A senha é obrigatória';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const fazerLogin = async () => {
    setErroGeral('');
    if (!validar()) return;
    setCarregando(true);
    const resultado = await login({ email, senha });
    setCarregando(false);
    if (resultado.sucesso) {
      router.replace('/cardapio');
    } else {
      setErroGeral(resultado.erro);
    }
  };

  const s = styles(theme);

  const content = (
    <View style={s.overlay}>
      {/* Botão de tema */}
      <TouchableOpacity style={s.themeToggle} onPress={toggleTheme}>
        <Ionicons name={isDark ? 'sunny-outline' : 'moon-outline'} size={22} color={theme.text} />
      </TouchableOpacity>

      <Image source={require('../assets/imagemLogo.png')} style={s.logo} />
      <Text style={s.titulo}>
        Menu<Text style={{ color: theme.primary }}>Digital</Text>
      </Text>
      <Text style={s.subtitulo}>Faça login para continuar</Text>

      {/* E-mail */}
      <View style={s.inputWrapper}>
        <Ionicons name="mail-outline" size={18} color={theme.textMuted} style={s.inputIcon} />
        <TextInput
          style={[s.input, erros.email && s.inputErro]}
          placeholder="E-mail"
          placeholderTextColor={theme.textMuted}
          value={email}
          onChangeText={(t) => { setEmail(t); setErros((e) => ({ ...e, email: '' })); setErroGeral(''); }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      {erros.email ? <Text style={s.erroInline}>{erros.email}</Text> : null}

      {/* Senha */}
      <View style={s.inputWrapper}>
        <Ionicons name="lock-closed-outline" size={18} color={theme.textMuted} style={s.inputIcon} />
        <TextInput
          style={[s.input, s.inputFlex, erros.senha && s.inputErro]}
          placeholder="Senha"
          placeholderTextColor={theme.textMuted}
          secureTextEntry={!senhaVisivel}
          value={senha}
          onChangeText={(t) => { setSenha(t); setErros((e) => ({ ...e, senha: '' })); setErroGeral(''); }}
        />
        <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)} style={s.eyeBtn}>
          <Ionicons name={senhaVisivel ? 'eye-off-outline' : 'eye-outline'} size={18} color={theme.textMuted} />
        </TouchableOpacity>
      </View>
      {erros.senha ? <Text style={s.erroInline}>{erros.senha}</Text> : null}

      {/* Erro geral */}
      {erroGeral ? (
        <View style={s.erroContainer}>
          <Ionicons name="warning-outline" size={16} color={theme.primary} style={{ marginRight: 8 }} />
          <Text style={s.erroTexto}>{erroGeral}</Text>
        </View>
      ) : null}

      <TouchableOpacity
        style={[s.botao, carregando && s.botaoDesabilitado]}
        onPress={fazerLogin}
        disabled={carregando || !!erros.email || !!erros.senha}
      >
        <Text style={s.botaoTexto}>{carregando ? 'Entrando...' : 'Entrar >'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/cadastro')}>
        <Text style={s.linkCadastro}>
          Não tem conta? <Text style={{ color: theme.primary }}>Criar conta</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (isDark) {
    return (
      <ImageBackground source={theme.backgroundImage} style={s.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            {content}
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }

  return (
    <View style={[s.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          {content}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = (theme) => StyleSheet.create({
  container: { flex: 1 },
  overlay: { flex: 1, justifyContent: 'center', padding: 24, paddingTop: 60 },
  themeToggle: {
    position: 'absolute', top: 60, right: 24,
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: theme.card,
    borderWidth: 1, borderColor: theme.cardBorder,
    alignItems: 'center', justifyContent: 'center',
  },
  logo: { width: 80, height: 80, alignSelf: 'center', marginBottom: 20 },
  titulo: { fontSize: 32, fontWeight: 'bold', color: theme.text, textAlign: 'center' },
  subtitulo: { color: theme.textSecondary, textAlign: 'center', marginBottom: 32 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: theme.inputBg,
    borderRadius: 16, borderWidth: 1, borderColor: theme.inputBorder,
    marginBottom: 15, marginHorizontal: 4,
    paddingHorizontal: 14,
  },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, paddingVertical: 16, color: theme.text, fontSize: 15 },
  inputFlex: { flex: 1 },
  inputErro: { borderColor: theme.primary },
  eyeBtn: { padding: 4 },
  erroInline: { color: theme.primary, fontSize: 12, marginLeft: 8, marginBottom: 8 },
  erroContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(210,28,86,0.12)',
    borderWidth: 1, borderColor: theme.primary,
    borderRadius: 12, padding: 12, marginBottom: 16, marginHorizontal: 4,
  },
  erroTexto: { color: theme.text, fontSize: 14, fontWeight: '600', flex: 1 },
  botao: {
    backgroundColor: theme.primary, padding: 18,
    borderRadius: 16, alignItems: 'center', marginHorizontal: 4, marginTop: 8,
  },
  botaoDesabilitado: { opacity: 0.6 },
  botaoTexto: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  linkCadastro: { color: theme.textSecondary, textAlign: 'center', marginTop: 20 },
});
