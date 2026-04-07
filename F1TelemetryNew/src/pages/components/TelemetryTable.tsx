import {ScrollView, FlatList, View, Text, StyleSheet } from "react-native";
import { DriverRow } from "../../entities/driver/DriverRow";
import { DriverState } from '../../entities/driver/model/types'; 
import { tableColumns } from "../../shared/config/tableConfig";

type Props = {
  drivers: DriverState[];
};

export const TelemetryTable = ({ drivers }: Props) => {

const sortedDrivers = [...drivers].sort((a, b) => {
    const posA = a.position ?? 999; // на случай null
    const posB = b.position ?? 999;
    return posA - posB;
  });

  return (
    <ScrollView horizontal={true}>
      <View>
      <View style={styles.headerRow}>
        {tableColumns.map(
          (col) =>
            col.visible && (
              <View key={col.key} style={[styles.headerCell, { width: col.width }]}>
                <Text style={styles.headerText}>{col.title}</Text>
              </View>
            )
        )}
      </View>

      {/* Сами строки */}
      <FlatList
        data={sortedDrivers}
        keyExtractor={(item) => item.racing_number}
        renderItem={({ item }) => <DriverRow driver={item} />}
      />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#1F2A3A",
    paddingVertical: 8,
    backgroundColor: "#101921",
  },
  headerCell: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  headerText: {
    color: "#AAB4C3",
    fontWeight: "700",
    fontSize: 12,
  },
});