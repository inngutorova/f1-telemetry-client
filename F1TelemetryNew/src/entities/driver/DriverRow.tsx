// src/entities/driver/DriverRow.tsx
import { View, StyleSheet } from "react-native";
import { PositionCell } from "./cells/PositionCell";
import { PositionChangeCell } from "./cells/PositionChangeCell";
import { DriverCell } from "./cells/DriverCell";
import { GapCell } from "./cells/GapCell";
import { IntervalCell } from "./cells/IntervalCell";
import { BestLapCell } from "./cells/BestLapCell";
import { LastLapCell } from "./cells/LastLapCell";
import { TyreCell } from "./cells/TyreCell";
import { SectorsCell } from "./cells/SectorsCell";
import { DriverState } from '../../entities/driver/model/types';
import { tableColumns } from "../../shared/config/tableConfig";
import { useSettingsStore } from "../../features/settings/model/settingsStore";


type Props = {
    driver: DriverState;
};

export const DriverRow = ({ driver }: Props) => {

    const { userSettings } = useSettingsStore();

    // Получаем видимые колонки с учетом настроек пользователя
    const visibleColumns = tableColumns.filter(col =>
        userSettings.columnsVisible[col.key] ?? col.visible
    );
    const renderCell = (col: typeof tableColumns[0]) => {
        switch (col.key) {
            case "position":
                return <PositionCell key={col.key} driver={driver} />;
            case "positionChange":
                return <PositionChangeCell key={col.key} driver={driver} />;
            case "driver":
                return <DriverCell key={col.key} driver={driver} />;
            case "gap":
                return <GapCell key={col.key} driver={driver} />;
            case "interval":
                return <IntervalCell key={col.key} driver={driver} />;
            case "bestLap":
                return <BestLapCell key={col.key} driver={driver} />;
            case "lastLap":
                return <LastLapCell key={col.key} driver={driver} />;
            case "tyre":
                return <TyreCell key={col.key} driver={driver} />;
            case "sectors":
                return <SectorsCell key={col.key} driver={driver} />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.row}>
            {visibleColumns.map((col) => renderCell(col))}
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