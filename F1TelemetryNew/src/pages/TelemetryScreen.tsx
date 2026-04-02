import { View, StyleSheet } from "react-native";
import { TelemetryTable } from "./components/TelemetryTable";
import { TelemetryBottomPanels } from "./components/BottomPanels";
import { mockDrivers } from "../mocks/telemetryMock";
import { mockRaceControlMessages,  mockTeamRadio} from "../mocks/messageMock";

export default function TelemetryScreen() {
  return (
    <View style={styles.container}>
      <TelemetryTable drivers={mockDrivers} />
      <TelemetryBottomPanels
          raceControlMessages={mockRaceControlMessages}
          teamRadio={mockTeamRadio}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1420",
  },
});