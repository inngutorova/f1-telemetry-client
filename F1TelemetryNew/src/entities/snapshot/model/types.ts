import { SessionMeta, RaceState, WeatherData, RaceControlMessage, TeamRadioCapture } from '../../session/model/types';
import { DriverState } from '../../driver/model/types';

export type RaceSnapshot = {
  schema_version: number;
  snapshot_id: string;
  session_key: string;
  sequence: number;
  generated_at: string;
  source_timestamp: string;
  interval_ms: 2000;
  is_delta_from_previous: false;

  session: SessionMeta;
  race_state: RaceState;
  weather?: WeatherData;
  drivers: DriverState[];

  race_control: RaceControlMessage[];
  team_radio: TeamRadioCapture[];
};