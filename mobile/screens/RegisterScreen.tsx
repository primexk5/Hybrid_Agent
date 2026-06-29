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
import { api, type UserType } from '../lib/api';
import { storage } from '../lib/storage';

const NAVY = '#0c2340';
const GOLD = '#c9912a';

const STEPS = ['Account', 'Contact', 'Role', 'Security'];

const USERNAME_RX = /^[a-zA-Z0-9]{3,40}$/;

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [step, setStep]   = useState(0);
  const [loading, setLoading] = useState(false);

  // Step 0 — Account
  const [fullName, setFullName]   = useState('');
  const [userName, setUserName]   = useState('');
  const [email, setEmail]         = useState('');
  // Step 1 — Contact
  const [phone, setPhone]         = useState('');
  // Step 2 — Role
  const [role, setRole]           = useState<UserType | null>(null);
  // Step 3 — Security
  const [password, setPassword]   = useState('');
  const [confirm, setConfirm]     = useState('');
  const [showPw, setShowPw]       = useState(false);
  const [showCf, setShowCf]       = useState(false);
  const [error, setError]         = useState('');

  const validate = () => {
    if (step === 0) {
      if (!fullName || !userName || !email) { setError('Fill in all fields.'); return false; }
      if (!USERNAME_RX.test(userName)) { setError('Username must be 3–40 alphanumeric characters.'); return false; }
    }
    if (step === 1 && !phone) { setError('Enter your phone number.'); return false; }
    if (step === 2 && !role)  { setError('Select a role.'); return false; }
    if (step === 3) {
      if (!password || !confirm)  { setError('Fill in all fields.'); return false; }
      if (password !== confirm)   { setError('Passwords do not match.'); return false; }
      if (password.length < 8)   { setError('Password must be 8+ characters.'); return false; }
    }
    setError('');
    return true;
  };

  const next = async () => {
    if (!validate()) return;
    if (step < 3) { setStep(s => s + 1); return; }
    setLoading(true);
    try {
      const { token, user } = await api.register({
        fullName,
        userName,
        email: email.trim().toLowerCase(),
        phoneNumber: phone,
        password,
        userType: role!,
      });
      await storage.setToken(token);
      await storage.setUser(user);
      nav.navigate('Main');
    } catch (e: any) {
      setError(e.message ?? 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const ROLE_OPTIONS: { key: UserType; icon: string; label: string; desc: string }[] = [
    { key: 'owner', icon: 'home-outline',     label: 'Owner', desc: 'Sell your own property or vehicle directly' },
    { key: 'agent', icon: 'briefcase-outline', label: 'Agent', desc: 'Broker deals for others and earn commission' },
  ];

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <TouchableOpacity style={styles.back} onPress={() => step > 0 ? setStep(s => s - 1) : nav.goBack()}>
        <Ionicons name="arrow-back" size={22} color={NAVY} />
      </TouchableOpacity>

      <View style={styles.stepper}>
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <View style={styles.stepItem}>
              <View style={[styles.stepDot, i <= step && styles.stepDotActive]}>
                {i < step
                  ? <Ionicons name="checkmark" size={13} color="#fff" />
                  : <Text style={[styles.stepNum, i <= step && styles.stepNumActive]}>{i + 1}</Text>}
              </View>
              <Text style={[styles.stepLabel, i === step && styles.stepLabelActive]}>{s}</Text>
            </View>
            {i < STEPS.length - 1 && <View style={[styles.stepLine, i < step && styles.stepLineActive]} />}
          </React.Fragment>
        ))}
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 24 }]} keyboardShouldPersistTaps="handled">
        <Text style={styles.stepTitle}>{STEPS[step]}</Text>

        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle-outline" size={15} color="#dc2626" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* Step 0 — Account */}
        {step === 0 && (
          <View style={styles.card}>
            <Field label="Full Name" icon="person-outline" value={fullName} onChangeText={setFullName} placeholder="Jane Doe" />
            <Field label="Username" icon="at-outline" value={userName} onChangeText={setUserName} placeholder="janeadeyemi" />
            <Field label="Email" icon="mail-outline" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboard="email-address" />
          </View>
        )}

        {/* Step 1 — Contact */}
        {step === 1 && (
          <View style={styles.card}>
            <Field label="Phone Number" icon="call-outline" value={phone} onChangeText={setPhone} placeholder="+234 800 000 0000" keyboard="phone-pad" />
          </View>
        )}

        {/* Step 2 — Role */}
        {step === 2 && (
          <View style={styles.card}>
            <Text style={styles.roleHint}>Your role is per-listing. You can act as owner on one listing and agent on another.</Text>
            {ROLE_OPTIONS.map(opt => (
              <TouchableOpacity
                key={opt.key}
                style={[styles.roleCard, role === opt.key && styles.roleCardActive]}
                onPress={() => { setRole(opt.key); setError(''); }}
                activeOpacity={0.8}
              >
                <View style={[styles.roleIcon, role === opt.key && styles.roleIconActive]}>
                  <Ionicons name={opt.icon as any} size={20} color={role === opt.key ? GOLD : '#9ca3af'} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.roleLabel, role === opt.key && styles.roleLabelActive]}>{opt.label}</Text>
                  <Text style={styles.roleDesc}>{opt.desc}</Text>
                </View>
                {role === opt.key && <Ionicons name="checkmark-circle" size={20} color={GOLD} />}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Step 3 — Security */}
        {step === 3 && (
          <View style={styles.card}>
            <Field label="Password" icon="lock-closed-outline" value={password} onChangeText={setPassword} placeholder="••••••••" secure={!showPw} toggleSecure={() => setShowPw(v => !v)} showSecure={showPw} />
            <Field label="Confirm Password" icon="lock-closed-outline" value={confirm} onChangeText={setConfirm} placeholder="••••••••" secure={!showCf} toggleSecure={() => setShowCf(v => !v)} showSecure={showCf} />
          </View>
        )}

        <TouchableOpacity style={styles.btnPrimary} onPress={next} activeOpacity={0.85} disabled={loading}>
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.btnText}>{step < 3 ? 'Continue' : 'Create Account'}</Text>}
          {!loading && step < 3 && <Ionicons name="arrow-forward" size={16} color="#fff" style={{ marginLeft: 6 }} />}
        </TouchableOpacity>

        {step === 0 && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => nav.navigate('Login')}>
              <Text style={styles.footerLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function Field({
  label, icon, value, onChangeText, placeholder, keyboard, secure, toggleSecure, showSecure,
}: {
  label: string; icon: string; value: string; onChangeText: (t: string) => void;
  placeholder?: string; keyboard?: any; secure?: boolean; toggleSecure?: () => void; showSecure?: boolean;
}) {
  const inputRef = useRef<TextInput>(null);
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.inputWrap} onPress={() => inputRef.current?.focus()}>
        <Ionicons name={icon as any} size={17} color={GOLD} style={styles.inputIcon} />
        <TextInput
          ref={inputRef}
          style={[styles.input, { flex: 1 }]}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          keyboardType={keyboard}
          secureTextEntry={secure}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
        />
        {toggleSecure && (
          <TouchableOpacity onPress={toggleSecure} style={{ padding: 4 }}>
            <Ionicons name={showSecure ? 'eye-off-outline' : 'eye-outline'} size={17} color="#9ca3af" />
          </TouchableOpacity>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root:    { flex: 1, backgroundColor: '#f9fafb' },
  scroll:  { flexGrow: 1, paddingHorizontal: 20 },
  back:    { padding: 16, alignSelf: 'flex-start' },

  stepper: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, marginBottom: 24 },
  stepItem:    { alignItems: 'center' },
  stepDot:     { width: 28, height: 28, borderRadius: 14, backgroundColor: '#e5e7eb', alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  stepDotActive: { backgroundColor: NAVY },
  stepNum:      { fontSize: 12, fontWeight: '700', color: '#9ca3af' },
  stepNumActive: { color: '#fff' },
  stepLabel:    { fontSize: 10, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.5 },
  stepLabelActive: { color: NAVY, fontWeight: '700' },
  stepLine:     { flex: 1, height: 1.5, backgroundColor: '#e5e7eb', marginBottom: 18 },
  stepLineActive: { backgroundColor: GOLD },

  stepTitle: { fontSize: 22, fontWeight: '800', color: NAVY, marginBottom: 16 },

  errorBox:  { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#fef2f2', borderWidth: 1, borderColor: '#fecaca', borderRadius: 10, padding: 12, marginBottom: 16 },
  errorText: { color: '#dc2626', fontSize: 13, flex: 1 },

  card:      { backgroundColor: '#fff', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 20 },

  fieldGroup: { marginBottom: 16 },
  label:      { fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 },
  inputWrap:  { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: '#e5e7eb', borderRadius: 12, backgroundColor: '#f9fafb', paddingHorizontal: 12 },
  inputIcon:  { marginRight: 8 },
  input:      { paddingVertical: 13, fontSize: 15, color: '#111827' },

  roleHint:  { fontSize: 13, color: '#6b7280', marginBottom: 14, lineHeight: 19 },
  roleCard:  { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: '#e5e7eb', borderRadius: 14, padding: 14, marginBottom: 10, gap: 12 },
  roleCardActive: { borderColor: GOLD, backgroundColor: GOLD + '08' },
  roleIcon:  { width: 42, height: 42, borderRadius: 21, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' },
  roleIconActive: { backgroundColor: GOLD + '18' },
  roleLabel: { fontSize: 15, fontWeight: '700', color: '#374151', marginBottom: 2 },
  roleLabelActive: { color: NAVY },
  roleDesc:  { fontSize: 12, color: '#9ca3af', lineHeight: 17 },

  btnPrimary: { backgroundColor: NAVY, borderRadius: 14, paddingVertical: 15, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: 16 },
  btnText:    { color: '#fff', fontWeight: '700', fontSize: 16 },

  footer:     { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  footerText: { color: '#6b7280', fontSize: 14 },
  footerLink: { color: NAVY, fontWeight: '700', fontSize: 14 },
});
