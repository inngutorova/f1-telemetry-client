// src/shared/mocks/fakeSnapshots.ts
import { TyreCompound } from "../types/common";
import { DriverState } from "../../entities/driver/model/types";
import { RaceSnapshot } from "../../entities/snapshot/model/types";
import { TrackStatus } from "../../shared/types/common";

// Реальные данные пилотов F1 2026
const REAL_DRIVERS: Omit<DriverState, 'timing' | 'tyres' | 'track' | 'position' | 'line' | 'show_position'>[] = [
    { racing_number: "16", identity: { tla: "LEC", full_name: "Charles LECLERC", first_name: "Charles", last_name: "Leclerc", team_name: "Ferrari", team_color: "ED1131", broadcast_name: "C LECLERC" } },
    { racing_number: "81", identity: { tla: "PIA", full_name: "Oscar PIASTRI", first_name: "Oscar", last_name: "Piastri", team_name: "McLaren", team_color: "F47600", broadcast_name: "O PIASTRI" } },
    { racing_number: "44", identity: { tla: "HAM", full_name: "Lewis HAMILTON", first_name: "Lewis", last_name: "Hamilton", team_name: "Ferrari", team_color: "ED1131", broadcast_name: "L HAMILTON" } },
    { racing_number: "1", identity: { tla: "NOR", full_name: "Lando NORRIS", first_name: "Lando", last_name: "Norris", team_name: "McLaren", team_color: "F47600", broadcast_name: "L NORRIS" } },
    { racing_number: "31", identity: { tla: "OCO", full_name: "Esteban OCON", first_name: "Esteban", last_name: "Ocon", team_name: "Haas F1 Team", team_color: "9C9FA2", broadcast_name: "E OCON" } },
    { racing_number: "41", identity: { tla: "LIN", full_name: "Arvid LINDBLAD", first_name: "Arvid", last_name: "Lindblad", team_name: "Racing Bulls", team_color: "6C98FF", broadcast_name: "A LINDBLAD" } },
    { racing_number: "30", identity: { tla: "LAW", full_name: "Liam LAWSON", first_name: "Liam", last_name: "Lawson", team_name: "Racing Bulls", team_color: "6C98FF", broadcast_name: "L LAWSON" } },
    { racing_number: "5", identity: { tla: "BOR", full_name: "Gabriel BORTOLETO", first_name: "Gabriel", last_name: "Bortoleto", team_name: "Audi", team_color: "F50537", broadcast_name: "G BORTOLETO" } },
    { racing_number: "55", identity: { tla: "SAI", full_name: "Carlos SAINZ", first_name: "Carlos", last_name: "Sainz", team_name: "Williams", team_color: "1868DB", broadcast_name: "C SAINZ" } },
    { racing_number: "87", identity: { tla: "BEA", full_name: "Oliver BEARMAN", first_name: "Oliver", last_name: "Bearman", team_name: "Haas F1 Team", team_color: "9C9FA2", broadcast_name: "O BEARMAN" } },
    { racing_number: "27", identity: { tla: "HUL", full_name: "Nico HULKENBERG", first_name: "Nico", last_name: "Hulkenberg", team_name: "Audi", team_color: "F50537", broadcast_name: "N HULKENBERG" } },
    { racing_number: "23", identity: { tla: "ALB", full_name: "Alexander ALBON", first_name: "Alexander", last_name: "Albon", team_name: "Williams", team_color: "1868DB", broadcast_name: "A ALBON" } },
    { racing_number: "11", identity: { tla: "PER", full_name: "Sergio PEREZ", first_name: "Sergio", last_name: "Perez", team_name: "Cadillac", team_color: "909090", broadcast_name: "S PEREZ" } },
    { racing_number: "63", identity: { tla: "RUS", full_name: "George RUSSELL", first_name: "George", last_name: "Russell", team_name: "Mercedes", team_color: "00D7B6", broadcast_name: "G RUSSELL" } },
    { racing_number: "3", identity: { tla: "VER", full_name: "Max VERSTAPPEN", first_name: "Max", last_name: "Verstappen", team_name: "Red Bull Racing", team_color: "4781D7", broadcast_name: "M VERSTAPPEN" } },
    { racing_number: "14", identity: { tla: "ALO", full_name: "Fernando ALONSO", first_name: "Fernando", last_name: "Alonso", team_name: "Aston Martin", team_color: "229971", broadcast_name: "F ALONSO" } },
    { racing_number: "18", identity: { tla: "STR", full_name: "Lance STROLL", first_name: "Lance", last_name: "Stroll", team_name: "Aston Martin", team_color: "229971", broadcast_name: "L STROLL" } },
    { racing_number: "77", identity: { tla: "BOT", full_name: "Valtteri BOTTAS", first_name: "Valtteri", last_name: "Bottas", team_name: "Cadillac", team_color: "909090", broadcast_name: "V BOTTAS" } },
    { racing_number: "43", identity: { tla: "COL", full_name: "Franco COLAPINTO", first_name: "Franco", last_name: "Colapinto", team_name: "Alpine", team_color: "00A1E8", broadcast_name: "F COLAPINTO" } },
    { racing_number: "12", identity: { tla: "ANT", full_name: "Kimi ANTONELLI", first_name: "Kimi", last_name: "Antonelli", team_name: "Mercedes", team_color: "00D7B6", broadcast_name: "K ANTONELLI" } },
    { racing_number: "6", identity: { tla: "HAD", full_name: "Isack HADJAR", first_name: "Isack", last_name: "Hadjar", team_name: "Red Bull Racing", team_color: "4781D7", broadcast_name: "I HADJAR" } },
    { racing_number: "10", identity: { tla: "GAS", full_name: "Pierre GASLY", first_name: "Pierre", last_name: "Gasly", team_name: "Alpine", team_color: "00A1E8", broadcast_name: "P GASLY" } },
];

// Реальные team radio записи
const TEAM_RADIO_LIST = [
    {
        Utc: "2025-10-05T11:13:12.611Z",
        RacingNumber: "63",
        Path: "Target lap times low 1:29.",
        driver: "Russell",
        message: "Target lap times low 1:29."
    },
    {
        Utc: "2025-10-05T11:23:26.175Z",
        RacingNumber: "44",
        Path: "Battery 70%. Deploy in DRS zones only. Save for later.",
        driver: "Hamilton",
        message: "Battery 70%. Deploy in DRS zones only. Save for later."
    },
    {
        Utc: "2025-10-05T11:26:30.583Z",
        RacingNumber: "16",
        Path: "Harvesting mode disabled. Overtake button available.",
        driver: "Leclerc",
        message: "Harvesting mode disabled. Overtake button available."
    },
    {
        Utc: "2025-10-05T11:35:22.123Z",
        RacingNumber: "3",
        Path: "You have 3 laps to catch Norris. Keep the pressure.",
        driver: "Verstappen",
        message: "You have 3 laps to catch Norris. Keep the pressure."
    },
    {
        Utc: "2025-10-05T11:42:15.456Z",
        RacingNumber: "81",
        Path: "Good pace Oscar. You're catching the pack. Stay patient.",
        driver: "Piastri",
        message: "Good pace Oscar. You're catching the pack. Stay patient."
    },
    {
        Utc: "2025-10-05T11:48:33.789Z",
        RacingNumber: "55",
        Path: "Carlos, target lap 1:33.9. You're 2 tenths up.",
        driver: "Sainz",
        message: "Carlos, target lap 1:33.9. You're 2 tenths up."
    }
];


const RACE_CONTROL_MESSAGES = [
    {
        category: "other" as const,
        messageTemplate: "CAR {car} ({tla}) TIME {time} DELETED - TRACK LIMITS AT TURN {turn} LAP {lap}",
        types: ["track_limits"]
    },
    {
        category: "incident" as const,
        messageTemplate: "TURN {turn} INCIDENT INVOLVING CARS {car1} ({tla1}) AND {car2} ({tla2}) NOTED",
        types: ["incident"]
    },
    {
        category: "incident" as const,
        messageTemplate: "FIA STEWARDS: TURN {turn} INCIDENT INVOLVING CARS {car1} ({tla1}) AND {car2} ({tla2}) REVIEWED NO FURTHER INVESTIGATION",
        types: ["incident_resolved"]
    },
    {
        category: "flag" as const,
        messageTemplate: "YELLOW FLAG IN SECTOR {sector}",
        types: ["yellow_flag"],
        flag: "yellow" as const
    },
    {
        category: "flag" as const,
        messageTemplate: "GREEN FLAG - RACING RESUMES",
        types: ["green_flag"],
        flag: "green" as const
    },
    {
        category: "flag" as const,
        messageTemplate: "DOUBLE YELLOW IN SECTOR {sector}",
        types: ["double_yellow"],
        flag: "double_yellow" as const
    },
    {
        category: "safety_car" as const,
        messageTemplate: "VIRTUAL SAFETY CAR DEPLOYED",
        types: ["vsc"],
        flag: "yellow" as const
    },
    {
        category: "drs" as const,
        messageTemplate: "DRS ENABLED",
        types: ["drs_enabled"],
        flag: "clear" as const
    },
    {
        category: "penalty" as const,
        messageTemplate: "CAR {car} ({tla}) INVESTIGATED FOR EXCESSIVE TRACK LIMITS",
        types: ["investigation"]
    },
    {
        category: "penalty" as const,
        messageTemplate: "CAR {car} ({tla}) RECEIVED 5 SECOND TIME PENALTY",
        types: ["penalty"]
    }
];

// Конфигурация сессии
interface SessionConfig {
    type: "practice" | "qualifying" | "race";
    totalDuration: number;
    intervalMs: 2000;
}

// Состояние гонки для трекинга прогрессии
interface DriverTelemetry {
    laps: number;
    position: number;
    retired: boolean;
    inPit: boolean;
    pitExitTime: number | null;
    bestLap: { value: string; lap: number };
    gap: number;
    tyreAge: number;
    stintCount: number;
    compound: TyreCompound;
    lapTimes: number[];
    lastLapTime: number | null;
    currentSectorTimes: { s1: number | null; s2: number | null; s3: number | null };
}

interface RaceState {
    currentLap: number;
    drivers: Map<string, DriverTelemetry>;
}

class MockTelemetryGenerator {
    private raceState: RaceState;
    private sessionConfig: SessionConfig;
    private startTime: Date;
    private snapshotCount: number = 0;
    private readonly compoundsList: TyreCompound[] = ["soft", "medium", "hard"];
    private readonly LAP_DURATION_SEC = 90;
    private readonly SNAPSHOTS_PER_LAP = Math.floor((this.LAP_DURATION_SEC * 1000) / 2000);
    private readonly PIT_LOSS_SEC = 22;
    private teamRadioIndex: number = 0;

    constructor(config: SessionConfig) {
        this.sessionConfig = config;
        this.startTime = new Date();
        this.raceState = {
            currentLap: 0,
            drivers: new Map(),
        };
        this.teamRadioIndex = 0;

        const initialPositions = [16, 81, 44, 1, 31, 41, 30, 5, 55, 87, 27, 23, 11, 63, 3, 14, 18, 77, 43, 12, 6, 10];

        REAL_DRIVERS.forEach((driver, idx) => {
            const position = initialPositions.indexOf(parseInt(driver.racing_number)) + 1 || idx + 1;

            let startCompound: TyreCompound = "medium";
            if (position <= 10) {
                startCompound = Math.random() < 0.7 ? "soft" : "medium";
            } else if (position >= 15) {
                startCompound = Math.random() < 0.3 ? "hard" : "medium";
            }

            this.raceState.drivers.set(driver.racing_number, {
                laps: 0,
                position: position,
                retired: false,
                inPit: false,
                pitExitTime: null,
                bestLap: { value: "", lap: 0 },
                gap: position === 1 ? 0 : 0.5 + (position - 1) * 0.15,
                tyreAge: 0,
                stintCount: 0,
                compound: startCompound,
                lapTimes: [],
                lastLapTime: null,
                currentSectorTimes: { s1: null, s2: null, s3: null },
            });
        });

        console.log("🏁 Starting strategies:");
        for (const [num, data] of this.raceState.drivers) {
            const driver = REAL_DRIVERS.find(d => d.racing_number === num);
            console.log(`  ${driver?.identity.tla}: ${data.compound} (P${data.position})`);
        }
    }

    private calculateLapTime(compound: TyreCompound, tyreAge: number, isOutLap: boolean = false): number {
        let baseTime: number;
        switch (compound) {
            case "soft": baseTime = 87.5; break;
            case "medium": baseTime = 89.0; break;
            case "hard": baseTime = 90.5; break;
            default: baseTime = 89.0;
        }

        let degradationRate: number;
        switch (compound) {
            case "soft": degradationRate = 0.12; break;
            case "medium": degradationRate = 0.08; break;
            case "hard": degradationRate = 0.05; break;
            default: degradationRate = 0.08;
        }

        let degradation = Math.min(tyreAge * degradationRate, 4.5);
        const outLapPenalty = isOutLap ? 2.5 : 0;
        const randomVariation = (Math.random() - 0.5) * 1.2;

        let totalSeconds = baseTime + degradation + outLapPenalty + randomVariation;
        totalSeconds = Math.max(82, Math.min(105, totalSeconds));

        return totalSeconds;
    }

    private formatLapTime(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = (seconds % 60).toFixed(3);
        return `${minutes}:${remainingSeconds.padStart(6, '0')}`;
    }

    private updateGaps() {
        const drivers = Array.from(this.raceState.drivers.entries())
            .filter(([_, data]) => !data.retired);

        if (drivers.length === 0) return;

        drivers.sort((a, b) => a[1].position - b[1].position);

        const leaderNum = drivers[0][0];

        for (let i = 0; i < drivers.length; i++) {
            const [num, data] = drivers[i];

            if (num === leaderNum) {
                data.gap = 0;
                continue;
            }
            const isInPit = data.inPit;
            const tyreAge = data.tyreAge;
            const compound = data.compound;
            const driverAhead = drivers[i - 1];
            if (!driverAhead) continue;

            const intervalToAhead = data.gap - driverAhead[1].gap;

            let gapChange = (Math.random() - 0.5) * 0.25;

            if (intervalToAhead < 0.5) {
                gapChange += (Math.random() - 0.5) * 0.4;
            } else if (intervalToAhead < 1.5) {
                gapChange += (Math.random() - 0.5) * 0.25;
            } else {
                gapChange += (Math.random() - 0.5) * 0.15;
            }

            if (tyreAge > 20) {
                gapChange += 0.2;
            } else if (tyreAge > 15) {
                gapChange += 0.1;
            } else if (tyreAge < 5) {
                gapChange -= 0.1;
            }

            if (compound === "soft") {
                if (tyreAge < 5) {
                    gapChange -= 0.12;
                } else if (tyreAge > 15) {
                    gapChange += 0.15;
                }
            } else if (compound === "hard") {
                if (tyreAge < 5) {
                    gapChange += 0.05;
                } else if (tyreAge > 20) {
                    gapChange -= 0.05;
                }
            } else if (compound === "medium") {
                if (tyreAge > 20) {
                    gapChange += 0.08;
                }
            }

            if (isInPit) {
                gapChange += 0.6;
            }

            if (Math.random() < 0.02) {
                gapChange += 0.3;
                console.log(`⚠️ ${this.getDriverTla(num)} lost time due to traffic/error`);
            }
            if (Math.random() < 0.01) {
                gapChange -= 0.2;
                console.log(`✨ ${this.getDriverTla(num)} gained time!`);
            }

            const maxChangePerSnapshot = 0.3 / this.SNAPSHOTS_PER_LAP;
            const clampedChange = Math.max(-maxChangePerSnapshot, Math.min(maxChangePerSnapshot, gapChange));

            let newGap = data.gap + clampedChange;
            newGap = Math.max(0.05, newGap);

            if (newGap > this.LAP_DURATION_SEC + 15) {
                newGap = this.LAP_DURATION_SEC + (Math.random() - 0.5) * 10;
            }

            data.gap = newGap;

            const gapDiff = newGap - data.gap;
            if (Math.abs(gapDiff) > 0.1) {
                const driver = REAL_DRIVERS.find(d => d.racing_number === num);
                console.log(`📊 ${driver?.identity.tla} gap: ${data.gap.toFixed(3)}s → ${newGap.toFixed(3)}s (${gapDiff > 0 ? 'losing' : 'gaining'} ${Math.abs(gapDiff).toFixed(3)}s)`);
            }
        }
    }

    private updatePositions() {
        let positionsChanged = true;
        let maxIterations = 10;
        let iteration = 0;

        while (positionsChanged && iteration < maxIterations) {
            positionsChanged = false;
            iteration++;

            const drivers = Array.from(this.raceState.drivers.entries())
                .filter(([_, data]) => !data.retired)
                .map(([num, data]) => ({ num, data }))
                .sort((a, b) => a.data.position - b.data.position);

            for (let i = 0; i < drivers.length - 1; i++) {
                const current = drivers[i];
                const next = drivers[i + 1];

                const interval = next.data.gap - current.data.gap;

                if (interval < 0) {
                    const currentPosition = current.data.position;
                    const nextPosition = next.data.position;

                    current.data.position = nextPosition;
                    next.data.position = currentPosition;

                    console.log(`🔄 ОБГОН! ${this.getDriverTla(next.num)} (P${nextPosition}) overtakes ${this.getDriverTla(current.num)} (P${currentPosition}) [interval: ${interval.toFixed(3)}s]`);

                    positionsChanged = true;
                    break;
                }
            }
        }

        if (iteration > 1) {
            console.log(`📊 Positions stabilized after ${iteration} iterations`);
        }
    }

    private getDriverTla(racingNumber: string): string {
        const driver = REAL_DRIVERS.find(d => d.racing_number === racingNumber);
        return driver?.identity.tla || racingNumber;
    }

    private updateSectors(snapshotNumber: number) {
        const progressInLap = (snapshotNumber % this.SNAPSHOTS_PER_LAP) / this.SNAPSHOTS_PER_LAP;

        for (const [_, data] of this.raceState.drivers) {
            if (data.retired || data.inPit) continue;

            if (data.laps === 0) {
                data.currentSectorTimes = { s1: null, s2: null, s3: null };
                continue;
            }

            const totalTime = data.lastLapTime || this.LAP_DURATION_SEC;

            const sector1Time = 42.5 * (totalTime / this.LAP_DURATION_SEC);
            const sector2Time = 30.0 * (totalTime / this.LAP_DURATION_SEC);
            const sector3Time = 17.5 * (totalTime / this.LAP_DURATION_SEC);

            if (progressInLap < 0.47) {
                if (data.currentSectorTimes.s1 === null) {
                    const s1 = sector1Time + (Math.random() - 0.5) * 0.4;
                    data.currentSectorTimes.s1 = Math.max(41, Math.min(44, s1));
                }
                data.currentSectorTimes.s2 = data.currentSectorTimes.s2 || null;
                data.currentSectorTimes.s3 = data.currentSectorTimes.s3 || null;
            }
            else if (progressInLap < 0.80) {
                if (data.currentSectorTimes.s1 === null) {
                    const s1 = sector1Time + (Math.random() - 0.5) * 0.4;
                    data.currentSectorTimes.s1 = Math.max(41, Math.min(44, s1));
                }
                if (data.currentSectorTimes.s2 === null) {
                    const s2 = sector2Time + (Math.random() - 0.5) * 0.3;
                    data.currentSectorTimes.s2 = Math.max(28, Math.min(32, s2));
                }
                data.currentSectorTimes.s3 = data.currentSectorTimes.s3 || null;
            }
            else {
                if (data.currentSectorTimes.s1 === null) {
                    const s1 = sector1Time + (Math.random() - 0.5) * 0.4;
                    data.currentSectorTimes.s1 = Math.max(41, Math.min(44, s1));
                }
                if (data.currentSectorTimes.s2 === null) {
                    const s2 = sector2Time + (Math.random() - 0.5) * 0.3;
                    data.currentSectorTimes.s2 = Math.max(28, Math.min(32, s2));
                }
                if (data.currentSectorTimes.s3 === null) {
                    const s3 = sector3Time + (Math.random() - 0.5) * 0.2;
                    data.currentSectorTimes.s3 = Math.max(16.5, Math.min(18.5, s3));
                }
            }
        }
    }

    private updateLaps(snapshotNumber: number) {
        const shouldCompleteLap = snapshotNumber % this.SNAPSHOTS_PER_LAP === 0;

        if (!shouldCompleteLap) return;

        for (const [num, data] of this.raceState.drivers) {
            if (data.retired) continue;
            if (data.inPit) continue;

            const newLaps = data.laps + 1;
            data.laps = newLaps;

            const isOutLap = data.tyreAge === 0 && data.laps > 1;
            const lapTimeSeconds = this.calculateLapTime(data.compound, data.tyreAge, isOutLap);

            data.lastLapTime = lapTimeSeconds;
            data.lapTimes.push(lapTimeSeconds);
            data.tyreAge++;

            data.currentSectorTimes = { s1: null, s2: null, s3: null };

            const lapTimeStr = this.formatLapTime(lapTimeSeconds);
            if (!data.bestLap.value || lapTimeSeconds < this.parseLapTimeToSeconds(data.bestLap.value)) {
                data.bestLap = { value: lapTimeStr, lap: newLaps };
                const driver = REAL_DRIVERS.find(d => d.racing_number === num);
                console.log(`⭐ ${driver?.identity.tla} new best lap: ${lapTimeStr} (${data.compound}, lap ${newLaps})`);
            }

            if (newLaps % 10 === 0) {
                const driver = REAL_DRIVERS.find(d => d.racing_number === num);
                console.log(`🏁 ${driver?.identity.tla} completed lap ${newLaps} (${data.compound}, age: ${data.tyreAge})`);
            }
        }
    }

    private parseLapTimeToSeconds(lapTime: string): number {
        const [minutes, seconds] = lapTime.split(':');
        return parseInt(minutes) * 60 + parseFloat(seconds);
    }

    private handlePitStops(snapshotNumber: number) {
        for (const [num, data] of this.raceState.drivers) {
            if (data.retired) continue;

            if (data.inPit) {
                if (data.pitExitTime && snapshotNumber >= data.pitExitTime) {
                    data.inPit = false;
                    data.pitExitTime = null;
                    data.tyreAge = 0;
                    const driver = REAL_DRIVERS.find(d => d.racing_number === num);
                    console.log(`🔧 ${driver?.identity.tla} exited pits with ${data.compound} tyres (stint ${data.stintCount + 1})`);
                }
                continue;
            }

            const shouldPit = this.shouldMakePitStop(data);

            if (shouldPit && data.laps > 3) {
                data.inPit = true;
                data.stintCount++;

                const pitLoss = 20 + Math.random() * 5;
                data.gap += pitLoss;

                const newCompound = this.selectNextCompound(data.compound, data.stintCount);
                data.compound = newCompound;
                data.pitExitTime = snapshotNumber + 10;

                const driver = REAL_DRIVERS.find(d => d.racing_number === num);
                console.log(`🔧 ${driver?.identity.tla} entering pits (${data.compound} next, +${pitLoss.toFixed(1)}s loss)`);
            }
        }
    }

    private shouldMakePitStop(data: DriverTelemetry): boolean {
        const tyreAge = data.tyreAge;
        const stintCount = data.stintCount;
        const compound = data.compound;

        let maxAge: number;
        switch (compound) {
            case "soft": maxAge = 18 + Math.floor(Math.random() * 5); break;
            case "medium": maxAge = 25 + Math.floor(Math.random() * 5); break;
            case "hard": maxAge = 35 + Math.floor(Math.random() * 5); break;
            default: maxAge = 25;
        }

        const ageLimit = stintCount === 0 ? maxAge - 3 : maxAge;

        if (tyreAge >= ageLimit) return true;
        if (tyreAge > ageLimit - 5 && Math.random() < 0.1) return true;

        return false;
    }

    private selectNextCompound(current: TyreCompound, stintCount: number): TyreCompound {
        if (stintCount === 0) {
            if (current === "soft") return Math.random() < 0.6 ? "medium" : "hard";
            if (current === "medium") return Math.random() < 0.5 ? "soft" : "hard";
            return "medium";
        }

        if (current === "soft") return "medium";
        if (current === "medium") return Math.random() < 0.7 ? "hard" : "soft";
        return "medium";
    }

    private handleRetirements(snapshotNumber: number) {
        const currentMaxLaps = Math.max(...Array.from(this.raceState.drivers.values()).map(d => d.laps));

        if (currentMaxLaps > 20 && currentMaxLaps < 80 && snapshotNumber % 50 === 0) {
            for (const [num, data] of this.raceState.drivers) {
                if (!data.retired && Math.random() < 0.003) {
                    data.retired = true;
                    const driver = REAL_DRIVERS.find(d => d.racing_number === num);
                    console.log(`💥 ${driver?.identity.tla} retired on lap ${data.laps}!`);
                }
            }
        }
    }

    generateSnapshot(snapshotNumber: number): RaceSnapshot {
        this.snapshotCount++;

        this.updateGaps();
        this.updatePositions();
        this.updateSectors(snapshotNumber);
        this.updateLaps(snapshotNumber);
        this.handlePitStops(snapshotNumber);
        this.handleRetirements(snapshotNumber);

        const currentTime = new Date(this.startTime.getTime() + snapshotNumber * this.sessionConfig.intervalMs);
        const remainingMs = Math.max(0, this.sessionConfig.totalDuration - snapshotNumber * this.sessionConfig.intervalMs);

        let sessionStatus: "started" | "finished" = "started";
        let trackStatus: TrackStatus = "all_clear";
        let trackStatusMessage = "AllClear";

        if (remainingMs <= 0) {
            sessionStatus = "finished";
        }

        if (Math.random() < 0.03 && snapshotNumber > 20) {
            trackStatus = "yellow";
            trackStatusMessage = "YellowFlag";
        }

        const driversList = Array.from(this.raceState.drivers.entries())
            .map(([num, data]) => ({
                num,
                data,
                driver: REAL_DRIVERS.find(d => d.racing_number === num)!
            }))
            .sort((a, b) => a.data.position - b.data.position);

        const driversWithoutOverall = driversList.map((item) => {
            const { driver, data } = item;

            const isPersonalBest = data.bestLap.lap === data.laps;
            const isOverallBest = false;

            const lastLapValue = data.lastLapTime ? this.formatLapTime(data.lastLapTime) : null;

            let intervalToAhead: string | null = null;
            if (data.position === 1) {
                intervalToAhead = null;
            } else {
                const driverAhead = driversList.find(d => d.data.position === data.position - 1);
                if (driverAhead) {
                    const gapDiff = data.gap - driverAhead.data.gap;
                    intervalToAhead = `+${gapDiff.toFixed(3)}`;
                } else {
                    intervalToAhead = `+${data.gap.toFixed(3)}`;
                }
            }

            const sectors = [
                {
                    sector: 1 as const,
                    value: data.currentSectorTimes.s1 !== null ? data.currentSectorTimes.s1.toFixed(3) : null,
                    stopped: false,
                    personal_fastest: false,
                    overall_fastest: false,
                    segments: []
                },
                {
                    sector: 2 as const,
                    value: data.currentSectorTimes.s2 !== null ? data.currentSectorTimes.s2.toFixed(3) : null,
                    stopped: false,
                    personal_fastest: false,
                    overall_fastest: false,
                    segments: []
                },
                {
                    sector: 3 as const,
                    value: data.currentSectorTimes.s3 !== null ? data.currentSectorTimes.s3.toFixed(3) : null,
                    stopped: false,
                    personal_fastest: isPersonalBest && data.currentSectorTimes.s3 !== null,
                    overall_fastest: false,
                    segments: []
                },
            ];

            const gapToLeader = data.position === 1 ? null : `+${data.gap.toFixed(3)}`;

            return {
                racing_number: driver.racing_number,
                line: data.position,
                position: data.position,
                show_position: true,
                identity: driver.identity,
                timing: {
                    number_of_laps: data.laps,
                    gap_to_leader: gapToLeader,
                    interval_to_ahead: intervalToAhead,
                    best_lap: data.bestLap.value ? {
                        value: data.bestLap.value,
                        lap: data.bestLap.lap,
                        personal_fastest: isPersonalBest,
                        overall_fastest: false,
                    } : { value: null, lap: 0, personal_fastest: false, overall_fastest: false },
                    last_lap: lastLapValue ? {
                        value: lastLapValue,
                        lap: data.laps,
                        personal_fastest: isPersonalBest,
                        overall_fastest: false,
                    } : { value: null, lap: 0, personal_fastest: false, overall_fastest: false },
                    sectors,
                    speeds: this.generateSpeeds(data.lastLapTime || 90, isPersonalBest, false),
                },
                tyres: {
                    current_compound: data.compound,
                    is_new: data.tyreAge === 0,
                    tyre_age_laps: data.tyreAge,
                    stints: data.stintCount > 0 ? [{
                        index: data.stintCount - 1,
                        compound: data.compound,
                        is_new: data.tyreAge === 0,
                        total_laps: data.tyreAge,
                        start_laps: data.laps - data.tyreAge,
                        reference_lap_time: data.bestLap.value,
                        reference_lap_number: data.bestLap.lap,
                    }] : [],
                },
                track: {
                    in_pit: data.inPit,
                    pit_out: false,
                    stopped: data.retired,
                    retired: data.retired,
                    status_code: data.retired ? 0 : 64,
                },
            };
        });

        let bestLapTimeSeconds = Infinity;
        let bestLapDriverIndex = -1;

        driversWithoutOverall.forEach((driver, idx) => {
            if (driver.timing.best_lap.value) {
                const lapTimeSec = this.parseLapTimeToSeconds(driver.timing.best_lap.value);
                if (lapTimeSec < bestLapTimeSeconds) {
                    bestLapTimeSeconds = lapTimeSec;
                    bestLapDriverIndex = idx;
                }
            }
        });

        const drivers = driversWithoutOverall.map((driver, idx) => {
            if (idx === bestLapDriverIndex) {
                if (driver.timing.best_lap.value) {
                    driver.timing.best_lap.overall_fastest = true;
                }
                if (driver.timing.last_lap.value && driver.timing.last_lap.lap === driver.timing.number_of_laps) {
                    driver.timing.last_lap.overall_fastest = true;
                }
                driver.timing.sectors = driver.timing.sectors.map(sector => ({
                    ...sector,
                    overall_fastest: sector.personal_fastest
                }));
                driver.timing.speeds = {
                    i1: { ...driver.timing.speeds.i1, overall_fastest: true },
                    i2: { ...driver.timing.speeds.i2, overall_fastest: true },
                    fl: { ...driver.timing.speeds.fl },
                    st: { ...driver.timing.speeds.st },
                };
            }
            return driver;
        });

// В методе generateSnapshot, замените генерацию race_control_messages на эту:

const race_control_messages: RaceSnapshot['race_control_messages'] = [];

// Стартовое сообщение (только для первого снапшота)
if (snapshotNumber === 1) {
    race_control_messages.push({
        id: `start-${snapshotNumber}`,
        utc: currentTime.toISOString(),
        category: "flag",
        message: "GREEN LIGHT - PIT EXIT OPEN",
        flag: "green",
        scope: "track",
        sector: null,
        mode: "green",
    });
}

// Генерируем сообщения в среднем каждые 15 снапшотов (30 секунд)
const shouldGenerateMessage = snapshotNumber > 1 && Math.random() < 0.01; // ~7% шанс каждый снапшот

if (shouldGenerateMessage) {
    const driversList = Array.from(this.raceState.drivers.entries());
    const activeDrivers = driversList.filter(([_, data]) => !data.retired);
    
    if (activeDrivers.length > 0) {
        const randomIndex = Math.floor(Math.random() * RACE_CONTROL_MESSAGES.length);
        const messageConfig = RACE_CONTROL_MESSAGES[randomIndex];
        
        let message = messageConfig.messageTemplate;
        let flag = messageConfig.flag;
        let skipMessage = false;
        
        // Заменяем шаблонные значения
        if (message.includes('{car}')) {
            const randomDriver = activeDrivers[Math.floor(Math.random() * activeDrivers.length)];
            const driverInfo = REAL_DRIVERS.find(d => d.racing_number === randomDriver[0]);
            message = message.replace('{car}', randomDriver[0]);
            message = message.replace('{tla}', driverInfo?.identity.tla || '???');
        }
        
        if (message.includes('{car1}')) {
            const driver1 = activeDrivers[Math.floor(Math.random() * activeDrivers.length)];
            let driver2 = activeDrivers[Math.floor(Math.random() * activeDrivers.length)];
            // Чтобы не было одинаковых пилотов
            while (driver2[0] === driver1[0] && activeDrivers.length > 1) {
                driver2 = activeDrivers[Math.floor(Math.random() * activeDrivers.length)];
            }
            const driverInfo1 = REAL_DRIVERS.find(d => d.racing_number === driver1[0]);
            const driverInfo2 = REAL_DRIVERS.find(d => d.racing_number === driver2[0]);
            message = message.replace('{car1}', driver1[0]);
            message = message.replace('{tla1}', driverInfo1?.identity.tla || '???');
            message = message.replace('{car2}', driver2[0]);
            message = message.replace('{tla2}', driverInfo2?.identity.tla || '???');
        }
        
        if (message.includes('{carAhead}')) {
            const driver = activeDrivers[Math.floor(Math.random() * activeDrivers.length)];
            const driverAhead = activeDrivers.find(d => d[1].position === driver[1].position - 1);
            if (driverAhead) {
                const driverInfo = REAL_DRIVERS.find(d => d.racing_number === driver[0]);
                const driverAheadInfo = REAL_DRIVERS.find(d => d.racing_number === driverAhead[0]);
                message = message.replace('{car}', driver[0]);
                message = message.replace('{tla}', driverInfo?.identity.tla || '???');
                message = message.replace('{carAhead}', driverAhead[0]);
                message = message.replace('{tlaAhead}', driverAheadInfo?.identity.tla || '???');
            } else {
                // Если нет пилота впереди (лидер), пропускаем это сообщение
                skipMessage = true;
            }
        }
        
        if (message.includes('{time}')) {
            const minutes = Math.floor(Math.random() * 2);
            const seconds = (90 + Math.random() * 10).toFixed(3);
            message = message.replace('{time}', `${minutes}:${seconds}`);
        }
        
        if (message.includes('{lap}')) {
            const currentLap = Math.floor(snapshotNumber / this.SNAPSHOTS_PER_LAP);
            message = message.replace('{lap}', String(Math.max(1, currentLap - Math.floor(Math.random() * 5))));
        }
        
        if (message.includes('{turn}')) {
            const turns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
            message = message.replace('{turn}', String(turns[Math.floor(Math.random() * turns.length)]));
        }
        
        if (message.includes('{sector}')) {
            const sectorNum = Math.floor(Math.random() * 3) + 1;
            message = message.replace('{sector}', String(sectorNum));
        }
        
        // Добавляем сообщение только если не пропущено
        if (!skipMessage) {
            race_control_messages.push({
                id: `message-${snapshotNumber}-${randomIndex}`,
                utc: currentTime.toISOString(),
                category: messageConfig.category,
                message: message,
                flag: flag,
                scope: "track",
                sector: message.includes('{sector}') ? (message.includes('SECTOR') ? parseInt(message.match(/SECTOR (\d)/)?.[1] || '0') : null) : null,
                mode: null,
            });
            
            console.log(`📢 Race control: ${message}`);
        }
    }
}

        const team_radio: any[] = [];
        const currentLap = Math.floor(snapshotNumber / this.SNAPSHOTS_PER_LAP);

        // Каждый круг добавляем новое сообщение (начиная с 1 круга, всего 6 сообщений)
        if (currentLap >= 1 && currentLap <= 6 && this.teamRadioIndex + 1 == currentLap) {
            const radio = TEAM_RADIO_LIST[this.teamRadioIndex];

            team_radio.push({
                id: `radio-${snapshotNumber}-${radio.RacingNumber}`,
                utc: radio.Utc,
                racing_number: radio.RacingNumber,
                path: radio.Path,
                message: radio.message,
            });
            console.log(`📻 Team radio #${this.teamRadioIndex + 1}: ${radio.driver} (#${radio.RacingNumber}) on lap ${currentLap}: "${radio.message}"`);
            this.teamRadioIndex++;
        }


        return {
            schema_version: 1,
            snapshot_id: `snapshot_11249_${String(snapshotNumber).padStart(4, '0')}_${currentTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
            session_key: "11249",
            sequence: snapshotNumber,
            generated_at: new Date().toISOString(),
            source_timestamp: currentTime.toISOString(),
            interval_ms: this.sessionConfig.intervalMs,
            is_delta_from_previous: false,
            session: {
                meeting_key: 1281,
                session_key: 11249,
                grand_prix_name: "Japanese Grand Prix",
                official_name: "FORMULA 1 ARAMCO JAPANESE GRAND PRIX 2026",
                location: "Suzuka",
                country_code: "JPN",
                country_name: "Japan",
                circuit_short_name: "Suzuka",
                session_type: this.sessionConfig.type,
                session_name: this.sessionConfig.type === "race" ? "Race" : this.sessionConfig.type === "qualifying" ? "Qualifying" : "Practice",
                session_number: undefined,
                qualifying_part: this.sessionConfig.type === "qualifying" ? Math.floor(Math.random() * 3) + 1 : undefined,
                session_part: undefined,
                start_time: this.startTime.toISOString(),
                end_time: new Date(this.startTime.getTime() + this.sessionConfig.totalDuration).toISOString(),
                gmt_offset: "09:00:00",
            },
            race_state: {
                session_status: sessionStatus,
                track_status: trackStatus,
                track_status_message: trackStatusMessage,
                classification_generated_at: currentTime.toISOString(),
                leader_racing_number: drivers[0]?.racing_number || "16",
                total_cars: REAL_DRIVERS.length,
                classified_cars: REAL_DRIVERS.length - Array.from(this.raceState.drivers.values()).filter(d => d.retired).length,
                clock: {
                    utc: currentTime.toISOString(),
                    remaining_ms: remainingMs,
                    extrapolating: remainingMs < 60000,
                },
            },
            weather: {
                air_temp_c: 16 + Math.random() * 3,
                track_temp_c: 30 + Math.random() * 5,
                humidity_pct: 50 + Math.random() * 10,
                pressure_hpa: 1008 + Math.random() * 3,
                wind_direction_deg: Math.floor(Math.random() * 360),
                wind_speed_mps: Math.random() * 3,
            },
            drivers,
            race_control_messages: race_control_messages,
            team_radio,
        };
    }

    private generateSpeeds(lapTimeSeconds: number, isPersonalBest: boolean = false, isOverallBest: boolean = false) {
        const speedFactor = Math.max(0.85, Math.min(1.15, 92 / lapTimeSeconds));

        return {
            i1: { value: Math.round((260 + Math.random() * 30) * speedFactor), personal_fastest: isPersonalBest, overall_fastest: isOverallBest },
            i2: { value: Math.round((310 + Math.random() * 35) * speedFactor), personal_fastest: isPersonalBest, overall_fastest: isOverallBest },
            fl: { value: Math.round((240 + Math.random() * 35) * speedFactor), personal_fastest: isPersonalBest },
            st: { value: Math.round((270 + Math.random() * 25) * speedFactor), personal_fastest: isPersonalBest },
        };
    }
}

export const generateSnapshots = (count: number = 100, sessionType: "practice" | "qualifying" | "race" = "race"): RaceSnapshot[] => {
    const config: SessionConfig = {
        type: sessionType,
        totalDuration: sessionType === "race" ? 90 * 60 * 1000 : sessionType === "qualifying" ? 60 * 60 * 1000 : 90 * 60 * 1000,
        intervalMs: 2000,
    };

    const generator = new MockTelemetryGenerator(config);
    const snapshots: RaceSnapshot[] = [];

    for (let i = 1; i <= count; i++) {
        snapshots.push(generator.generateSnapshot(i));
    }

    return snapshots;
};

export const generateRaceSnapshots = (count: number = 100): RaceSnapshot[] => generateSnapshots(count, "race");
export const generateQualifyingSnapshots = (count: number = 100): RaceSnapshot[] => generateSnapshots(count, "qualifying");