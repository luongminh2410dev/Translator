import i18n from 'i18next';
// import {en, ja, vi} from '@app/translations';
import {initReactI18next} from 'react-i18next';
// import languageDetectorPlugin from '@app/utils/languageDetectorPlugin';

// const resources = {
//   en: {
//     translation: en,
//   },
//   ja: {
//     translation: ja,
//   },
//   vi: {
//     translation: vi,
//   },
// };

i18n
  .use(initReactI18next)
  //   .use(languageDetectorPlugin)
  .init({
    compatibilityJSON: 'v3',
    // resources,
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
