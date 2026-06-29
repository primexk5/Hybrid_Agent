import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, Pressable,
  StyleSheet, StatusBar, Image, ActivityIndicator, Platform,
  KeyboardAvoidingView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

const NAVY   = '#0c2340';
const GOLD   = '#c9912a';

type AssetType  = 'property' | 'vehicle';
type ListingRole = 'owner_direct' | 'agent_brokered';
type PropSubtype = 'Duplex' | 'Flat/Apartment' | 'Bungalow' | 'Land' | 'Commercial';

const PROP_TYPES: PropSubtype[] = ['Duplex', 'Flat/Apartment', 'Bungalow', 'Land', 'Commercial'];
const STEPS = ['Type', 'Details', 'Photos', 'Role'];

export default function CreateListingScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [step, setStep]       = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const scrollRef = useRef<ScrollView>(null);
  const descRef   = useRef<TextInput>(null);

  // Step 1 — Type
  const [assetType, setAssetType] = useState<AssetType | null>(null);

  // Step 2 — Details
  const [title, setTitle]         = useState('');
  const [price, setPrice]         = useState('');
  const [location, setLocation]   = useState('');
  const [description, setDesc]    = useState('');
  // Property specifics
  const [propSubtype, setPropSubtype] = useState<PropSubtype | null>(null);
  const [bedrooms, setBedrooms]       = useState('');
  const [bathrooms, setBathrooms]     = useState('');
  // Vehicle specifics
  const [make, setMake]       = useState('');
  const [year, setYear]       = useState('');
  const [mileage, setMileage] = useState('');

  // Step 3 — Photos
  const [photos, setPhotos] = useState<string[]>([]);

  // Step 4 — Role
  const [role, setRole]           = useState<ListingRole | null>(null);
  const [commission, setCommission] = useState('');

  const validate = (): boolean => {
    setError('');
    if (step === 0) {
      if (!assetType) { setError('Select an asset type.'); return false; }
    }
    if (step === 1) {
      if (!title || !price || !location || !description) { setError('Fill in all required fields.'); return false; }
      if (isNaN(Number(price.replace(/,/g, '')))) { setError('Price must be a number.'); return false; }
      if (assetType === 'property' && !propSubtype) { setError('Select a property type.'); return false; }
      if (assetType === 'vehicle' && (!make || !year)) { setError('Fill in make and year.'); return false; }
    }
    if (step === 3) {
      if (!role) { setError('Select a listing role.'); return false; }
      if (role === 'agent_brokered') {
        const bps = Number(commission);
        if (!commission || isNaN(bps) || bps <= 0 || bps > 30) { setError('Commission must be 1–30%.'); return false; }
      }
    }
    return true;
  };

  const next = () => {
    if (!validate()) return;
    if (step < 3) { setStep(s => s + 1); return; }
    submit();
  };

  const submit = () => {
    setLoading(true);
    // TODO: POST to backend, then trigger MandateRegistry on-chain if agent_brokered
    setTimeout(() => {
      setLoading(false);
      nav.goBack();
    }, 1500);
  };

  const pickPhotos = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') { setError('Camera roll permission required.'); return; }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.7,
      selectionLimit: 6 - photos.length,
    });
    if (!result.canceled) {
      const uris = result.assets.map(a => a.uri);
      setPhotos(prev => [...prev, ...uris].slice(0, 6));
    }
  };

  const removePhoto = (i: number) => setPhotos(prev => prev.filter((_, idx) => idx !== i));

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => step > 0 ? setStep(s => s - 1) : nav.goBack()}
        >
          <Ionicons name={step > 0 ? 'arrow-back' : 'close'} size={20} color={NAVY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Listing</Text>
        <Text style={styles.headerStep}>{step + 1} / {STEPS.length}</Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${((step + 1) / STEPS.length) * 100}%` }]} />
      </View>

      {/* Step labels */}
      <View style={styles.stepLabels}>
        {STEPS.map((s, i) => (
          <Text key={s} style={[styles.stepLabel, i === step && styles.stepLabelActive, i < step && styles.stepLabelDone]}>
            {i < step ? '✓ ' : ''}{s}
          </Text>
        ))}
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          {/* ── STEP 0: TYPE ── */}
          {step === 0 && (
            <View style={styles.typeStep}>
              <Text style={styles.stepTitle}>What are you selling?</Text>
              <Text style={styles.stepSub}>Choose the type of asset for this listing.</Text>

              <TouchableOpacity
                style={[styles.typeCard, assetType === 'property' && styles.typeCardActive]}
                onPress={() => setAssetType('property')}
                activeOpacity={0.85}
              >
                <View style={[styles.typeIcon, assetType === 'property' && styles.typeIconActive]}>
                  <Ionicons name="business-outline" size={32} color={assetType === 'property' ? GOLD : '#9ca3af'} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.typeCardTitle, assetType === 'property' && { color: NAVY }]}>Property</Text>
                  <Text style={styles.typeCardDesc}>House, duplex, apartment, land, commercial</Text>
                </View>
                <View style={[styles.radioOuter, assetType === 'property' && styles.radioActive]}>
                  {assetType === 'property' && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.typeCard, assetType === 'vehicle' && styles.typeCardActive]}
                onPress={() => setAssetType('vehicle')}
                activeOpacity={0.85}
              >
                <View style={[styles.typeIcon, assetType === 'vehicle' && styles.typeIconActive]}>
                  <Ionicons name="car-sport-outline" size={32} color={assetType === 'vehicle' ? GOLD : '#9ca3af'} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.typeCardTitle, assetType === 'vehicle' && { color: NAVY }]}>Vehicle</Text>
                  <Text style={styles.typeCardDesc}>Car, SUV, truck, motorcycle</Text>
                </View>
                <View style={[styles.radioOuter, assetType === 'vehicle' && styles.radioActive]}>
                  {assetType === 'vehicle' && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* ── STEP 1: DETAILS ── */}
          {step === 1 && (
            <View>
              <Text style={styles.stepTitle}>Listing details</Text>
              <Text style={styles.stepSub}>Add the key information buyers will see.</Text>

              <InputField label="Title *" icon="create-outline" value={title} onChange={setTitle} placeholder={assetType === 'property' ? '3 Bed Duplex, Lekki Phase 1' : '2021 Toyota Land Cruiser V8'} />
              <InputField label="Price (USDC) *" icon="logo-usd" value={price} onChange={setPrice} placeholder="120000" keyboard="numeric" />
              <InputField label="Location *" icon="location-outline" value={location} onChange={setLocation} placeholder="Lekki, Lagos" />

              {/* Property specifics */}
              {assetType === 'property' && (
                <>
                  <Text style={styles.fieldLabel}>Property Type *</Text>
                  <View style={styles.chipRow}>
                    {PROP_TYPES.map(t => (
                      <TouchableOpacity
                        key={t}
                        style={[styles.chip, propSubtype === t && styles.chipActive]}
                        onPress={() => setPropSubtype(t)}
                      >
                        <Text style={[styles.chipText, propSubtype === t && styles.chipTextActive]}>{t}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={styles.row2}>
                    <View style={{ flex: 1 }}>
                      <InputField label="Bedrooms" icon="bed-outline" value={bedrooms} onChange={setBedrooms} placeholder="3" keyboard="numeric" />
                    </View>
                    <View style={{ width: 12 }} />
                    <View style={{ flex: 1 }}>
                      <InputField label="Bathrooms" icon="water-outline" value={bathrooms} onChange={setBathrooms} placeholder="3" keyboard="numeric" />
                    </View>
                  </View>
                </>
              )}

              {/* Vehicle specifics */}
              {assetType === 'vehicle' && (
                <>
                  <InputField label="Make & Model *" icon="car-outline" value={make} onChange={setMake} placeholder="Toyota Land Cruiser" />
                  <View style={styles.row2}>
                    <View style={{ flex: 1 }}>
                      <InputField label="Year *" icon="calendar-outline" value={year} onChange={setYear} placeholder="2021" keyboard="numeric" />
                    </View>
                    <View style={{ width: 12 }} />
                    <View style={{ flex: 1 }}>
                      <InputField label="Mileage" icon="speedometer-outline" value={mileage} onChange={setMileage} placeholder="32,000 km" />
                    </View>
                  </View>
                </>
              )}

              {/* Description */}
              <Text style={styles.fieldLabel}>Description *</Text>
              <Pressable
                style={[styles.inputWrap, { alignItems: 'flex-start', paddingTop: 12, marginBottom: 28 }]}
                onPress={() => descRef.current?.focus()}
              >
                <TextInput
                  ref={descRef}
                  style={[styles.input, { minHeight: 100, textAlignVertical: 'top', flex: 1 }]}
                  placeholder="Describe the property or vehicle in detail…"
                  placeholderTextColor="#9ca3af"
                  value={description}
                  onChangeText={setDesc}
                  multiline
                  onFocus={() => setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 150)}
                />
              </Pressable>
            </View>
          )}

          {/* ── STEP 2: PHOTOS ── */}
          {step === 2 && (
            <View>
              <Text style={styles.stepTitle}>Photos</Text>
              <Text style={styles.stepSub}>Add up to 6 photos. First image is the cover.</Text>

              {/* Photo grid */}
              <View style={styles.photoGrid}>
                {photos.map((uri, i) => (
                  <View key={uri} style={styles.photoSlot}>
                    <Image source={{ uri }} style={styles.photoImg} />
                    {i === 0 && (
                      <View style={styles.coverBadge}>
                        <Text style={styles.coverBadgeText}>Cover</Text>
                      </View>
                    )}
                    <TouchableOpacity style={styles.removePhoto} onPress={() => removePhoto(i)}>
                      <Ionicons name="close-circle" size={20} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                ))}

                {photos.length < 6 && (
                  <TouchableOpacity style={styles.addPhotoSlot} onPress={pickPhotos} activeOpacity={0.8}>
                    <Ionicons name="camera-outline" size={28} color="#9ca3af" />
                    <Text style={styles.addPhotoText}>
                      {photos.length === 0 ? 'Add photos' : 'Add more'}
                    </Text>
                    <Text style={styles.addPhotoCount}>{photos.length}/6</Text>
                  </TouchableOpacity>
                )}
              </View>

              {photos.length === 0 && (
                <View style={styles.noPhotoHint}>
                  <Ionicons name="information-circle-outline" size={15} color="#9ca3af" />
                  <Text style={styles.noPhotoText}>
                    Listings with photos get 3× more views. You can skip and add later.
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* ── STEP 3: ROLE ── */}
          {step === 3 && (
            <View>
              <Text style={styles.stepTitle}>Your role</Text>
              <Text style={styles.stepSub}>Who is selling this asset?</Text>

              <TouchableOpacity
                style={[styles.roleCard, role === 'owner_direct' && styles.roleCardActive]}
                onPress={() => setRole('owner_direct')}
                activeOpacity={0.85}
              >
                <View style={[styles.roleIcon, role === 'owner_direct' && styles.roleIconActive]}>
                  <Ionicons name="home-outline" size={22} color={role === 'owner_direct' ? GOLD : '#9ca3af'} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.roleTitle, role === 'owner_direct' && { color: NAVY }]}>I'm the owner</Text>
                  <Text style={styles.roleDesc}>Selling directly — no commission. Full sale price goes to you.</Text>
                </View>
                <View style={[styles.radioOuter, role === 'owner_direct' && styles.radioActive]}>
                  {role === 'owner_direct' && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.roleCard, role === 'agent_brokered' && styles.roleCardActive]}
                onPress={() => setRole('agent_brokered')}
                activeOpacity={0.85}
              >
                <View style={[styles.roleIcon, role === 'agent_brokered' && styles.roleIconActive]}>
                  <Ionicons name="briefcase-outline" size={22} color={role === 'agent_brokered' ? GOLD : '#9ca3af'} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.roleTitle, role === 'agent_brokered' && { color: NAVY }]}>I'm the agent</Text>
                  <Text style={styles.roleDesc}>Brokering on behalf of the owner. Set your commission — it's guaranteed on-chain.</Text>
                </View>
                <View style={[styles.radioOuter, role === 'agent_brokered' && styles.radioActive]}>
                  {role === 'agent_brokered' && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>

              {/* Commission input */}
              {role === 'agent_brokered' && (
                <View style={styles.commissionCard}>
                  <Text style={styles.commissionTitle}>Your commission</Text>
                  <Text style={styles.commissionDesc}>Max 30%. Locked in escrow — paid atomically when the deal settles.</Text>
                  <View style={styles.commissionRow}>
                    <CommissionInput value={commission} onChange={setCommission} />
                    <Text style={styles.percentLabel}>%</Text>
                  </View>
                  {commission !== '' && !isNaN(Number(commission)) && (
                    <View style={styles.commissionPreview}>
                      <Ionicons name="calculator-outline" size={14} color={GOLD} />
                      <Text style={styles.commissionPreviewText}>
                        On a ${Number(price.replace(/,/g, '') || 0).toLocaleString()} listing →{' '}
                        <Text style={{ fontWeight: '700', color: NAVY }}>
                          ${(Number(price.replace(/,/g, '') || 0) * Number(commission) / 100).toLocaleString()} USDC
                        </Text>
                        {' '}commission
                      </Text>
                    </View>
                  )}
                </View>
              )}

              {/* Summary */}
              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Review before submitting</Text>
                <SummaryRow label="Type" value={assetType === 'property' ? `Property · ${propSubtype ?? ''}` : `Vehicle · ${make}`} />
                <SummaryRow label="Title" value={title} />
                <SummaryRow label="Price" value={`$${Number(price.replace(/,/g, '') || 0).toLocaleString()} USDC`} />
                <SummaryRow label="Location" value={location} />
                <SummaryRow label="Photos" value={`${photos.length} image${photos.length !== 1 ? 's' : ''}`} />
                <SummaryRow label="Role" value={role === 'owner_direct' ? 'Owner (direct)' : `Agent · ${commission}% commission`} last />
              </View>
            </View>
          )}

          {/* Error */}
          {error ? (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle-outline" size={15} color="#dc2626" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* CTA */}
          <TouchableOpacity style={styles.btnPrimary} onPress={next} activeOpacity={0.85} disabled={loading}>
            {loading
              ? <ActivityIndicator color="#fff" />
              : <>
                  <Text style={styles.btnText}>{step < 3 ? 'Continue' : 'Publish Listing'}</Text>
                  {!loading && <Ionicons name={step < 3 ? 'arrow-forward' : 'checkmark'} size={17} color="#fff" style={{ marginLeft: 7 }} />}
                </>}
          </TouchableOpacity>

          {step === 2 && (
            <TouchableOpacity style={styles.btnSkip} onPress={() => setStep(3)}>
              <Text style={styles.btnSkipText}>Skip photos for now</Text>
            </TouchableOpacity>
          )}

          <View style={{ height: insets.bottom + 24 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// ── Reusable sub-components ──────────────────────────────────────────────────

function InputField({
  label, icon, value, onChange, placeholder, keyboard,
}: {
  label: string; icon: string; value: string;
  onChange: (t: string) => void; placeholder?: string; keyboard?: any;
}) {
  const inputRef = useRef<TextInput>(null);
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Pressable style={styles.inputWrap} onPress={() => inputRef.current?.focus()}>
        <Ionicons name={icon as any} size={16} color={GOLD} style={{ marginRight: 8 }} />
        <TextInput
          ref={inputRef}
          style={[styles.input, { flex: 1 }]}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          keyboardType={keyboard}
          value={value}
          onChangeText={onChange}
          autoCapitalize="none"
        />
      </Pressable>
    </View>
  );
}

function CommissionInput({ value, onChange }: { value: string; onChange: (t: string) => void }) {
  const ref = useRef<TextInput>(null);
  return (
    <Pressable style={[styles.inputWrap, { flex: 1 }]} onPress={() => ref.current?.focus()}>
      <TextInput
        ref={ref}
        style={[styles.input, { flex: 1, fontSize: 22, fontWeight: '800', color: NAVY }]}
        placeholder="5"
        placeholderTextColor="#9ca3af"
        keyboardType="numeric"
        value={value}
        onChangeText={onChange}
      />
    </Pressable>
  );
}

function SummaryRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.summaryRow, !last && styles.summaryRowBorder]}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue} numberOfLines={1}>{value || '—'}</Text>
    </View>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root:   { flex: 1, backgroundColor: '#f9fafb' },

  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10, backgroundColor: '#fff' },
  closeBtn:    { width: 38, height: 38, borderRadius: 12, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '800', color: NAVY },
  headerStep:  { fontSize: 13, color: '#9ca3af', fontWeight: '600' },

  progressTrack: { height: 3, backgroundColor: '#e5e7eb' },
  progressFill:  { height: 3, backgroundColor: GOLD, borderRadius: 2 },

  stepLabels:     { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 8, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  stepLabel:      { fontSize: 11, color: '#d1d5db', fontWeight: '600' },
  stepLabelActive: { color: NAVY },
  stepLabelDone:  { color: GOLD },

  scroll: { paddingHorizontal: 20, paddingTop: 20 },

  stepTitle: { fontSize: 22, fontWeight: '800', color: NAVY, marginBottom: 6 },
  stepSub:   { fontSize: 14, color: '#6b7280', marginBottom: 24, lineHeight: 20 },

  // Type step
  typeStep: { gap: 14, marginBottom: 28 },
  typeCard:      { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#fff', borderRadius: 18, borderWidth: 2, borderColor: '#e5e7eb', padding: 18 },
  typeCardActive: { borderColor: GOLD, backgroundColor: GOLD + '06' },
  typeIcon:       { width: 60, height: 60, borderRadius: 18, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' },
  typeIconActive: { backgroundColor: GOLD + '18' },
  typeCardTitle:  { fontSize: 18, fontWeight: '800', color: '#374151', marginBottom: 4 },
  typeCardDesc:   { fontSize: 13, color: '#9ca3af', lineHeight: 18 },

  // Radio
  radioOuter: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#d1d5db', alignItems: 'center', justifyContent: 'center' },
  radioActive: { borderColor: GOLD },
  radioInner:  { width: 10, height: 10, borderRadius: 5, backgroundColor: GOLD },

  // Fields
  fieldLabel:  { fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 },
  inputWrap:   { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#e5e7eb', borderRadius: 12, paddingHorizontal: 12 },
  input:       { paddingVertical: 12, fontSize: 15, color: '#111827' },

  chipRow:   { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  chip:      { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#e5e7eb' },
  chipActive: { backgroundColor: NAVY, borderColor: NAVY },
  chipText:   { fontSize: 13, fontWeight: '600', color: '#6b7280' },
  chipTextActive: { color: '#fff' },

  row2: { flexDirection: 'row' },

  // Photos
  photoGrid:    { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  photoSlot:    { width: '31%', aspectRatio: 1, borderRadius: 12, overflow: 'hidden' },
  photoImg:     { width: '100%', height: '100%' },
  coverBadge:   { position: 'absolute', bottom: 5, left: 5, backgroundColor: NAVY + 'cc', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  coverBadgeText: { fontSize: 9, fontWeight: '700', color: '#fff' },
  removePhoto:  { position: 'absolute', top: 4, right: 4 },
  addPhotoSlot: { width: '31%', aspectRatio: 1, borderRadius: 12, borderWidth: 2, borderColor: '#e5e7eb', borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', gap: 4 },
  addPhotoText: { fontSize: 11, color: '#9ca3af', fontWeight: '600' },
  addPhotoCount: { fontSize: 10, color: '#d1d5db' },
  noPhotoHint: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, backgroundColor: '#f9fafb', borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', padding: 12, marginBottom: 28 },
  noPhotoText: { flex: 1, fontSize: 12, color: '#9ca3af', lineHeight: 18 },

  // Role
  roleCard:      { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#fff', borderRadius: 16, borderWidth: 2, borderColor: '#e5e7eb', padding: 16, marginBottom: 12 },
  roleCardActive: { borderColor: GOLD, backgroundColor: GOLD + '06' },
  roleIcon:       { width: 48, height: 48, borderRadius: 14, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' },
  roleIconActive: { backgroundColor: GOLD + '18' },
  roleTitle:      { fontSize: 16, fontWeight: '800', color: '#374151', marginBottom: 4 },
  roleDesc:       { fontSize: 12, color: '#9ca3af', lineHeight: 17 },

  commissionCard: { backgroundColor: NAVY, borderRadius: 16, padding: 16, marginBottom: 20 },
  commissionTitle: { fontSize: 15, fontWeight: '700', color: '#fff', marginBottom: 4 },
  commissionDesc:  { fontSize: 12, color: '#94a3b8', lineHeight: 18, marginBottom: 14 },
  commissionRow:   { flexDirection: 'row', alignItems: 'center', gap: 10 },
  percentLabel:    { fontSize: 28, fontWeight: '900', color: GOLD },
  commissionPreview: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12, backgroundColor: '#ffffff12', borderRadius: 10, padding: 10 },
  commissionPreviewText: { fontSize: 12, color: '#94a3b8', flex: 1, lineHeight: 18 },

  // Summary
  summaryCard:  { backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#e5e7eb', padding: 16, marginBottom: 20 },
  summaryTitle: { fontSize: 14, fontWeight: '700', color: NAVY, marginBottom: 12 },
  summaryRow:   { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 9 },
  summaryRowBorder: { borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  summaryLabel: { fontSize: 13, color: '#9ca3af', fontWeight: '500' },
  summaryValue: { fontSize: 13, color: '#111827', fontWeight: '600', maxWidth: '60%', textAlign: 'right' },

  // Error
  errorBox:  { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#fef2f2', borderWidth: 1, borderColor: '#fecaca', borderRadius: 10, padding: 12, marginBottom: 16 },
  errorText: { color: '#dc2626', fontSize: 13, flex: 1 },

  // Buttons
  btnPrimary: { backgroundColor: NAVY, borderRadius: 14, paddingVertical: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  btnText:    { color: '#fff', fontWeight: '700', fontSize: 16 },
  btnSkip:    { alignItems: 'center', paddingVertical: 10 },
  btnSkipText: { fontSize: 14, color: '#9ca3af', fontWeight: '500' },
});
