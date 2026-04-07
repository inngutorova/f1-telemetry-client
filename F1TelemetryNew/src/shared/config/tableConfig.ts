export const tableColumns = [
  { key: "position", title: "#", visible: true, width: 40 },
  { key: "driver", title: "Driver", visible: true, width: 100 },
  { key: "gap", title: "Gap", visible: true, width: 100 },
  { key: "lastLap", title: "Last Lap", visible: true, width: 100 },
  { key: "tyre", title: "Tyre", visible: true, width: 60 },
];

export type ColumnKey = typeof tableColumns[number]["key"];