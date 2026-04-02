import { Text, View, StyleSheet } from "react-native";
import { DriverState } from "../model/types";
import { tableColumns } from "../../../shared/config/tableConfig";

type Props = {
  driver: DriverState;
};

export const PositionCell = ({ driver }: Props) => {
  const width = tableColumns.find((col) => col.key === "position")?.width ?? 0;

  return (
    <View style={[styles.cell, { width }]}>
      <Text style={styles.text}>{driver.position}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
});