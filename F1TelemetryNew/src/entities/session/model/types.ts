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
    mode?: "green" | "yellow" | "red" | "vsc" | "sc" | null; 
};

export type TeamRadioCapture = {
    id: string;
    utc: string;
    racing_number: string;
    path: string;                        // относительный путь / ссылка на mp3
};

export interface UISession {
  id: string;
  meta: SessionMeta;
  state?: RaceState;
  weather?: WeatherData;
  isLive: boolean;
  hasReplay: boolean;
  startTime?: string;
  endTime?: string;
}

// Функция для преобразования SessionMeta в UISession
export const createUISession = (
  meta: SessionMeta, 
  isLive: boolean = false, 
  hasReplay: boolean = true
): UISession => {
  return {
    id: meta.session_key?.toString() || `${meta.grand_prix_name}_${meta.session_type}_${Date.now()}`,
    meta,
    isLive,
    hasReplay,
    startTime: meta.start_time,
    endTime: meta.end_time,
  };
};

// Данные трассы Сузука
const SUZUKA_CIRCUIT = {
  lengthKm: 5.807,
  laps: 53,
  turns: 18,
};

// Моковые данные - Гран При Японии 2026
export const MOCK_UI_SESSIONS: UISession[] = [
  {
    id: 'japan_race_2026',
    meta: {
      meeting_key: 1,
      session_key: 1,
      grand_prix_name: 'Japanese Grand Prix',
      official_name: 'FORMULA 1 ARAMCO JAPANESE GRAND PRIX 2026',
      location: 'Suzuka',
      country_code: 'JPN',
      country_name: 'Japan',
      circuit_short_name: 'Suzuka Circuit',
      session_type: 'race',
      session_name: 'Race',
      session_number: 1,
      qualifying_part: null,
      session_part: null,
      start_time: '2026-03-29T08:00:00Z', // 8:00 UTC / 17:00 JST
      end_time: '2026-03-29T10:00:00Z',
      gmt_offset: '+09:00',
    },
    isLive: false, // Сейчас активна
    hasReplay: true,
    startTime: '2026-03-29T08:00:00Z',
    endTime: '2026-03-29T10:00:00Z',
  },
];

// Дополнительные данные о трассе
export const getCircuitInfo = (circuitShortName?: string) => {
  const circuits: Record<string, { lengthKm: number; laps: number; turns: number }> = {
    'Suzuka Circuit': SUZUKA_CIRCUIT,
    'Marina Bay Street Circuit': { lengthKm: 4.927, laps: 62, turns: 19 },
    'Melbourne': { lengthKm: 5.278, laps: 58, turns: 14 },
    'Monaco': { lengthKm: 3.337, laps: 78, turns: 19 },
  };
  
  return circuits[circuitShortName || ''] || { lengthKm: 0, laps: 0, turns: 0 };
};
