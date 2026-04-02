import { Text, View, StyleSheet } from "react-native";
import { DriverState } from "../model/types";

type Props = {
  driver: DriverState;
};

export const PositionCell = ({ driver }: Props) => {
  return (
    <View style={styles.cell}>
      <Text style={styles.text}>{driver.position}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 40,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
});