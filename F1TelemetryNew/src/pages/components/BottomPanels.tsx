import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { RaceControlMessage, TeamRadioCapture } from "../../entities/session/model/types";

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
      <Pressable
        onPress={() => setRaceControlOpen(!isRaceControlOpen)}
        style={styles.header}
      >
        <Text style={styles.headerText}>Race Control Messages</Text>
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
        />
      )}

      {/* Team Radio */}
      <Pressable
        onPress={() => setTeamRadioOpen(!isTeamRadioOpen)}
        style={styles.header}
      >
        <Text style={styles.headerText}>Team Radio</Text>
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
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1F2A3A",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#2A3B4C",
    borderBottomWidth: 1,
    borderBottomColor: "#3B4C5D",
  },
  headerText: {
    color: "white",
    fontWeight: "700",
  },
  arrow: {
    color: "white",
    fontWeight: "700",
  },
  item: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#3B4C5D",
  },
  itemText: {
    color: "#AAB4C3",
  },
});