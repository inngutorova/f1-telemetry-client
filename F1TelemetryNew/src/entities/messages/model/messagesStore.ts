import { create } from "zustand";
import { RaceControlMessage, TeamRadioCapture } from "../../session/model/types";

interface MessagesState {
  raceControlMessages: RaceControlMessage[];
  teamRadioMessages: TeamRadioCapture[];
  
  addRaceControlMessages: (messages: RaceControlMessage[]) => void;
  addTeamRadioMessages: (messages: TeamRadioCapture[]) => void;
  clearMessages: () => void;
}

export const useMessagesStore = create<MessagesState>((set, get) => ({
  raceControlMessages: [],
  teamRadioMessages: [],

  addRaceControlMessages: (messages: RaceControlMessage[]) => {
    if (!messages || messages.length === 0) return;
    
    set((state) => {
      const existingIds = new Set(state.raceControlMessages.map(m => m.id));
      const newMessages = messages.filter(m => !existingIds.has(m.id));
      
      return {
        raceControlMessages: [...state.raceControlMessages, ...newMessages]
      };
    });
  },

  addTeamRadioMessages: (messages: TeamRadioCapture[]) => {
    if (!messages || messages.length === 0) return;
    
    set((state) => {
      const existingIds = new Set(state.teamRadioMessages.map(m => m.id));
      const newMessages = messages.filter(m => !existingIds.has(m.id));
      
      return {
        teamRadioMessages: [...state.teamRadioMessages, ...newMessages]
      };
    });
  },

  clearMessages: () => {
    set({
      raceControlMessages: [],
      teamRadioMessages: []
    });
  },
}));