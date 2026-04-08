// src/features/telemetry/useFakeStream.ts
import { useEffect, useRef } from "react";
import { generateRaceSnapshots } from "../../shared/mocks/fakeSnapshots";
import { useSnapshotStore } from "../../entities/snapshot/model/snapshotStore";
import { useMessagesStore } from "../../entities/messages/model/messagesStore";
import { useSettingsStore } from "../../features/settings/model/settingsStore";

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
  const { userSettings } = useSettingsStore();
  const delayMs = userSettings.delayMs || 0;

  const intervalRef = useRef<NodeJS.Timeout>();
  const indexRef = useRef(0);
  const snapshotsRef = useRef<any[]>([]);
  const lastDisplayedIndexRef = useRef(-1);
  const delayMsRef = useRef(delayMs);

  // Синхронизируем ref с актуальным delayMs
  useEffect(() => {
    delayMsRef.current = delayMs;
    console.log("delayMs changed to:", delayMs);
    if (intervalRef.current) {
      //displayCurrentSnapshot();
    }
  }, [delayMs]);

  const getCurrentIndexWithDelay = () => {
    const snapshotsBehind = Math.floor(delayMsRef.current / intervalMs);
    const currentLiveIndex = indexRef.current - 1;
    const displayIndex = Math.max(0, currentLiveIndex - snapshotsBehind);
    console.log(`Calculating index: live=${currentLiveIndex}, behind=${snapshotsBehind}, display=${displayIndex}`);
    return displayIndex;
  };

  const displayCurrentSnapshot = () => {
    if (snapshotsRef.current.length === 0) return;
    
    const displayIndex = getCurrentIndexWithDelay();
    
    if (lastDisplayedIndexRef.current === displayIndex) {
      return;
    }
    
    const snapshot = snapshotsRef.current[displayIndex];
    
    if (snapshot) {
      console.log(`Displaying snapshot at index ${displayIndex} (live index: ${indexRef.current - 1}, delay: ${delayMsRef.current}ms)`);
      
      // ТОЛЬКО ЗДЕСЬ обновляем UI - с учетом delay
      setSnapshot(snapshot);
      lastDisplayedIndexRef.current = displayIndex;
      
      if (snapshot.race_control && snapshot.race_control.length > 0) {
        addRaceControlMessages(snapshot.race_control);
      }
      
      if (snapshot.team_radio && snapshot.team_radio.length > 0) {
        addTeamRadioMessages(snapshot.team_radio);
      }
    }
  };

  const start = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    resetSnapshot();
    clearMessages();

    if (sessionType === "race") {
      snapshotsRef.current = generateRaceSnapshots(snapshotCount);
    } else {
      const { generateSnapshots } = require("../../shared/mocks/fakeSnapshots");
      snapshotsRef.current = generateSnapshots(snapshotCount, sessionType);
    }
    
    indexRef.current = 0;
    lastDisplayedIndexRef.current = -1;
    
    intervalRef.current = setInterval(() => {
      if (indexRef.current >= snapshotsRef.current.length) {
        console.log("Fake stream completed");
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
      }
      
      console.log(`Live snapshot ${indexRef.current + 1}/${snapshotsRef.current.length}`);
      indexRef.current++;
      
      // НЕ вызываем setSnapshot здесь!
      // Только показываем с учетом delay
      displayCurrentSnapshot();
      
    }, intervalMs);
    
    setTimeout(() => {
      displayCurrentSnapshot();
    }, 100);
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