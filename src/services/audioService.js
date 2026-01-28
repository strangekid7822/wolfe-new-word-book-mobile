import * as Speech from 'expo-speech';

class AudioService {
  constructor() {
    this.isPlaying = false;
  }

  /**
   * Speak a word with English pronunciation
   * @param {string} word - Word to pronounce
   * @param {Object} options - Speech options
   * @returns {Promise<boolean>} - Success status
   */
  async speakWord(word, options = {}) {
    try {
      // Stop any current speech
      this.stop();

      this.isPlaying = true;

      await Speech.speak(word, {
        language: options.lang || 'en-US',
        rate: options.rate || 0.8, // Slightly slower for learning
        pitch: options.pitch || 1.0,
        volume: options.volume || 1.0,
        onDone: () => {
          this.isPlaying = false;
        },
        onError: (error) => {
          console.error('Speech synthesis error:', error);
          this.isPlaying = false;
        }
      });

      return true;
    } catch (error) {
      console.error('Error in speakWord:', error);
      this.isPlaying = false;
      return false;
    }
  }

  /**
   * Stop current speech
   */
  stop() {
    if (this.isPlaying) {
      Speech.stop();
      this.isPlaying = false;
    }
  }

  /**
   * Check if currently speaking
   * @returns {boolean}
   */
  isSpeaking() {
    return this.isPlaying;
  }

  /**
   * Check if speech synthesis is supported
   * @returns {boolean}
   */
  isAudioSupported() {
    return true; // Expo Speech is always supported on mobile
  }
}

// Create and export singleton instance
const audioService = new AudioService();
export default audioService;
