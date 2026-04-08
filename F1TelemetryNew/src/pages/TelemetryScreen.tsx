import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import { TelemetryTable } from "./components/TelemetryTable";
import { TelemetryHeader } from "./components/TelemetryHeader";
import { TelemetryBottomPanels } from "./components/BottomPanels";
import { mockDrivers } from "../mocks/telemetryMock";
import { mockRaceControlMessages, mockTeamRadio } from "../mocks/messageMock";
import { useFakeStream } from "../features/telemetry/useFakeStream";
import { useSnapshotStore } from "../entities/snapshot/model/snapshotStore";
import { useMessagesStore } from "../entities/messages/model/messagesStore";
import { TableSettingsModal } from "../features/settings/ui/TableSettingsModal";

interface TelemetryScreenProps {
  navigation?: any;
  route?: any;
}

export default function TelemetryScreen({ navigation, route }: TelemetryScreenProps) {
    useFakeStream();

    const [isSettingsModalVisible, setSettingsModalVisible] = useState(false);

    const raceControlMessages = useMessagesStore((s) => s.raceControlMessages);
    const teamRadioMessages = useMessagesStore((s) => s.teamRadioMessages);
    const snapshot = useSnapshotStore((s) => s.currentSnapshot);
    if (!snapshot) return null;
    const leader = snapshot.drivers.find(d => d.position === 1);

    // Текущий круг - количество кругов лидера с проверкой на null/undefined
    const currentLap = leader?.timing.number_of_laps ?? 0;
    

    const delay = 0;

    const handleDelayPress = () => {
        console.log("open delay settings");
    };

    const handleSettingsPress = () => {
        console.log("open columns settings");
        setSettingsModalVisible(true);
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#0B0F1A" }}>
            {/* Кнопка назад */}
            {navigation && (
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>
            )}
            
            <TelemetryHeader
                currentLap={currentLap}
                totalLaps={53}
                onPressSettings={handleSettingsPress}
            />
            <TelemetryTable drivers={snapshot.drivers} />
            <TelemetryBottomPanels
                raceControlMessages={raceControlMessages}
                teamRadio={teamRadioMessages}
            />
            <TableSettingsModal
                visible={isSettingsModalVisible}
                onClose={() => setSettingsModalVisible(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0B1420",
    },
    backButton: {
        position: 'absolute',
        top: 12,
        left: 16,
        zIndex: 100,
        padding: 8,
    },
    backText: {
        color: '#ffffff',
        fontSize: 24,
    },
});