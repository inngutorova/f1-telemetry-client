// src/features/telemetry/useRealStream.ts
import { useEffect, useState, useCallback, useRef } from "react";
import { websocketService } from "./websocketService";
import { useSnapshotStore } from "../../entities/snapshot/model/snapshotStore";
import { useMessagesStore } from "../../entities/messages/model/messagesStore";
import { useSettingsStore } from "../settings/model/settingsStore";

export const useRealStream = () => {
  const setSnapshot = useSnapshotStore((s) => s.setSnapshot);
  const addRaceControlMessages = useMessagesStore((s) => s.addRaceControlMessages);
  const addTeamRadioMessages = useMessagesStore((s) => s.addTeamRadioMessages);
  const clearMessages = useMessagesStore((s) => s.clearMessages);
  const resetSnapshot = useSnapshotStore((s) => s.resetSnapshot);
  const { userSettings } = useSettingsStore();
  
  const [isConnected, setIsConnected] = useState(false);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const unsubscribeStatusRef = useRef<(() => void) | null>(null);

  // Подписка на изменение delay
  useEffect(() => {
    const delayMs = userSettings.delayMs || 0;
    if (isConnected) {
      websocketService.updateDelay(delayMs);
    }
  }, [userSettings.delayMs, isConnected]);

  // Управление WebSocket подключением
  useEffect(() => {
    // Подписываемся на статус подключения
    unsubscribeStatusRef.current = websocketService.onStatusChange((connected) => {
      setIsConnected(connected);
    });

    // Подписываемся на сообщения
    unsubscribeRef.current = websocketService.onMessage((snapshot) => {
      console.log(`[RealStream] Received snapshot ${snapshot.sequence}`);
      
      setSnapshot(snapshot);
      
      if (snapshot.race_control && snapshot.race_control.length > 0) {
        addRaceControlMessages(snapshot.race_control);
      }
      
      if (snapshot.team_radio && snapshot.team_radio.length > 0) {
        addTeamRadioMessages(snapshot.team_radio);
      }
    });

    // Подключаемся с текущим delay
    websocketService.connect(userSettings.delayMs || 0);

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
      if (unsubscribeStatusRef.current) {
        unsubscribeStatusRef.current();
      }
      websocketService.disconnect();
    };
  }, []);

  return { isConnected };
};