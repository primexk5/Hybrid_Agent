import React, { useState, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet, StatusBar,
  ActivityIndicator, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { api, type WalletData } from '../lib/api';
import { storage } from '../lib/storage';

const NAVY  = '#0c2340';
const GOLD  = '#c9912a';
const GREEN = '#22c55e';

type Notif = {
  id: string;
  type: 'purchase_request' | 'deal_approved' | 'deal_funded';
  title: string;
  body: string;
  listingId?: string;
  time: string;
  read: boolean;
};

function shortAddr(a: string) {
  return `${a.slice(0, 6)}···${a.slice(-4)}`;
}
function fmtUsdc(n: string | number) {
  return Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const nav    = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [wallet,  setWallet]  = useState<WalletData | null>(null);
  const [notifs,  setNotifs]  = useState<Notif[]>([]);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<string>('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [walletData, user] = await Promise.all([
        api.wallet().catch(() => null),
        storage.getUser(),
      ]);
      if (walletData) setWallet(walletData);
      if (user?.user_type) setUserType(user.user_type);

      // Pull incoming purchase requests as notifications (agents only)
      if (user?.user_type === 'agent') {
        const reqs = await api.incomingRequests().catch(() => []);
        const built: Notif[] = reqs.map((r: any) => ({
          id: r.id,
          type: r.status === 'funded' ? 'deal_funded'
              : r.deal_id            ? 'deal_approved'
              : 'purchase_request',
          title: r.status === 'funded'  ? 'Escrow funded!'
               : r.deal_id             ? 'Deal created'
               : 'New purchase request',
          body: r.status === 'funded'
              ? `${r.buyer_name ?? 'A buyer'} funded escrow for "${r.listing_title ?? 'your listing'}".`
              : r.deal_id
              ? `Deal #${r.deal_id} created for "${r.listing_title ?? 'your listing'}".`
              : `${r.buyer_name ?? 'A buyer'} wants to buy "${r.listing_title ?? 'your listing'}".`,
          listingId: String(r.listing_id),
          time: r.updated_at ? new Date(r.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '',
          read: r.status !== 'requested',
        }));
        setNotifs(built);
      }
    } catch (_) {}
    setLoading(false);
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const unread = notifs.filter(n => !n.read).length;

  const iconForType = (t: Notif['type']) => {
    if (t === 'deal_funded')   return { name: 'checkmark-circle',  color: GREEN };
    if (t === 'deal_approved') return { name: 'lock-closed',        color: GOLD };
    return                            { name: 'cart-outline',        color: NAVY };
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Notifications</Text>
          {unread > 0 && (
            <Text style={styles.headerSub}>{unread} unread</Text>
          )}
        </View>
        <TouchableOpacity style={styles.walletBtn} onPress={() => nav.navigate('Wallet')} activeOpacity={0.8}>
          <Ionicons name="wallet-outline" size={16} color={GOLD} style={{ marginRight: 5 }} />
          <Text style={styles.walletBtnText}>Full Wallet</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={GOLD} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 24 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* ── WALLET CARD ───────────────────────────────────────────── */}
          <View style={styles.walletCard}>
            <View style={styles.walletCardInner}>
              {/* Address row */}
              <View style={styles.addrRow}>
                <View style={styles.addrDot} />
                <Text style={styles.addrText}>
                  {wallet?.address ? shortAddr(wallet.address) : 'No wallet'}
                </Text>
                <View style={styles.networkBadge}>
                  <Text style={styles.networkText}>Sepolia</Text>
                </View>
              </View>

              {/* Big USDC balance */}
              <Text style={styles.balanceLabel}>USDC Balance</Text>
              <Text style={styles.balanceValue}>
                ${fmtUsdc(wallet?.balanceUsdc ?? '0')}
              </Text>
              <Text style={styles.balanceCurrency}>USDC · on-chain</Text>

              {/* ETH row */}
              <View style={styles.ethRow}>
                <Ionicons name={"logo-ethereum" as any} size={13} color="#94a3b8" />
                <Text style={styles.ethText}>
                  {Number(wallet?.balanceBase ?? 0).toFixed(4)} ETH gas balance
                </Text>
              </View>
            </View>

            {/* Stats strip */}
            <View style={styles.statsStrip}>
              <StatPill
                icon="briefcase-outline"
                label="Commissions"
                value={`$${fmtUsdc(wallet?.breakdown?.commissionUsdc ?? '0')}`}
              />
              <View style={styles.statsDivider} />
              <StatPill
                icon="home-outline"
                label="Proceeds"
                value={`$${fmtUsdc(wallet?.breakdown?.proceedsUsdc ?? '0')}`}
              />
              <View style={styles.statsDivider} />
              <StatPill
                icon="checkmark-done-outline"
                label="Deals"
                value={String(wallet?.completedDeals ?? 0)}
              />
            </View>
          </View>

          {/* ── NOTIFICATIONS ─────────────────────────────────────────── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Activity</Text>

            {notifs.length === 0 ? (
              <View style={styles.emptyCard}>
                <Ionicons name="notifications-off-outline" size={36} color="#d1d5db" />
                <Text style={styles.emptyTitle}>All caught up</Text>
                <Text style={styles.emptySub}>
                  {userType === 'agent'
                    ? 'Purchase requests from buyers will appear here.'
                    : 'Activity on your listings will appear here.'}
                </Text>
              </View>
            ) : (
              <View style={styles.notifList}>
                {notifs.map((n, i) => {
                  const ico = iconForType(n.type);
                  return (
                    <TouchableOpacity
                      key={n.id}
                      style={[
                        styles.notifRow,
                        i < notifs.length - 1 && styles.notifRowBorder,
                        !n.read && styles.notifRowUnread,
                      ]}
                      activeOpacity={0.75}
                      onPress={() => {
                        if (n.listingId) nav.navigate('Main');
                      }}
                    >
                      <View style={[styles.notifIcon, { backgroundColor: ico.color + '18' }]}>
                        <Ionicons name={ico.name as any} size={18} color={ico.color} />
                      </View>
                      <View style={{ flex: 1, gap: 2 }}>
                        <View style={styles.notifTitleRow}>
                          <Text style={styles.notifTitle}>{n.title}</Text>
                          {!n.read && <View style={styles.unreadDot} />}
                        </View>
                        <Text style={styles.notifBody} numberOfLines={2}>{n.body}</Text>
                        {n.time ? <Text style={styles.notifTime}>{n.time}</Text> : null}
                      </View>
                      <Ionicons name="chevron-forward" size={15} color="#d1d5db" />
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>

          {/* ── QUICK ACTIONS ─────────────────────────────────────────── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick actions</Text>
            <View style={styles.quickRow}>
              <QuickAction
                icon="add-circle-outline"
                label="New listing"
                onPress={() => nav.navigate('CreateListing')}
              />
              <QuickAction
                icon="wallet-outline"
                label="Wallet"
                onPress={() => nav.navigate('Wallet')}
              />
              <QuickAction
                icon="shield-checkmark-outline"
                label="KYC"
                onPress={() => nav.navigate('KYC')}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────

function StatPill({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.statPill}>
      <Ionicons name={icon as any} size={14} color={GOLD} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function QuickAction({ icon, label, onPress }: { icon: string; label: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.quickAction} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.quickIcon}>
        <Ionicons name={icon as any} size={20} color={NAVY} />
      </View>
      <Text style={styles.quickLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

// ── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root:   { flex: 1, backgroundColor: NAVY },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  // Header
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 16,
    backgroundColor: NAVY,
  },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#fff' },
  headerSub:   { fontSize: 12, color: GOLD, marginTop: 2, fontWeight: '600' },
  walletBtn:   {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#ffffff14', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 7,
    borderWidth: 1, borderColor: '#ffffff18',
  },
  walletBtnText: { fontSize: 12, color: GOLD, fontWeight: '700' },

  scroll: { paddingHorizontal: 16 },

  // Wallet card
  walletCard: {
    backgroundColor: '#0d2d52',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ffffff12',
    marginBottom: 24,
    overflow: 'hidden',
  },
  walletCardInner: { padding: 20, paddingBottom: 16 },
  addrRow:    { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 18 },
  addrDot:    { width: 7, height: 7, borderRadius: 4, backgroundColor: GREEN },
  addrText:   { fontSize: 13, color: '#94a3b8', fontFamily: 'monospace', flex: 1 },
  networkBadge: { backgroundColor: '#ffffff12', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
  networkText:  { fontSize: 10, color: '#64748b', fontWeight: '700' },

  balanceLabel:   { fontSize: 11, color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.8 },
  balanceValue:   { fontSize: 38, fontWeight: '900', color: '#fff', marginTop: 4, letterSpacing: -1 },
  balanceCurrency:{ fontSize: 13, color: '#64748b', marginTop: 2, marginBottom: 14 },

  ethRow:  { flexDirection: 'row', alignItems: 'center', gap: 5 },
  ethText: { fontSize: 12, color: '#64748b' },

  statsStrip:   { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#ffffff10', backgroundColor: '#0c2340' },
  statsDivider: { width: 1, backgroundColor: '#ffffff10', marginVertical: 12 },
  statPill:     { flex: 1, alignItems: 'center', paddingVertical: 14, gap: 4 },
  statValue:    { fontSize: 15, fontWeight: '800', color: '#fff' },
  statLabel:    { fontSize: 10, color: '#64748b', fontWeight: '600' },

  // Notifications
  section:      { marginBottom: 20 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 },

  emptyCard: {
    backgroundColor: '#0d2d52', borderRadius: 16, borderWidth: 1, borderColor: '#ffffff10',
    alignItems: 'center', padding: 32, gap: 8,
  },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: '#fff', marginTop: 4 },
  emptySub:   { fontSize: 13, color: '#64748b', textAlign: 'center', lineHeight: 19 },

  notifList: { backgroundColor: '#0d2d52', borderRadius: 16, borderWidth: 1, borderColor: '#ffffff10', overflow: 'hidden' },
  notifRow:        { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  notifRowBorder:  { borderBottomWidth: 1, borderBottomColor: '#ffffff08' },
  notifRowUnread:  { backgroundColor: '#ffffff05' },
  notifIcon:       { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  notifTitleRow:   { flexDirection: 'row', alignItems: 'center', gap: 7 },
  notifTitle:      { fontSize: 14, fontWeight: '700', color: '#fff' },
  unreadDot:       { width: 7, height: 7, borderRadius: 4, backgroundColor: GOLD },
  notifBody:       { fontSize: 12, color: '#94a3b8', lineHeight: 17 },
  notifTime:       { fontSize: 11, color: '#475569' },

  // Quick actions
  quickRow:    { flexDirection: 'row', gap: 10 },
  quickAction: { flex: 1, alignItems: 'center', gap: 8, backgroundColor: '#0d2d52', borderRadius: 14, borderWidth: 1, borderColor: '#ffffff10', paddingVertical: 16 },
  quickIcon:   { width: 40, height: 40, borderRadius: 12, backgroundColor: GOLD + '22', alignItems: 'center', justifyContent: 'center' },
  quickLabel:  { fontSize: 11, fontWeight: '700', color: '#94a3b8' },
});
