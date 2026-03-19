import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@shared/theme";

const DEFAULT_URL = "";

export const HomePage = () => {
  const navigation = useNavigation<any>();
  const { top } = useSafeAreaInsets();
  const { colors } = useTheme();

  const [url, setUrl] = useState(DEFAULT_URL);

  const handleOpenWebView = () => {
    if (!url.trim()) return;
    navigation.navigate("AppWebView", {
      appUrl: url.trim(),
      name: "Test WebView",
    });
  };

  return (
    <View style={[styles.container, { paddingTop: top + 20, backgroundColor: colors.background.default }]}>
      <Text style={[styles.title, { color: colors.text.primary }]}>
        WebView Test
      </Text>
      <Text style={[styles.subtitle, { color: colors.text.tertiary }]}>
        URL을 입력하고 버튼을 눌러 WebView를 테스트하세요
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.background.surface,
            borderColor: colors.border.normal,
            color: colors.text.primary,
          },
        ]}
        value={url}
        onChangeText={setUrl}
        placeholder="https://example.com"
        placeholderTextColor={colors.text.placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="url"
      />

      <Pressable
        style={[styles.button, { backgroundColor: colors.brand.primary }]}
        onPress={handleOpenWebView}
      >
        <Text style={styles.buttonText}>WebView 열기</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 32,
  },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 15,
    marginBottom: 16,
  },
  button: {
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});