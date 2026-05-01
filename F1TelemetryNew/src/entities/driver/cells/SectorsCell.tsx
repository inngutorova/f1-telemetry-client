import { Text, View, StyleSheet } from "react-native";
import { DriverState } from "../model/types";
import { tableColumns } from "../../../shared/config/tableConfig";

type Props = {
  driver: DriverState;
};

export const SectorsCell = ({ driver }: Props) => {
  const width = tableColumns.find((col) => col.key === "sectors")?.width ?? 0;
  const sectors = driver.timing.sectors || [];
  
  // Получаем все три сектора
  const sector1 = sectors.find(s => s.sector === 1);
  const sector2 = sectors.find(s => s.sector === 2);
  const sector3 = sectors.find(s => s.sector === 3);
  
  // Преобразуем null в undefined
  const sector1Value = sector1?.value ?? undefined;
  const sector2Value = sector2?.value ?? undefined;
  const sector3Value = sector3?.value ?? undefined;
  
  const isSector1PersonalBest = sector1?.personal_fastest;
  const isSector1OverallBest = sector1?.overall_fastest;
  const isSector2PersonalBest = sector2?.personal_fastest;
  const isSector2OverallBest = sector2?.overall_fastest;
  const isSector3PersonalBest = sector3?.personal_fastest;
  const isSector3OverallBest = sector3?.overall_fastest;
  
  const formatSectorValue = (value?: string) => {
    if (!value) return '-';
    // Убираем 's' если есть, так как добавим сами
    const cleanValue = value.replace('s', '');
    return cleanValue;
  };
  
  return (
    <View style={[styles.cell, { width }]}>
      <View style={styles.sectorsContainer}>
        {/* S1 */}
        <View style={styles.sectorBox}>
          <Text style={styles.sectorLabel}>S1</Text>
          <Text style={[
            styles.sectorValue,
            isSector1PersonalBest && styles.personalBest,
            isSector1OverallBest && styles.overallBest
          ]}>
            {formatSectorValue(sector1Value)}
          </Text>
        </View>
        
        {/* S2 */}
        <View style={styles.sectorBox}>
          <Text style={styles.sectorLabel}>S2</Text>
          <Text style={[
            styles.sectorValue,
            isSector2PersonalBest && styles.personalBest,
            isSector2OverallBest && styles.overallBest
          ]}>
            {formatSectorValue(sector2Value)}
          </Text>
        </View>
        
        {/* S3 */}
        <View style={styles.sectorBox}>
          <Text style={styles.sectorLabel}>S3</Text>
          <Text style={[
            styles.sectorValue,
            isSector3PersonalBest && styles.personalBest,
            isSector3OverallBest && styles.overallBest
          ]}>
            {formatSectorValue(sector3Value)}
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
    color: "#0a6b2f",
  },
  overallBest: {
    color: "#860ebe",
    fontWeight: "700",
  },
});