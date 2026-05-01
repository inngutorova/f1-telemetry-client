import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DelayControl } from "../../features/settings/ui/DelayControl";
import { Icon } from '../../shared/ui/Icon';
import { icons } from '../../shared/ui/icons';
import { useSnapshotStore } from "../../entities/snapshot/model/snapshotStore";

type Props = {
  currentLap: number;
  totalLaps: number;
  onPressSettings: () => void;
};

const formatTime = (ms: number | null | undefined): string => {
  if (!ms || ms <= 0) return '00:00';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const TelemetryHeader = ({
  currentLap,
  totalLaps,
  onPressSettings,
}: Props) => {
  const snapshot = useSnapshotStore((s) => s.currentSnapshot);
  const sessionType = snapshot?.session?.session_type;
  const remainingMs = snapshot?.race_state?.clock?.remaining_ms;
  
  if (sessionType === 'race' || sessionType === 'sprint') {
    const label = sessionType === 'sprint' ? 'SPRINT' : 'RACE';
    return (
      <View style={styles.container}>
        <DelayControl totalLaps={totalLaps} />
        
        <View style={styles.center}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>Lap {currentLap} / {totalLaps}</Text>
        </View>
        
        <TouchableOpacity onPress={onPressSettings}>
          <Icon source={icons.settings} size={27} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );
  }
  
  let sessionLabel = 'PRACTICE';
  if (sessionType === 'qualifying') {
    sessionLabel = 'QUALIFYING';
  }
  
  return (
    <View style={styles.container}>
      <DelayControl totalLaps={totalLaps} />
      
      <View style={styles.center}>
        <Text style={styles.label}>{sessionLabel}</Text>
        <Text style={styles.value}>{formatTime(remainingMs)}</Text>
      </View>
      
      <TouchableOpacity onPress={onPressSettings}>
        <Icon source={icons.settings} size={27} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "#0B0F1A",
    zIndex: 100,
  },
  center: {
    alignItems: "center",
  },
  label: {
    color: "#6B7C8D",
    fontSize: 10,
    fontWeight: "600",
  },
  value: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});