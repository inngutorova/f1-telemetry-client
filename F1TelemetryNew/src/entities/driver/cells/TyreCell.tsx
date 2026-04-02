import { View, Text, StyleSheet } from "react-native";
import { DriverState } from "../model/types";
import { TyreCompound } from '../../../shared/types/common';
import { tableColumns } from "../../../shared/config/tableConfig";

type Props = {
  driver: DriverState;
};

export const TyreCell = ({ driver }: Props) => {
  const width = tableColumns.find((col) => col.key === "tyre")?.width ?? 0;

  const tyre: TyreCompound = driver.tyres.current_compound;
  const laps = driver.tyres.tyre_age_laps ?? 0;

  const compoundMap: Record<TyreCompound, { letter: string; color: string }> = {
    soft: { letter: "S", color: "#FF0000" },
    medium: { letter: "M", color: "#FFD700" },
    hard: { letter: "H", color: "#FFFFFF" },
    intermediate: { letter: "I", color: "#00FF00" },
    wet: { letter: "W", color: "#0000FF" },
    unknown: { letter: "?", color: "#FFFFFF" },
  };

  const { letter, color } = compoundMap[tyre];

  return (
    <View style={[styles.cell, { width }]}>
      <Text style={[styles.letter, { color }]}>{letter}</Text>
      <Text style={styles.laps}>L{laps}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 5,
  },
  letter: {
    fontWeight: "700",
    marginRight: 4,
  },
  laps: {
    color: "white",
    fontWeight: "600",
  },
});