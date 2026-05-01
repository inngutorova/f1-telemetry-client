import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import AppNavigator from "./AppNavigator";
import { useSettingsStore } from "../features/settings/model/settingsStore";

export default function App() {
  const loadSettings = useSettingsStore((s) => s.loadSettings);
  const isLoading = useSettingsStore((s) => s.isLoading);

  useEffect(() => {
    loadSettings();
  }, []);

  // ⛔️ не рендерим приложение, пока настройки не загрузились
  if (isLoading) {
    return null; // или splash экран
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1422",
  },
});