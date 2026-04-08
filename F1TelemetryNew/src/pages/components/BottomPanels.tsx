import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, Dimensions } from "react-native";
import { RaceControlMessage, TeamRadioCapture } from "../../entities/session/model/types";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const PANEL_MAX_HEIGHT = SCREEN_HEIGHT / 3;

type Props = {
  raceControlMessages: RaceControlMessage[];
  teamRadio: TeamRadioCapture[];
};

export const TelemetryBottomPanels = ({ raceControlMessages, teamRadio }: Props) => {
  const [isRaceControlOpen, setRaceControlOpen] = useState(false);
  const [isTeamRadioOpen, setTeamRadioOpen] = useState(false);

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
                  [{item.category.toUpperCase()}] {item.message}
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
            data={teamRadio}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.itemText}>
                  {item.racing_number}: {item.path}
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
    maxHeight: PANEL_MAX_HEIGHT - 50, // Вычитаем высоту заголовка
  },
  item: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1F2A3A",
  },
  itemText: {
    color: "#AAB4C3",
  },
});