import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Icon } from '../../../shared/ui/Icon';
import { icons } from '../../../shared/ui/icons';
import { useSettingsStore } from '../../../features/settings/model/settingsStore';
import { websocketService } from '../../telemetry/websocketService';

interface DelayControlProps {
  totalLaps: number;
}

export const DelayControl: React.FC<DelayControlProps> = ({ totalLaps }) => {
  const { userSettings, setUserSettings } = useSettingsStore();
  const [delayMs, setDelayMs] = useState<number>(userSettings.delayMs || 0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setDelayMs(userSettings.delayMs || 0);
  }, [userSettings.delayMs]);

  const updateDelay = useCallback((newDelayMs: number) => {
    const finalDelayMs = Math.max(0, newDelayMs);
    setDelayMs(finalDelayMs);
    setUserSettings({ delayMs: finalDelayMs });
    websocketService.updateDelay(finalDelayMs);
  }, [setUserSettings]);

  const updatePauseState = useCallback((newPausedState: boolean) => {
    setIsPaused(newPausedState);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPaused) {
      interval = setInterval(() => {
        updateDelay(delayMs + 2);
      }, 2000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPaused, delayMs, updateDelay]);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isExpanded]);

  const formatDelay = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds);
    if (totalSeconds === 0) return 'LIVE';
    return `-${totalSeconds}s`;
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleBackward = () => {
    updateDelay(delayMs + 2);
  };

  const handleForward = () => {
    updateDelay(delayMs - 2);
  };

  const handlePlayPause = () => {
    const newPausedState = !isPaused;
    updatePauseState(newPausedState);
  };

  const handleReset = () => {
    updatePauseState(false);
    updateDelay(0);
    setIsExpanded(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleToggle} style={styles.delayButton}>
        <Text style={styles.delayText}>
          {formatDelay(delayMs)}
        </Text>
        <Icon 
          source={isExpanded ? icons.chevronUp : icons.chevronDown} 
          size={16} 
          color="#ffffff" 
        />
      </TouchableOpacity>

      {isExpanded && (
        <Animated.View 
          style={[
            styles.dropdownPanel,
            {
              opacity: slideAnim,
              transform: [{
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 0]
                })
              }]
            }
          ]}
        >
          <View style={styles.controlsRow}>
            {/* Назад */}
            <TouchableOpacity 
              style={styles.controlButton} 
              onPress={handleBackward}
            >
              <Icon source={icons.back} size={20} color="#FFFFFF" />
            </TouchableOpacity>

            {/* Play/Pause */}
            <TouchableOpacity 
              style={styles.controlButton} 
              onPress={handlePlayPause}
            >
              <Icon 
                source={isPaused ? icons.play : icons.pause} 
                size={20} 
                color="#FFFFFF" 
              />
            </TouchableOpacity>

            {/* Вперед */}
            <TouchableOpacity 
              style={[styles.controlButton, delayMs === 0 && styles.disabledButton]} 
              onPress={handleForward}
              disabled={delayMs === 0}
            >
              <Icon source={icons.forward} size={20} color="#FFFFFF" />
            </TouchableOpacity>

            {/* LIVE кнопка */}
            <TouchableOpacity 
              style={styles.resetButton} 
              onPress={handleReset}
            >
              <Text style={styles.resetButtonText}>LIVE</Text>
            </TouchableOpacity>
          </View>

          {isPaused && (
            <View style={styles.pausedIndicator}>
              <Text style={styles.pausedText}>Auto rewinding...</Text>
            </View>
          )}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  delayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  delayText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
  },
  dropdownPanel: {
    position: 'absolute',
    top: 35,
    left: 0,
    backgroundColor: '#1A2533',
    borderRadius: 8,
    padding: 10,
    minWidth: 180,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#2A3A4A',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  controlButton: {
    backgroundColor: '#0B1017',
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2A3A4A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.4,
  },
  resetButton: {
    backgroundColor: '#2A3A4A',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  pausedIndicator: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#2A3A4A',
  },
  pausedText: {
    color: '#AAB4C3',
    fontSize: 14,
    textAlign: 'center',
  },
});