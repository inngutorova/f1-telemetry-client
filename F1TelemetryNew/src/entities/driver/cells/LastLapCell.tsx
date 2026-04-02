import { Text, View, StyleSheet } from "react-native";
import { DriverState } from "../model/types";
import { tableColumns } from "../../../shared/config/tableConfig";

type Props = {
  driver: DriverState;
};

export const LastLapCell = ({ driver }: Props) => {
  const width = tableColumns.find((col) => col.key === "lastLap")?.width ?? 0;

  return (
    <View style={[styles.cell, { width }]}>
      <Text style={styles.text}>{driver.timing.last_lap?.value ?? "-"}</Text>
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
    fontWeight: "600",
  },
});