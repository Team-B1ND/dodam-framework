import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { iosSlideTransition } from "./iosSlideTransition";
import { HomePage } from "@pages/home";
import { AppWebViewPage } from "@pages/app-webview";

const Stack = createStackNavigator();

export const RootStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      ...iosSlideTransition,
      headerShown: false,
    }}
  >
    <Stack.Screen name="Home" component={HomePage} />
    <Stack.Screen
      name="AppWebView"
      component={AppWebViewPage}
      options={{ gestureEnabled: false }}
    />
  </Stack.Navigator>
);