import { DriverIdentity, DriverTiming, DriverTyres, DriverTrackState, SectorInfo } from "../../entities/driver/model/types";

export interface CachedDriverData {
  identity: {
    tla: string;
    full_name: string;
    first_name?: string;
    last_name?: string;
    team_name: string;
    team_color: string;
    broadcast_name?: string;
  };
  timing: {
    number_of_laps?: number | null;
    gap_to_leader?: string | null;
    interval_to_ahead?: string | null;
    best_lap?: any;
    last_lap?: any;
    sectors: Map<number, SectorInfo>; 
    speeds?: any;
  };
  tyres?: DriverTyres;
  track?: DriverTrackState;
  lastUpdated: number;
}

class DriverDataCache {
  private cache: Map<string, CachedDriverData> = new Map();

  private isValidValue(value: any): boolean {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') {
      if (value === '' || value === 'unknown' || value === 'null') return false;
    }
    return true;
  }

  private updateIdentity(racingNumber: string, identity: DriverIdentity): Partial<CachedDriverData['identity']> {
    const existing = this.cache.get(racingNumber);
    const updated: Partial<CachedDriverData['identity']> = {};
    
    if (this.isValidValue(identity.tla)) updated.tla = identity.tla;
    else if (existing?.identity.tla) updated.tla = existing.identity.tla;
    
    if (this.isValidValue(identity.full_name)) updated.full_name = identity.full_name;
    else if (existing?.identity.full_name) updated.full_name = existing.identity.full_name;
    
    if (this.isValidValue(identity.first_name)) updated.first_name = identity.first_name;
    else if (existing?.identity.first_name) updated.first_name = existing.identity.first_name;
    
    if (this.isValidValue(identity.last_name)) updated.last_name = identity.last_name;
    else if (existing?.identity.last_name) updated.last_name = existing.identity.last_name;
    
    if (this.isValidValue(identity.team_name)) updated.team_name = identity.team_name;
    else if (existing?.identity.team_name) updated.team_name = existing.identity.team_name;
    
    if (this.isValidValue(identity.team_color)) updated.team_color = identity.team_color;
    else if (existing?.identity.team_color) updated.team_color = existing.identity.team_color;
    
    if (this.isValidValue(identity.broadcast_name)) updated.broadcast_name = identity.broadcast_name;
    else if (existing?.identity.broadcast_name) updated.broadcast_name = existing.identity.broadcast_name;
    
    return updated;
  }


private updateSectors(racingNumber: string, sectors: SectorInfo[]): Map<number, SectorInfo> {
  const existing = this.cache.get(racingNumber);
  const sectorsMap = existing?.timing.sectors ? new Map(existing.timing.sectors) : new Map();
  
  sectors.forEach(sector => {
    const hasValidValue = sector.value !== null && 
                          sector.value !== undefined && 
                          sector.value !== '';
    
    if (hasValidValue) {
      sectorsMap.set(sector.sector, sector);
    }
  });
  
  return sectorsMap;
}

  private updateTiming(racingNumber: string, timing: DriverTiming): Partial<CachedDriverData['timing']> {
    const existing = this.cache.get(racingNumber);
    const updated: Partial<CachedDriverData['timing']> = {};
    
    if (this.isValidValue(timing.number_of_laps)) updated.number_of_laps = timing.number_of_laps;
    else if (existing?.timing.number_of_laps) updated.number_of_laps = existing.timing.number_of_laps;
    
    if (this.isValidValue(timing.gap_to_leader)) updated.gap_to_leader = timing.gap_to_leader;
    else if (existing?.timing.gap_to_leader) updated.gap_to_leader = existing.timing.gap_to_leader;
    
    if (this.isValidValue(timing.interval_to_ahead)) updated.interval_to_ahead = timing.interval_to_ahead;
    else if (existing?.timing.interval_to_ahead) updated.interval_to_ahead = existing.timing.interval_to_ahead;
    
    if (timing.best_lap && this.isValidValue(timing.best_lap.value)) updated.best_lap = timing.best_lap;
    else if (existing?.timing.best_lap) updated.best_lap = existing.timing.best_lap;
    
    if (timing.last_lap && this.isValidValue(timing.last_lap.value)) updated.last_lap = timing.last_lap;
    else if (existing?.timing.last_lap) updated.last_lap = existing.timing.last_lap;
    
    if (timing.speeds && Object.values(timing.speeds).some(s => this.isValidValue(s?.value))) {
      updated.speeds = timing.speeds;
    } else if (existing?.timing.speeds) {
      updated.speeds = existing.timing.speeds;
    }
    
    if (timing.sectors && timing.sectors.length > 0) {
      updated.sectors = this.updateSectors(racingNumber, timing.sectors);
    } else if (existing?.timing.sectors) {
      updated.sectors = existing.timing.sectors;
    }
    
    return updated;
  }

private updateTyres(racingNumber: string, tyres: DriverTyres): DriverTyres | undefined {
  const existing = this.cache.get(racingNumber);
  
  if (!tyres) return existing?.tyres;
  
  if (existing?.tyres) {
    const updatedTyres: DriverTyres = { ...existing.tyres };
    
    if (tyres.tyre_age_laps !== undefined && tyres.tyre_age_laps !== null) {
      updatedTyres.tyre_age_laps = tyres.tyre_age_laps;
    }
    
    if (tyres.is_new !== undefined && tyres.is_new !== null) {
      updatedTyres.is_new = tyres.is_new;
    }
    
    if (this.isValidValue(tyres.current_compound) && tyres.current_compound !== 'unknown') {
      updatedTyres.current_compound = tyres.current_compound;
    }
    
    if (tyres.stints && tyres.stints.length > 0) {
      updatedTyres.stints = tyres.stints;
    }
    
    return updatedTyres;
  }
  
  if (this.isValidValue(tyres.current_compound) && tyres.current_compound !== 'unknown') {
    return tyres;
  }
  
  if (tyres.tyre_age_laps !== undefined) {
    return {
      current_compound: 'unknown',
      tyre_age_laps: tyres.tyre_age_laps,
      is_new: tyres.is_new ?? false,
      stints: tyres.stints || [],
    };
  }
  
  return undefined;
}

  private updateTrack(racingNumber: string, track: DriverTrackState): DriverTrackState | undefined {
    const existing = this.cache.get(racingNumber);
    
    if (track && (track.in_pit !== undefined || track.retired !== undefined)) {
      return track;
    }
    return existing?.track;
  }

  updateDriverData(racingNumber: string, driverData: {
    identity?: DriverIdentity;
    timing?: DriverTiming;
    tyres?: DriverTyres;
    track?: DriverTrackState;
  }) {
    const existing = this.cache.get(racingNumber);
    
    const updatedIdentity = driverData.identity ? this.updateIdentity(racingNumber, driverData.identity) : {};
    const updatedTiming = driverData.timing ? this.updateTiming(racingNumber, driverData.timing) : {};
    const updatedTyres = driverData.tyres ? this.updateTyres(racingNumber, driverData.tyres) : undefined;
    const updatedTrack = driverData.track ? this.updateTrack(racingNumber, driverData.track) : undefined;
    
    const cachedData: CachedDriverData = {
      identity: {
        tla: updatedIdentity.tla || existing?.identity.tla || racingNumber,
        full_name: updatedIdentity.full_name || existing?.identity.full_name || `Driver ${racingNumber}`,
        first_name: updatedIdentity.first_name || existing?.identity.first_name,
        last_name: updatedIdentity.last_name || existing?.identity.last_name,
        team_name: updatedIdentity.team_name || existing?.identity.team_name || 'Unknown',
        team_color: updatedIdentity.team_color || existing?.identity.team_color || '#6B7C8D',
        broadcast_name: updatedIdentity.broadcast_name || existing?.identity.broadcast_name,
      },
      timing: {
        number_of_laps: updatedTiming.number_of_laps ?? existing?.timing.number_of_laps,
        gap_to_leader: updatedTiming.gap_to_leader ?? existing?.timing.gap_to_leader,
        interval_to_ahead: updatedTiming.interval_to_ahead ?? existing?.timing.interval_to_ahead,
        best_lap: updatedTiming.best_lap ?? existing?.timing.best_lap,
        last_lap: updatedTiming.last_lap ?? existing?.timing.last_lap,
        sectors: updatedTiming.sectors instanceof Map ? updatedTiming.sectors : (existing?.timing.sectors || new Map()),
        speeds: updatedTiming.speeds ?? existing?.timing.speeds,
      },
      tyres: updatedTyres ?? existing?.tyres,
      track: updatedTrack ?? existing?.track,
      lastUpdated: Date.now(),
    };
    
    this.cache.set(racingNumber, cachedData);
  }

getEnrichedDriver(racingNumber: string, liveData: {
  identity?: DriverIdentity;
  timing?: DriverTiming;
  tyres?: DriverTyres;
  track?: DriverTrackState;
}): any {
  const cached = this.cache.get(racingNumber);
  
  const getTyres = (): DriverTyres | undefined => {
    if (liveData.tyres) {
      if (this.isValidValue(liveData.tyres.current_compound) && liveData.tyres.current_compound !== 'unknown') {
        return liveData.tyres;
      }
      if (cached?.tyres) {
        return cached.tyres;
      }
      return liveData.tyres;
    }
    if (cached?.tyres) {
      return cached.tyres;
    }
    return undefined;
  };
  
const getMergedSectors = (): SectorInfo[] => {
  const sectorsMap = new Map<number, SectorInfo>();
  
  if (cached?.timing.sectors) {
    cached.timing.sectors.forEach((sector, sectorNumber) => {
      sectorsMap.set(sectorNumber, { ...sector });
    });
  }
  
  if (liveData.timing?.sectors && liveData.timing.sectors.length > 0) {
    liveData.timing.sectors.forEach(sector => {
      const hasValidValue = sector.value !== null && 
                            sector.value !== undefined && 
                            sector.value !== '';
      
      if (hasValidValue) {
        sectorsMap.set(sector.sector, { ...sector });
      }
    });
  }
  
  return Array.from(sectorsMap.values()).sort((a, b) => a.sector - b.sector);
};
  
  if (!cached) {
    return {
      identity: {
        tla: liveData.identity?.tla || racingNumber,
        full_name: liveData.identity?.full_name || `Driver ${racingNumber}`,
        team_name: liveData.identity?.team_name || 'Unknown',
        team_color: liveData.identity?.team_color || '#6B7C8D',
      },
      timing: {
        number_of_laps: liveData.timing?.number_of_laps,
        gap_to_leader: liveData.timing?.gap_to_leader,
        interval_to_ahead: liveData.timing?.interval_to_ahead,
        best_lap: liveData.timing?.best_lap,
        last_lap: liveData.timing?.last_lap,
        sectors: liveData.timing?.sectors || [],
        speeds: liveData.timing?.speeds,
      },
      tyres: getTyres(),
      track: liveData.track,
    };
  }
  
  return {
    identity: {
      tla: this.isValidValue(liveData.identity?.tla) ? liveData.identity!.tla : cached.identity.tla,
      full_name: this.isValidValue(liveData.identity?.full_name) ? liveData.identity!.full_name : cached.identity.full_name,
      first_name: this.isValidValue(liveData.identity?.first_name) ? liveData.identity!.first_name : cached.identity.first_name,
      last_name: this.isValidValue(liveData.identity?.last_name) ? liveData.identity!.last_name : cached.identity.last_name,
      team_name: this.isValidValue(liveData.identity?.team_name) ? liveData.identity!.team_name : cached.identity.team_name,
      team_color: this.isValidValue(liveData.identity?.team_color) ? liveData.identity!.team_color : cached.identity.team_color,
      broadcast_name: this.isValidValue(liveData.identity?.broadcast_name) ? liveData.identity!.broadcast_name : cached.identity.broadcast_name,
    },
    timing: {
      number_of_laps: this.isValidValue(liveData.timing?.number_of_laps) ? liveData.timing!.number_of_laps : cached.timing.number_of_laps,
      gap_to_leader: this.isValidValue(liveData.timing?.gap_to_leader) ? liveData.timing!.gap_to_leader : cached.timing.gap_to_leader,
      interval_to_ahead: this.isValidValue(liveData.timing?.interval_to_ahead) ? liveData.timing!.interval_to_ahead : cached.timing.interval_to_ahead,
      best_lap: this.isValidValue(liveData.timing?.best_lap?.value) ? liveData.timing!.best_lap : cached.timing.best_lap,
      last_lap: this.isValidValue(liveData.timing?.last_lap?.value) ? liveData.timing!.last_lap : cached.timing.last_lap,
      sectors: getMergedSectors(),
      speeds: liveData.timing?.speeds && Object.values(liveData.timing.speeds).some(s => this.isValidValue(s?.value)) 
        ? liveData.timing.speeds 
        : cached.timing.speeds,
    },
    tyres: getTyres(),
    track: liveData.track ?? cached.track,
  };
}

  clear() {
    this.cache.clear();
  }
}

export const driverDataCache = new DriverDataCache();