import { Text, View, StyleSheet } from "react-native";
import { DriverState } from "../model/types";
import { tableColumns } from "../../../shared/config/tableConfig";

type Props = {
  driver: DriverState;
};

export const GapCell = ({ driver }: Props) => {
  const width = tableColumns.find((col) => col.key === "gap")?.width ?? 0;

  return (
    <View style={[styles.cell, { width }]}>
      <Text style={styles.text}>{driver.timing.gap_to_leader ?? "-"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    alignItems: "flex-end",
    paddingRight: 10,
  },
  text: {
    color: "#AAB4C3",
  },
});