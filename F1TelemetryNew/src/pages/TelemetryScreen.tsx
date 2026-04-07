import { View, StyleSheet } from "react-native";
import { TelemetryTable } from "./components/TelemetryTable";
import { TelemetryHeader } from "./components/TelemetryHeader";
import { TelemetryBottomPanels } from "./components/BottomPanels";
import { mockDrivers } from "../mocks/telemetryMock";
import { mockRaceControlMessages, mockTeamRadio } from "../mocks/messageMock";
import { useFakeStream } from "../features/telemetry/useFakeStream";
import { useSnapshotStore } from "../entities/snapshot/model/snapshotStore";


export default function TelemetryScreen() {
    useFakeStream();

    const snapshot = useSnapshotStore((s) => s.currentSnapshot);
    if (!snapshot) return null;


    const handleDelayPress = () => {
        console.log("open delay settings");
    };

    const handleSettingsPress = () => {
        console.log("open columns settings");
    };


    return (
        <View style={{ flex: 1, backgroundColor: "#0B0F1A" }}>
            <TelemetryHeader
                currentLap={12}
                totalLaps={58}
                delay={5}
                onPressDelay={handleDelayPress}
                onPressSettings={handleSettingsPress}
            />
            <TelemetryTable drivers={snapshot.drivers} />
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