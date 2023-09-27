import {Dimensions, NativeModules, Platform} from 'react-native';

const {height, width} = Dimensions.get('window');
const {StatusBarManager} = NativeModules;
export const orientations = {
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape',
};

const getOrientation = (height, width) => {
  return width < height ? orientations.PORTRAIT : orientations.LANDSCAPE;
};

const isIOS = Platform.OS === 'ios';
const isIPhoneX = isIOS && !Platform.isTV && (height >= 812 || width >= 812);

const isTablet = width > 430;
const isSmallScreen = width < 350;
const HIT_SLOP = {
  top: 8,
  right: 8,
  bottom: 8,
  left: 8,
};
let statusHeight = StatusBarManager.HEIGHT;
if (isIOS) {
  StatusBarManager.getHeight(data => (statusHeight = data.height));
}

const Metrics = {
  DEVICE_WIDTH: width,
  DEVICE_HEIGHT: height,
  STATUS_BAR_HEIGHT: statusHeight,
  DEFAULT_HEADER_HEIGHT: 40,
  MARGIN_ITEM: height > 600 ? 8 : 6,
  HOME_MARGIN_ITEM: height > 600 ? 12 : 8,
  TEXT_INPUT_HEIGHT: height > 600 ? 53 : 33,
  BTN_BACK_SIZE: height > 600 ? 48 : 36,
  isSmallScreen,
  HIT_SLOP,
  isTablet,
  isIPhoneX,
  getSafeAreaInsets: () => {
    const orientation = getOrientation(height, width);
    return orientation === orientations.LANDSCAPE
      ? {left: 44, right: 44, bottom: 24, top: 0}
      : {left: 0, right: 0, bottom: 34, top: 44};
  },
};

export default Metrics;
