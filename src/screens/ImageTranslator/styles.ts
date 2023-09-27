import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#303030',
  },
  back_button: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  translate_item: {
    position: 'absolute',
    backgroundColor: '#FFF',
    zIndex: 1,
  },
});

export default styles;
