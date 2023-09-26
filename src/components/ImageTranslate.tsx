import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  DimensionValue,
} from 'react-native';
import React, {useState} from 'react';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import {MLKitTranslator, LANG_TAGS} from 'react-native-mlkit-translate-text';

interface ITranslateText {
  value: string;
  position: {
    top?: DimensionValue;
    left?: DimensionValue;
  };
}

const imageTextUrl =
  'https://imgv3.fotor.com/images/blog-richtext-image/How-to-Make-Text-Stand-Out-And-More-Readable.jpg';

const TranslateImage = () => {
  const [translateText, setTranslateText] = useState<ITranslateText[]>([]);

  const handleTranslateImage = () => {
    Image.getSize(imageTextUrl, async (width, height) => {
      const newState: ITranslateText[] = [];
      const result = await TextRecognition.recognize(imageTextUrl);
      for (let index = 0; index < result.blocks.length; index++) {
        const {frame} = result.blocks[index];
        const text = (await MLKitTranslator.translateText(
          result.blocks[index].text,
          LANG_TAGS.ENGLISH,
          LANG_TAGS.VIETNAMESE,
        )) as string;
        newState.push({
          value: text,
          position: {
            // @ts-ignore
            top: `${((frame?.top + frame?.width / 2) * 100) / height}%`,
            left: `${((frame?.left || 0) * 100) / width}%`,
          },
        });
      }
      console.log(newState);
      setTranslateText(newState);
    });
  };

  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
      }}>
      <View
        style={{
          position: 'relative',
          width: '90%',
          height: 200,
          backgroundColor: 'gray',
        }}>
        <Image
          resizeMode="contain"
          source={{uri: imageTextUrl}}
          style={{width: '100%', height: '100%'}}
        />
        {translateText.map((item, index) => (
          <View
            key={index}
            style={{
              position: 'absolute',
              top: item.position.top || 0,
              left: item.position.left || 0,
              backgroundColor: 'red',
            }}>
            <Text>{item.value}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity onPress={handleTranslateImage}>
        <Text>Translate Image</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TranslateImage;

const styles = StyleSheet.create({});
