import {LoadingAbsolute} from '@app/components';
import TextRecognition, {
  TextBlock,
} from '@react-native-ml-kit/text-recognition';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {LANG_TAGS, MLKitTranslator} from 'react-native-mlkit-translate-text';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';

interface ITranslateText {
  value: string;
  widthPercent: number;
  topPercent: number;
  leftPercent: number;
}

const {width, height} = Dimensions.get('screen');
const ImageTranslator = () => {
  const navigation = useNavigation();
  const [translateItems, setTranslateItems] = useState<ITranslateText[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    ImagePicker.openCamera({
      width: width,
      height: height,
      useFrontCamera: true,
    })
      .then(image => {
        setImageUrl(image.path);
        handleTranslateImage(image.path);
      })
      .catch(err => {
        console.log(err);
      });

    return () => {
      ImagePicker.clean();
    };
  }, []);

  const handleTranslateImage = async (url: string) => {
    const newState: ITranslateText[] = [];
    Image.getSize(url, async (width, height) => {
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
          topPercent: ((frame?.top || 0) * 100) / height,
          leftPercent: ((frame?.left || 0) * 100) / width,
          widthPercent: (((frame?.width || 0) * 100) / width) as never,
        });
      }
      console.log(JSON.stringify(result.blocks[0]));
      setLoading(false);
      setTranslateItems(newState);
    });
  };
  console.log(translateItems[0]);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.back_button}>
        <AntDesign name="close" size={26} color="#FFF" />
      </TouchableOpacity>
      {!!imageUrl && (
        <ImageBackground
          resizeMode="contain"
          source={{uri: imageUrl}}
          style={styles.image}
        />
      )}
      {translateItems.map((item, index) => (
        <View
          key={index}
          style={[
            styles.translate_item,
            {
              top: `${item.topPercent || 0}%`,
              left: `${item.leftPercent || 0}%`,
              // width: `${item.widthPercent}%`,
              maxWidth: `${100 - item.leftPercent - 1}%`,
            },
          ]}>
          <Text>{item.value}</Text>
        </View>
      ))}
      {isLoading && <LoadingAbsolute />}
    </View>
  );
};

export default ImageTranslator;
