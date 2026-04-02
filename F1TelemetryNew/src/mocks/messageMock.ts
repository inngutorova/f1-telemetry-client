import { RaceControlMessage, TeamRadioCapture } from "../entities/session/model/types";


export const mockRaceControlMessages: RaceControlMessage[] = [
  {
    id: "rc1",
    utc: "2026-04-02T15:00:00Z",
    category: "flag",
    message: "Track is clear",
    flag: "green",
    scope: "track",
    sector: null,
    safety_car_mode: null,
    safety_car_status: null,
  },
  {
    id: "rc2",
    utc: "2026-04-02T15:02:00Z",
    category: "safety_car",
    message: "Safety Car deployed",
    flag: "yellow",
    scope: "track",
    sector: null,
    safety_car_mode: "sc",
    safety_car_status: "deployed",
  },
  {
    id: "rc3",
    utc: "2026-04-02T15:04:00Z",
    category: "drs",
    message: "DRS enabled in sector 3",
    scope: "sector",
    sector: 3,
    safety_car_mode: null,
    safety_car_status: null,
  },
  {
    id: "rc4",
    utc: "2026-04-02T15:06:00Z",
    category: "penalty",
    message: "Car 33 served 5s penalty",
    scope: "driver",
    sector: null,
    safety_car_mode: null,
    safety_car_status: null,
  },
  {
    id: "rc5",
    utc: "2026-04-02T15:08:00Z",
    category: "other",
    message: "Weather condition changing to rain",
    sector: null,
    safety_car_mode: null,
    safety_car_status: null,
  },
];

// Моки Team Radio
export const mockTeamRadio: TeamRadioCapture[] = [
  {
    id: "tr1",
    utc: "2026-04-02T15:01:23Z",
    racing_number: "44",
    path: "/audio/44_lap1.mp3",
  },
  {
    id: "tr2",
    utc: "2026-04-02T15:01:45Z",
    racing_number: "33",
    path: "/audio/33_lap1.mp3",
  },
  {
    id: "tr3",
    utc: "2026-04-02T15:03:10Z",
    racing_number: "16",
    path: "/audio/16_pitstop.mp3",
  },
  {
    id: "tr4",
    utc: "2026-04-02T15:05:00Z",
    racing_number: "77",
    path: "/audio/77_lap2.mp3",
  },
  {
    id: "tr5",
    utc: "2026-04-02T15:06:50Z",
    racing_number: "5",
    path: "/audio/5_lap3.mp3",
  },
];