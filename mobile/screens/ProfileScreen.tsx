import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

const NAVY = '#0c2340';
const GOLD = '#c9912a';

const MENU_SECTIONS = [
  {
    title: 'Account',
    items: [
      { icon: 'person-outline',      label: 'Personal Details',   sub: 'Name, email, phone',          route: null },
      { icon: 'shield-outline',       label: 'KYC Verification',  sub: 'Identity not verified', accent: true, route: 'KYC' },
      { icon: 'wallet-outline',       label: 'Wallet',            sub: 'View balance & transactions',  route: 'Wallet' },
    ],
  },
  {
    title: 'Activity',
    items: [
      { icon: 'list-outline',         label: 'My Listings',       sub: '0 active' },
      { icon: 'briefcase-outline',    label: 'My Deals',          sub: '0 completed' },
      { icon: 'star-outline',         label: 'Reviews',           sub: '0 reviews' },
    ],
  },
  {
    title: 'Settings',
    items: [
      { icon: 'notifications-outline', label: 'Notifications',   sub: 'Push alerts on' },
      { icon: 'moon-outline',          label: 'Appearance',      sub: 'Light mode' },
      { icon: 'help-circle-outline',   label: 'Help & Support',  sub: 'FAQ · Contact' },
    ],
  },
  {
    title: 'Demo',
    items: [
      { icon: 'cash-outline', label: 'Owner Payout Access', sub: 'Demo: off-platform owner withdrawal', route: 'OwnerWithdraw', accent: true },
    ],
  },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogout = () => {
    nav.reset({ index: 0, routes: [{ name: 'Cover' }] });
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsBtn}>
          <Ionicons name="settings-outline" size={20} color={NAVY} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Profile card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>U</Text>
            </View>
            <TouchableOpacity style={styles.editAvatar}>
              <Ionicons name="camera-outline" size={13} color={NAVY} />
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Your Name</Text>
            <Text style={styles.profileEmail}>you@example.com</Text>
            <View style={styles.kycRow}>
              <Ionicons name="alert-circle-outline" size={13} color="#f59e0b" />
              <Text style={styles.kycText}>KYC Pending — complete to transact</Text>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Text style={styles.statVal}>0</Text>
              <Text style={styles.statLabel}>Listings</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statVal}>0</Text>
              <Text style={styles.statLabel}>Deals</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statVal}>—</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </View>

        {/* KYC prompt */}
        <TouchableOpacity style={styles.kycCard} activeOpacity={0.85} onPress={() => nav.navigate('KYC')}>
          <View style={styles.kycIcon}>
            <Ionicons name="shield-checkmark-outline" size={22} color={GOLD} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.kycCardTitle}>Complete KYC</Text>
            <Text style={styles.kycCardDesc}>Verify your identity to buy and sell on HybridAgent</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={GOLD} />
        </TouchableOpacity>

        {/* Menu sections */}
        {MENU_SECTIONS.map(section => (
          <View key={section.title} style={styles.menuSection}>
            <Text style={styles.menuSectionTitle}>{section.title}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, idx) => (
                <TouchableOpacity
                  key={item.label}
                  style={[styles.menuItem, idx < section.items.length - 1 && styles.menuItemBorder]}
                  activeOpacity={0.7}
                  onPress={() => {
                    const r = (item as any).route;
                    if (r === 'OwnerWithdraw') nav.navigate('OwnerWithdraw', {});
                    else if (r) nav.navigate(r);
                  }}
                >
                  <View style={[styles.menuIcon, (item as any).accent && styles.menuIconAccent]}>
                    <Ionicons name={item.icon as any} size={18} color={(item as any).accent ? '#f59e0b' : NAVY} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                    <Text style={[styles.menuSub, (item as any).accent && { color: '#f59e0b' }]}>{item.sub}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#d1d5db" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.85}>
          <Ionicons name="log-out-outline" size={18} color="#dc2626" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <View style={{ height: insets.bottom + 16 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:    { flex: 1, backgroundColor: '#f9fafb' },
  header:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: NAVY },
  settingsBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' },

  scroll:  { paddingHorizontal: 20, paddingTop: 4 },

  profileCard: { backgroundColor: '#fff', borderRadius: 20, borderWidth: 1, borderColor: '#e5e7eb', padding: 20, marginBottom: 16 },
  avatarWrap:  { position: 'relative', alignSelf: 'flex-start', marginBottom: 12 },
  avatar:      { width: 64, height: 64, borderRadius: 32, backgroundColor: NAVY, alignItems: 'center', justifyContent: 'center' },
  avatarText:  { fontSize: 24, fontWeight: '800', color: '#fff' },
  editAvatar:  { position: 'absolute', right: -2, bottom: -2, width: 22, height: 22, borderRadius: 11, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: '#e5e7eb' },
  profileInfo: { marginBottom: 16 },
  profileName: { fontSize: 20, fontWeight: '800', color: '#111827', marginBottom: 2 },
  profileEmail: { fontSize: 13, color: '#9ca3af', marginBottom: 6 },
  kycRow:      { flexDirection: 'row', alignItems: 'center', gap: 5 },
  kycText:     { fontSize: 12, color: '#f59e0b', fontWeight: '500' },
  statRow:     { flexDirection: 'row', backgroundColor: '#f9fafb', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#e5e7eb' },
  statItem:    { flex: 1, alignItems: 'center', gap: 2 },
  statVal:     { fontSize: 20, fontWeight: '900', color: NAVY },
  statLabel:   { fontSize: 11, color: '#9ca3af' },
  statDivider: { width: 1, backgroundColor: '#e5e7eb', alignSelf: 'stretch', marginHorizontal: 8 },

  kycCard:    { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: NAVY, borderRadius: 16, padding: 16, marginBottom: 20 },
  kycIcon:    { width: 44, height: 44, borderRadius: 22, backgroundColor: GOLD + '20', alignItems: 'center', justifyContent: 'center' },
  kycCardTitle: { fontSize: 15, fontWeight: '700', color: '#fff', marginBottom: 2 },
  kycCardDesc:  { fontSize: 12, color: '#94a3b8', lineHeight: 18 },

  menuSection:      { marginBottom: 20 },
  menuSectionTitle: { fontSize: 12, fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  menuCard:         { backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#e5e7eb', overflow: 'hidden' },
  menuItem:         { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  menuItemBorder:   { borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  menuIcon:         { width: 36, height: 36, borderRadius: 10, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' },
  menuIconAccent:   { backgroundColor: '#fef3c7' },
  menuLabel:        { fontSize: 14, fontWeight: '600', color: '#111827', marginBottom: 1 },
  menuSub:          { fontSize: 12, color: '#9ca3af' },

  logoutBtn:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#fee2e2' },
  logoutText: { fontSize: 15, fontWeight: '700', color: '#dc2626' },
});
