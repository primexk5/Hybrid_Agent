import React, { useState, useMemo, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Pressable,
  FlatList, StyleSheet, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { ListingsStackParamList, TabParamList, RootStackParamList } from '../navigation/types';

type ListingsNav = CompositeNavigationProp<
  NativeStackNavigationProp<ListingsStackParamList>,
  CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList>,
    NativeStackNavigationProp<RootStackParamList>
  >
>;
import { MOCK_LISTINGS, type Listing } from '../data/mockListings';

const NAVY = '#0c2340';
const GOLD = '#c9912a';

type Filter = 'all' | 'property' | 'vehicle';

export default function ListingsScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<ListingsNav>();

  const [search, setSearch]   = useState('');
  const searchRef             = useRef<TextInput>(null);
  const [filter, setFilter]   = useState<Filter>('all');

  const filtered = useMemo(() => {
    return MOCK_LISTINGS.filter(l => {
      const matchFilter = filter === 'all' || l.asset_type === filter;
      const matchSearch = l.title.toLowerCase().includes(search.toLowerCase()) ||
                          l.location.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [search, filter]);

  const renderItem = ({ item }: { item: Listing }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => nav.navigate('ListingDetail', { id: item.id })}
      activeOpacity={0.88}
    >
      {/* Image placeholder */}
      <View style={[styles.thumb, { backgroundColor: item.asset_type === 'property' ? '#e8f0fe' : '#fef3c7' }]}>
        <Ionicons
          name={item.asset_type === 'property' ? 'business-outline' : 'car-outline'}
          size={30}
          color={item.asset_type === 'property' ? NAVY : GOLD}
        />
        <View style={[styles.badge, item.status === 'pending' && styles.badgePending]}>
          <Text style={styles.badgeText}>{item.status === 'pending' ? 'Pending' : 'Open'}</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.cardBody}>
        <View style={styles.cardRow}>
          <Text style={styles.cardType}>{item.asset_type.toUpperCase()}</Text>
          <Text style={styles.cardPrice}>${item.price_usdc} <Text style={styles.usdcLabel}>USDC</Text></Text>
        </View>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.cardMeta}>
          <Ionicons name="location-outline" size={13} color="#9ca3af" />
          <Text style={styles.cardLocation}>{item.location}</Text>
        </View>
        <View style={styles.agentRow}>
          <View style={styles.agentDot}>
            <Text style={styles.agentInitial}>{item.agent_name[0]}</Text>
          </View>
          <Text style={styles.agentName}>{item.agent_name}</Text>
          {item.agent_kyc === 'verified' && (
            <Ionicons name="shield-checkmark" size={13} color={GOLD} style={{ marginLeft: 4 }} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Listings</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => nav.navigate('CreateListing')}>
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <Pressable style={styles.searchWrap} onPress={() => searchRef.current?.focus()}>
        <Ionicons name="search-outline" size={17} color="#9ca3af" style={{ marginRight: 8 }} />
        <TextInput
          ref={searchRef}
          style={styles.searchInput}
          placeholder="Search listings, locations…"
          placeholderTextColor="#9ca3af"
          value={search}
          onChangeText={setSearch}
        />
        {search ? (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={17} color="#9ca3af" />
          </TouchableOpacity>
        ) : null}
      </Pressable>

      {/* Filter tabs */}
      <View style={styles.tabs}>
        {(['all', 'property', 'vehicle'] as Filter[]).map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.tab, filter === f && styles.tabActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.tabText, filter === f && styles.tabTextActive]}>
              {f === 'all' ? 'All' : f === 'property' ? 'Property' : 'Vehicles'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Results count */}
      <View style={styles.resultRow}>
        <Text style={styles.resultCount}>{filtered.length} listing{filtered.length !== 1 ? 's' : ''}</Text>
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="search-outline" size={40} color="#d1d5db" />
            <Text style={styles.emptyText}>No listings found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root:        { flex: 1, backgroundColor: '#f9fafb' },

  header:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: NAVY },
  addBtn:      { width: 40, height: 40, borderRadius: 12, backgroundColor: NAVY, alignItems: 'center', justifyContent: 'center' },

  searchWrap:  { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 12, backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: '#e5e7eb', paddingHorizontal: 14, paddingVertical: 10 },
  searchInput: { flex: 1, fontSize: 15, color: '#111827' },

  tabs:        { flexDirection: 'row', paddingHorizontal: 20, gap: 8, marginBottom: 8 },
  tab:         { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e7eb' },
  tabActive:   { backgroundColor: NAVY, borderColor: NAVY },
  tabText:     { fontSize: 13, fontWeight: '600', color: '#6b7280' },
  tabTextActive: { color: '#fff' },

  resultRow:   { paddingHorizontal: 20, marginBottom: 8 },
  resultCount: { fontSize: 12, color: '#9ca3af', fontWeight: '500' },

  list:        { paddingHorizontal: 20, paddingBottom: 24, gap: 14 },

  card:        { backgroundColor: '#fff', borderRadius: 20, borderWidth: 1, borderColor: '#e5e7eb', overflow: 'hidden' },
  thumb:       { height: 140, alignItems: 'center', justifyContent: 'center' },
  badge:       { position: 'absolute', top: 10, right: 10, backgroundColor: '#d1fae5', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  badgePending: { backgroundColor: '#fef3c7' },
  badgeText:   { fontSize: 11, fontWeight: '700', color: '#065f46' },
  cardBody:    { padding: 14 },
  cardRow:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  cardType:    { fontSize: 10, fontWeight: '700', color: GOLD, letterSpacing: 1 },
  cardPrice:   { fontSize: 16, fontWeight: '800', color: NAVY },
  usdcLabel:   { fontSize: 11, fontWeight: '600', color: '#9ca3af' },
  cardTitle:   { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 6, lineHeight: 22 },
  cardMeta:    { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 10 },
  cardLocation: { fontSize: 12, color: '#9ca3af' },
  agentRow:    { flexDirection: 'row', alignItems: 'center', gap: 6 },
  agentDot:    { width: 22, height: 22, borderRadius: 11, backgroundColor: NAVY, alignItems: 'center', justifyContent: 'center' },
  agentInitial: { fontSize: 10, fontWeight: '800', color: '#fff' },
  agentName:   { fontSize: 12, color: '#6b7280', fontWeight: '500' },

  empty:       { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyText:   { fontSize: 15, color: '#9ca3af' },
});
