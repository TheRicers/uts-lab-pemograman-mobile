import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Status aktivitas yang didukung oleh InfoCard.
 * 'selesai' -> badge hijau, 'proses' -> badge oranye.
 */
export type StatusTugas = 'selesai' | 'proses';

export type InfoCardProps = {
  /** Judul tugas / informasi yang ditampilkan pada kartu. */
  title: string;
  /** Status aktivitas: 'selesai' atau 'proses'. */
  status: StatusTugas;
  /** Callback yang dijalankan saat tombol "Lihat Detail" ditekan. */
  onPress: () => void;
};

export default function InfoCard({ title, status, onPress }: InfoCardProps) {
  // Conditional styling: hijau untuk 'selesai', oranye untuk 'proses'.
  const isSelesai = status === 'selesai';

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        <View
          style={[
            styles.badge,
            isSelesai ? styles.badgeSelesai : styles.badgeProses,
          ]}
        >
          <View
            style={[
              styles.dot,
              isSelesai ? styles.dotSelesai : styles.dotProses,
            ]}
          />
          <Text
            style={[
              styles.badgeText,
              isSelesai ? styles.badgeTextSelesai : styles.badgeTextProses,
            ]}
          >
            {isSelesai ? 'Selesai' : 'Proses'}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.75}
        accessibilityRole="button"
        accessibilityLabel={`Lihat detail ${title}`}
      >
        <Text style={styles.buttonText}>Lihat Detail</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111C2E',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
    padding: 16,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#F1F5F9',
    lineHeight: 20,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  badgeSelesai: {
    backgroundColor: '#052E16',
  },
  badgeProses: {
    backgroundColor: '#431407',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotSelesai: {
    backgroundColor: '#22C55E',
  },
  dotProses: {
    backgroundColor: '#F97316',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  badgeTextSelesai: {
    color: '#4ADE80',
  },
  badgeTextProses: {
    color: '#FB923C',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#1E293B',
    marginVertical: 14,
  },
  button: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
