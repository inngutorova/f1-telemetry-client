// src/pages/components/TelemetryHeader.tsx
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DelayControl } from "../../features/settings/ui/DelayControl";
import { Icon } from '../../shared/ui/Icon';
import { icons } from '../../shared/ui/icons';

type Props = {
  currentLap: number;
  totalLaps: number;
  onPressSettings: () => void;
};

export const TelemetryHeader = ({
  currentLap,
  totalLaps,
  onPressSettings,
}: Props) => {
  return (
    <View style={styles.container}>
      {/* LEFT - Delay Control */}
      <DelayControl totalLaps={totalLaps} />

      {/* CENTER */}
      <Text style={styles.centerText}>
        Lap {currentLap} / {totalLaps}
      </Text>

      {/* RIGHT - Settings */}
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
    zIndex: 100, // Чтобы выпадашка была поверх
  },
  centerText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  sideText: {
    color: "#AAB4C3",
    fontSize: 18,
  },
});