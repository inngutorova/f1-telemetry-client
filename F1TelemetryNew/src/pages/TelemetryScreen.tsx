import { View, StyleSheet } from "react-native";
import { TelemetryTable } from "./components/TelemetryTable";
import { mockDrivers } from "../mocks/telemetryMock";

export default function TelemetryScreen() {
  return (
    <View style={styles.container}>
      <TelemetryTable drivers={mockDrivers} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1420",
  },
});