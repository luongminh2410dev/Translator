import Voice from '@react-native-voice/voice';
import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {LANG_TAGS} from 'react-native-mlkit-translate-text';

const VoiceTranslate = () => {
  useEffect(() => {
    Voice.isAvailable().then(res => {
      console.log('isAvailable', res);
    });

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startSpeechToText = () => {
    Voice.start(LANG_TAGS.VIETNAMESE);
  };

  const endSpeechToText = () => {
    Voice.stop();
  };

  Voice.onSpeechPartialResults = e => {
    console.log('onSpeechPartialResults: ', e.value);
  };

  Voice.onSpeechRecognized = e => {
    console.log('onSpeechRecognized: ', e.isFinal);
  };

  Voice.onSpeechError = e => {
    console.log('onSpeechError: ', e.error?.message);
  };

  Voice.onSpeechResults = e => {
    console.log('onSpeechResults: ', e.value);
  };

  Voice.onSpeechEnd = e => {
    console.log('onSpeechEnd: ', e.error);
  };

  return (
    <TouchableOpacity
      onPressIn={startSpeechToText}
      onPressOut={endSpeechToText}>
      <Text>Speech to Text</Text>
    </TouchableOpacity>
  );
};

export default VoiceTranslate;

const styles = StyleSheet.create({});
