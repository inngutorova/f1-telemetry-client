import { Text, View, StyleSheet } from "react-native";
import { DriverState } from "../model/types";

type Props = {
  driver: DriverState; 
};

export const DriverCell = ({ driver }: Props) => {
  return (
    <View style={styles.cell}>
      <Text style={styles.text}>{driver.identity.tla}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 60,
  },
  text: {
    color: "white",
    fontWeight: "700",
  },
});