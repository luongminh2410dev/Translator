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
import {Metrics} from '@app/utils';
interface ITranslateText {
  value: string;
  widthPercent: number;
  topPercent: number;
  leftPercent: number;
}

const {width, height} = Dimensions.get('window');

const TranslateItem = (props: any) => {
  const {pixelRatio, block} = props;
  const top = block.frame.x * pixelRatio + Metrics.STATUS_BAR_HEIGHT;
  const left = block.frame.y * pixelRatio;
  const _width = width - left - 12;
  return (
    <View
      style={{
        position: 'absolute',
        left,
        top,
        // width: _width,
        backgroundColor: 'white',
        padding: 4,
        borderRadius: 6,
        zIndex: 10,
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
    </View>
  );
};

const ImageTranslator = () => {
  const navigation = useNavigation();
  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(false);
  const [translateItems, setTranslateItems] = useState<any[]>([]);
  const [pixelRatio, setPixelRatio] = React.useState<number>(1);
  const flagHandleEnable = useRef(true);

  const camera = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const handleTranslateImage = async (scanned: OCRFrame) => {
    if (!flagHandleEnable.current) return;
    flagHandleEnable.current = false;
    const {result} = scanned;
    if (result.blocks.length == 0) {
      translateItems.length != 0 && setTranslateItems([]);
      flagHandleEnable.current = true;
      return;
    }
    const newState: any = [];
    for (let index = 0; index < result.blocks.length; index++) {
      if (result.blocks[index].text == translateItems[index]?.originText) {
        newState.push(translateItems[index].originText);
        break;
      }
      const wordParsed = await MLKitTranslator.translateText(
        result.blocks[index].text,
        LANG_TAGS.ENGLISH,
        LANG_TAGS.VIETNAMESE,
      );
      newState.push({
        ...result.blocks[index],
        text: wordParsed,
        originText: result.blocks[index].text,
      });
    }
    setTranslateItems(newState);
    const timeout = setTimeout(() => {
      flagHandleEnable.current = true;
      clearTimeout(timeout);
    }, 1000);
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
      {translateItems.map((block, index) => {
        if (block.text.length == 1) return;
        const itemWidth = block.frame?.width || 0;
        const left = block.frame.x * pixelRatio - (itemWidth * pixelRatio) / 2;
        const top = block.frame.y * pixelRatio;
        const maxWidth = width - left;
        return (
          <View
            key={index}
            style={{
              position: 'absolute',
              left,
              top,
              width: itemWidth,
              maxWidth,
              backgroundColor: 'white',
              padding: 4,
              borderRadius: 6,
              zIndex: index + 10,
            }}>
            <Text
              style={{
                width: '100%',
                fontSize: 15,
                color: '#000',
              }}>
              {block.text}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default ImageTranslator;
