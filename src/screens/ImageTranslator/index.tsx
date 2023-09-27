import TextRecognition from '@react-native-ml-kit/text-recognition';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {LANG_TAGS, MLKitTranslator} from 'react-native-mlkit-translate-text';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';
interface ITranslateText {
  value: string;
  position: {
    top: string;
    left: string;
  };
}

const {width, height} = Dimensions.get('screen');
const ImageTranslator = () => {
  const navigation = useNavigation();
  const [translateItems, setTranslateItems] = useState<ITranslateText[]>([]);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    ImagePicker.openCamera({
      width: width,
      height: height,
      useFrontCamera: true,
    }).then(image => {
      setImageUrl(image.path);
      handleTranslateImage(image.path);
    });
    return () => {
      ImagePicker.clean();
    };
  }, []);

  const handleTranslateImage = (url: string) => {
    Image.getSize(url, async (width, height) => {
      const newState: ITranslateText[] = [];
      const result = await TextRecognition.recognize(url);
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
      setTranslateItems(newState);
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.back_button}>
        <AntDesign name="close" size={26} color="#FFF" />
      </TouchableOpacity>
      {!!imageUrl && <Image source={{uri: imageUrl}} style={styles.image} />}
      {translateItems.map((item, index) => (
        <View
          key={index}
          style={[
            styles.translate_item,
            {
              top: item.position.top || 0,
              left: item.position.left || 0,
            },
          ]}>
          <Text>{item.value}</Text>
        </View>
      ))}
    </View>
  );
};

export default ImageTranslator;
