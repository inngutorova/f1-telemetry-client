import { create } from "zustand";
import { RaceSnapshot } from "./types";

interface SnapshotState {
    currentSnapshot: RaceSnapshot | null;
    buffer: RaceSnapshot[];
    initialSnapshot: RaceSnapshot | null;

    setSnapshot: (snapshot: RaceSnapshot) => void;
    resetSnapshot: () => void;
    getSnapshotBySequence: (sequence: number) => RaceSnapshot | undefined;
    getSnapshotByIndex: (index: number) => RaceSnapshot | undefined;
    getSnapshotByDelay: (delayMs: number, intervalMs: number) => RaceSnapshot | undefined;
}

export const useSnapshotStore = create<SnapshotState>((set, get) => ({
    currentSnapshot: null,
    buffer: [],
    initialSnapshot: null,

    setSnapshot: (snapshot: RaceSnapshot) => {
        console.log('[SnapshotStore] Setting snapshot:', snapshot.sequence);
        console.log('[SnapshotStore] Drivers count:', snapshot.drivers?.length);

        set((state) => {
            const newBuffer = [...state.buffer, snapshot].slice(-100);
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

    getSnapshotByIndex: (index: number) => {
        return get().buffer[index];
    },

    getSnapshotByDelay: (delayMs: number, intervalMs: number) => {
        const { buffer } = get();
        const snapshotsBehind = Math.floor(delayMs / intervalMs);
        const targetIndex = buffer.length - 1 - snapshotsBehind;
        return buffer[Math.max(0, targetIndex)];
    },
}));