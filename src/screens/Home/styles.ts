import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
  },
  body: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#141416',
  },
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
  translate_text: {
    marginTop: 12,
    fontSize: 15,
  },
  bottom: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  languageSelector: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageButton: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: '#141416',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  swapButton: {
    marginHorizontal: 12,
  },
  languageLabel: {
    fontSize: 15,
    color: '#FFF',
  },
  function_buttons: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  conversation_button: {
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#034a76',
  },
});

export default styles;
