import { Text, View, StyleSheet } from "react-native";
import { DriverState } from "../model/types";
import { tableColumns } from "../../../shared/config/tableConfig";

type Props = {
  driver: DriverState;
};

export const BestLapCell = ({ driver }: Props) => {
  const width = tableColumns.find((col) => col.key === "bestLap")?.width ?? 0;
  const bestLap = driver.timing.best_lap?.value;
  const isOverallFastest = driver.timing.best_lap?.overall_fastest;
  
  return (
    <View style={[styles.cell, { width }]}>
      <Text style={[styles.text, isOverallFastest && styles.fastest]}>
        {bestLap ?? "-"}
      </Text>
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
  fastest: {
    color: "#9d00ff",
    fontWeight: "700",
  },
});