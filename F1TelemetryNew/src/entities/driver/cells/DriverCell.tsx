import { Text, View, StyleSheet } from "react-native";
import { DriverState } from "../model/types";
import { tableColumns } from "../../../shared/config/tableConfig";

type Props = {
  driver: DriverState; 
};

export const DriverCell = ({ driver }: Props) => {
  const teamColor = driver.identity.team_color
    ? `#${driver.identity.team_color}`
    : "white";

  const width = tableColumns.find((col) => col.key === "driver")?.width ?? 0;

  return (
    <View style={[styles.cell, { width }]}>
      <Text style={[styles.text, { color: teamColor }]}>
        {driver.identity.tla}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "700",
  },
});