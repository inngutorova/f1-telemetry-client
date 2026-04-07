import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  currentLap: number;
  totalLaps: number;
  delay: number; // секунды
  onPressDelay: () => void;
  onPressSettings: () => void;
};

export const TelemetryHeader = ({
  currentLap,
  totalLaps,
  delay,
  onPressDelay,
  onPressSettings,
}: Props) => {
  return (
    <View style={styles.container}>
      {/* LEFT */}
      <TouchableOpacity onPress={onPressDelay}>
        <Text style={styles.sideText}>+{delay}s</Text>
      </TouchableOpacity>

      {/* CENTER */}
      <Text style={styles.centerText}>
        Lap {currentLap} / {totalLaps}
      </Text>

      {/* RIGHT */}
      <TouchableOpacity onPress={onPressSettings}>
        <Text style={styles.sideText}>#</Text>
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
  },
  centerText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  sideText: {
    color: "#AAB4C3",
    fontSize: 14,
  },
});