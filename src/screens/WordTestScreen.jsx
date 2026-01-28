import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import questionService from '../services/questionService';

export default function WordTestScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    loadLibraryAndGenerateQuestion();
  }, []);

  const loadLibraryAndGenerateQuestion = async () => {
    setIsLoading(true);
    const success = await questionService.loadLibrary('PEP_2022_grade7_up.json');

    if (success) {
      const newQuestion = questionService.generateQuestion();
      setQuestion(newQuestion);
    }

    setIsLoading(false);
  };

  const handleNextQuestion = () => {
    const newQuestion = questionService.generateQuestion();
    setQuestion(newQuestion);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>加载中...</Text>
      </View>
    );
  }

  if (!question) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>无法加载单词</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>返回</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backLink}>← 返回</Text>
        </TouchableOpacity>
      </View>

      {/* Word Card */}
      <View style={styles.wordCard}>
        <Text style={styles.word}>{question.word}</Text>

        {question.phonetic && (
          <Text style={styles.phonetic}>{question.phonetic}</Text>
        )}

        {question.partOfSpeech && (
          <Text style={styles.partOfSpeech}>{question.partOfSpeech}</Text>
        )}

        <Text style={styles.meaning}>{question.correctMeaning}</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        <Text style={styles.optionsTitle}>选择正确的含义：</Text>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={handleNextQuestion}
      >
        <Text style={styles.nextButtonText}>下一个单词</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: '#4b5563',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorTitle: {
    fontSize: 20,
    color: '#1f2937',
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  backButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 24,
  },
  header: {
    marginTop: 48,
    marginBottom: 32,
  },
  backLink: {
    color: '#3b82f6',
    fontSize: 16,
  },
  wordCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 24,
    padding: 32,
    marginBottom: 24,
  },
  word: {
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  phonetic: {
    textAlign: 'center',
    fontSize: 18,
    color: '#4b5563',
    marginBottom: 8,
  },
  partOfSpeech: {
    textAlign: 'center',
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  meaning: {
    textAlign: 'center',
    fontSize: 16,
    color: '#374151',
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionsTitle: {
    color: '#1f2937',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  option: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  optionText: {
    color: '#1f2937',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
