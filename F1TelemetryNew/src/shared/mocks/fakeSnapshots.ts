// src/shared/mocks/fakeSnapshots.ts
import { TyreCompound } from "../types/common";
import { DriverState } from "../../entities/driver/model/types";
import { RaceSnapshot } from "../../entities/snapshot/model/types";

const DRIVERS: DriverState[] = Array.from({ length: 22 }).map((_, i) => ({
  racing_number: `${i + 1}`,
  line: i + 1,
  position: i + 1,
  show_position: true,
  identity: {
    tla: `D${i + 1}`,
    full_name: `Driver ${i + 1}`,
    team_name: `Team ${((i % 10) + 1)}`,
    team_color: Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0"),
  },
  timing: {
    number_of_laps: 0,
    gap_to_leader: null,
    interval_to_ahead: null,
    best_lap: { value: null },
    last_lap: { value: null },
    sectors: [],
    speeds: {},
  },
  tyres: {
    current_compound: "soft" as TyreCompound,
    stints: [],
  },
  track: {
    in_pit: false,
    pit_out: false,
    stopped: false,
    retired: false,
  },
}));

export const generateSnapshots = (count: number = 100): RaceSnapshot[] => {
  const snapshots: RaceSnapshot[] = [];
  let toggleD3D4 = false; // флаг для чередования позиций D3 и D4

  for (let i = 1; i <= count; i++) {
    const drivers = DRIVERS.map((d) => {
      // оставляем все позиции как есть по умолчанию
      let position = d.position ?? 1;

      // меняем местами D3 и D4 по toggle
      if (d.identity.tla === "D3") {
        position = toggleD3D4 ? 4 : 3;
      }
      if (d.identity.tla === "D4") {
        position = toggleD3D4 ? 3 : 4;
      }

      return {
        ...d,
        position,
        timing: {
          ...d.timing,
          gap_to_leader: `+${(Math.random() * 5).toFixed(3)}`,
          last_lap: {
            value: `${1 + Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 60)}.${Math.floor(Math.random() * 1000)}`,
          },
        },
        tyres: {
          ...d.tyres,
          current_compound: (["soft", "medium", "hard", "intermediate", "wet"] as TyreCompound[])[Math.floor(Math.random() * 5)],
          tyre_age_laps: Math.floor(Math.random() * 30),
        },
      };
    });

    // переключаем флаг для следующего снапшота
    toggleD3D4 = !toggleD3D4;

    snapshots.push({
      schema_version: 1,
      snapshot_id: `snapshot-${i}`,
      session_key: "SESSION-1",
      sequence: i,
      generated_at: new Date().toISOString(),
      source_timestamp: new Date().toISOString(),
      interval_ms: 2000,
      is_delta_from_previous: false,
      session: {
        grand_prix_name: "Australian GP",
        session_type: "race",
        session_name: "Race",
      },
      race_state: {
        session_status: "started",
        track_status: "all_clear",
        classification_generated_at: new Date().toISOString(),
        leader_racing_number: "1",
        total_cars: 22,
        classified_cars: 22,
        clock: {
          utc: new Date().toISOString(),
          remaining_ms: 90 * 60 * 1000, // 90 минут гонки
          extrapolating: false,
        },
      },
      weather: {
        air_temp_c: 28,
        track_temp_c: 35,
        humidity_pct: 40,
        wind_speed_mps: 3,
      },
      drivers,
      race_control: [
        {
          id: `rc-${i}`,
          utc: new Date().toISOString(),
          category: "flag",
          message: "Green flag",
          flag: "green",
        },
      ],
      team_radio: [
        {
          id: `radio-${i}`,
          utc: new Date().toISOString(),
          racing_number: "1",
          path: "/audio/sample.mp3",
        },
      ],
    });
  }

  return snapshots;
};