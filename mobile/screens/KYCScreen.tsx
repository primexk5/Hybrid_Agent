import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, Pressable, ScrollView, StyleSheet,
  StatusBar, TextInput, Image, ActivityIndicator,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const NAVY  = '#0c2340';
const GOLD  = '#c9912a';
const GREEN = '#22c55e';

type KYCState = 'start' | 'personal' | 'document' | 'selfie' | 'review' | 'pending' | 'verified';
type DocType  = 'Passport' | 'National ID' | "Driver's Licence";

const DOC_TYPES: DocType[] = ['Passport', 'National ID', "Driver's Licence"];
const NATIONALITIES = ['Nigerian', 'Ghanaian', 'Kenyan', 'South African', 'British', 'American', 'Other'];

const STEP_LABELS = ['Personal', 'Document', 'Selfie', 'Review'];

// ── What KYC unlocks ─────────────────────────────────────────────────────────
const UNLOCKS = [
  { icon: 'storefront-outline',  text: 'Buy and sell listings' },
  { icon: 'lock-open-outline',   text: 'Fund and release escrow' },
  { icon: 'briefcase-outline',   text: 'Earn agent commissions on-chain' },
  { icon: 'trophy-outline',      text: 'Appear on the leaderboard' },
];

export default function KYCScreen() {
  const insets = useSafeAreaInsets();
  const nav    = useNavigation();

  const [state, setState] = useState<KYCState>('start');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Personal
  const [fullName, setFullName]     = useState('');
  const [dob, setDob]               = useState('');
  const [nationality, setNationality] = useState('');
  const [country, setCountry]       = useState('');

  // Document
  const [docType, setDocType]   = useState<DocType | null>(null);
  const [docFront, setDocFront] = useState<string | null>(null);
  const [docBack, setDocBack]   = useState<string | null>(null);

  // Selfie
  const [selfie, setSelfie] = useState<string | null>(null);

  const stepIndex = (['personal', 'document', 'selfie', 'review'] as KYCState[]).indexOf(state);

  const validate = (): boolean => {
    setError('');
    if (state === 'personal') {
      if (!fullName || !dob || !nationality || !country) { setError('Fill in all fields.'); return false; }
      const dobRx = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!dobRx.test(dob)) { setError('Date of birth must be DD/MM/YYYY.'); return false; }
    }
    if (state === 'document') {
      if (!docType) { setError('Select a document type.'); return false; }
      if (!docFront) { setError('Upload the front of your document.'); return false; }
      if (docType !== 'Passport' && !docBack) { setError('Upload the back of your document.'); return false; }
    }
    if (state === 'selfie') {
      if (!selfie) { setError('Take or upload a selfie.'); return false; }
    }
    return true;
  };

  const next = () => {
    if (!validate()) return;
    const flow: KYCState[] = ['personal', 'document', 'selfie', 'review'];
    const idx = flow.indexOf(state as any);
    if (idx < flow.length - 1) { setState(flow[idx + 1]); return; }
    handleSubmit();
  };

  const back = () => {
    const flow: KYCState[] = ['personal', 'document', 'selfie', 'review'];
    const idx = flow.indexOf(state as any);
    if (idx > 0) { setState(flow[idx - 1]); } else { setState('start'); }
  };

  const handleSubmit = () => {
    setSubmitting(true);
    // TODO: POST /api/kyc with formData (personal + docs + selfie)
    setTimeout(() => {
      setSubmitting(false);
      setState('pending');
    }, 2000);
  };

  const pickImage = async (onPick: (uri: string) => void, camera = false) => {
    const picker = camera ? ImagePicker.launchCameraAsync : ImagePicker.launchImageLibraryAsync;
    const permFn  = camera ? ImagePicker.requestCameraPermissionsAsync : ImagePicker.requestMediaLibraryPermissionsAsync;
    const { status } = await permFn();
    if (status !== 'granted') { setError('Permission required to access camera/photos.'); return; }
    const result = await picker({ quality: 0.8, allowsEditing: true, aspect: camera ? [1, 1] : [4, 3] });
    if (!result.canceled) onPick(result.assets[0].uri);
  };

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => state === 'start' || state === 'pending' || state === 'verified' ? nav.goBack() : back()}
        >
          <Ionicons name={state === 'start' || state === 'pending' || state === 'verified' ? 'close' : 'arrow-back'} size={20} color={NAVY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Identity Verification</Text>
        <View style={{ width: 38 }} />
      </View>

      {/* Progress (only during flow) */}
      {stepIndex >= 0 && (
        <>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${((stepIndex + 1) / 4) * 100}%` }]} />
          </View>
          <View style={styles.stepRow}>
            {STEP_LABELS.map((l, i) => (
              <Text key={l} style={[styles.stepLbl, i === stepIndex && styles.stepLblActive, i < stepIndex && styles.stepLblDone]}>
                {i < stepIndex ? '✓ ' : ''}{l}
              </Text>
            ))}
          </View>
        </>
      )}

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          {/* ──────────────────── START ──────────────────── */}
          {state === 'start' && (
            <View>
              {/* Tier card */}
              <View style={styles.tierCard}>
                <View style={styles.tierRow}>
                  <TierBadge tier={1} active label="Account created" done />
                  <View style={styles.tierLine} />
                  <TierBadge tier={2} label="KYC Verified" active={false} />
                </View>
                <Text style={styles.tierHint}>You are currently at Tier 1. Complete Tier 2 to transact.</Text>
              </View>

              {/* What you unlock */}
              <Text style={styles.sectionTitle}>What Tier 2 unlocks</Text>
              <View style={styles.unlockCard}>
                {UNLOCKS.map(u => (
                  <View key={u.text} style={styles.unlockRow}>
                    <View style={styles.unlockIcon}>
                      <Ionicons name={u.icon as any} size={18} color={GOLD} />
                    </View>
                    <Text style={styles.unlockText}>{u.text}</Text>
                  </View>
                ))}
              </View>

              {/* What you need */}
              <Text style={styles.sectionTitle}>What you'll need</Text>
              <View style={styles.needCard}>
                {[
                  { icon: 'document-text-outline', text: "Government-issued ID (passport, national ID, or driver's licence)" },
                  { icon: 'camera-outline',         text: 'A selfie — taken live or from your camera roll' },
                  { icon: 'time-outline',           text: '5 minutes — usually approved within 24 hours' },
                ].map(n => (
                  <View key={n.text} style={styles.needRow}>
                    <Ionicons name={n.icon as any} size={16} color={NAVY} style={{ marginTop: 1 }} />
                    <Text style={styles.needText}>{n.text}</Text>
                  </View>
                ))}
              </View>

              {/* Privacy note */}
              <View style={styles.privacyBox}>
                <Ionicons name="shield-outline" size={15} color={GOLD} />
                <Text style={styles.privacyText}>
                  Your documents are encrypted in transit and stored securely. HybridAgent uses them only to verify your identity and comply with AML regulations.
                </Text>
              </View>

              <TouchableOpacity style={styles.btnPrimary} onPress={() => setState('personal')} activeOpacity={0.85}>
                <Text style={styles.btnText}>Start Verification</Text>
                <Ionicons name="arrow-forward" size={16} color="#fff" style={{ marginLeft: 7 }} />
              </TouchableOpacity>
            </View>
          )}

          {/* ──────────────────── PERSONAL ──────────────────── */}
          {state === 'personal' && (
            <View>
              <Text style={styles.stepTitle}>Personal Information</Text>
              <Text style={styles.stepSub}>Enter your details exactly as they appear on your ID.</Text>

              <KYCField label="Full Legal Name" icon="person-outline" value={fullName} onChange={setFullName} placeholder="Jane Adeyemi" />
              <KYCField label="Date of Birth" icon="calendar-outline" value={dob} onChange={setDob} placeholder="DD/MM/YYYY" keyboard="numeric" />

              <Text style={styles.fieldLabel}>Nationality</Text>
              <View style={styles.chipRow}>
                {NATIONALITIES.map(n => (
                  <TouchableOpacity key={n} style={[styles.chip, nationality === n && styles.chipActive]} onPress={() => setNationality(n)}>
                    <Text style={[styles.chipText, nationality === n && styles.chipTextActive]}>{n}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <KYCField label="Country of Residence" icon="location-outline" value={country} onChange={setCountry} placeholder="Nigeria" />
            </View>
          )}

          {/* ──────────────────── DOCUMENT ──────────────────── */}
          {state === 'document' && (
            <View>
              <Text style={styles.stepTitle}>Identity Document</Text>
              <Text style={styles.stepSub}>Upload clear photos of your government-issued ID.</Text>

              {/* Doc type selector */}
              <Text style={styles.fieldLabel}>Document Type</Text>
              <View style={styles.docTypeRow}>
                {DOC_TYPES.map(d => (
                  <TouchableOpacity
                    key={d}
                    style={[styles.docTypeCard, docType === d && styles.docTypeCardActive]}
                    onPress={() => { setDocType(d); setDocBack(null); }}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name={d === 'Passport' ? 'book-outline' : d === 'National ID' ? 'card-outline' : 'car-outline'}
                      size={22}
                      color={docType === d ? GOLD : '#9ca3af'}
                    />
                    <Text style={[styles.docTypeText, docType === d && styles.docTypeTextActive]}>{d}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Upload areas */}
              <PhotoUploadBox
                label={docType === 'Passport' ? 'Photo page' : 'Front'}
                hint="Clear, flat, no glare"
                uri={docFront}
                onPick={() => pickImage(setDocFront)}
                onRetake={() => setDocFront(null)}
              />

              {docType && docType !== 'Passport' && (
                <PhotoUploadBox
                  label="Back"
                  hint="Clear, flat, no glare"
                  uri={docBack}
                  onPick={() => pickImage(uri => setDocBack(uri))}
                  onRetake={() => setDocBack(null)}
                />
              )}

              <View style={styles.docHint}>
                <Ionicons name="information-circle-outline" size={14} color={GOLD} />
                <Text style={styles.docHintText}>All 4 corners must be visible. Text must be legible.</Text>
              </View>
            </View>
          )}

          {/* ──────────────────── SELFIE ──────────────────── */}
          {state === 'selfie' && (
            <View>
              <Text style={styles.stepTitle}>Take a Selfie</Text>
              <Text style={styles.stepSub}>We'll compare this to your ID photo to confirm it's you.</Text>

              {selfie ? (
                <View style={styles.selfiePreview}>
                  <Image source={{ uri: selfie }} style={styles.selfieImg} />
                  <TouchableOpacity style={styles.selfieRetake} onPress={() => setSelfie(null)}>
                    <Ionicons name="refresh-outline" size={16} color={NAVY} />
                    <Text style={styles.selfieRetakeText}>Retake</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <TouchableOpacity style={styles.selfieBox} onPress={() => pickImage(setSelfie, true)} activeOpacity={0.8}>
                    <View style={styles.selfieRing}>
                      <Ionicons name="camera-outline" size={36} color={NAVY} />
                    </View>
                    <Text style={styles.selfieBoxTitle}>Take selfie with camera</Text>
                    <Text style={styles.selfieBoxSub}>Best result — uses your front camera</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.selfieAlt} onPress={() => pickImage(setSelfie, false)}>
                    <Ionicons name="images-outline" size={16} color={NAVY} />
                    <Text style={styles.selfieAltText}>Upload from camera roll instead</Text>
                  </TouchableOpacity>
                </View>
              )}

              <View style={styles.selfieGuide}>
                {['Face centred and fully visible', 'Good lighting — no shadows', 'No glasses or hat', 'Neutral expression'].map(tip => (
                  <View key={tip} style={styles.selfieGuideLine}>
                    <Ionicons name="checkmark-circle-outline" size={14} color={GREEN} />
                    <Text style={styles.selfieGuideText}>{tip}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* ──────────────────── REVIEW ──────────────────── */}
          {state === 'review' && (
            <View>
              <Text style={styles.stepTitle}>Review & Submit</Text>
              <Text style={styles.stepSub}>Check everything looks correct before submitting.</Text>

              <View style={styles.reviewCard}>
                <ReviewRow label="Full Name"   value={fullName} />
                <ReviewRow label="Date of Birth" value={dob} />
                <ReviewRow label="Nationality" value={nationality} />
                <ReviewRow label="Country"     value={country} />
                <ReviewRow label="Document"    value={docType ?? '—'} />
                <ReviewRow label="Front photo" value={docFront ? '✓ Uploaded' : '—'} ok={!!docFront} />
                {docType !== 'Passport' && (
                  <ReviewRow label="Back photo"  value={docBack ? '✓ Uploaded' : '—'} ok={!!docBack} />
                )}
                <ReviewRow label="Selfie"      value={selfie ? '✓ Uploaded' : '—'} ok={!!selfie} last />
              </View>

              <View style={styles.consentBox}>
                <Ionicons name="shield-checkmark-outline" size={16} color={GOLD} />
                <Text style={styles.consentText}>
                  By submitting, you confirm that all information is accurate and consent to HybridAgent processing your data for identity verification under our Privacy Policy.
                </Text>
              </View>
            </View>
          )}

          {/* ──────────────────── PENDING ──────────────────── */}
          {state === 'pending' && (
            <View style={styles.centreState}>
              <View style={styles.pendingRing}>
                <Ionicons name="time-outline" size={44} color={GOLD} />
              </View>
              <Text style={styles.centreTitle}>Verification submitted</Text>
              <Text style={styles.centreSub}>
                Your documents are being reviewed. This usually takes less than 24 hours. We'll notify you when it's done.
              </Text>

              <View style={styles.pendingSteps}>
                {[
                  { label: 'Documents received',      done: true },
                  { label: 'Identity check in progress', done: false },
                  { label: 'Tier 2 unlocked',          done: false },
                ].map(s => (
                  <View key={s.label} style={styles.pendingStep}>
                    <View style={[styles.pendingDot, s.done && styles.pendingDotDone]}>
                      {s.done && <Ionicons name="checkmark" size={12} color="#fff" />}
                    </View>
                    <Text style={[styles.pendingLabel, s.done && styles.pendingLabelDone]}>{s.label}</Text>
                  </View>
                ))}
              </View>

              {/* Simulate verified for demo */}
              <TouchableOpacity style={styles.btnGhost} onPress={() => setState('verified')}>
                <Text style={styles.btnGhostText}>Simulate approval (demo)</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ──────────────────── VERIFIED ──────────────────── */}
          {state === 'verified' && (
            <View style={styles.centreState}>
              <View style={styles.verifiedRing}>
                <Ionicons name="shield-checkmark" size={48} color={GREEN} />
              </View>
              <Text style={styles.centreTitle}>Verified ✓</Text>
              <Text style={styles.centreSub}>You are now a Tier 2 verified user. All marketplace features are unlocked.</Text>

              <View style={styles.verifiedCard}>
                {UNLOCKS.map(u => (
                  <View key={u.text} style={styles.verifiedRow}>
                    <Ionicons name="checkmark-circle" size={16} color={GREEN} />
                    <Text style={styles.verifiedText}>{u.text}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity style={styles.btnPrimary} onPress={() => nav.goBack()} activeOpacity={0.85}>
                <Text style={styles.btnText}>Back to Profile</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Error */}
          {error && state !== 'pending' && state !== 'verified' && (
            <View style={styles.errBox}>
              <Ionicons name="alert-circle-outline" size={15} color="#dc2626" />
              <Text style={styles.errText}>{error}</Text>
            </View>
          )}

          {/* CTA */}
          {state !== 'start' && state !== 'pending' && state !== 'verified' && (
            <TouchableOpacity style={styles.btnPrimary} onPress={next} disabled={submitting} activeOpacity={0.85}>
              {submitting
                ? <ActivityIndicator color="#fff" />
                : <>
                    <Text style={styles.btnText}>{state === 'review' ? 'Submit for Review' : 'Continue'}</Text>
                    <Ionicons name={state === 'review' ? 'checkmark' : 'arrow-forward'} size={16} color="#fff" style={{ marginLeft: 7 }} />
                  </>}
            </TouchableOpacity>
          )}

          <View style={{ height: insets.bottom + 24 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function TierBadge({ tier, label, done, active }: { tier: number; label: string; done?: boolean; active: boolean }) {
  return (
    <View style={{ alignItems: 'center', gap: 6 }}>
      <View style={[tierStyles.dot, active && tierStyles.dotActive, done && tierStyles.dotDone]}>
        {done
          ? <Ionicons name="checkmark" size={14} color="#fff" />
          : <Text style={tierStyles.num}>{tier}</Text>}
      </View>
      <Text style={[tierStyles.label, done && tierStyles.labelDone]}>{label}</Text>
    </View>
  );
}
const tierStyles = StyleSheet.create({
  dot:       { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#e5e7eb' },
  dotActive: { borderColor: NAVY },
  dotDone:   { backgroundColor: GREEN, borderColor: GREEN },
  num:       { fontSize: 14, fontWeight: '800', color: '#9ca3af' },
  label:     { fontSize: 11, color: '#9ca3af', textAlign: 'center', fontWeight: '600' },
  labelDone: { color: GREEN },
});

function KYCField({ label, icon, value, onChange, placeholder, keyboard }: {
  label: string; icon: string; value: string; onChange: (t: string) => void; placeholder?: string; keyboard?: any;
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
          autoCapitalize="words"
        />
      </Pressable>
    </View>
  );
}

function PhotoUploadBox({ label, hint, uri, onPick, onRetake }: {
  label: string; hint: string; uri: string | null; onPick: () => void; onRetake: () => void;
}) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {uri ? (
        <View style={photoStyles.preview}>
          <Image source={{ uri }} style={photoStyles.img} resizeMode="cover" />
          <TouchableOpacity style={photoStyles.retakeBtn} onPress={onRetake}>
            <Ionicons name="refresh-outline" size={14} color={NAVY} />
            <Text style={photoStyles.retakeText}>Retake</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={photoStyles.uploadBox} onPress={onPick} activeOpacity={0.8}>
          <Ionicons name="cloud-upload-outline" size={28} color="#9ca3af" />
          <Text style={photoStyles.uploadLabel}>Tap to upload {label.toLowerCase()}</Text>
          <Text style={photoStyles.uploadHint}>{hint}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
const photoStyles = StyleSheet.create({
  uploadBox:    { height: 140, borderRadius: 14, borderWidth: 2, borderColor: '#e5e7eb', borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb', gap: 6 },
  uploadLabel:  { fontSize: 13, fontWeight: '600', color: '#374151' },
  uploadHint:   { fontSize: 11, color: '#9ca3af' },
  preview:      { borderRadius: 14, overflow: 'hidden', backgroundColor: '#f3f4f6' },
  img:          { width: '100%', height: 160 },
  retakeBtn:    { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10, backgroundColor: '#f9fafb' },
  retakeText:   { fontSize: 13, color: NAVY, fontWeight: '600' },
});

function ReviewRow({ label, value, ok, last }: { label: string; value: string; ok?: boolean; last?: boolean }) {
  return (
    <View style={[styles.reviewRow, !last && styles.reviewRowBorder]}>
      <Text style={styles.reviewLabel}>{label}</Text>
      <Text style={[styles.reviewValue, ok === true && { color: GREEN }, ok === false && { color: '#dc2626' }]}>{value}</Text>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root:   { flex: 1, backgroundColor: '#f9fafb' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  backBtn:     { width: 38, height: 38, borderRadius: 12, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '800', color: NAVY },

  progressTrack: { height: 3, backgroundColor: '#e5e7eb' },
  progressFill:  { height: 3, backgroundColor: GOLD },
  stepRow:       { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 8, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  stepLbl:       { fontSize: 11, color: '#d1d5db', fontWeight: '600' },
  stepLblActive: { color: NAVY },
  stepLblDone:   { color: GOLD },

  scroll: { paddingHorizontal: 20, paddingTop: 20 },

  // Start screen
  tierCard:  { backgroundColor: '#fff', borderRadius: 18, borderWidth: 1, borderColor: '#e5e7eb', padding: 20, marginBottom: 20 },
  tierRow:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: 12 },
  tierLine:  { flex: 1, height: 2, backgroundColor: '#e5e7eb', marginHorizontal: 8, maxWidth: 60 },
  tierHint:  { fontSize: 13, color: '#6b7280', textAlign: 'center', lineHeight: 18 },

  sectionTitle: { fontSize: 14, fontWeight: '700', color: NAVY, marginBottom: 10 },

  unlockCard: { backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#e5e7eb', padding: 16, marginBottom: 20 },
  unlockRow:  { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  unlockIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: GOLD + '12', alignItems: 'center', justifyContent: 'center' },
  unlockText: { fontSize: 14, color: '#374151', fontWeight: '500' },

  needCard: { backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#e5e7eb', padding: 16, marginBottom: 20, gap: 12 },
  needRow:  { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  needText: { fontSize: 13, color: '#6b7280', flex: 1, lineHeight: 19 },

  privacyBox:  { flexDirection: 'row', alignItems: 'flex-start', gap: 9, backgroundColor: GOLD + '10', borderRadius: 14, borderWidth: 1, borderColor: GOLD + '30', padding: 13, marginBottom: 20 },
  privacyText: { flex: 1, fontSize: 12, color: '#92400e', lineHeight: 18 },

  // Form steps
  stepTitle: { fontSize: 22, fontWeight: '800', color: NAVY, marginBottom: 6 },
  stepSub:   { fontSize: 14, color: '#6b7280', marginBottom: 22, lineHeight: 20 },
  fieldLabel: { fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 },
  inputWrap:  { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#e5e7eb', borderRadius: 12, paddingHorizontal: 12 },
  input:      { paddingVertical: 12, fontSize: 15, color: '#111827' },

  chipRow:  { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  chip:     { paddingHorizontal: 13, paddingVertical: 7, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#e5e7eb' },
  chipActive: { backgroundColor: NAVY, borderColor: NAVY },
  chipText: { fontSize: 13, fontWeight: '600', color: '#6b7280' },
  chipTextActive: { color: '#fff' },

  // Document
  docTypeRow:      { flexDirection: 'row', gap: 8, marginBottom: 18 },
  docTypeCard:     { flex: 1, alignItems: 'center', paddingVertical: 14, gap: 7, borderRadius: 14, borderWidth: 2, borderColor: '#e5e7eb', backgroundColor: '#fff' },
  docTypeCardActive: { borderColor: GOLD, backgroundColor: GOLD + '08' },
  docTypeText:     { fontSize: 11, fontWeight: '700', color: '#9ca3af', textAlign: 'center' },
  docTypeTextActive: { color: NAVY },
  docHint:         { flexDirection: 'row', alignItems: 'center', gap: 6, padding: 10, backgroundColor: GOLD + '10', borderRadius: 10, marginTop: 4, marginBottom: 28 },
  docHintText:     { fontSize: 12, color: '#92400e', flex: 1 },

  // Selfie
  selfieBox:       { borderRadius: 18, borderWidth: 2, borderColor: '#e5e7eb', borderStyle: 'dashed', paddingVertical: 40, alignItems: 'center', backgroundColor: '#fff', marginBottom: 14, gap: 10 },
  selfieRing:      { width: 76, height: 76, borderRadius: 38, backgroundColor: '#f3f4f6', borderWidth: 2, borderColor: NAVY + '25', alignItems: 'center', justifyContent: 'center' },
  selfieBoxTitle:  { fontSize: 15, fontWeight: '700', color: NAVY },
  selfieBoxSub:    { fontSize: 12, color: '#9ca3af' },
  selfieAlt:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, paddingVertical: 12, marginBottom: 16 },
  selfieAltText:   { fontSize: 14, color: NAVY, fontWeight: '600' },
  selfiePreview:   { borderRadius: 14, overflow: 'hidden', marginBottom: 14 },
  selfieImg:       { width: '100%', height: 260 },
  selfieRetake:    { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 11, backgroundColor: '#f9fafb' },
  selfieRetakeText: { fontSize: 13, color: NAVY, fontWeight: '600' },
  selfieGuide:     { backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: '#e5e7eb', padding: 14, gap: 10, marginBottom: 28 },
  selfieGuideLine: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  selfieGuideText: { fontSize: 13, color: '#374151' },

  // Review
  reviewCard:   { backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#e5e7eb', padding: 16, marginBottom: 16 },
  reviewRow:    { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
  reviewRowBorder: { borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  reviewLabel:  { fontSize: 13, color: '#9ca3af', fontWeight: '500' },
  reviewValue:  { fontSize: 13, color: '#111827', fontWeight: '600', maxWidth: '60%', textAlign: 'right' },
  consentBox:   { flexDirection: 'row', alignItems: 'flex-start', gap: 9, backgroundColor: NAVY + '08', borderRadius: 14, borderWidth: 1, borderColor: NAVY + '15', padding: 13, marginBottom: 20 },
  consentText:  { flex: 1, fontSize: 12, color: '#374151', lineHeight: 18 },

  // Centre states (pending / verified)
  centreState:   { alignItems: 'center', paddingTop: 20, gap: 12 },
  pendingRing:   { width: 88, height: 88, borderRadius: 44, borderWidth: 2, borderColor: GOLD + '55', backgroundColor: GOLD + '10', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  verifiedRing:  { width: 88, height: 88, borderRadius: 44, borderWidth: 2, borderColor: GREEN + '55', backgroundColor: GREEN + '10', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  centreTitle:   { fontSize: 24, fontWeight: '900', color: NAVY, textAlign: 'center' },
  centreSub:     { fontSize: 14, color: '#6b7280', textAlign: 'center', lineHeight: 22, paddingHorizontal: 8 },

  pendingSteps:   { width: '100%', backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#e5e7eb', padding: 16, gap: 14, marginTop: 8 },
  pendingStep:    { flexDirection: 'row', alignItems: 'center', gap: 10 },
  pendingDot:     { width: 26, height: 26, borderRadius: 13, backgroundColor: '#f3f4f6', borderWidth: 1.5, borderColor: '#e5e7eb', alignItems: 'center', justifyContent: 'center' },
  pendingDotDone: { backgroundColor: GREEN, borderColor: GREEN },
  pendingLabel:   { fontSize: 14, color: '#9ca3af', fontWeight: '500' },
  pendingLabelDone: { color: '#111827', fontWeight: '600' },

  verifiedCard:  { width: '100%', backgroundColor: '#f0fdf4', borderRadius: 16, borderWidth: 1, borderColor: '#bbf7d0', padding: 16, gap: 12 },
  verifiedRow:   { flexDirection: 'row', alignItems: 'center', gap: 10 },
  verifiedText:  { fontSize: 14, color: '#166534', fontWeight: '500' },

  // Shared buttons
  btnPrimary:  { backgroundColor: NAVY, borderRadius: 14, paddingVertical: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 4, width: '100%' },
  btnText:     { color: '#fff', fontWeight: '700', fontSize: 16 },
  btnGhost:    { paddingVertical: 12, alignItems: 'center' },
  btnGhostText: { fontSize: 13, color: '#9ca3af', fontWeight: '500' },

  errBox:  { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#fef2f2', borderWidth: 1, borderColor: '#fecaca', borderRadius: 10, padding: 12, marginBottom: 16 },
  errText: { color: '#dc2626', fontSize: 13, flex: 1 },
});
