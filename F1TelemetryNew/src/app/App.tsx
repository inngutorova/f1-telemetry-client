// App.tsx
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import TelemetryScreen from "../pages/TelemetryScreen";
import { HomeScreen } from "../pages/HomeScreen";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <TelemetryScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1422", // под цвет твоего дизайна
  },
});