import { SessionType, TrackStatus, SessionStatus } from '../../../shared/types/common';

export type SessionMeta = {
  meeting_key?: number;
  session_key?: number;
  grand_prix_name: string;             // Australian Grand Prix
  official_name?: string;              // FORMULA 1 ...
  location?: string;                   // Melbourne
  country_code?: string;               // AUS
  country_name?: string;               // Australia
  circuit_short_name?: string;         // Melbourne

  session_type: SessionType;           // race / qualifying / practice
  session_name: string;                // Practice 3 / Qualifying / Race
  session_number?: number;             // 1,2,3 if available
  qualifying_part?: number | null;     // Q1/Q2/Q3 -> 1/2/3
  session_part?: number | null;        // общий part если приходит так

  start_time?: string;                 // ISO with timezone normalized to UTC
  end_time?: string;                   // ISO with timezone normalized to UTC
  gmt_offset?: string;                 // source info
};

export type RaceState = {
    session_status: SessionStatus;
    track_status: TrackStatus;
    track_status_message?: string;       // "AllClear", etc.
    clock: {
        utc: string;                       // текущее серверное время снапшота
        remaining_ms?: number | null;      // оставшееся время в сессии
        extrapolating?: boolean;
    };

    classification_generated_at: string; // когда рассчитана таблица
    leader_racing_number?: string | null;
    total_cars: number;
    classified_cars: number;
};

export type WeatherData = {
    air_temp_c?: number | null;
    track_temp_c?: number | null;
    humidity_pct?: number | null;
    pressure_hpa?: number | null;
    rainfall_mm?: number | null;         // либо 0/1, зависит от нормализации
    wind_direction_deg?: number | null;
    wind_speed_mps?: number | null;      // можно хранить как есть от источника, но единицу лучше зафиксировать в контракте
};

export type RaceControlMessage = {
    id: string;                          // стабильный id, например hash(Utc+Message)
    utc: string;
    category: "flag" | "safety_car" | "drs" | "other" | "penalty" | "incident";
    message: string;

    flag?: "green" | "yellow" | "double_yellow" | "red" | "clear" | "chequered";
    scope?: "track" | "sector" | "driver";
    sector?: number | null;

    safety_car_mode?: "sc" | "vsc" | null;
    safety_car_status?: "deployed" | "ending" | "in_this_lap" | null;
};

export type TeamRadioCapture = {
    id: string;
    utc: string;
    racing_number: string;
    path: string;                        // относительный путь / ссылка на mp3
};