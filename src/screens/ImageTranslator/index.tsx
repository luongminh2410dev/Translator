import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import ImagePicker from 'react-native-image-crop-picker';

const {width, height} = Dimensions.get('screen');
const ImageTranslator = () => {
  const [translateItems, setTranslateItems] = useState([]);

  useEffect(() => {
    ImagePicker.openCamera({
      width: width,
      height: height,
    }).then(image => {
      console.log(image);
    });
    return () => {
      ImagePicker.clean();
    };
  }, []);

  return (
    <View>
      <Text>ImageTranslator</Text>
    </View>
  );
};

export default ImageTranslator;
