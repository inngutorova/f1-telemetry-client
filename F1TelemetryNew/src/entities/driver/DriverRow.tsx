import { View, StyleSheet } from "react-native";
import { PositionCell } from "./cells/PositionCell";
import { DriverCell } from "./cells/DriverCell";
import { GapCell } from "./cells/GapCell";
import { LastLapCell } from "./cells/LastLapCell";
import { TyreCell } from "./cells/TyreCell";
import { DriverState } from '../../entities/driver/model/types';
import { tableColumns } from "../../shared/config/tableConfig";

type Props = {
  driver: DriverState;
};

export const DriverRow = ({ driver }: Props) => {
  return (
    <View style={styles.row}>
      {tableColumns.map((col) => {
        if (!col.visible) return null;

        switch (col.key) {
          case "position": return <PositionCell key={col.key} driver={driver} />;
          case "driver": return <DriverCell key={col.key} driver={driver} />;
          case "gap": return <GapCell key={col.key} driver={driver} />;
          case "lastLap": return <LastLapCell key={col.key} driver={driver}  />;
          case "tyre": return <TyreCell key={col.key} driver={driver}  />;
          default: return null;
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#1F2A3A",
  },
});