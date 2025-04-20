import 'expo-router/entry';

export default {
  expo: {
    name: "FuelFinder",
    slug: "FuelFinder",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    permissions: [
      "ACCESS_FINE_LOCATION",
      "ACCESS_COARSE_LOCATION"
    ],
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSPhotoLibraryUsageDescription: "We need access to your photo library to upload your profile picture.",
        NSCameraUsageDescription: "We need access to your camera to take profile pictures.",
        ITSAppUsesNonExemptEncryption: false
      },
      bundleIdentifier: "com.matthew0blain.FuelFinder"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon.png",
        backgroundColor: "#ffffff"
      },
      permissions: [
        "CAMERA",
        "READ_EXTERNAL_STORAGE"
      ],
      package: "com.matthew0blain.FuelFinder"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/icon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: "29fe4ffd-2ce5-4545-9d29-dc36161cfe25"
      }
    }
  }
};
