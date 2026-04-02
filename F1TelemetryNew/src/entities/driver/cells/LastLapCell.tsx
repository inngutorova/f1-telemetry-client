import { View, Text, StyleSheet } from "react-native";

type Props = {
  lap?: string | null;
};

export const LastLapCell = ({ lap }: Props) => {
  return (
    <View style={styles.cell}>
      <Text style={styles.text}>{lap ?? "-"}</Text>
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
    fontWeight: "600",
  },
});