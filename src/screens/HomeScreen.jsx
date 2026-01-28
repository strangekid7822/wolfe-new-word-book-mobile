import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>单词王者</Text>
          <Text style={styles.subtitle}>欢迎回来！开始你的学习之旅</Text>
        </View>

        {/* Start Learning Button */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('WordTest')}
        >
          <Text style={styles.primaryButtonTitle}>开始练习</Text>
          <Text style={styles.primaryButtonSubtitle}>测试你的单词拼写能力</Text>
        </TouchableOpacity>

        {/* Profile Button */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.secondaryButtonTitle}>我的个人资料</Text>
          <Text style={styles.secondaryButtonSubtitle}>查看学习进度和统计</Text>
        </TouchableOpacity>

        {/* Info Section */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>💡 提示</Text>
          <Text style={styles.infoText}>
            每天练习15分钟，持续进步。记住，掌握单词是学好英语的关键！
          </Text>
        </View>
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
  primaryButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryButtonTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  primaryButtonSubtitle: {
    color: '#ffffff',
    fontSize: 14,
  },
  secondaryButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
  },
  secondaryButtonTitle: {
    color: '#1f2937',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  secondaryButtonSubtitle: {
    color: '#4b5563',
    fontSize: 14,
  },
  infoBox: {
    marginTop: 32,
    padding: 24,
    backgroundColor: '#eff6ff',
    borderRadius: 16,
  },
  infoTitle: {
    color: '#1f2937',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    color: '#4b5563',
    fontSize: 14,
  },
});
