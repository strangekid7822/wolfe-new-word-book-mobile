import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function ProfileScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>我的个人资料</Text>
          <Text style={styles.subtitle}>学习统计和个人信息</Text>
        </View>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>学习统计</Text>

          <View style={styles.statItem}>
            <Text style={styles.statLabel}>已学单词</Text>
            <Text style={styles.statValue}>0</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statLabel}>正确率</Text>
            <Text style={styles.statValue}>0%</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statLabel}>连续学习天数</Text>
            <Text style={styles.statValue}>0 天</Text>
          </View>
        </View>

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>返回</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginTop: 48,
    marginBottom: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4b5563',
  },
  statsCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
  },
  statsTitle: {
    color: '#1f2937',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statItem: {
    marginBottom: 12,
  },
  statLabel: {
    color: '#4b5563',
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    color: '#1f2937',
    fontSize: 24,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#e5e7eb',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#1f2937',
    fontSize: 16,
    fontWeight: '600',
  },
});
