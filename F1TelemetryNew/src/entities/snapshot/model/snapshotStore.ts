import {create} from "zustand";
import { RaceSnapshot } from "./types"; // поправь путь под твою структуру

interface SnapshotState {
  currentSnapshot: RaceSnapshot | null;
  buffer: RaceSnapshot[];
  initialSnapshot: RaceSnapshot | null;

  setSnapshot: (snapshot: RaceSnapshot) => void;
  resetSnapshot: () => void;
  getSnapshotBySequence: (sequence: number) => RaceSnapshot | undefined;
}

export const useSnapshotStore = create<SnapshotState>((set, get) => ({
  currentSnapshot: null,
  buffer: [],
  initialSnapshot: null,

  setSnapshot: (snapshot: RaceSnapshot) => {
    set((state) => {
      const newBuffer = [...state.buffer, snapshot].slice(-50); // храним последние 50 snapshot
      const initialSnapshot = state.initialSnapshot ?? snapshot;
      return {
        currentSnapshot: snapshot,
        buffer: newBuffer,
        initialSnapshot,
      };
    });
  },

  resetSnapshot: () => {
    set({
      currentSnapshot: null,
      buffer: [],
      initialSnapshot: null,
    });
  },

  getSnapshotBySequence: (sequence: number) => {
    return get().buffer.find((s) => s.sequence === sequence);
  },
}));