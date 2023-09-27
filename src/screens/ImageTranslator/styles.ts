import {Metrics} from '@app/utils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#303030',
  },
  back_button: {
    position: 'absolute',
    top: Metrics.STATUS_BAR_HEIGHT + 20,
    left: 12,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  translate_item: {
    position: 'absolute',
    backgroundColor: 'red',
    zIndex: 1,
  },
});

export default styles;
