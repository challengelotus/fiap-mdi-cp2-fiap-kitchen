import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function CadastroScreen() {
  const router = useRouter();
  const { cadastrar } = useAuth();
  const { theme, isDark } = useTheme();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmarVisivel, setConfirmarVisivel] = useState(false);
  const [erros, setErros] = useState({});
  const [erroGeral, setErroGeral] = useState('');
  const [carregando, setCarregando] = useState(false);

  const validar = () => {
    const novosErros = {};
    if (!nome.trim()) novosErros.nome = 'O nome é obrigatório';
    if (!email.trim()) novosErros.email = 'O e-mail é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) novosErros.email = 'Formato de e-mail inválido';
    if (!senha) novosErros.senha = 'A senha é obrigatória';
    else if (senha.length < 6) novosErros.senha = 'A senha deve ter no mínimo 6 caracteres';
    if (!confirmarSenha) novosErros.confirmarSenha = 'Confirme a senha';
    else if (senha !== confirmarSenha) novosErros.confirmarSenha = 'As senhas não coincidem';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const fazer = async () => {
    setErroGeral('');
    if (!validar()) return;
    setCarregando(true);
    const resultado = await cadastrar({ nome, email, senha });
    setCarregando(false);
    if (resultado.sucesso) {
      router.replace('/cardapio');
    } else {
      setErroGeral(resultado.erro);
    }
  };

  const campo = (label, icon, value, onChange, opts = {}) => (
    <>
      <View style={[s.inputWrapper, erros[opts.key] && s.wrapperErro]}>
        <Ionicons name={icon} size={18} color={theme.textMuted} style={s.inputIcon} />
        <TextInput
          style={s.input}
          placeholder={label}
          placeholderTextColor={theme.textMuted}
          value={value}
          onChangeText={(t) => { onChange(t); setErros((e) => ({ ...e, [opts.key]: '' })); setErroGeral(''); }}
          secureTextEntry={opts.secure && !opts.visivel}
          keyboardType={opts.keyboard || 'default'}
          autoCapitalize={opts.autoCapitalize || 'sentences'}
        />
        {opts.onEye && (
          <TouchableOpacity onPress={opts.onEye} style={s.eyeBtn}>
            <Ionicons name={opts.visivel ? 'eye-off-outline' : 'eye-outline'} size={18} color={theme.textMuted} />
          </TouchableOpacity>
        )}
      </View>
      {erros[opts.key] ? <Text style={s.erroInline}>{erros[opts.key]}</Text> : null}
    </>
  );

  const s = styles(theme);

  const content = (
    <View style={s.overlay}>
      <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={22} color={theme.text} />
      </TouchableOpacity>

      <Image source={require('../assets/imagemLogo.png')} style={s.logo} />
      <Text style={s.titulo}>Criar conta</Text>
      <Text style={s.subtitulo}>Preencha seus dados para continuar</Text>

      {campo('Nome completo', 'person-outline', nome, setNome, { key: 'nome' })}
      {campo('E-mail', 'mail-outline', email, setEmail, { key: 'email', keyboard: 'email-address', autoCapitalize: 'none' })}
      {campo('Senha', 'lock-closed-outline', senha, setSenha, { key: 'senha', secure: true, visivel: senhaVisivel, onEye: () => setSenhaVisivel(!senhaVisivel) })}
      {campo('Confirmar senha', 'lock-closed-outline', confirmarSenha, setConfirmarSenha, { key: 'confirmarSenha', secure: true, visivel: confirmarVisivel, onEye: () => setConfirmarVisivel(!confirmarVisivel) })}

      {erroGeral ? (
        <View style={s.erroContainer}>
          <Ionicons name="warning-outline" size={16} color={theme.primary} style={{ marginRight: 8 }} />
          <Text style={s.erroTexto}>{erroGeral}</Text>
        </View>
      ) : null}

      <TouchableOpacity style={[s.botao, carregando && s.botaoDesabilitado]} onPress={fazer} disabled={carregando}>
        <Text style={s.botaoTexto}>{carregando ? 'Cadastrando...' : 'Cadastrar >'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={s.linkLogin}>
          Já tem conta? <Text style={{ color: theme.primary }}>Fazer login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (isDark) {
    return (
      <ImageBackground source={require('../assets/backgroundImage.png')} style={s.container}>
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
  backBtn: {
    position: 'absolute', top: 60, left: 24,
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: theme.card, borderWidth: 1, borderColor: theme.cardBorder,
    alignItems: 'center', justifyContent: 'center',
  },
  logo: { width: 70, height: 70, alignSelf: 'center', marginBottom: 16, marginTop: 40 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: theme.text, textAlign: 'center' },
  subtitulo: { color: theme.textSecondary, textAlign: 'center', marginBottom: 28 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: theme.inputBg,
    borderRadius: 16, borderWidth: 1, borderColor: theme.inputBorder,
    marginBottom: 15, marginHorizontal: 4, paddingHorizontal: 14,
  },
  wrapperErro: { borderColor: theme.primary },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, paddingVertical: 16, color: theme.text, fontSize: 15},
  eyeBtn: { padding: 4 },
  erroInline: { color: theme.primary, fontSize: 12, marginLeft: 8, marginBottom: 8 },
  erroContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(210,28,86,0.12)',
    borderWidth: 1, borderColor: theme.primary,
    borderRadius: 12, padding: 12, marginBottom: 12, marginHorizontal: 4,
  },
  erroTexto: { color: theme.text, fontSize: 13, fontWeight: '600', flex: 1 },
  botao: {
    backgroundColor: theme.primary, padding: 18,
    borderRadius: 16, alignItems: 'center', marginHorizontal: 4, marginTop: 8,
  },
  botaoDesabilitado: { opacity: 0.6 },
  botaoTexto: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  linkLogin: { color: theme.textSecondary, textAlign: 'center', marginTop: 20 },
});
