import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FF3B30" />
      <Text style={styles.text}>Loading session...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    marginTop: 12,
    fontSize: 16,
  },
});