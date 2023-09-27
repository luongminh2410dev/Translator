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

  useEffect(() => {
    Promise.all([
      MLKitTranslator.downloadModel(LANG_TAGS.ENGLISH),
      MLKitTranslator.downloadModel(LANG_TAGS.VIETNAMESE),
    ]).finally(() => {
      setLoading(false);
    });
  }, []);

  const handleSwapLanguage = () => {
    setTargetLanguage(sourceLanguage);
    setSourceLanguage(targetLanguage);
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
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                  backgroundColor: '#a8c7fa',
                }}></TouchableOpacity>
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
