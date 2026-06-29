import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, Pressable, ScrollView, StyleSheet, StatusBar,
  TextInput, Animated, ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

const NAVY   = '#0c2340';
const GOLD   = '#c9912a';
const GOLD_L = '#fdf3e3';
const GREEN  = '#059669';

// Mock settlement data — populated when Baba clicks the email link.
// In production this comes from the backend using the escrow ID in the deep link.
const MOCK_SETTLEMENT = {
  ownerName:          'Baba Musa',
  ownerEmail:         'baba@gmail.com',
  listingTitle:       '3 Bedroom Duplex, Lekki Phase 1',
  agentName:          'John Adeyemi',
  salePrice:          120_000,
  agentCommissionBps: 500,
  platformFeeBps:     100,
  settledAt:          '27 Jun 2026',
  escrowTxHash:       '0x7f3a...b9c2',
};

const NETWORKS = [
  { id: 'base',     label: 'Base',     note: 'Cheapest · Recommended',  icon: 'flash-outline' },
  { id: 'ethereum', label: 'Ethereum', note: 'Higher gas fees',          icon: 'globe-outline' },
  { id: 'bnb',      label: 'BNB Chain', note: 'Low fees · CEX-friendly', icon: 'swap-horizontal-outline' },
] as const;

type FlowState = 'email' | 'otp' | 'balance' | 'sending' | 'done';

// ────────────────────────────────────────────────────────────────────────────
export default function OwnerWithdrawScreen() {
  const insets = useSafeAreaInsets();
  const nav    = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [flowState, setFlowState] = useState<FlowState>('email');
  const [loading, setLoading]     = useState(false);

  // Email step
  const [email, setEmail] = useState('');

  // OTP step — 6 individual digit inputs
  const [otp, setOtp]     = useState(['', '', '', '', '', '']);
  const otpRefs           = useRef<Array<TextInput | null>>([null, null, null, null, null, null]);
  const emailInputRef     = useRef<TextInput>(null);
  const destInputRef      = useRef<TextInput>(null);
  const customAmtRef      = useRef<TextInput>(null);
  const [otpError, setOtpError] = useState('');

  // Send step
  const [destination, setDestination] = useState('');
  const [network, setNetwork]         = useState<typeof NETWORKS[number]['id']>('base');
  const [sendAll, setSendAll]         = useState(true);
  const [customAmt, setCustomAmt]     = useState('');
  const [destError, setDestError]     = useState('');

  // Done animation
  const checkScale  = useRef(new Animated.Value(0)).current;
  const checkOpacity = useRef(new Animated.Value(0)).current;
  const [withdrawTxHash] = useState('0xd4c8...92f1');

  // Computed payout
  const { salePrice, agentCommissionBps, platformFeeBps } = MOCK_SETTLEMENT;
  const agentFee   = Math.round(salePrice * agentCommissionBps / 10_000);
  const platFee    = Math.round(salePrice * platformFeeBps    / 10_000);
  const ownerPayout = salePrice - agentFee - platFee;
  const sendAmount  = sendAll ? ownerPayout : Number(customAmt) || 0;

  // ── step handlers ──────────────────────────────────────────────────────────

  function submitEmail() {
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFlowState('otp');
    }, 1000);
  }

  function handleOtpChange(val: string, idx: number) {
    const clean = val.replace(/\D/g, '').slice(-1);
    const next  = [...otp];
    next[idx]   = clean;
    setOtp(next);
    setOtpError('');
    if (clean && idx < 5) otpRefs.current[idx + 1]?.focus();
    if (!clean && idx > 0) otpRefs.current[idx - 1]?.focus();
  }

  function fillDemoOtp() {
    setOtp(['1', '2', '3', '4', '5', '6']);
    setOtpError('');
  }

  function verifyOtp() {
    const code = otp.join('');
    if (code.length < 6) { setOtpError('Enter all 6 digits.'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (code === '123456') {
        setFlowState('balance');
      } else {
        setOtpError('Incorrect code. Try the demo code: 123456');
      }
    }, 1000);
  }

  function submitSend() {
    if (!destination.trim()) { setDestError('Enter a destination wallet address.'); return; }
    if (!sendAll && (!customAmt || Number(customAmt) <= 0)) {
      setDestError('Enter a valid amount.');
      return;
    }
    setDestError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFlowState('done');
    }, 1800);
  }

  // Animate checkmark when done
  useEffect(() => {
    if (flowState === 'done') {
      Animated.sequence([
        Animated.delay(200),
        Animated.parallel([
          Animated.spring(checkScale, { toValue: 1, useNativeDriver: true, tension: 60, friction: 7 }),
          Animated.timing(checkOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        ]),
      ]).start();
    }
  }, [flowState]);

  // ── render helpers ─────────────────────────────────────────────────────────

  const Header = ({ title, sub }: { title: string; sub?: string }) => (
    <View style={styles.headerBlock}>
      <Text style={styles.headerTitle}>{title}</Text>
      {sub && <Text style={styles.headerSub}>{sub}</Text>}
    </View>
  );

  // ── SCREENS ───────────────────────────────────────────────────────────────

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.root, { paddingTop: insets.top }]}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        {/* Top bar */}
        <View style={styles.topBar}>
          {flowState !== 'done' && (
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => {
                const prev: Record<FlowState, FlowState | null> = {
                  email: null, otp: 'email', balance: 'otp', sending: 'balance', done: null,
                };
                const p = prev[flowState];
                if (p) setFlowState(p);
                else nav.goBack();
              }}
            >
              <Ionicons name="arrow-back" size={20} color={NAVY} />
            </TouchableOpacity>
          )}
          <View style={styles.logoRow}>
            <Ionicons name="lock-closed-outline" size={15} color={GOLD} />
            <Text style={styles.logoText}>HybridAgent Payout</Text>
          </View>
          {/* Progress dots */}
          {flowState !== 'done' && (
            <View style={styles.progressDots}>
              {(['email', 'otp', 'balance', 'sending'] as FlowState[]).map(s => (
                <View
                  key={s}
                  style={[
                    styles.dot,
                    (s === flowState) && styles.dotActive,
                    (['otp', 'balance', 'sending', 'done'] as FlowState[]).indexOf(flowState) >
                    (['email', 'otp', 'balance', 'sending'] as FlowState[]).indexOf(s)
                      ? styles.dotDone
                      : null,
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 32 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          {/* ══════════════════════════════════════════════════
              STEP 1 — EMAIL
          ══════════════════════════════════════════════════ */}
          {flowState === 'email' && (
            <View>
              {/* Illustration */}
              <View style={styles.illustration}>
                <View style={styles.illustrationRing}>
                  <Ionicons name="mail-outline" size={38} color={NAVY} />
                </View>
              </View>

              <Header
                title="Access Your Payout"
                sub="Enter the email address your listing agent used when they set up your sale. We will send you a one-time verification code."
              />

              <View style={styles.card}>
                <Text style={styles.fieldLabel}>Email address</Text>
                <Pressable style={styles.inputWrap} onPress={() => emailInputRef.current?.focus()}>
                  <Ionicons name="mail-outline" size={17} color={GOLD} style={styles.inputIcon} />
                  <TextInput
                    ref={emailInputRef}
                    style={[styles.input, { flex: 1 }]}
                    placeholder="you@example.com"
                    placeholderTextColor="#9ca3af"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="send"
                    onSubmitEditing={submitEmail}
                  />
                </Pressable>

                <View style={styles.infoBox}>
                  <Ionicons name="information-circle-outline" size={15} color="#6b7280" />
                  <Text style={styles.infoText}>
                    Your wallet and payout are tied to this email. You do not need to create an account.
                  </Text>
                </View>
              </View>

              {/* Demo shortcut */}
              <TouchableOpacity style={styles.demoHint} onPress={() => { setEmail('baba@gmail.com'); submitEmail(); }}>
                <Ionicons name="flash-outline" size={13} color={GOLD} />
                <Text style={styles.demoHintText}>Demo: use baba@gmail.com</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.primaryBtn, (!email.trim() || loading) && { opacity: 0.5 }]}
                onPress={submitEmail}
                disabled={!email.trim() || loading}
                activeOpacity={0.85}
              >
                {loading
                  ? <ActivityIndicator color="#fff" />
                  : <>
                      <Text style={styles.primaryBtnText}>Send Verification Code</Text>
                      <Ionicons name="arrow-forward" size={16} color="#fff" style={{ marginLeft: 6 }} />
                    </>}
              </TouchableOpacity>
            </View>
          )}

          {/* ══════════════════════════════════════════════════
              STEP 2 — OTP
          ══════════════════════════════════════════════════ */}
          {flowState === 'otp' && (
            <View>
              <View style={styles.illustration}>
                <View style={styles.illustrationRing}>
                  <Ionicons name="keypad-outline" size={38} color={NAVY} />
                </View>
              </View>

              <Header
                title="Verify Your Email"
                sub={`We sent a 6-digit code to ${email || MOCK_SETTLEMENT.ownerEmail}. Enter it below to access your payout.`}
              />

              {/* 6-box OTP input */}
              <View style={styles.otpRow}>
                {otp.map((digit, i) => (
                  <TextInput
                    key={i}
                    ref={r => { otpRefs.current[i] = r; }}
                    style={[styles.otpBox, digit ? styles.otpBoxFilled : null, otpError ? styles.otpBoxError : null]}
                    value={digit}
                    onChangeText={val => handleOtpChange(val, i)}
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus
                    onKeyPress={({ nativeEvent }) => {
                      if (nativeEvent.key === 'Backspace' && !otp[i] && i > 0) {
                        otpRefs.current[i - 1]?.focus();
                      }
                    }}
                  />
                ))}
              </View>

              {otpError ? (
                <View style={styles.errorBox}>
                  <Ionicons name="alert-circle-outline" size={14} color="#dc2626" />
                  <Text style={styles.errorText}>{otpError}</Text>
                </View>
              ) : null}

              <TouchableOpacity style={styles.demoHint} onPress={fillDemoOtp}>
                <Ionicons name="flash-outline" size={13} color={GOLD} />
                <Text style={styles.demoHintText}>Demo: fill code 123456</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.primaryBtn, (otp.join('').length < 6 || loading) && { opacity: 0.5 }]}
                onPress={verifyOtp}
                disabled={otp.join('').length < 6 || loading}
                activeOpacity={0.85}
              >
                {loading
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={styles.primaryBtnText}>Verify Code</Text>}
              </TouchableOpacity>

              <View style={styles.resendRow}>
                <Text style={styles.resendText}>Did not receive the code? </Text>
                <TouchableOpacity onPress={() => { setOtp(['', '', '', '', '', '']); setOtpError(''); }}>
                  <Text style={styles.resendLink}>Resend</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* ══════════════════════════════════════════════════
              STEP 3 — BALANCE / SETTLEMENT SUMMARY
          ══════════════════════════════════════════════════ */}
          {flowState === 'balance' && (
            <View>
              {/* Greeting */}
              <View style={styles.greetingBlock}>
                <View style={styles.greetingAvatar}>
                  <Text style={styles.greetingInitial}>
                    {MOCK_SETTLEMENT.ownerName[0]}
                  </Text>
                </View>
                <View>
                  <Text style={styles.greetingName}>Hi, {MOCK_SETTLEMENT.ownerName.split(' ')[0]}</Text>
                  <Text style={styles.greetingStatus}>Your sale has settled</Text>
                </View>
                <View style={styles.greetingBadge}>
                  <View style={styles.greetingDot} />
                  <Text style={styles.greetingBadgeText}>On-chain</Text>
                </View>
              </View>

              {/* Big payout number */}
              <View style={styles.payoutHero}>
                <Text style={styles.payoutLabel}>Your payout</Text>
                <Text style={styles.payoutAmount}>
                  ${ownerPayout.toLocaleString()}
                  <Text style={styles.payoutCurrency}> USDC</Text>
                </Text>
                <Text style={styles.payoutSettledAt}>Settled {MOCK_SETTLEMENT.settledAt}</Text>
              </View>

              {/* Settlement breakdown */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Sale breakdown</Text>

                <BreakdownRow label="Listing" value={MOCK_SETTLEMENT.listingTitle} valueSmall />
                <BreakdownRow label="Agent"   value={MOCK_SETTLEMENT.agentName} />
                <View style={styles.divider} />
                <BreakdownRow label="Sale price"                      value={`$${salePrice.toLocaleString()}`} />
                <BreakdownRow
                  label={`Agent commission (${agentCommissionBps / 100}%)`}
                  value={`−$${agentFee.toLocaleString()}`}
                  valueColor="#dc2626"
                />
                <BreakdownRow
                  label="Platform fee (1%)"
                  value={`−$${platFee.toLocaleString()}`}
                  valueColor="#dc2626"
                />
                <View style={styles.divider} />
                <BreakdownRow
                  label="You receive"
                  value={`$${ownerPayout.toLocaleString()} USDC`}
                  bold
                />
              </View>

              {/* Escrow proof */}
              <View style={styles.proofCard}>
                <View style={styles.proofRow}>
                  <Ionicons name="lock-closed-outline" size={14} color={GOLD} />
                  <Text style={styles.proofLabel}>Escrow settlement TX</Text>
                </View>
                <Text style={styles.proofHash}>{MOCK_SETTLEMENT.escrowTxHash}</Text>
              </View>

              {/* What next */}
              <View style={styles.nextStepsCard}>
                <Text style={styles.nextStepsTitle}>Your funds are ready to withdraw</Text>
                <Text style={styles.nextStepsDesc}>
                  Send your USDC to any wallet or exchange — Binance, Coinbase, MetaMask, or anywhere that accepts USDC.
                </Text>
              </View>

              <TouchableOpacity style={styles.primaryBtn} onPress={() => setFlowState('sending')} activeOpacity={0.85}>
                <Ionicons name="send-outline" size={16} color="#fff" style={{ marginRight: 6 }} />
                <Text style={styles.primaryBtnText}>Send Funds</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ══════════════════════════════════════════════════
              STEP 4 — SEND FORM
          ══════════════════════════════════════════════════ */}
          {flowState === 'sending' && (
            <View>
              <Header
                title="Send Funds"
                sub="Enter where to send your USDC. You can send to a crypto wallet or a centralised exchange like Binance."
              />

              {/* Destination */}
              <View style={styles.card}>
                <Text style={styles.fieldLabel}>Destination</Text>
                <Pressable style={[styles.inputWrap, destError ? styles.inputWrapError : null]} onPress={() => destInputRef.current?.focus()}>
                  <Ionicons name="wallet-outline" size={17} color={destError ? '#dc2626' : GOLD} style={styles.inputIcon} />
                  <TextInput
                    ref={destInputRef}
                    style={[styles.input, { flex: 1 }]}
                    placeholder="0x wallet address or exchange address"
                    placeholderTextColor="#9ca3af"
                    value={destination}
                    onChangeText={v => { setDestination(v); setDestError(''); }}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </Pressable>
                {destError ? (
                  <View style={[styles.errorBox, { marginTop: 8 }]}>
                    <Ionicons name="alert-circle-outline" size={14} color="#dc2626" />
                    <Text style={styles.errorText}>{destError}</Text>
                  </View>
                ) : (
                  <Text style={styles.fieldHint}>
                    Paste a wallet address (MetaMask, Trust Wallet) or your exchange deposit address (Binance, Coinbase).
                  </Text>
                )}

                {/* Demo shortcut */}
                <TouchableOpacity style={styles.demoHint} onPress={() => setDestination('0xd9145CCE52D386f254917e481eB44e9943F39138')}>
                  <Ionicons name="flash-outline" size={13} color={GOLD} />
                  <Text style={styles.demoHintText}>Demo: fill sample address</Text>
                </TouchableOpacity>
              </View>

              {/* Network */}
              <View style={styles.card}>
                <Text style={styles.fieldLabel}>Network</Text>
                <Text style={styles.fieldHint}>Choose the network your destination wallet supports.</Text>
                <View style={styles.networkList}>
                  {NETWORKS.map(n => (
                    <TouchableOpacity
                      key={n.id}
                      style={[styles.networkOption, network === n.id && styles.networkOptionActive]}
                      onPress={() => setNetwork(n.id)}
                      activeOpacity={0.8}
                    >
                      <View style={[styles.networkIcon, network === n.id && styles.networkIconActive]}>
                        <Ionicons name={n.icon as any} size={18} color={network === n.id ? GOLD : '#9ca3af'} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.networkLabel, network === n.id && { color: NAVY }]}>{n.label}</Text>
                        <Text style={styles.networkNote}>{n.note}</Text>
                      </View>
                      {network === n.id && <Ionicons name="checkmark-circle" size={18} color={GOLD} />}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Amount */}
              <View style={styles.card}>
                <Text style={styles.fieldLabel}>Amount</Text>

                <TouchableOpacity
                  style={[styles.amountOption, sendAll && styles.amountOptionActive]}
                  onPress={() => setSendAll(true)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.radioCircle, sendAll && styles.radioCircleFilled]} />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.amountOptionLabel, sendAll && { color: NAVY }]}>
                      Send full balance
                    </Text>
                    <Text style={styles.amountOptionSub}>${ownerPayout.toLocaleString()} USDC</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.amountOption, !sendAll && styles.amountOptionActive]}
                  onPress={() => setSendAll(false)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.radioCircle, !sendAll && styles.radioCircleFilled]} />
                  <Text style={[styles.amountOptionLabel, !sendAll && { color: NAVY }]}>Custom amount</Text>
                </TouchableOpacity>

                {!sendAll && (
                  <Pressable style={[styles.inputWrap, { marginTop: 10 }]} onPress={() => customAmtRef.current?.focus()}>
                    <Text style={[styles.inputIcon, { fontSize: 15, color: GOLD, fontWeight: '700' }]}>$</Text>
                    <TextInput
                      ref={customAmtRef}
                      style={[styles.input, { flex: 1 }]}
                      placeholder="0.00"
                      placeholderTextColor="#9ca3af"
                      value={customAmt}
                      onChangeText={setCustomAmt}
                      keyboardType="decimal-pad"
                    />
                    <Text style={{ fontSize: 13, color: '#9ca3af', marginRight: 4 }}>USDC</Text>
                  </Pressable>
                )}
              </View>

              {/* Summary */}
              <View style={styles.sendSummary}>
                <SummaryRow label="You send"   value={`$${sendAmount.toLocaleString()} USDC`} bold />
                <SummaryRow label="Network"    value={NETWORKS.find(n => n.id === network)?.label ?? ''} />
                <SummaryRow label="Gas fee"    value="~$0.05 (paid from balance)" />
              </View>

              <TouchableOpacity
                style={[styles.primaryBtn, (loading || !destination.trim()) && { opacity: 0.5 }]}
                onPress={submitSend}
                disabled={loading || !destination.trim()}
                activeOpacity={0.85}
              >
                {loading
                  ? <ActivityIndicator color="#fff" />
                  : <>
                      <Ionicons name="send-outline" size={16} color="#fff" style={{ marginRight: 6 }} />
                      <Text style={styles.primaryBtnText}>
                        Confirm Transfer · ${sendAmount.toLocaleString()} USDC
                      </Text>
                    </>}
              </TouchableOpacity>
            </View>
          )}

          {/* ══════════════════════════════════════════════════
              STEP 5 — DONE
          ══════════════════════════════════════════════════ */}
          {flowState === 'done' && (
            <View style={styles.doneWrapper}>
              {/* Animated check */}
              <Animated.View style={[styles.doneCheckRing, { opacity: checkOpacity, transform: [{ scale: checkScale }] }]}>
                <View style={styles.doneCheckInner}>
                  <Ionicons name="checkmark" size={44} color="#fff" />
                </View>
              </Animated.View>

              <Text style={styles.doneTitle}>Funds sent</Text>
              <Text style={styles.doneSub}>
                Your USDC is on the way to your destination wallet. It may take a few seconds to confirm on-chain.
              </Text>

              {/* TX card */}
              <View style={styles.doneTxCard}>
                <SummaryRow label="Amount sent" value={`$${ownerPayout.toLocaleString()} USDC`} bold />
                <SummaryRow label="Network"     value={NETWORKS.find(n => n.id === network)?.label ?? 'Base'} />
                <View style={styles.divider} />
                <Text style={styles.txHashLabel}>Transaction hash</Text>
                <Text style={styles.txHash}>{withdrawTxHash}</Text>
              </View>

              <View style={styles.doneInfoCard}>
                <Ionicons name="information-circle-outline" size={16} color="#6b7280" />
                <Text style={styles.doneInfoText}>
                  Save the transaction hash above so you can look it up on a block explorer (e.g. basescan.org) if needed.
                </Text>
              </View>

              <View style={styles.doneBanner}>
                <Ionicons name="shield-checkmark-outline" size={20} color={GOLD} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.doneBannerTitle}>HybridAgent — your commission was protected</Text>
                  <Text style={styles.doneBannerSub}>
                    {MOCK_SETTLEMENT.agentName} earned ${agentFee.toLocaleString()} USDC in commission. Your ${ownerPayout.toLocaleString()} was held safely in escrow.
                  </Text>
                </View>
              </View>
            </View>
          )}

        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function BreakdownRow({
  label, value, bold, valueSmall, valueColor,
}: {
  label: string; value: string; bold?: boolean; valueSmall?: boolean; valueColor?: string;
}) {
  return (
    <View style={styles.breakdownRow}>
      <Text style={styles.breakdownLabel}>{label}</Text>
      <Text style={[
        styles.breakdownValue,
        bold       && { fontWeight: '800', color: NAVY },
        valueSmall && { fontSize: 11, maxWidth: 160, textAlign: 'right' },
        valueColor ? { color: valueColor } : null,
      ]} numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
}

function SummaryRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={[styles.summaryValue, bold && { fontWeight: '800', color: NAVY }]}>{value}</Text>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root:   { flex: 1, backgroundColor: '#f9fafb' },
  scroll: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 8 },

  // Top bar
  topBar:    { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f3f4f6', gap: 10 },
  backBtn:   { width: 36, height: 36, borderRadius: 10, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' },
  logoRow:   { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 },
  logoText:  { fontSize: 13, fontWeight: '700', color: NAVY },
  progressDots: { flexDirection: 'row', gap: 5 },
  dot:       { width: 6, height: 6, borderRadius: 3, backgroundColor: '#e5e7eb' },
  dotActive: { backgroundColor: NAVY, width: 18 },
  dotDone:   { backgroundColor: GOLD },

  // Section header
  headerBlock: { marginTop: 24, marginBottom: 20 },
  headerTitle: { fontSize: 26, fontWeight: '900', color: NAVY, lineHeight: 34, marginBottom: 8 },
  headerSub:   { fontSize: 14, color: '#6b7280', lineHeight: 22 },

  // Illustration circle
  illustration:     { alignItems: 'center', marginTop: 24, marginBottom: 8 },
  illustrationRing: { width: 88, height: 88, borderRadius: 44, backgroundColor: NAVY + '10', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: NAVY + '20' },

  // Card
  card:      { backgroundColor: '#fff', borderRadius: 18, padding: 18, borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 16 },
  cardTitle: { fontSize: 14, fontWeight: '700', color: NAVY, marginBottom: 12 },
  divider:   { height: 1, backgroundColor: '#f3f4f6', marginVertical: 10 },

  // Fields
  fieldLabel: { fontSize: 13, fontWeight: '700', color: '#374151', marginBottom: 8 },
  fieldHint:  { fontSize: 11, color: '#9ca3af', lineHeight: 16, marginTop: 6 },
  inputWrap:      { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: '#e5e7eb', borderRadius: 12, backgroundColor: '#f9fafb', paddingHorizontal: 12 },
  inputWrapError: { borderColor: '#fca5a5' },
  inputIcon:  { marginRight: 8 },
  input:      { flex: 1, paddingVertical: 13, fontSize: 14, color: '#111827' },

  // Info box
  infoBox:   { flexDirection: 'row', gap: 8, alignItems: 'flex-start', backgroundColor: '#f9fafb', borderRadius: 10, padding: 12, marginTop: 14, borderWidth: 1, borderColor: '#e5e7eb' },
  infoText:  { fontSize: 12, color: '#6b7280', flex: 1, lineHeight: 17 },

  // Demo hint
  demoHint:     { flexDirection: 'row', alignItems: 'center', gap: 5, alignSelf: 'flex-start', marginTop: 10, marginBottom: 4 },
  demoHintText: { fontSize: 12, color: GOLD, fontWeight: '600' },

  // Primary button
  primaryBtn:     { backgroundColor: NAVY, borderRadius: 16, paddingVertical: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  primaryBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  // OTP
  otpRow:       { flexDirection: 'row', gap: 10, justifyContent: 'center', marginBottom: 16, marginTop: 8 },
  otpBox:       { width: 46, height: 56, borderRadius: 14, borderWidth: 2, borderColor: '#e5e7eb', backgroundColor: '#fff', fontSize: 22, fontWeight: '800', color: NAVY, textAlign: 'center' },
  otpBoxFilled: { borderColor: NAVY, backgroundColor: NAVY + '08' },
  otpBoxError:  { borderColor: '#fca5a5', backgroundColor: '#fff5f5' },

  // Errors
  errorBox:  { flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: '#fef2f2', borderRadius: 10, padding: 10, borderWidth: 1, borderColor: '#fecaca' },
  errorText: { fontSize: 12, color: '#dc2626', flex: 1 },

  // Resend
  resendRow:  { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  resendText: { fontSize: 13, color: '#6b7280' },
  resendLink: { fontSize: 13, color: NAVY, fontWeight: '700' },

  // Greeting block (balance screen)
  greetingBlock:     { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff', borderRadius: 18, padding: 16, marginTop: 16, marginBottom: 16, borderWidth: 1, borderColor: '#e5e7eb' },
  greetingAvatar:    { width: 44, height: 44, borderRadius: 22, backgroundColor: NAVY, alignItems: 'center', justifyContent: 'center' },
  greetingInitial:   { fontSize: 18, fontWeight: '800', color: '#fff' },
  greetingName:      { fontSize: 16, fontWeight: '800', color: NAVY },
  greetingStatus:    { fontSize: 12, color: '#6b7280', marginTop: 1 },
  greetingBadge:     { marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#d1fae5', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 },
  greetingDot:       { width: 6, height: 6, borderRadius: 3, backgroundColor: GREEN },
  greetingBadgeText: { fontSize: 11, fontWeight: '700', color: GREEN },

  // Payout hero
  payoutHero:     { alignItems: 'center', paddingVertical: 28, backgroundColor: NAVY, borderRadius: 24, marginBottom: 16 },
  payoutLabel:    { fontSize: 12, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 },
  payoutAmount:   { fontSize: 42, fontWeight: '900', color: '#fff', letterSpacing: -1 },
  payoutCurrency: { fontSize: 18, fontWeight: '600', color: '#94a3b8' },
  payoutSettledAt: { fontSize: 12, color: '#64748b', marginTop: 8 },

  // Breakdown
  breakdownRow:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 },
  breakdownLabel: { fontSize: 13, color: '#6b7280', flex: 1 },
  breakdownValue: { fontSize: 13, fontWeight: '600', color: '#374151', textAlign: 'right' },

  // Proof card
  proofCard: { backgroundColor: NAVY + '08', borderRadius: 14, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: NAVY + '15' },
  proofRow:  { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  proofLabel: { fontSize: 12, fontWeight: '700', color: NAVY },
  proofHash:  { fontSize: 13, color: '#374151', fontFamily: 'monospace' },

  // Next steps
  nextStepsCard: { backgroundColor: GOLD_L, borderRadius: 14, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: GOLD + '30' },
  nextStepsTitle: { fontSize: 14, fontWeight: '700', color: '#92400e', marginBottom: 4 },
  nextStepsDesc:  { fontSize: 12, color: '#6b7280', lineHeight: 17 },

  // Network selector
  networkList:       { gap: 8, marginTop: 8 },
  networkOption:     { flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1.5, borderColor: '#e5e7eb', borderRadius: 14, padding: 12 },
  networkOptionActive: { borderColor: GOLD, backgroundColor: GOLD + '08' },
  networkIcon:       { width: 38, height: 38, borderRadius: 11, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' },
  networkIconActive: { backgroundColor: GOLD + '18' },
  networkLabel:      { fontSize: 14, fontWeight: '700', color: '#374151', marginBottom: 1 },
  networkNote:       { fontSize: 11, color: '#9ca3af' },

  // Amount options
  amountOption:       { flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1.5, borderColor: '#e5e7eb', borderRadius: 14, padding: 13, marginBottom: 8 },
  amountOptionActive: { borderColor: GOLD, backgroundColor: GOLD + '08' },
  amountOptionLabel:  { fontSize: 14, fontWeight: '700', color: '#374151' },
  amountOptionSub:    { fontSize: 12, color: '#9ca3af', marginTop: 1 },
  radioCircle:        { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#d1d5db', alignItems: 'center', justifyContent: 'center' },
  radioCircleFilled:  { borderColor: GOLD, backgroundColor: GOLD },

  // Send summary
  sendSummary: { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: '#e5e7eb', gap: 6 },
  summaryRow:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryLabel: { fontSize: 13, color: '#6b7280' },
  summaryValue: { fontSize: 13, fontWeight: '600', color: '#374151' },

  // Done screen
  doneWrapper: { alignItems: 'center', paddingTop: 32 },
  doneCheckRing: { width: 110, height: 110, borderRadius: 55, borderWidth: 3, borderColor: GREEN + '40', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  doneCheckInner: { width: 80, height: 80, borderRadius: 40, backgroundColor: GREEN, alignItems: 'center', justifyContent: 'center' },
  doneTitle: { fontSize: 30, fontWeight: '900', color: NAVY, marginBottom: 10 },
  doneSub:   { fontSize: 14, color: '#6b7280', textAlign: 'center', lineHeight: 22, marginBottom: 24, paddingHorizontal: 8 },

  doneTxCard: { width: '100%', backgroundColor: '#fff', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 14, gap: 6 },
  txHashLabel: { fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 1, marginTop: 4 },
  txHash:      { fontSize: 13, color: '#374151', fontFamily: 'monospace', marginTop: 2 },

  doneInfoCard: { width: '100%', flexDirection: 'row', gap: 10, alignItems: 'flex-start', backgroundColor: '#f9fafb', borderRadius: 14, padding: 14, marginBottom: 14, borderWidth: 1, borderColor: '#e5e7eb' },
  doneInfoText: { fontSize: 12, color: '#6b7280', flex: 1, lineHeight: 17 },

  doneBanner: { width: '100%', flexDirection: 'row', gap: 12, alignItems: 'flex-start', backgroundColor: NAVY, borderRadius: 16, padding: 16 },
  doneBannerTitle: { fontSize: 13, fontWeight: '700', color: '#fff', marginBottom: 4 },
  doneBannerSub:   { fontSize: 12, color: '#94a3b8', lineHeight: 18 },
});
