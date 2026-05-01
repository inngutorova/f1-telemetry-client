import { useSettingsStore } from "./model/settingsStore";
import { tableColumns, TableColumn } from "../../shared/config/tableConfig";
import { useSnapshotStore } from "../../entities/snapshot/model/snapshotStore";

const COLUMNS_BY_SESSION: Record<string, string[]> = {
  race: ['position', 'driver', 'gap', 'interval', 'lastLap', 'bestLap', 'tyre', 'sectors', "positionChange"],
  sprint: ['position', 'driver', 'gap', 'interval', 'lastLap', 'bestLap', 'tyre', 'sectors', "positionChange"],
  qualifying: ['position', 'driver', 'bestLap', 'sectors', 'tyre'],
  practice: ['position', 'driver', 'bestLap', 'lastLap', 'sectors', 'tyre'],
};

export const useVisibleColumns = (): TableColumn[] => {
  const { userSettings } = useSettingsStore();
  const snapshot = useSnapshotStore((s) => s.currentSnapshot);
  
  const sessionType = snapshot?.session?.session_type || 'race';
  
  const defaultColumns = COLUMNS_BY_SESSION[sessionType] || COLUMNS_BY_SESSION.race;

  if (userSettings.columnsOrder && userSettings.columnsOrder.length > 0) {
    return userSettings.columnsOrder
      .map(key => {
        const col = tableColumns.find(c => c.key === key);
        const isAllowed = defaultColumns.includes(key);
        if (col && isAllowed && (userSettings.columnsVisible[col.key] ?? col.visible)) {
          return col;
        }
        return null;
      })
      .filter((col): col is TableColumn => col !== null);
  }
  
  return tableColumns.filter(col => 
    defaultColumns.includes(col.key) && (userSettings.columnsVisible[col.key] ?? col.visible)
  );
};