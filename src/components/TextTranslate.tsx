import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {StyleSheet, Text} from 'react-native';
import {
  LANG_TAGS_TYPE,
  MLKitTranslator,
  translateText,
} from 'react-native-mlkit-translate-text';
import {Input} from '.';

interface TextTranslateProps {
  sourceLang: LANG_TAGS_TYPE;
  targetLang: LANG_TAGS_TYPE;
}
const TextTranslate = forwardRef((props: TextTranslateProps, ref) => {
  const {sourceLang, targetLang} = props;
  const [sourceText, setSourceText] = useState('');
  const [targetText, setTargetText] = useState('');
  const refSourceText = useRef('');
  const refTempLangs = useRef<TextTranslateProps>({sourceLang, targetLang});
  const timeout = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    setValue: (value: string) => {
      setSourceText(value);
      translate(value);
    },
  }));

  useEffect(() => {
    if (
      refTempLangs.current.sourceLang == targetLang &&
      refTempLangs.current.targetLang == sourceLang
    ) {
      setSourceText(targetText);
      setTargetText(refSourceText.current);
    }
    translate(refSourceText.current);
    refTempLangs.current = props;
  }, [props]);

  const onChangeText = (value: string) => {
    refSourceText.current = value;
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      MLKitTranslator.translateText(value, sourceLang, targetLang)
        .then(result => {
          setTargetText(result as string);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          clearTimeout(timeout.current);
        });
    }, 500);
  };

  const translate = (value: string) => {
    MLKitTranslator.translateText(value, sourceLang, targetLang).then(
      result => {
        setTargetText(result as string);
      },
    );
  };

  return (
    <>
      <Text style={styles.heading}>Enter text to translate</Text>
      <Input
        forceValue={sourceText}
        placeholder="Enter text here"
        placeholderTextColor="#6b6b6d"
        multiline
        textAlignVertical="top"
        style={styles.input}
        _onChangeText={onChangeText}
      />
      <Text style={styles.heading}>Text translated</Text>
      <Text style={styles.input}>{targetText}</Text>
    </>
  );
});

export default TextTranslate;

const styles = StyleSheet.create({
  heading: {
    width: '100%',
    fontSize: 20,
    marginBottom: 10,
    color: '#FFF',
  },
  input: {
    width: '100%',
    height: 150,
    color: '#6b6b6d',
    fontSize: 18,
  },
});
