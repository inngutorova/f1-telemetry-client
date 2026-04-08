// src/pages/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { SessionCard } from './components/SessionCard';
import { UISession, MOCK_UI_SESSIONS } from '../entities/session/model/types';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [sessions, setSessions] = useState<UISession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      setTimeout(() => {
        setSessions(MOCK_UI_SESSIONS);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to load sessions:', error);
      setLoading(false);
    }
  };

  const handleSessionPress = (session: UISession, watchFromStart: boolean) => {
    // Навигация на экран телеметрии
    navigation.navigate('Telemetry', {
      sessionId: session.id,
      sessionMeta: session.meta,
      watchFromStart,
      isLive: session.isLive && !watchFromStart,
    });
  };

  const activeSessions = sessions.filter(s => s.isLive);
  const archiveSessions = sessions.filter(s => !s.isLive && s.hasReplay);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF3B30" />
        <Text style={styles.loadingText}>Loading session...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {activeSessions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Active Session</Text>
            {activeSessions.map(session => (
              <SessionCard
                key={session.id}
                session={session}
                onPress={handleSessionPress}
              />
            ))}
          </View>
        )}

        {archiveSessions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Session Archive</Text>
            {archiveSessions.map(session => (
              <SessionCard
                key={session.id}
                session={session}
                onPress={handleSessionPress}
              />
            ))}
          </View>
        )}

        {sessions.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No sessions available</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 12,
    fontSize: 16,
  },
  section: {
    paddingTop: 20,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    color: '#888888',
    fontSize: 16,
  },
});