// src/features/telemetry/useFakeStream.ts
import { useEffect, useRef } from "react";
import { generateRaceSnapshots } from "../../shared/mocks/fakeSnapshots";
import { useSnapshotStore } from "../../entities/snapshot/model/snapshotStore";
import { useMessagesStore } from "../../entities/messages/model/messagesStore";

interface UseFakeStreamOptions {
  sessionType?: "practice" | "qualifying" | "race";
  snapshotCount?: number;
  intervalMs?: number;
  autoStart?: boolean;
}

export const useFakeStream = (options: UseFakeStreamOptions = {}) => {
  const {
    sessionType = "race",
    snapshotCount = 500,
    intervalMs = 2000,
    autoStart = true,
  } = options;
  
  const setSnapshot = useSnapshotStore((s) => s.setSnapshot);
  const addRaceControlMessages = useMessagesStore((s) => s.addRaceControlMessages);
  const addTeamRadioMessages = useMessagesStore((s) => s.addTeamRadioMessages);
  const clearMessages = useMessagesStore((s) => s.clearMessages);
  const resetSnapshot = useSnapshotStore((s) => s.resetSnapshot);


  const intervalRef = useRef<NodeJS.Timeout>();
  const indexRef = useRef(0);
  const snapshotsRef = useRef<any[]>([]);

  const start = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    resetSnapshot();
    clearMessages();

    // Генерируем снапшоты с нужным типом сессии
    if (sessionType === "race") {
      snapshotsRef.current = generateRaceSnapshots(snapshotCount);
    } else {
      const { generateSnapshots } = require("../../shared/mocks/fakeSnapshots");
      snapshotsRef.current = generateSnapshots(snapshotCount, sessionType);
    }
    
    indexRef.current = 0;
    
    intervalRef.current = setInterval(() => {
      if (indexRef.current >= snapshotsRef.current.length) {
        console.log("Fake stream completed");
        clearInterval(intervalRef.current);
        return;
      }
      
      const snapshot = snapshotsRef.current[indexRef.current];
      console.log(`Snapshot ${indexRef.current + 1}/${snapshotsRef.current.length}:`, {
        sequence: snapshot.sequence,
        sessionStatus: snapshot.race_state.session_status,
        leader: snapshot.drivers[0]?.identity.tla,
        trackStatus: snapshot.race_state.track_status,
      });
      
      // Сохраняем снапшот
      setSnapshot(snapshot);
      
      // Сохраняем сообщения в отдельный стор
      if (snapshot.race_control && snapshot.race_control.length > 0) {
        addRaceControlMessages(snapshot.race_control);
      }
      
      if (snapshot.team_radio && snapshot.team_radio.length > 0) {
        addTeamRadioMessages(snapshot.team_radio);
      }
      
      indexRef.current++;
    }, intervalMs);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  const restart = () => {
    stop();
    start();
  };

  useEffect(() => {
    if (autoStart) {
      start();
    }
    
    return () => {
      stop();
    };
  }, [autoStart, sessionType, snapshotCount, intervalMs]);

  return { start, stop, restart, isRunning: !!intervalRef.current };
};