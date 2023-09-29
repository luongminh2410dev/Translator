import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  LayoutChangeEvent,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {LANG_TAGS, MLKitTranslator} from 'react-native-mlkit-translate-text';
import {runOnJS} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {OCRFrame, scanOCR} from 'vision-camera-ocr';
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
  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(false);
  const [translateItems, setTranslateItems] = useState<any[]>([]);
  const [pixelRatio, setPixelRatio] = React.useState<number>(1);

  const camera = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const handleTranslateImage = async (scanned: OCRFrame) => {
    const {result} = scanned;
    if (result.blocks.length == 0) {
      translateItems.length != 0 && setTranslateItems([]);
      return;
    }
    const newState: any = [];
    for (let index = 0; index < result.blocks.length; index++) {
      const wordParsed = await MLKitTranslator.translateText(
        result.blocks[index].text,
        LANG_TAGS.ENGLISH,
        LANG_TAGS.VIETNAMESE,
      );
      newState.push({...result.blocks[index], text: wordParsed});
    }
    setTranslateItems(newState);
  };

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const scannedOcr = scanOCR(frame);
    runOnJS(handleTranslateImage)(scannedOcr);
  }, []);

  if (!hasPermission || !isFocused || !device) return null;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.back_button}>
        <AntDesign name="close" size={26} color="#FFF" />
      </TouchableOpacity>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        video={false}
        audio={false}
        frameProcessorFps={1}
        frameProcessor={frameProcessor}
        onLayout={(event: LayoutChangeEvent) => {
          setPixelRatio(
            event.nativeEvent.layout.width /
              PixelRatio.getPixelSizeForLayoutSize(
                event.nativeEvent.layout.width,
              ),
          );
        }}
      />
      <View style={{zIndex: 10}}>
        {translateItems.map((block, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              // Clipboard.setString(block.text);
              // Alert.alert(`"${block.text}" copied to the clipboard`);
            }}
            style={{
              position: 'absolute',
              left: block.frame.x * pixelRatio,
              top: block.frame.y * pixelRatio,
              backgroundColor: 'white',
              padding: 4,
              borderRadius: 6,
              zIndex: 1,
            }}>
            <Text
              style={{
                fontSize: 15,
                justifyContent: 'center',
                textAlign: 'center',
                color: '#000',
              }}>
              {block.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ImageTranslator;
