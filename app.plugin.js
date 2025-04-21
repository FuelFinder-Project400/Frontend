const { withAndroidManifest } = require('expo/config-plugins');

module.exports = (config) => {
  return withAndroidManifest(config, (newConfig) => {
    const mainApplication = newConfig.modResults.manifest.application[0];
    mainApplication['meta-data'] = mainApplication['meta-data'] || [];
    
    mainApplication['meta-data'].push({
      $: {
        'android:name': 'com.google.android.geo.API_KEY',
        'android:value': process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
      }
    });
    
    return newConfig;
  });
};
