import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, Pressable, ScrollView, StyleSheet,
  StatusBar, TextInput, Animated, Platform, KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const NAVY   = '#0c2340';
const GOLD   = '#c9912a';
const GREEN  = '#22c55e';
const RED    = '#ef4444';

// ── Mock wallet state (replace with real wallet data after integration) ──────
const MOCK_ADDRESS  = '0x742d35Cc6634C0532925a3b8Bc454e4438f44e';
const MOCK_USDC     = '1 250.00';
const MOCK_ETH      = '0.0124';
const MOCK_ETH_USD  = '~$46.20';

const MOCK_TXS = [
  { id: '1', type: 'in',  label: 'Sale proceeds',       amount: '+850.00', token: 'USDC', date: 'Jun 26', hash: '0xabc1' },
  { id: '2', type: 'out', label: 'Commission to agent', amount: '-85.00',  token: 'USDC', date: 'Jun 26', hash: '0xabc2' },
  { id: '3', type: 'in',  label: 'Escrow refund',       amount: '+120.00', token: 'USDC', date: 'Jun 23', hash: '0xabc3' },
  { id: '4', type: 'out', label: 'Sent to buyer',       amount: '-500.00', token: 'USDC', date: 'Jun 20', hash: '0xabc4' },
  { id: '5', type: 'gas', label: 'Gas fee',             amount: '-0.0008', token: 'ETH',  date: 'Jun 20', hash: '0xabc5' },
];

type Panel = 'none' | 'receive' | 'send';

export default function WalletScreen() {
  const insets = useSafeAreaInsets();
  const nav    = useNavigation();

  const [panel, setPanel]       = useState<Panel>('none');
  const [copied, setCopied]     = useState(false);
  const [sendTo, setSendTo]     = useState('');
  const [sendAmt, setSendAmt]   = useState('');
  const [sending, setSending]   = useState(false);
  const [sendDone, setSendDone] = useState(false);
  const [sendErr, setSendErr]   = useState('');

  const panelAnim   = useRef(new Animated.Value(0)).current;
  const sendToRef   = useRef<TextInput>(null);
  const sendAmtRef  = useRef<TextInput>(null);

  const openPanel = (p: Panel) => {
    setPanel(p);
    setSendDone(false);
    setSendErr('');
    Animated.spring(panelAnim, { toValue: 1, useNativeDriver: true, tension: 80, friction: 10 }).start();
  };
  const closePanel = () => {
    Animated.timing(panelAnim, { toValue: 0, duration: 180, useNativeDriver: true }).start(() => setPanel('none'));
  };

  const togglePanel = (p: Panel) => {
    if (panel === p) { closePanel(); return; }
    if (panel !== 'none') { setPanel(p); return; }
    openPanel(p);
  };

  const copyAddress = async () => {
    await Clipboard.setStringAsync(MOCK_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
    setSendErr('');
    if (!sendTo.startsWith('0x') || sendTo.length < 20) { setSendErr('Enter a valid wallet address.'); return; }
    const amt = Number(sendAmt);
    if (!sendAmt || isNaN(amt) || amt <= 0) { setSendErr('Enter a valid amount.'); return; }
    setSending(true);
    // TODO: sign + broadcast on-chain transfer
    setTimeout(() => {
      setSending(false);
      setSendDone(true);
    }, 1800);
  };

  const fmt = (addr: string) => `${addr.slice(0, 6)}···${addr.slice(-4)}`;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />

      {/* ── Top nav ── */}
      <View style={styles.topNav}>
        <TouchableOpacity style={styles.backBtn} onPress={() => nav.goBack()}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Wallet</Text>
        <TouchableOpacity style={styles.backBtn}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

          {/* ── Balance card ── */}
          <View style={styles.balanceCard}>
            {/* Low gas warning */}
            {parseFloat(MOCK_ETH) < 0.015 && (
              <View style={styles.gasWarning}>
                <Ionicons name="warning-outline" size={13} color="#fbbf24" />
                <Text style={styles.gasWarningText}>Low ETH for gas — top up to transact</Text>
              </View>
            )}

            <Text style={styles.balanceLabel}>USDC Balance</Text>
            <Text style={styles.balanceAmount}>{MOCK_USDC}</Text>
            <Text style={styles.balanceUnit}>USDC</Text>

            <View style={styles.ethRow}>
              <Ionicons name={"logo-ethereum" as any} size={14} color="#94a3b8" />
              <Text style={styles.ethBal}>{MOCK_ETH} ETH</Text>
              <Text style={styles.ethUsd}>{MOCK_ETH_USD}</Text>
            </View>

            {/* Address strip */}
            <View style={styles.addressStrip}>
              <View style={styles.addressPill}>
                <Ionicons name="wallet-outline" size={13} color={GOLD} />
                <Text style={styles.addressText}>{fmt(MOCK_ADDRESS)}</Text>
              </View>
              <TouchableOpacity style={styles.copyBtn} onPress={copyAddress}>
                <Ionicons name={copied ? 'checkmark' : 'copy-outline'} size={14} color={copied ? GREEN : '#94a3b8'} />
                <Text style={[styles.copyText, copied && { color: GREEN }]}>{copied ? 'Copied!' : 'Copy'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ── Action buttons ── */}
          <View style={styles.actions}>
            <ActionBtn
              icon="arrow-down-outline"
              label="Receive"
              active={panel === 'receive'}
              onPress={() => togglePanel('receive')}
            />
            <ActionBtn
              icon="arrow-up-outline"
              label="Send"
              active={panel === 'send'}
              onPress={() => togglePanel('send')}
            />
            <ActionBtn
              icon="card-outline"
              label="Buy USDC"
              onPress={() => {}}
              badge="Soon"
            />
            <ActionBtn
              icon="time-outline"
              label="History"
              onPress={() => {}}
            />
          </View>

          {/* ── Panels ── */}
          {panel !== 'none' && (
            <Animated.View style={[styles.panel, { opacity: panelAnim, transform: [{ translateY: panelAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }]}>

              {/* Close strip */}
              <View style={styles.panelHeader}>
                <Text style={styles.panelTitle}>{panel === 'receive' ? 'Receive USDC' : 'Send USDC'}</Text>
                <TouchableOpacity onPress={closePanel}>
                  <Ionicons name="close-circle-outline" size={22} color="#9ca3af" />
                </TouchableOpacity>
              </View>

              {/* ── Receive panel ── */}
              {panel === 'receive' && (
                <View style={styles.receiveContent}>
                  {/* QR placeholder */}
                  <View style={styles.qrBox}>
                    <QRPlaceholder />
                    <Text style={styles.qrLabel}>Scan to send USDC to this wallet</Text>
                  </View>

                  {/* Full address */}
                  <Text style={styles.receiveAddrLabel}>Your wallet address</Text>
                  <View style={styles.receiveAddrBox}>
                    <Text style={styles.receiveAddr} selectable>{MOCK_ADDRESS}</Text>
                  </View>
                  <TouchableOpacity style={styles.copyFullBtn} onPress={copyAddress}>
                    <Ionicons name={copied ? 'checkmark-circle' : 'copy-outline'} size={17} color={copied ? GREEN : NAVY} />
                    <Text style={[styles.copyFullText, copied && { color: GREEN }]}>
                      {copied ? 'Address copied!' : 'Copy address'}
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.receiveNote}>
                    <Ionicons name="information-circle-outline" size={14} color={GOLD} />
                    <Text style={styles.receiveNoteText}>Only send USDC (Base / Ethereum) to this address.</Text>
                  </View>
                </View>
              )}

              {/* ── Send panel ── */}
              {panel === 'send' && (
                <View>
                  {sendDone ? (
                    <View style={styles.sendSuccess}>
                      <Ionicons name="checkmark-circle" size={52} color={GREEN} />
                      <Text style={styles.sendSuccessTitle}>Sent!</Text>
                      <Text style={styles.sendSuccessDesc}>Your transaction has been broadcast to the network.</Text>
                      <TouchableOpacity style={styles.btnPrimary} onPress={() => { setSendDone(false); setSendTo(''); setSendAmt(''); closePanel(); }}>
                        <Text style={styles.btnText}>Done</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <>
                      <View style={styles.sendField}>
                        <Text style={styles.sendLabel}>Recipient address</Text>
                        <Pressable style={styles.sendInputWrap} onPress={() => sendToRef.current?.focus()}>
                          <Ionicons name="wallet-outline" size={16} color={GOLD} style={{ marginRight: 8 }} />
                          <TextInput
                            ref={sendToRef}
                            style={[styles.sendInput, { flex: 1 }]}
                            placeholder="0x…"
                            placeholderTextColor="#9ca3af"
                            value={sendTo}
                            onChangeText={setSendTo}
                            autoCapitalize="none"
                            autoCorrect={false}
                          />
                        </Pressable>
                      </View>

                      <View style={styles.sendField}>
                        <Text style={styles.sendLabel}>Amount (USDC)</Text>
                        <Pressable style={styles.sendInputWrap} onPress={() => sendAmtRef.current?.focus()}>
                          <Text style={styles.usdcPrefix}>$</Text>
                          <TextInput
                            ref={sendAmtRef}
                            style={[styles.sendInput, { flex: 1, fontSize: 20, fontWeight: '800', color: NAVY }]}
                            placeholder="0.00"
                            placeholderTextColor="#d1d5db"
                            keyboardType="numeric"
                            value={sendAmt}
                            onChangeText={setSendAmt}
                          />
                          <Text style={styles.usdcSuffix}>USDC</Text>
                        </Pressable>
                        <Text style={styles.sendAvail}>Available: {MOCK_USDC} USDC</Text>
                      </View>

                      {/* Fee estimate */}
                      <View style={styles.feeRow}>
                        <Ionicons name={"logo-ethereum" as any} size={13} color="#9ca3af" />
                        <Text style={styles.feeText}>Estimated gas ~0.0004 ETH</Text>
                        <Text style={styles.feeUsd}>~$1.50</Text>
                      </View>

                      {sendErr ? (
                        <View style={styles.errBox}>
                          <Ionicons name="alert-circle-outline" size={14} color={RED} />
                          <Text style={styles.errText}>{sendErr}</Text>
                        </View>
                      ) : null}

                      <TouchableOpacity style={styles.btnPrimary} onPress={handleSend} disabled={sending} activeOpacity={0.85}>
                        {sending
                          ? <ActivityIndicator color="#fff" />
                          : <>
                              <Ionicons name="paper-plane-outline" size={16} color="#fff" style={{ marginRight: 7 }} />
                              <Text style={styles.btnText}>Send USDC</Text>
                            </>}
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              )}
            </Animated.View>
          )}

          {/* ── Transaction history ── */}
          <View style={styles.txSection}>
            <Text style={styles.txTitle}>Recent Transactions</Text>

            {MOCK_TXS.map((tx, i) => (
              <View key={tx.id} style={[styles.txRow, i < MOCK_TXS.length - 1 && styles.txRowBorder]}>
                <View style={[styles.txIcon, tx.type === 'in' && styles.txIconIn, tx.type === 'gas' && styles.txIconGas]}>
                  <Ionicons
                    name={tx.type === 'in' ? 'arrow-down' : tx.type === 'gas' ? 'flame-outline' : 'arrow-up'}
                    size={15}
                    color={tx.type === 'in' ? GREEN : tx.type === 'gas' ? GOLD : RED}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.txLabel}>{tx.label}</Text>
                  <Text style={styles.txHash}>{tx.date} · {tx.hash.slice(0, 8)}…</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={[styles.txAmount, { color: tx.type === 'in' ? GREEN : tx.type === 'gas' ? GOLD : RED }]}>
                    {tx.amount}
                  </Text>
                  <Text style={styles.txToken}>{tx.token}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* ── Security note ── */}
          <View style={styles.securityNote}>
            <Ionicons name="lock-closed-outline" size={15} color={GOLD} />
            <Text style={styles.securityText}>
              Your private key is AES-256-GCM encrypted and never leaves this device. HybridAgent cannot access your funds.
            </Text>
          </View>

          <View style={{ height: insets.bottom + 24 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// ── QR placeholder grid (no external library needed) ─────────────────────────
function QRPlaceholder() {
  const cell = (filled: boolean) => (
    <View style={[qrStyles.cell, filled && qrStyles.cellFilled]} />
  );
  // Simplified 7×7 finder pattern representation
  const rows = [
    [1,1,1,1,1,1,1, 0, 1,0,1,0,1, 0, 1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1, 0, 0,1,0,1,0, 0, 1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1, 0, 1,0,1,0,1, 0, 1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1, 0, 0,1,0,1,0, 0, 1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1, 0, 1,0,1,0,1, 0, 1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1, 0, 0,0,0,1,0, 0, 1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1, 0, 1,0,1,0,1, 0, 1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0, 0, 0,1,0,1,0, 0, 0,0,0,0,0,0,0],
    [1,0,1,1,0,0,1, 1, 0,0,1,0,1, 0, 1,1,0,1,0,0,1],
    [0,1,0,1,1,0,0, 1, 1,0,0,1,0, 1, 0,1,1,0,1,0,0],
    [1,1,0,0,1,1,1, 0, 0,1,1,0,1, 0, 1,0,0,1,1,0,1],
    [0,0,1,1,0,1,0, 1, 1,0,0,1,0, 1, 0,0,1,0,0,1,0],
    [1,0,0,1,1,0,1, 0, 1,1,0,0,1, 0, 1,0,1,1,0,0,1],
    [0,0,0,0,0,0,0, 1, 0,0,1,0,0, 0, 0,1,0,0,1,1,0],
    [1,1,1,1,1,1,1, 0, 1,0,0,1,0, 1, 1,0,0,1,0,1,1],
    [1,0,0,0,0,0,1, 1, 0,1,1,0,1, 0, 0,1,1,0,1,0,0],
    [1,0,1,1,1,0,1, 0, 1,0,0,1,0, 1, 1,0,0,1,1,0,1],
    [1,0,1,1,1,0,1, 1, 0,1,1,0,1, 0, 0,1,0,0,0,1,0],
    [1,0,1,1,1,0,1, 0, 1,0,0,1,0, 1, 1,0,1,1,0,0,1],
    [1,0,0,0,0,0,1, 1, 0,1,0,0,1, 0, 0,0,0,1,1,0,0],
    [1,1,1,1,1,1,1, 0, 1,0,1,1,0, 1, 1,1,0,0,0,1,1],
  ];
  return (
    <View style={qrStyles.grid}>
      {rows.map((row, ri) => (
        <View key={ri} style={qrStyles.row}>
          {row.map((v, ci) => cell(v === 1))}
        </View>
      ))}
    </View>
  );
}
const qrStyles = StyleSheet.create({
  grid: { padding: 12, backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb' },
  row:  { flexDirection: 'row' },
  cell: { width: 10, height: 10, backgroundColor: 'transparent' },
  cellFilled: { backgroundColor: NAVY },
});

// ── Small action button ───────────────────────────────────────────────────────
function ActionBtn({ icon, label, onPress, active, badge }: { icon: string; label: string; onPress: () => void; active?: boolean; badge?: string }) {
  return (
    <TouchableOpacity style={styles.actionBtn} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.actionIcon, active && styles.actionIconActive]}>
        <Ionicons name={icon as any} size={21} color={active ? '#fff' : NAVY} />
        {badge && (
          <View style={styles.actionBadge}>
            <Text style={styles.actionBadgeText}>{badge}</Text>
          </View>
        )}
      </View>
      <Text style={[styles.actionLabel, active && { color: NAVY, fontWeight: '700' }]}>{label}</Text>
    </TouchableOpacity>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root:   { flex: 1, backgroundColor: NAVY },

  topNav:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  backBtn:    { width: 38, height: 38, borderRadius: 12, backgroundColor: '#ffffff15', alignItems: 'center', justifyContent: 'center' },
  topTitle:   { fontSize: 17, fontWeight: '800', color: '#fff' },

  scroll:     { paddingBottom: 20 },

  // Balance card (stays navy — it IS the card)
  balanceCard: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 28, alignItems: 'center' },
  gasWarning:  { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#fbbf2420', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5, marginBottom: 16 },
  gasWarningText: { fontSize: 12, color: '#fbbf24', fontWeight: '500' },
  balanceLabel: { fontSize: 12, color: '#94a3b8', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 },
  balanceAmount: { fontSize: 52, fontWeight: '900', color: GOLD, letterSpacing: -1, lineHeight: 60 },
  balanceUnit:   { fontSize: 16, color: '#94a3b8', fontWeight: '600', marginBottom: 12 },
  ethRow:        { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 20 },
  ethBal:        { fontSize: 13, color: '#94a3b8', fontWeight: '600' },
  ethUsd:        { fontSize: 13, color: '#64748b' },
  addressStrip:  { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#ffffff10', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10, width: '100%' },
  addressPill:   { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 7 },
  addressText:   { fontSize: 14, color: '#cbd5e1', fontFamily: 'monospace' },
  copyBtn:       { flexDirection: 'row', alignItems: 'center', gap: 4 },
  copyText:      { fontSize: 12, color: '#94a3b8', fontWeight: '600' },

  // Actions
  actions:    { flexDirection: 'row', backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingTop: 20, paddingBottom: 16, paddingHorizontal: 20, gap: 8 },
  actionBtn:  { flex: 1, alignItems: 'center', gap: 7 },
  actionIcon: { width: 52, height: 52, borderRadius: 16, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' },
  actionIconActive: { backgroundColor: NAVY },
  actionBadge: { position: 'absolute', top: -4, right: -4, backgroundColor: GOLD, borderRadius: 8, paddingHorizontal: 5, paddingVertical: 1 },
  actionBadgeText: { fontSize: 8, fontWeight: '800', color: '#fff' },
  actionLabel: { fontSize: 11, color: '#6b7280', fontWeight: '500', textAlign: 'center' },

  // Panel
  panel:       { marginHorizontal: 16, marginTop: 4, backgroundColor: '#fff', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 12 },
  panelHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  panelTitle:  { fontSize: 16, fontWeight: '800', color: NAVY },

  // Receive
  receiveContent:  { alignItems: 'center' },
  qrBox:           { alignItems: 'center', marginBottom: 16, gap: 8 },
  qrLabel:         { fontSize: 12, color: '#9ca3af', textAlign: 'center' },
  receiveAddrLabel: { alignSelf: 'flex-start', fontSize: 12, fontWeight: '600', color: '#374151', marginBottom: 6 },
  receiveAddrBox:  { width: '100%', backgroundColor: '#f9fafb', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 12 },
  receiveAddr:     { fontSize: 13, color: '#374151', fontFamily: 'monospace', lineHeight: 20 },
  copyFullBtn:     { flexDirection: 'row', alignItems: 'center', gap: 7, paddingVertical: 10 },
  copyFullText:    { fontSize: 14, fontWeight: '600', color: NAVY },
  receiveNote:     { flexDirection: 'row', alignItems: 'flex-start', gap: 7, backgroundColor: GOLD + '10', borderRadius: 10, padding: 10, marginTop: 4, width: '100%' },
  receiveNoteText: { fontSize: 12, color: '#92400e', flex: 1, lineHeight: 18 },

  // Send
  sendField:    { marginBottom: 14 },
  sendLabel:    { fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 },
  sendInputWrap: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: '#e5e7eb', borderRadius: 12, backgroundColor: '#f9fafb', paddingHorizontal: 12 },
  sendInput:    { paddingVertical: 12, fontSize: 15, color: '#111827' },
  usdcPrefix:   { fontSize: 18, fontWeight: '800', color: '#9ca3af', marginRight: 4 },
  usdcSuffix:   { fontSize: 13, fontWeight: '600', color: '#9ca3af', marginLeft: 4 },
  sendAvail:    { fontSize: 11, color: '#9ca3af', marginTop: 4, marginLeft: 2 },
  feeRow:       { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#f9fafb', borderRadius: 10, padding: 10, marginBottom: 14 },
  feeText:      { fontSize: 12, color: '#9ca3af', flex: 1 },
  feeUsd:       { fontSize: 12, color: '#9ca3af' },
  errBox:       { flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: '#fef2f2', borderWidth: 1, borderColor: '#fecaca', borderRadius: 10, padding: 10, marginBottom: 12 },
  errText:      { fontSize: 13, color: RED, flex: 1 },
  sendSuccess:  { alignItems: 'center', gap: 10, paddingVertical: 8 },
  sendSuccessTitle: { fontSize: 22, fontWeight: '900', color: NAVY },
  sendSuccessDesc:  { fontSize: 14, color: '#6b7280', textAlign: 'center', lineHeight: 20 },

  btnPrimary:  { backgroundColor: NAVY, borderRadius: 14, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  btnText:     { color: '#fff', fontWeight: '700', fontSize: 15 },

  // Transactions
  txSection:   { marginHorizontal: 16, marginTop: 8, backgroundColor: '#fff', borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#e5e7eb' },
  txTitle:     { fontSize: 15, fontWeight: '800', color: NAVY, marginBottom: 12 },
  txRow:       { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  txRowBorder: { borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  txIcon:      { width: 36, height: 36, borderRadius: 10, backgroundColor: '#fef2f2', alignItems: 'center', justifyContent: 'center' },
  txIconIn:    { backgroundColor: '#f0fdf4' },
  txIconGas:   { backgroundColor: GOLD + '15' },
  txLabel:     { fontSize: 14, fontWeight: '600', color: '#111827', marginBottom: 2 },
  txHash:      { fontSize: 11, color: '#9ca3af', fontFamily: 'monospace' },
  txAmount:    { fontSize: 14, fontWeight: '800' },
  txToken:     { fontSize: 10, color: '#9ca3af', textAlign: 'right' },

  // Security
  securityNote: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginHorizontal: 16, marginTop: 12, backgroundColor: '#fff', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: '#e5e7eb' },
  securityText: { flex: 1, fontSize: 12, color: '#6b7280', lineHeight: 18 },
});
