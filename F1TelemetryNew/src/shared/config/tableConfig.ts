export interface TableColumn {
    key: string;
    title: string;
    visible: boolean;
    width: number;
}

export const tableColumns: TableColumn[] = [
    { key: "position", title: "#", visible: true, width: 40 },
    { key: "driver", title: "Driver", visible: true, width: 50 },
    { key: "gap", title: "Gap", visible: true, width: 80 },
    { key: "interval", title: "Interval", visible: true, width: 80 },
    { key: "lastLap", title: "Last Lap", visible: true, width: 90 },
    { key: "bestLap", title: "Best Lap", visible: true, width: 90 },
    { key: "tyre", title: "Tyre", visible: true, width: 70 },
    { key: "positionChange", title: "+/-", visible: true, width: 50 },
    { key: "sectors", title: "Sectors", visible: true, width: 140 },
];

export type ColumnKey = typeof tableColumns[number]["key"];