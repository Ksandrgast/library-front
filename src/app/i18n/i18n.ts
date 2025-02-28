// Libraries
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

// Imports
import en from './locales/en.json';
import ru from './locales/ru.json';
import kk from './locales/kk.json';

const locale = localStorage.getItem('locale') || 'ru';

i18n.use(initReactI18next)
    .init({
        resources: {
            en: {translation: en},
            ru: {translation: ru},
            kk: {translation: kk},
        },
        lng: locale,
        fallbackLng: 'ru',
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    }).then(r => r);
