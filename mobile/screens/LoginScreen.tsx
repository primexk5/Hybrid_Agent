import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Pressable,
  StyleSheet, ScrollView, ActivityIndicator, StatusBar,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

const NAVY = '#0c2340';
const GOLD = '#c9912a';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const emailRef    = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const handleLogin = async () => {
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setError('');
    setLoading(true);
    // TODO: wire to backend auth
    setTimeout(() => {
      setLoading(false);
      nav.navigate('Main');
    }, 1200);
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Back */}
      <TouchableOpacity style={styles.back} onPress={() => nav.goBack()}>
        <Ionicons name="arrow-back" size={22} color={NAVY} />
      </TouchableOpacity>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 24 }]} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconRing}>
            <Ionicons name="lock-closed-outline" size={22} color={GOLD} />
          </View>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to your HybridAgent account</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          {error ? (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle-outline" size={15} color="#dc2626" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Email */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email</Text>
            <Pressable style={styles.inputWrap} onPress={() => emailRef.current?.focus()}>
              <Ionicons name="mail-outline" size={17} color={GOLD} style={styles.inputIcon} />
              <TextInput
                ref={emailRef}
                style={[styles.input, { flex: 1 }]}
                placeholder="you@example.com"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </Pressable>
          </View>

          {/* Password */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Password</Text>
            <Pressable style={styles.inputWrap} onPress={() => passwordRef.current?.focus()}>
              <Ionicons name="lock-closed-outline" size={17} color={GOLD} style={styles.inputIcon} />
              <TextInput
                ref={passwordRef}
                style={[styles.input, { flex: 1 }]}
                placeholder="••••••••"
                placeholderTextColor="#9ca3af"
                secureTextEntry={!showPw}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPw(!showPw)} style={styles.eyeBtn}>
                <Ionicons name={showPw ? 'eye-off-outline' : 'eye-outline'} size={17} color="#9ca3af" />
              </TouchableOpacity>
            </Pressable>
          </View>

          {/* Submit */}
          <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin} activeOpacity={0.85} disabled={loading}>
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.btnText}>Sign In</Text>}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => nav.navigate('Register')}>
            <Text style={styles.footerLink}>Register here</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:       { flex: 1, backgroundColor: '#f9fafb' },
  scroll:     { flexGrow: 1, paddingHorizontal: 20 },
  back:       { padding: 16, alignSelf: 'flex-start' },

  header:     { alignItems: 'center', marginTop: 8, marginBottom: 28 },
  iconRing:   { width: 60, height: 60, borderRadius: 30, borderWidth: 1.5, borderColor: GOLD + '55', backgroundColor: GOLD + '10', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  title:      { fontSize: 26, fontWeight: '800', color: NAVY, marginBottom: 6 },
  subtitle:   { fontSize: 14, color: '#6b7280', textAlign: 'center' },

  card:       { backgroundColor: '#fff', borderRadius: 20, padding: 24, borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 20 },

  errorBox:   { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#fef2f2', borderWidth: 1, borderColor: '#fecaca', borderRadius: 10, padding: 12, marginBottom: 16 },
  errorText:  { color: '#dc2626', fontSize: 13, flex: 1 },

  fieldGroup: { marginBottom: 18 },
  label:      { fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 },
  inputWrap:  { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: '#e5e7eb', borderRadius: 12, backgroundColor: '#f9fafb', paddingHorizontal: 12 },
  inputIcon:  { marginRight: 8 },
  input:      { paddingVertical: 13, fontSize: 15, color: '#111827' },
  eyeBtn:     { padding: 4 },

  btnPrimary: { backgroundColor: NAVY, borderRadius: 14, paddingVertical: 15, alignItems: 'center', marginTop: 4 },
  btnText:    { color: '#fff', fontWeight: '700', fontSize: 16 },

  footer:     { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  footerText: { color: '#6b7280', fontSize: 14 },
  footerLink: { color: NAVY, fontWeight: '700', fontSize: 14 },
});
