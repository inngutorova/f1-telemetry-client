// src/widgets/SessionCard/SessionCard.tsx
import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { UISession, getCircuitInfo } from '../../entities/session/model/types';
import { SessionType } from '../../shared/types/common';

interface SessionCardProps {
  session: UISession;
  onPress: (session: UISession, watchFromStart: boolean) => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

export const SessionCard: React.FC<SessionCardProps> = React.memo(({ session, onPress }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'TBD';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).replace(/\//g, '/');
  };

  const formatLocalTime = (dateString?: string, gmtOffset?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

const getSessionTypeText = useMemo(() => {
    const type = session.meta.session_type;
    if (type === 'race') return 'RACE';
    if (type === 'qualifying') return 'QUALIFICATION';
    if (type === 'sprint') return 'SPRINT';
    if (type === 'practice') {
      return session.meta.session_number 
        ? `PRACTICE ${session.meta.session_number}` 
        : 'PRACTICE';
    }
    return type.toUpperCase();
  }, [session.meta.session_type, session.meta.session_number]);


  const circuitInfo = useMemo(() => 
    getCircuitInfo(session.meta.circuit_short_name), 
    [session.meta.circuit_short_name]
  );
  
  const localStartTime = formatLocalTime(session.startTime, session.meta.gmt_offset);
  const formattedDate = formatDate(session.startTime);

  const getStatusBadge = () => {
    if (session.isLive) {
      return (
        <View style={[styles.badge, styles.activeBadge]}>
          <View style={styles.liveDot} />
          <Text style={styles.badgeText}>LIVE NOW</Text>
        </View>
      );
    }
    if (session.hasReplay) {
      return (
        <View style={[styles.badge, styles.completedBadge]}>
          <Text style={styles.badgeText}>REPLAY AVAILABLE</Text>
        </View>
      );
    }
    return null;
  };

  const handleJoinLive = () => {
    onPress(session, false);
  };

  const handleWatchFromStart = () => {
    onPress(session, true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View>
            <Text style={styles.dateText}>{formattedDate}</Text>
            {localStartTime && session.meta.gmt_offset && (
              <Text style={styles.timeText}>
                {localStartTime} {session.meta.gmt_offset.replace('+', 'UTC+')}
              </Text>
            )}
            {getStatusBadge()}
          </View>
          <View style={styles.sessionTypeBadge}>
            <Text style={styles.sessionTypeText}>{getSessionTypeText}</Text>
          </View>
        </View>

        <Text style={styles.gpName}>{session.meta.grand_prix_name}</Text>
        {session.meta.official_name && (
          <Text style={styles.officialName}>{session.meta.official_name}</Text>
        )}
        <Text style={styles.circuitName}>{session.meta.circuit_short_name}</Text>
        <Text style={styles.locationName}>
          {session.meta.location}, {session.meta.country_name}
        </Text>

        {circuitInfo.lengthKm > 0 && (
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{circuitInfo.lengthKm} KM</Text>
              <Text style={styles.statLabel}>Length</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{circuitInfo.laps}</Text>
              <Text style={styles.statLabel}>Laps</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{circuitInfo.turns}</Text>
              <Text style={styles.statLabel}>Turns</Text>
            </View>
          </View>
        )}

        <View style={styles.buttonsContainer}>
          {session.isLive && (
            <TouchableOpacity
              style={[styles.button, styles.liveButton]}
              onPress={handleJoinLive}
              activeOpacity={0.8}>
              <Text style={styles.buttonText}>JOIN LIVE</Text>
            </TouchableOpacity>
          )}
          
          {session.hasReplay && (
            <TouchableOpacity
              style={[
                styles.button,
                styles.watchButton,
                session.isLive ? styles.secondaryButton : styles.primaryButton,
              ]}
              onPress={handleWatchFromStart}
              activeOpacity={0.8}>
              <Text style={styles.buttonText}>
                {session.isLive ? 'WATCH FROM START' : 'WATCH REPLAY'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'center',
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333333',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  dateText: {
    color: '#888888',
    fontSize: 14,
    marginBottom: 4,
  },
  timeText: {
    color: '#FF3B30',
    fontSize: 12,
    marginBottom: 8,
    fontWeight: '500',
  },
  sessionTypeBadge: {
    backgroundColor: 'rgba(255, 59, 48, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.3)',
  },
  sessionTypeText: {
    color: '#FF3B30',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  activeBadge: {
    backgroundColor: '#FF3B30',
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedBadge: {
    backgroundColor: '#34C759',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'white',
    marginRight: 6,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  gpName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  officialName: {
    color: '#FF3B30',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  circuitName: {
    color: '#CCCCCC',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  locationName: {
    color: '#888888',
    fontSize: 13,
    marginBottom: 20,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#333333',
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    color: '#FF3B30',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#888888',
    fontSize: 12,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#333333',
  },
  buttonsContainer: {
    gap: 12,
    marginBottom: 16,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveButton: {
    backgroundColor: '#FF3B30',
  },
  watchButton: {
    backgroundColor: '#007AFF',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: '#333333',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

SessionCard.displayName = 'SessionCard';