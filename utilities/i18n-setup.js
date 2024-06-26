const i18n = require('i18n');
const path = require('path');

i18n.configure({
    locales: ['en', 'hi'], // List all supported languages
    directory: path.join(__dirname, '..', 'locales'), // Directory where translation files are stored
    defaultLocale: 'en',
    objectNotation: true, // Allows for nested translation keys
    updateFiles: false, // Prevents overwriting locale files
    syncFiles: false,
    autoReload: true, // Automatically reload translation files when changed
    api: {
        __: 'translate', // Now req.__ becomes req.translate
        __n: 'translateN' // Now req.__n becomes req.translateN
    }
});

module.exports = i18n;
