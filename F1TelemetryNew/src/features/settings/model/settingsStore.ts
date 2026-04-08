// src/entities/settings/model/settingsStore.ts
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@user_settings";

export type UserSettings = {
  delayMs: number;
  columnsVisible: Record<string, boolean>;
  columnsOrder: string[]; // Добавим порядок колонок
};

interface SettingsState {
  userSettings: UserSettings;
  isLoading: boolean;

  setUserSettings: (settings: Partial<UserSettings>) => void;
  loadSettings: () => Promise<void>;
  saveSettings: () => Promise<void>;
}

const DEFAULT_SETTINGS: UserSettings = {
  delayMs: 0,
  columnsVisible: {
    position: true,
    driver: true,
    gap: true,
    interval: true,
    lastLap: true,
    bestLap: true,
    tyre: true,
    positionChange: true,
    sectors: true,
  },
  columnsOrder: ["position", "driver", "gap", "interval", "lastLap", "bestLap", "tyre", "positionChange", "sectors"],

};

// Проверяем, доступен ли AsyncStorage
const isAsyncStorageAvailable = () => {
  try {
    return AsyncStorage && typeof AsyncStorage.getItem === 'function';
  } catch {
    return false;
  }
};

export const useSettingsStore = create<SettingsState>((set, get) => ({
  userSettings: DEFAULT_SETTINGS,
  isLoading: false,

  setUserSettings: (settings: Partial<UserSettings>) => {
    set((state) => ({
      userSettings: { ...state.userSettings, ...settings },
    }));
    // Автоматически сохраняем при изменении
    get().saveSettings();
  },

  loadSettings: async () => {
    try {
      // Проверяем доступность AsyncStorage
      if (!isAsyncStorageAvailable()) {
        console.warn("AsyncStorage is not available, using default settings");
        return;
      }

      set({ isLoading: true });
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) {
        const data = JSON.parse(json);
        set({ 
          userSettings: { 
            ...DEFAULT_SETTINGS, 
            ...data,
            columnsVisible: { ...DEFAULT_SETTINGS.columnsVisible, ...data.columnsVisible }
          } 
        });
      }
    } catch (e) {
      console.error("Failed to load settings from AsyncStorage", e);
    } finally {
      set({ isLoading: false });
    }
  },

  saveSettings: async () => {
    try {
      // Проверяем доступность AsyncStorage
      if (!isAsyncStorageAvailable()) {
        console.warn("AsyncStorage is not available, settings not saved");
        return;
      }

      const data = get().userSettings;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      console.log("Settings saved successfully");
    } catch (e) {
      console.error("Failed to save settings to AsyncStorage", e);
    }
  },
}));