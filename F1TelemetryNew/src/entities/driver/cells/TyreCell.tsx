import { View, Text, StyleSheet } from "react-native";
import { TyreCompound } from '../../../shared/types/common';

type Props = {
  tyre: TyreCompound;
  laps?: number | null;
};

export const TyreCell = ({ tyre, laps }: Props) => {
  // Цвет и буква для типа шин
  const compoundMap: Record<TyreCompound, { letter: string; color: string }> = {
    soft: { letter: "S", color: "#FF0000" },        // красная
    medium: { letter: "M", color: "#FFD700" },      // желтая
    hard: { letter: "H", color: "#FFFFFF" },        // белая
    intermediate: { letter: "I", color: "#00FF00" },// зеленая
    wet: { letter: "W", color: "#0000FF" },         // синяя
    unknown: { letter: "?", color: "#FFFFFF" },     // белый знак вопроса
  };

  const { letter, color } = compoundMap[tyre];

  return (
    <View style={styles.cell}>
      <Text style={[styles.letter, { color }]}>{letter}</Text>
      <Text style={styles.laps}>L{laps ?? 0}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 60,
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