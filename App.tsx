import React, {useRef, useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {LANG_TAGS, MLKitTranslator} from 'react-native-mlkit-translate-text';

const App = () => {
  const [text, setText] = useState('');
  const timeout = useRef<any>(null);

  const onChangeText = (value: string) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      MLKitTranslator.translateText(
        value,
        LANG_TAGS.ENGLISH,
        LANG_TAGS.VIETNAMESE,
      )
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
