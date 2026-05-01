import { Text, View, StyleSheet } from "react-native";
import { DriverState } from "../model/types";
import { tableColumns } from "../../../shared/config/tableConfig";
import { useSnapshotStore } from "../../snapshot/model/snapshotStore";

type Props = {
  driver: DriverState;
};

export const PositionChangeCell = ({ driver }: Props) => {
  const width = tableColumns.find((col) => col.key === "positionChange")?.width ?? 0;
  const initialSnapshot = useSnapshotStore((s) => s.initialSnapshot);
  
  if (!initialSnapshot) {
    return (
      <View style={[styles.cell, { width }]}>
        <Text style={styles.text}>0</Text>
      </View>
    );
  }
  
  // Находим начальную позицию пилота
  const initialDriver = initialSnapshot.drivers.find(
    (d) => d.racing_number === driver.racing_number
  );
  
  const initialPosition = initialDriver?.position ?? driver.position ?? 0;
  const currentPosition = driver.position ?? 0;
  const positionChange = initialPosition - currentPosition; // положительное = прогресс
  
  const getChangeColor = () => {
    if (positionChange > 0) return "#4CAF50";
    if (positionChange < 0) return "#FF5252";
    return "#AAB4C3";
  };
  
  const getChangeSymbol = () => {
    if (positionChange > 0) return `+${positionChange}`;
    if (positionChange < 0) return `${positionChange}`;
    return "0";
  };
  
  return (
    <View style={[styles.cell, { width }]}>
      <Text style={[styles.text, { color: getChangeColor() }]}>
        {getChangeSymbol()}
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
    fontSize: 12,
  },
});