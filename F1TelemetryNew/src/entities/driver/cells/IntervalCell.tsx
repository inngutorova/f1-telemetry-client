// src/entities/driver/cells/IntervalCell.tsx
import { Text, View, StyleSheet } from "react-native";
import { DriverState } from "../model/types";
import { tableColumns } from "../../../shared/config/tableConfig";
import { useSnapshotStore } from "../../snapshot/model/snapshotStore";

type Props = {
  driver: DriverState;
};

export const IntervalCell = ({ driver }: Props) => {
  const width = tableColumns.find((col) => col.key === "interval")?.width ?? 0;
  const currentSnapshot = useSnapshotStore((s) => s.currentSnapshot);
  
  if (!currentSnapshot) {
    return (
      <View style={[styles.cell, { width }]}>
        <Text style={styles.text}>-</Text>
      </View>
    );
  }
  
  // Находим пилота впереди (с позицией на 1 меньше)
  const currentPosition = driver.position ?? 0;
  const driverAhead = currentSnapshot.drivers.find(
    (d) => d.position === currentPosition - 1
  );
  
  const interval = driver.timing.interval_to_ahead ?? null;
  
  return (
    <View style={[styles.cell, { width }]}>
      <Text style={styles.text}>{interval ?? "-"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    alignItems: "flex-end",
    paddingRight: 10,
  },
  text: {
    color: "#AAB4C3",
  },
});