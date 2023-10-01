import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  LANG_TAGS,
  LANG_TAGS_TYPE,
  MLKitTranslator,
} from 'react-native-mlkit-translate-text';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import TextTranslate from '@app/components/TextTranslate';
import {useNavigation} from '@react-navigation/native';
import Router from '@app/navigators/Router';
import Voice from '@react-native-voice/voice';

const getLanguageLabel = (lang: LANG_TAGS_TYPE) => {
  return Object.keys(LANG_TAGS).find((key: any) => {
    return LANG_TAGS[key] == lang;
  });
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [sourceLanguage, setSourceLanguage] = useState<LANG_TAGS_TYPE>(
    LANG_TAGS.ENGLISH,
  );
  const [targetLanguage, setTargetLanguage] = useState<LANG_TAGS_TYPE>(
    LANG_TAGS.VIETNAMESE,
  );
  const refTextTranslate = useRef(null);

  useEffect(() => {
    Promise.all([
      MLKitTranslator.downloadModel(LANG_TAGS.ENGLISH),
      MLKitTranslator.downloadModel(LANG_TAGS.VIETNAMESE),
    ]).finally(() => {
      setLoading(false);
    });

    Voice.isAvailable().then(res => {
      console.log('isAvailable', res);
    });
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const handleSwapLanguage = () => {
    setTargetLanguage(sourceLanguage);
    setSourceLanguage(targetLanguage);
  };

  Voice.onSpeechPartialResults = e => {
    refTextTranslate.current.setValue(e.value[0]);
    console.log('onSpeechPartialResults: ', e.value);
  };

  Voice.onSpeechRecognized = e => {
    console.log('onSpeechRecognized: ', e.isFinal);
  };

  Voice.onSpeechError = e => {
    console.log('onSpeechError: ', e.error?.message);
  };

  Voice.onSpeechResults = e => {
    refTextTranslate.current.setValue(e.value[0]);
    console.log('onSpeechResults: ', e.value);
  };

  Voice.onSpeechEnd = e => {
    console.log('onSpeechEnd: ', e.error);
  };

  return isLoading ? (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color={'green'} />
    </View>
  ) : (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}>
        <View style={styles.body}>
          <TextTranslate
            ref={refTextTranslate}
            sourceLang={sourceLanguage}
            targetLang={targetLanguage}
          />
        </View>
        <View style={styles.bottom}>
          <View style={styles.languageSelector}>
            <TouchableOpacity style={styles.languageButton}>
              <Text style={styles.languageLabel}>
                {getLanguageLabel(sourceLanguage)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSwapLanguage}
              style={styles.swapButton}>
              <AntDesign name="swap" size={25} color="#bbbbbb" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.languageButton}>
              <Text style={styles.languageLabel}>
                {getLanguageLabel(targetLanguage)}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.function_buttons}>
            <TouchableOpacity style={styles.conversation_button}>
              <Feather name="users" size={20} color="#FFF" />
            </TouchableOpacity>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                onPressIn={() => {
                  Voice.start(sourceLanguage);
                }}
                onPressOut={() => {
                  Voice.stop();
                }}
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#a8c7fa',
                }}>
                <Feather name="mic" size={22} color="#284a89" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(Router.IMAGE_TRANSLATOR);
              }}
              style={styles.conversation_button}>
              <Feather name="camera" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;
