import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import InfoCard from './src/components/InfoCard';
import { DAFTAR_MAHASISWA } from './src/data/mahasiswa';

export default function App() {
  // State keyword pencarian (controlled input).
  const [keyword, setKeyword] = useState('');

  // Sesi yang daftar hadirnya sedang dibuka. Default: sesi yang masih berlangsung.
  const [sesiAktif, setSesiAktif] = useState('Pemograman Mobile — Sesi 8');

  // Filter real-time & case-insensitive menggunakan .filter() + .toLowerCase().
  // Nilai diturunkan langsung dari state, jadi hasil selalu ikut berubah saat mengetik.
  const hasilFilter = DAFTAR_MAHASISWA.filter((mahasiswa) =>
    mahasiswa.nama.toLowerCase().includes(keyword.toLowerCase())
  );

  // Callback yang dipanggil oleh prop onPress pada InfoCard.
  // Memilih sesi akan mengganti daftar hadir yang sedang ditampilkan.
  const bukaSesi = (judul: string) => {
    setSesiAktif(judul);
    Alert.alert('Sesi aktif', `Daftar hadir untuk "${judul}" dibuka.`);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
        <StatusBar style="light" />

        <View style={styles.header}>
          <Text style={styles.headerTitle}>AbsensiKu</Text>
          <Text style={styles.headerSubtitle}>
            Pilih sesi hari ini, lalu cari nama mahasiswa
          </Text>
        </View>

        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={keyword}
            onChangeText={setKeyword}
            placeholder="Cari nama mahasiswa..."
            placeholderTextColor="#7C8CA3"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
            keyboardAppearance="dark"
          />
          {keyword.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setKeyword('')}
              accessibilityRole="button"
              accessibilityLabel="Hapus kata kunci"
              hitSlop={8}
            >
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={hasilFilter}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.studentRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.nama.charAt(0)}</Text>
              </View>
              <View style={styles.studentInfo}>
                <Text style={styles.studentName}>{item.nama}</Text>
                <Text style={styles.studentProdi}>{item.prodi}</Text>
              </View>
              <Text style={styles.studentCode}>#{item.id}</Text>
            </View>
          )}
          ListHeaderComponent={
            <View>
              <Text style={styles.sectionLabel}>Sesi Hari Ini</Text>

              {/* InfoCard dirender lebih dari satu kali dengan data berbeda.
                  Menekan "Lihat Detail" akan memilih sesi tersebut. */}
              <InfoCard
                title="Pemograman Mobile — Sesi 8"
                status="proses"
                onPress={() => bukaSesi('Pemograman Mobile — Sesi 8')}
              />
              <InfoCard
                title="Jaringan Terapan — Sesi 7"
                status="selesai"
                onPress={() => bukaSesi('Jaringan Terapan — Sesi 7')}
              />
              <InfoCard
                title="Statistika & Probabilitas — Sesi 6"
                status="selesai"
                onPress={() => bukaSesi('Statistika & Probabilitas — Sesi 6')}
              />

              <View style={styles.sesiAktifBar}>
                <View style={styles.sesiAktifDot} />
                <Text style={styles.sesiAktifText} numberOfLines={1}>
                  Sesi aktif:{' '}
                  <Text style={styles.sesiAktifNama}>{sesiAktif}</Text>
                </Text>
              </View>

              <View style={styles.listHeaderRow}>
                <Text style={styles.sectionLabel}>Daftar Hadir</Text>
                <Text style={styles.resultCount}>
                  {hasilFilter.length} / {DAFTAR_MAHASISWA.length}
                </Text>
              </View>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Data tidak ditemukan!</Text>
              <Text style={styles.emptyHint}>
                Tidak ada mahasiswa bernama "{keyword}" pada daftar hadir sesi
                ini.
              </Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0B1220',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    marginTop: 2,
    fontSize: 13,
    color: '#8595AB',
  },
  searchWrapper: {
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 4,
    justifyContent: 'center',
  },
  searchInput: {
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
    backgroundColor: '#111C2E',
    paddingHorizontal: 16,
    paddingRight: 44,
    fontSize: 14,
    color: '#F1F5F9',
  },
  clearButton: {
    position: 'absolute',
    right: 12,
    height: 22,
    width: 22,
    borderRadius: 11,
    backgroundColor: '#243349',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#CBD5E1',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#8595AB',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  sesiAktifBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
    marginBottom: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#111C2E',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  sesiAktifDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#60A5FA',
  },
  sesiAktifText: {
    flex: 1,
    fontSize: 12,
    color: '#8595AB',
  },
  sesiAktifNama: {
    fontWeight: '800',
    color: '#F1F5F9',
  },
  listHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
    marginBottom: 0,
  },
  resultCount: {
    fontSize: 11,
    fontWeight: '700',
    color: '#60A5FA',
    marginBottom: 10,
  },
  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#111C2E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1E3A8A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#BFDBFE',
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F1F5F9',
  },
  studentProdi: {
    marginTop: 1,
    fontSize: 12,
    color: '#8595AB',
  },
  studentCode: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7C8CA3',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: '#111C2E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    borderStyle: 'dashed',
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#F1F5F9',
  },
  emptyHint: {
    marginTop: 6,
    fontSize: 12,
    color: '#8595AB',
    textAlign: 'center',
  },
});
