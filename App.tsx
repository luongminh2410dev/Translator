import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Alert, Button} from 'react-native';
import TranslateText, {
  TranslateLanguage,
} from '@react-native-ml-kit/translate-text';
import IdentifyLanguages from '@react-native-ml-kit/identify-languages';

const App = () => {
  const [text, setText] = useState('');
  const timeout = useRef<any>(null);

  const onChangeText = (value: string) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      TranslateText.translate({
        text: value,
        sourceLanguage: TranslateLanguage.ENGLISH,
        targetLanguage: TranslateLanguage.VIETNAMESE,
        downloadModelIfNeeded: true,
      })
        .then(result => {
          setText(result as string);
        })
        .catch(error => {
          Alert.alert(error);
        })
        .finally(() => {
          clearTimeout(timeout.current);
        });
    }, 500);
  };
  useEffect(() => {
    IdentifyLanguages.identify('Xin chào').then(res => {
      // console.log(res);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter text to translate</Text>
      <TextInput
        placeholder="Enter text here"
        multiline
        textAlignVertical="top"
        style={styles.input}
        onChangeText={onChangeText}
      />
      <Text style={styles.translate_text}>{text}</Text>
      {/* <Button title="Translate into Spanish" onPress={handlePress} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  input: {
    height: 100,
    width: '90%',
    padding: 15,
    backgroundColor: '#eee',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  translate_text: {
    marginTop: 12,
    fontSize: 15,
  },
});

export default App;
