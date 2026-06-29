import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { TabParamList, RootStackParamList } from '../navigation/types';
import { MOCK_LISTINGS } from '../data/mockListings';

const NAVY   = '#0c2340';
const GOLD   = '#c9912a';
const GOLD_L = '#fdf3e3';

type DashNav = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const STATS = [
  { icon: 'cube-outline',          value: '1,284',    label: 'Active listings',  color: NAVY },
  { icon: 'checkmark-done-outline', value: '$48.2M',  label: 'Volume settled',   color: GOLD },
  { icon: 'people-outline',        value: '312',       label: 'Verified agents',  color: NAVY },
  { icon: 'shield-checkmark-outline', value: '100%',  label: 'On-chain escrow',  color: GOLD },
];

const QUICK_ACTIONS = [
  { icon: 'add-circle-outline',  label: 'New Listing',  color: NAVY },
  { icon: 'search-outline',       label: 'Browse',       color: NAVY },
  { icon: 'trophy-outline',       label: 'Leaderboard',  color: NAVY },
  { icon: 'person-outline',       label: 'Profile',      color: NAVY },
];

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const nav    = useNavigation<DashNav>();

  const recent = MOCK_LISTINGS.slice(0, 3);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Top bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.greeting}>Good morning 👋</Text>
          <Text style={styles.greetingName}>Welcome back</Text>
        </View>
        <TouchableOpacity style={styles.notifBtn}>
          <Ionicons name="notifications-outline" size={20} color={NAVY} />
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Hero card */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View style={styles.heroIconRing}>
              <Ionicons name="business-outline" size={22} color={GOLD} />
            </View>
            <View style={styles.heroBadge}>
              <View style={styles.heroBadgeDot} />
              <Text style={styles.heroBadgeText}>Live · Blockchain</Text>
            </View>
          </View>
          <Text style={styles.heroTitle}>
            <Text style={{ color: GOLD }}>HYBRID</Text>AGENT
          </Text>
          <Text style={styles.heroSub}>Property · Vehicles · USDC</Text>
          <View style={styles.heroDivider} />
          <Text style={styles.heroTagline}>
            The secure marketplace where agent commissions are guaranteed on-chain.
          </Text>
          <TouchableOpacity style={styles.heroCta} onPress={() => nav.navigate('ListingsTab')}>
            <Text style={styles.heroCtaText}>Browse Listings</Text>
            <Ionicons name="arrow-forward" size={14} color={NAVY} style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </View>

        {/* Stats grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Market Stats</Text>
        </View>
        <View style={styles.statsGrid}>
          {STATS.map(s => (
            <View key={s.label} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: s.color + '12' }]}>
                <Ionicons name={s.icon as any} size={18} color={s.color} />
              </View>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Quick actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>
        <View style={styles.actionsRow}>
          {QUICK_ACTIONS.map(a => (
            <TouchableOpacity
              key={a.label}
              style={styles.actionBtn}
              activeOpacity={0.8}
              onPress={() => {
                if (a.label === 'New Listing') nav.navigate('CreateListing');
                if (a.label === 'Browse') nav.navigate('ListingsTab');
                if (a.label === 'Leaderboard') nav.navigate('Leaderboard');
                if (a.label === 'Profile') nav.navigate('Profile');
              }}
            >
              <View style={styles.actionIcon}>
                <Ionicons name={a.icon as any} size={20} color={NAVY} />
              </View>
              <Text style={styles.actionLabel}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent listings */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Listings</Text>
          <TouchableOpacity onPress={() => nav.navigate('ListingsTab')}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {recent.map(listing => (
          <View key={listing.id} style={styles.listingCard}>
            <View style={[styles.listingThumb, { backgroundColor: listing.asset_type === 'property' ? '#e8f0fe' : GOLD_L }]}>
              <Ionicons
                name={listing.asset_type === 'property' ? 'business-outline' : 'car-outline'}
                size={24}
                color={listing.asset_type === 'property' ? NAVY : GOLD}
              />
            </View>
            <View style={styles.listingInfo}>
              <Text style={styles.listingType}>{listing.asset_type.toUpperCase()}</Text>
              <Text style={styles.listingTitle} numberOfLines={1}>{listing.title}</Text>
              <View style={styles.listingMeta}>
                <Ionicons name="location-outline" size={11} color="#9ca3af" />
                <Text style={styles.listingLoc}>{listing.location}</Text>
              </View>
            </View>
            <View style={styles.listingRight}>
              <Text style={styles.listingPrice}>${listing.price_usdc}</Text>
              <Text style={styles.listingUsdc}>USDC</Text>
            </View>
          </View>
        ))}

        {/* On-chain banner */}
        <View style={styles.chainBanner}>
          <Ionicons name="lock-closed-outline" size={20} color={GOLD} />
          <View style={{ flex: 1 }}>
            <Text style={styles.chainTitle}>Escrow-protected deals</Text>
            <Text style={styles.chainDesc}>Every transaction settles atomically — seller, agent, and platform are paid in a single on-chain step.</Text>
          </View>
        </View>

        <View style={{ height: insets.bottom + 16 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:    { flex: 1, backgroundColor: '#f9fafb' },
  scroll:  { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 8 },

  topBar:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  greeting:    { fontSize: 12, color: '#9ca3af', fontWeight: '500' },
  greetingName: { fontSize: 18, fontWeight: '800', color: NAVY },
  notifBtn:    { width: 40, height: 40, borderRadius: 12, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' },
  notifDot:    { position: 'absolute', top: 9, right: 9, width: 7, height: 7, borderRadius: 4, backgroundColor: '#ef4444', borderWidth: 1.5, borderColor: '#f3f4f6' },

  // Hero card
  heroCard:    { backgroundColor: NAVY, borderRadius: 24, padding: 22, marginTop: 16, marginBottom: 20 },
  heroTop:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  heroIconRing: { width: 44, height: 44, borderRadius: 22, borderWidth: 1.5, borderColor: GOLD + '55', alignItems: 'center', justifyContent: 'center' },
  heroBadge:   { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#ffffff12', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 },
  heroBadgeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#4ade80' },
  heroBadgeText: { fontSize: 11, color: '#fff', fontWeight: '600' },
  heroTitle:   { fontSize: 38, fontWeight: '900', color: '#fff', letterSpacing: -1, marginBottom: 4 },
  heroSub:     { fontSize: 11, color: '#94a3b8', letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 14 },
  heroDivider: { width: 36, height: 2, backgroundColor: GOLD, borderRadius: 1, marginBottom: 14 },
  heroTagline: { fontSize: 13, color: '#94a3b8', lineHeight: 20, marginBottom: 18 },
  heroCta:     { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: GOLD, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10 },
  heroCtaText: { fontSize: 13, fontWeight: '700', color: NAVY },

  // Section headers
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle:  { fontSize: 16, fontWeight: '800', color: NAVY },
  seeAll:        { fontSize: 13, color: GOLD, fontWeight: '600' },

  // Stats
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  statCard:  { width: '47.5%', backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#e5e7eb', padding: 14, gap: 6 },
  statIcon:  { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  statValue: { fontSize: 20, fontWeight: '900', color: NAVY },
  statLabel: { fontSize: 11, color: '#9ca3af', lineHeight: 15 },

  // Actions
  actionsRow:  { flexDirection: 'row', gap: 10, marginBottom: 24 },
  actionBtn:   { flex: 1, alignItems: 'center', gap: 7 },
  actionIcon:  { width: 52, height: 52, borderRadius: 16, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e7eb', alignItems: 'center', justifyContent: 'center' },
  actionLabel: { fontSize: 11, fontWeight: '600', color: '#374151', textAlign: 'center' },

  // Listing rows
  listingCard:  { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#e5e7eb', padding: 12, marginBottom: 10 },
  listingThumb: { width: 52, height: 52, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  listingInfo:  { flex: 1, gap: 2 },
  listingType:  { fontSize: 10, fontWeight: '700', color: GOLD, letterSpacing: 0.8 },
  listingTitle: { fontSize: 14, fontWeight: '700', color: '#111827' },
  listingMeta:  { flexDirection: 'row', alignItems: 'center', gap: 3 },
  listingLoc:   { fontSize: 11, color: '#9ca3af' },
  listingRight: { alignItems: 'flex-end' },
  listingPrice: { fontSize: 14, fontWeight: '900', color: NAVY },
  listingUsdc:  { fontSize: 10, color: '#9ca3af', fontWeight: '600' },

  // Chain banner
  chainBanner: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, backgroundColor: NAVY, borderRadius: 16, padding: 16, marginTop: 8, marginBottom: 8 },
  chainTitle:  { fontSize: 14, fontWeight: '700', color: '#fff', marginBottom: 4 },
  chainDesc:   { fontSize: 12, color: '#94a3b8', lineHeight: 18 },
});
