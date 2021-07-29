import * as React from "react";
import { Image, StatusBar } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "./navigation/Stack";

function cacheImages(images: string[]) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts: any) {
  return fonts.map((font: any) => Font.loadAsync(font));
}

export default function App() {
  const [loading, setLoading] = React.useState(true);

  const cacheResourcesAsync = async () => {
    const imageAssets = cacheImages([
      "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
      require("./assets/splash.png"),
    ]);

    const fontAssets = cacheFonts([FontAwesome.font]);

    await Promise.all([...imageAssets, ...fontAssets]);
  };

  const onFinish = () => setLoading(false);

  return loading ? (
    <AppLoading
      startAsync={cacheResourcesAsync}
      onFinish={onFinish}
      onError={console.warn}
    />
  ) : (
    <>
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
      <StatusBar barStyle="light-content" />
    </>
  );
}
