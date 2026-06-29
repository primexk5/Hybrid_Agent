import React from 'react';
import {
  View, Text, ScrollView, StyleSheet, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NAVY = '#0c2340';
const GOLD = '#c9912a';

const AGENTS = [
  { rank: 1, name: 'John Adeyemi',     deals: 24, volume: '2,840,000', location: 'Lagos', rating: 4.9, verified: true },
  { rank: 2, name: 'Emeka Okafor',     deals: 19, volume: '2,105,000', location: 'Abuja',  rating: 4.8, verified: true },
  { rank: 3, name: 'Bisi Lawson',       deals: 17, volume: '1,970,000', location: 'Lagos', rating: 4.8, verified: true },
  { rank: 4, name: 'Amaka Osei',        deals: 14, volume: '1,320,000', location: 'Accra', rating: 4.7, verified: true },
  { rank: 5, name: 'Fatima Al-Hassan', deals: 12, volume: '980,000',   location: 'PH',    rating: 4.6, verified: true },
  { rank: 6, name: 'Chidi Nwosu',      deals: 9,  volume: '720,000',   location: 'Enugu', rating: 4.5, verified: false },
];

const MEDAL: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

export default function LeaderboardScreen() {
  const insets = useSafeAreaInsets();

  const top3 = AGENTS.slice(0, 3);
  const rest  = AGENTS.slice(3);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Leaderboard</Text>
        <Text style={styles.headerSub}>Top agents by closed volume · USDC</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Podium */}
        <View style={styles.podium}>
          {[top3[1], top3[0], top3[2]].map((agent, idx) => {
            const heights = [80, 110, 70];
            const isFirst = agent.rank === 1;
            return (
              <View key={agent.rank} style={styles.podiumItem}>
                <Text style={styles.podiumName} numberOfLines={1}>{agent.name.split(' ')[0]}</Text>
                <View style={[styles.podiumBar, { height: heights[idx], backgroundColor: isFirst ? NAVY : '#f3f4f6', borderColor: isFirst ? GOLD : '#e5e7eb' }]}>
                  <Text style={[styles.podiumRank, { color: isFirst ? GOLD : '#9ca3af' }]}>#{agent.rank}</Text>
                  <Text style={[styles.podiumDeals, { color: isFirst ? '#fff' : '#374151' }]}>{agent.deals}</Text>
                  <Text style={[styles.podiumLabel, { color: isFirst ? '#94a3b8' : '#9ca3af' }]}>deals</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* All agents list */}
        <View style={styles.listCard}>
          <Text style={styles.listTitle}>Full Rankings</Text>
          {AGENTS.map(agent => (
            <View key={agent.rank} style={[styles.agentRow, agent.rank < AGENTS.length && styles.agentRowBorder]}>
              {/* Rank */}
              <View style={styles.rankCol}>
                {MEDAL[agent.rank]
                  ? <Text style={styles.medal}>{MEDAL[agent.rank]}</Text>
                  : <Text style={styles.rankNum}>#{agent.rank}</Text>}
              </View>

              {/* Avatar */}
              <View style={[styles.avatar, { backgroundColor: agent.rank <= 3 ? NAVY : '#f3f4f6' }]}>
                <Text style={[styles.avatarText, { color: agent.rank <= 3 ? '#fff' : '#374151' }]}>
                  {agent.name[0]}
                </Text>
              </View>

              {/* Info */}
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <Text style={styles.agentName}>{agent.name}</Text>
                  {agent.verified && <Ionicons name="shield-checkmark" size={13} color={GOLD} />}
                </View>
                <Text style={styles.agentMeta}>{agent.location} · ⭐ {agent.rating}</Text>
              </View>

              {/* Volume */}
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.volumeVal}>${agent.volume}</Text>
                <Text style={styles.volumeLabel}>{agent.deals} deals</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Footer info */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle-outline" size={16} color={GOLD} />
          <Text style={styles.infoText}>Rankings are based on on-chain settled deal volume. Updated in real-time from the blockchain.</Text>
        </View>

        <View style={{ height: insets.bottom + 16 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:       { flex: 1, backgroundColor: '#f9fafb' },
  header:     { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: NAVY },
  headerSub:  { fontSize: 13, color: '#9ca3af', marginTop: 2 },

  scroll:     { paddingHorizontal: 20, paddingTop: 16 },

  podium:     { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 8, marginBottom: 24 },
  podiumItem: { flex: 1, alignItems: 'center', gap: 6 },
  podiumName: { fontSize: 11, fontWeight: '700', color: '#374151', textAlign: 'center' },
  podiumBar:  { width: '100%', borderRadius: 12, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center', gap: 2, paddingVertical: 8 },
  podiumRank: { fontSize: 10, fontWeight: '700' },
  podiumDeals: { fontSize: 18, fontWeight: '900' },
  podiumLabel: { fontSize: 10 },

  listCard:   { backgroundColor: '#fff', borderRadius: 20, borderWidth: 1, borderColor: '#e5e7eb', padding: 16, marginBottom: 16 },
  listTitle:  { fontSize: 15, fontWeight: '700', color: NAVY, marginBottom: 14 },

  agentRow:    { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 12 },
  agentRowBorder: { borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  rankCol:     { width: 28, alignItems: 'center' },
  medal:       { fontSize: 18 },
  rankNum:     { fontSize: 13, fontWeight: '700', color: '#9ca3af' },
  avatar:      { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  avatarText:  { fontSize: 14, fontWeight: '800' },
  agentName:   { fontSize: 14, fontWeight: '700', color: '#111827' },
  agentMeta:   { fontSize: 11, color: '#9ca3af', marginTop: 1 },
  volumeVal:   { fontSize: 13, fontWeight: '800', color: NAVY },
  volumeLabel: { fontSize: 11, color: '#9ca3af', textAlign: 'right' },

  infoCard:   { flexDirection: 'row', alignItems: 'flex-start', gap: 10, backgroundColor: GOLD + '10', borderRadius: 14, borderWidth: 1, borderColor: GOLD + '30', padding: 14 },
  infoText:   { flex: 1, fontSize: 12, color: '#6b7280', lineHeight: 18 },
});
