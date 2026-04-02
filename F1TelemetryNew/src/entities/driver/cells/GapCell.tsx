import { Text, View, StyleSheet } from "react-native";
import { DriverState } from "../model/types";

type Props = {
  driver: DriverState;
};

export const GapCell = ({ driver }: Props) => {
  return (
    <View style={styles.cell}>
      <Text style={styles.text}>{driver.timing.gap_to_leader ?? "-"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 80,
    alignItems: "flex-end",
    paddingRight: 10,
  },
  text: {
    color: "#AAB4C3",
  },
});