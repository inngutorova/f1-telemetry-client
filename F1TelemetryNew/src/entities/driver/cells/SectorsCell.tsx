// src/entities/driver/cells/SectorsCell.tsx
import { Text, View, StyleSheet } from "react-native";
import { DriverState } from "../model/types";
import { tableColumns } from "../../../shared/config/tableConfig";

type Props = {
  driver: DriverState;
};

export const SectorsCell = ({ driver }: Props) => {
  const width = tableColumns.find((col) => col.key === "sectors")?.width ?? 0;
  const sectors = driver.timing.sectors;
  
  // Получаем только 3-й сектор (как в реальных данных)
  const sector3 = sectors.find(s => s.sector === 3);
  const sector3Value = sector3?.value;
  const isPersonalBest = sector3?.personal_fastest;
  const isOverallBest = sector3?.overall_fastest;
  
  return (
    <View style={[styles.cell, { width }]}>
      <View style={styles.sectorsContainer}>
        <View style={styles.sectorBox}>
          <Text style={styles.sectorLabel}>S1</Text>
          <Text style={styles.sectorValue}>-</Text>
        </View>
        <View style={styles.sectorBox}>
          <Text style={styles.sectorLabel}>S2</Text>
          <Text style={styles.sectorValue}>-</Text>
        </View>
        <View style={styles.sectorBox}>
          <Text style={styles.sectorLabel}>S3</Text>
          <Text style={[
            styles.sectorValue,
            isPersonalBest && styles.personalBest,
            isOverallBest && styles.overallBest
          ]}>
            {sector3Value ? `${sector3Value}s` : '-'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  sectorsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  sectorBox: {
    alignItems: "center",
    minWidth: 35,
  },
  sectorLabel: {
    color: "#6B7C8D",
    fontSize: 9,
    fontWeight: "600",
    marginBottom: 2,
  },
  sectorValue: {
    color: "#AAB4C3",
    fontSize: 10,
    fontWeight: "500",
  },
  personalBest: {
    color: "#AAB4C3",
  },
  overallBest: {
    color: "#FFD700",
    fontWeight: "700",
  },
});