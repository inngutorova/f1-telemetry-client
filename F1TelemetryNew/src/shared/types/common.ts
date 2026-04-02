export type SessionType = "race" | "qualifying" | "practice" | "sprint" | "unknown";

export type TrackStatus =
  | "all_clear"
  | "yellow"
  | "double_yellow"
  | "red"
  | "vsc"
  | "safety_car"
  | "chequered"
  | "unknown";

export type SessionStatus =
  | "pending"
  | "started"
  | "inactive"
  | "aborted"
  | "finished"
  | "finalised"
  | "ends"
  | "unknown";

export type TyreCompound =
  | "soft"
  | "medium"
  | "hard"
  | "intermediate"
  | "wet"
  | "unknown";