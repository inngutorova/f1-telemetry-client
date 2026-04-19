import { ScrollView, FlatList, View, Text, StyleSheet } from "react-native";
import { DriverRow } from "../../entities/driver/DriverRow";
import { DriverState } from '../../entities/driver/model/types'; 
import { tableColumns } from "../../shared/config/tableConfig";
import { useSettingsStore } from "../../features/settings/model/settingsStore";

type Props = {
  drivers: DriverState[];
};

export const TelemetryTable = ({ drivers }: Props) => {
  const { userSettings } = useSettingsStore();

  const filteredDrivers = drivers.filter(driver => driver.racing_number !== "_kf");


  const sortedDrivers = [...filteredDrivers].sort((a, b) => {
    const posA = a.position ?? 999;
    const posB = b.position ?? 999;
    return posA - posB;
  });

  // Получаем колонки в правильном порядке из настроек
  const getOrderedColumns = () => {
    // Если есть сохраненный порядок, используем его
    if (userSettings.columnsOrder && userSettings.columnsOrder.length > 0) {
      return userSettings.columnsOrder
        .map(key => {
          const col = tableColumns.find(c => c.key === key);
          if (col && (userSettings.columnsVisible[col.key] ?? col.visible)) {
            return col;
          }
          return null;
        })
        .filter((col): col is typeof tableColumns[0] => col !== null);
    }
    
    // Иначе используем стандартный порядок с фильтрацией по видимости
    return tableColumns.filter(col => 
      userSettings.columnsVisible[col.key] ?? col.visible
    );
  };

  const visibleColumns = getOrderedColumns();

  return (
    <ScrollView horizontal={true}>
      <View>
        <View style={styles.headerRow}>
          {visibleColumns.map((col) => (
            <View key={col.key} style={[styles.headerCell, { width: col.width }]}>
              <Text style={styles.headerText}>{col.title}</Text>
            </View>
          ))}
        </View>

        <FlatList
          data={sortedDrivers}
          keyExtractor={(item) => item.racing_number}
          renderItem={({ item }) => <DriverRow driver={item} />}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#1F2A3A",
    paddingVertical: 8,
    backgroundColor: "#101921",
  },
  headerCell: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  headerText: {
    color: "#AAB4C3",
    fontWeight: "700",
    fontSize: 12,
  },
});