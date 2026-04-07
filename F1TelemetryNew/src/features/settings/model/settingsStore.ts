import {create} from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@user_settings";

export type UserSettings = {
  delayMs: number; // задержка отображения телеметрии
  columnsVisible: Record<string, boolean>; // видимость столбцов таблицы
};

interface SettingsState {
  userSettings: UserSettings;

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
    lastLap: true,
    tyre: true,
  },
};

export const useSettingsStore = create<SettingsState>((set, get) => ({
  userSettings: DEFAULT_SETTINGS,

  setUserSettings: (settings: Partial<UserSettings>) => {
    set((state) => ({
      userSettings: { ...state.userSettings, ...settings },
    }));
  },

  loadSettings: async () => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) {
        const data = JSON.parse(json);
        set({ userSettings: { ...DEFAULT_SETTINGS, ...data } });
      }
    } catch (e) {
      console.error("Failed to load settings from AsyncStorage", e);
    }
  },

  saveSettings: async () => {
    try {
      const data = get().userSettings;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save settings to AsyncStorage", e);
    }
  },
}));