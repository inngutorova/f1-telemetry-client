import { TyreCompound } from '../../../shared/types/common';

export type DriverState = {
  racing_number: string;
  line: number;
  position: number | null;
  show_position: boolean;

  identity: DriverIdentity;
  timing: DriverTiming;
  tyres: DriverTyres;
  track: DriverTrackState;
};

export type DriverIdentity = {
    tla: string;                         // HAM
    broadcast_name?: string;             // L HAMILTON
    full_name: string;                   // Lewis Hamilton
    first_name?: string;
    last_name?: string;
    team_name: string;                   // Ferrari
    team_color: string;                  // ED1131
};

export type DriverTiming = {
    number_of_laps?: number | null;

    gap_to_leader?: string | null;       // "+5.231"
    interval_to_ahead?: string | null;   // "+0.417"

    best_lap: LapTimeInfo | null;
    last_lap: LapTimeInfo | null;

    sectors: SectorInfo[];               // обычно 3
    speeds: SpeedTrapInfo;               // I1/I2/FL/ST

    best_sectors?: BestSectorInfo[];     // для quali/practice
    best_speeds?: BestSpeedInfo | null;  // best I1/I2/FL/ST
};

export type LapTimeInfo = {
    value: string | null;                // "1:21.818"
    lap?: number | null;
    status?: number | null;              // raw timing status, если нужно для UI-иконок
    personal_fastest?: boolean;
    overall_fastest?: boolean;
};

export type SectorInfo = {
    sector: 1 | 2 | 3;
    value: string | null;                // "34.920"
    previous_value?: string | null;
    stopped?: boolean;
    status?: number | null;
    personal_fastest?: boolean;
    overall_fastest?: boolean;
    segments?: SegmentInfo[];
};

export type SegmentInfo = {
    segment: number;
    status: number;                      // raw status code из F1
};

export type SpeedTrapInfo = {
    i1?: SpeedValue | null;              // intermediate 1
    i2?: SpeedValue | null;              // intermediate 2
    fl?: SpeedValue | null;              // finish line
    st?: SpeedValue | null;              // speed trap
};

export type SpeedValue = {
    value: number | null;                // km/h
    status?: number | null;
    personal_fastest?: boolean;
    overall_fastest?: boolean;
};

export type BestSectorInfo = {
    sector: 1 | 2 | 3;
    value: string | null;
    position?: number | null;            // rank among drivers
};

export type BestSpeedInfo = {
    i1?: { value: number | null };
    i2?: { value: number | null };
    fl?: { value: number | null };
    st?: { value: number | null };
};

export type DriverTyres = {
    current_compound: TyreCompound;
    is_new?: boolean | null;
    tyre_age_laps?: number | null;       // сколько кругов на текущем комплекте
    tyres_not_changed?: boolean | null;

    stints: TyreStint[];
};

export type TyreStint = {
    index: number;
    compound: TyreCompound;
    is_new: boolean | null;
    total_laps: number;
    start_laps: number;
    lap_flags?: number | null;
    tyres_not_changed?: boolean | null;

    reference_lap_time?: string | null;  // если пришёл LapTime
    reference_lap_number?: number | null;
};

export type DriverTrackState = {
    in_pit: boolean;
    pit_out: boolean;
    stopped: boolean;
    retired: boolean;
    knocked_out?: boolean;               // для квалификации
    cutoff?: boolean;                    // для квалификации
    status_code?: number | null;         // raw F1 status, если нужен для совместимости
};