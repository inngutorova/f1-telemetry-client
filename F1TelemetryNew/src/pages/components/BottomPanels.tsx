import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, Dimensions } from "react-native";
import { RaceControlMessage, TeamRadioCapture } from "../../entities/session/model/types";
import { RaceSnapshot } from "../../entities/snapshot/model/types"

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const PANEL_MAX_HEIGHT = SCREEN_HEIGHT / 3;

type Props = {
    raceControlMessages: RaceControlMessage[];
    teamRadio: TeamRadioCapture[];
    snapshot: RaceSnapshot;
};

const getCategoryColor = (category: string, flag?: string): string => {
    switch (category) {
        case "flag":
            if (flag === "yellow") return "#FFD700";
            if (flag === "green") return "#00FF00";
            if (flag === "double_yellow") return "#FFA500";
            return "#AAB4C3";
        case "safety_car":
            return "#FFD700";
        case "drs":
            return "#00FF00";
        case "penalty":
            return "#FF6B6B";
        case "incident":
            return "#FFA500";
        default:
            return "#AAB4C3";
    }
};

export const TelemetryBottomPanels = ({ raceControlMessages, teamRadio, snapshot }: Props) => {
    const [isRaceControlOpen, setRaceControlOpen] = useState(false);
    const [isTeamRadioOpen, setTeamRadioOpen] = useState(false);

    const getDriverInfo = (racingNumber: string) => {
        const driver = snapshot.drivers.find(d => d.racing_number === racingNumber);
        return driver?.identity || null;
    };

    const enhancedTeamRadio = teamRadio.map(radio => {
        const driverInfo = getDriverInfo(radio.racing_number);
        return {
            ...radio,
            driverInfo,
        };
    });

    const formatTeamColor = (color?: string): string => {
        if (!color) return "#FFFFFF";
        if (color.startsWith('#')) return color;
        return `#${color}`;
    };

    return (
        <View style={styles.container}>
            {/* Race Control Messages */}
            <View style={styles.panelContainer}>
                <Pressable
                    onPress={() => setRaceControlOpen(!isRaceControlOpen)}
                    style={styles.header}
                >
                    <Text style={styles.headerText}>
                        Race Control Messages ({raceControlMessages.length})
                    </Text>
                    <Text style={styles.arrow}>{isRaceControlOpen ? "▲" : "▼"}</Text>
                </Pressable>

                {isRaceControlOpen && (
                    <FlatList
                        data={raceControlMessages}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Text style={styles.itemText}>
                                    <Text style={[styles.category, { color: getCategoryColor(item.category, item.flag) }]}>
                                        [{item.category.toUpperCase()}]
                                    </Text>
                                    <Text style={styles.message}> {item.message}</Text>
                                </Text>
                            </View>
                        )}
                        style={styles.list}
                    />
                )}
            </View>

            {/* Team Radio */}
            <View style={styles.panelContainer}>
                <Pressable
                    onPress={() => setTeamRadioOpen(!isTeamRadioOpen)}
                    style={styles.header}
                >
                    <Text style={styles.headerText}>
                        Team Radio ({teamRadio.length})
                    </Text>
                    <Text style={styles.arrow}>{isTeamRadioOpen ? "▲" : "▼"}</Text>
                </Pressable>

                {isTeamRadioOpen && (
                    <FlatList
                        data={enhancedTeamRadio}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.radioItem}>
                                <View style={styles.radioHeader}>
                                    <Text style={[styles.driverName, { color: formatTeamColor(item.driverInfo?.team_color) }]}>
                                        {item.driverInfo?.full_name || "Driver"}
                                    </Text>
                                </View>
                                <Text style={styles.teamName}>
                                    {item.driverInfo?.team_name || "Unknown Team"}
                                </Text>
                                <Text style={styles.radioMessage}>
                                    "{item.path || item.path || "Team radio message"}"
                                </Text>
                            </View>
                        )}
                        style={styles.list}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#101921",
    },
    panelContainer: {
        maxHeight: PANEL_MAX_HEIGHT,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 12,
        backgroundColor: "#101921",
        borderBottomWidth: 1,
        borderBottomColor: "#1F2A3A",
    },
    headerText: {
        color: "white",
        fontWeight: "700",
    },
    arrow: {
        color: "white",
        fontWeight: "700",
    },
    list: {
        maxHeight: PANEL_MAX_HEIGHT - 50,
    },
    item: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#1F2A3A",
    },
    itemText: {
        fontSize: 12,
        lineHeight: 18,
    },
    category: {
        fontWeight: "700",
    },
    message: {
        color: "#AAB4C3",
    },
    radioItem: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#1F2A3A",
    },
    radioHeader: {
        marginBottom: 4,
    },
    driverName: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 2,
    },
    teamName: {
        color: "#6B7C8D",
        fontSize: 11,
        fontWeight: "500",
        marginBottom: 8,
    },
    radioMessage: {
        color: "#FFFFFF",
        fontSize: 14,
        fontStyle: "italic",
        lineHeight: 20,
    },
});