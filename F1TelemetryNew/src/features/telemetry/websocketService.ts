import { Platform } from 'react-native';
import { RaceSnapshot } from "../../entities/snapshot/model/types";
import { driverDataCache } from '../../shared/utils/driverDataCache';


type WebSocketMessage = {
    type: string;
    data?: RaceSnapshot;
    delay_ms?: number;
};

type MessageHandler = (snapshot: RaceSnapshot) => void;
type StatusHandler = (connected: boolean) => void;

const convertToSnakeCase = (obj: any): any => {
    if (obj === null || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
        return obj.map(item => convertToSnakeCase(item));
    }

    const newObj: any = {};
    for (const [key, value] of Object.entries(obj)) {
        // Преобразуем camelCase в snake_case
        const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        newObj[snakeKey] = convertToSnakeCase(value);
    }
    return newObj;
};


class WebSocketService {
    private ws: WebSocket | null = null;
    private messageHandlers: MessageHandler[] = [];
    private statusHandlers: StatusHandler[] = [];
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectTimeout: NodeJS.Timeout | null = null;
    private currentDelayMs: number = 0;
    private pingInterval: NodeJS.Timeout | null = null;
    private lastSequence: number = 0;

    private getWebSocketUrl(): string {
        if (__DEV__) {
            if (Platform.OS === 'ios') {
                // Узнать IP: ifconfig | grep "inet " | grep -v 127.0.0.1
                return 'ws://192.168.0.188:3000';
            }
            if (Platform.OS === 'android') {
                return 'ws://10.0.2.2:3000';
            }
            return 'ws://localhost:3000';
        }
        return 'ws://111.88.246.224:3000';
    }

    connect(delayMs: number = 0) {
        this.currentDelayMs = delayMs;

        const wsUrl = this.getWebSocketUrl();
        console.log(`[WebSocket] Connecting to ${wsUrl}...`);

        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
            console.log('[WebSocket] ✅ Connected');
            this.reconnectAttempts = 0;
            this.notifyStatusChange(true);
            this.subscribe(this.currentDelayMs);

            this.startPingInterval();
        };

        this.ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                let snapshot: RaceSnapshot | null = null;

                if (data.sequence !== undefined && data.drivers !== undefined) {
                    console.log('[WebSocket] Converting camelCase to snake_case...');
                    const convertedData = convertToSnakeCase(data);
                    snapshot = convertedData as RaceSnapshot;
                    console.log(`[WebSocket] ✅ Snapshot #${snapshot.sequence}, drivers: ${snapshot.drivers?.length}`);
                }
                else if (data.type === 'snapshot' && data.data) {
                    const convertedData = convertToSnakeCase(data.data);
                    snapshot = convertedData as RaceSnapshot;
                    console.log(`[WebSocket] ✅ Wrapped snapshot #${snapshot.sequence}`);
                }
                else {
                    console.log('[WebSocket] Other message:', data.type || 'unknown');
                    return;
                }

                if (snapshot) {
                    snapshot.drivers?.forEach(driver => {
                        if (driver.racing_number && driver.racing_number !== '_kf') {
                            driverDataCache.updateDriverData(driver.racing_number, {
                                identity: driver.identity,
                                timing: driver.timing,
                                tyres: driver.tyres,
                                track: driver.track,
                            });
                        }
                    });

                    const enrichedDrivers = snapshot.drivers.map(driver => {
                        if (driver.racing_number === '_kf') return driver;

                        const enriched = driverDataCache.getEnrichedDriver(driver.racing_number, {
                            identity: driver.identity,
                            timing: driver.timing,
                            tyres: driver.tyres,
                            track: driver.track,
                        });

                        return {
                            ...driver,
                            identity: enriched.identity,
                            timing: enriched.timing,
                            tyres: enriched.tyres,
                            track: enriched.track,
                        };
                    });

                    const enrichedSnapshot = {
                        ...snapshot,
                        drivers: enrichedDrivers,
                    };

                    this.notifyHandlers(enrichedSnapshot);
                }

            } catch (error) {
                console.error('[WebSocket] Failed to parse message:', error);
            }
        };


        this.ws.onclose = (event) => {
            console.log(`[WebSocket] Disconnected - code: ${event.code}, reason: ${event.reason}`);
            this.stopPingInterval();
            this.notifyStatusChange(false);
            this.attemptReconnect();
        };

        this.ws.onerror = (err) => {
            console.error('[WebSocket] Error:', err);
        };
    }

    private startPingInterval() {
        this.stopPingInterval();
        this.pingInterval = setInterval(() => {
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(JSON.stringify({ type: 'ping' }));
                console.log('[WebSocket] 📡 Ping sent');
            }
        }, 10000);
    }

    private stopPingInterval() {
        if (this.pingInterval) {
            clearInterval(this.pingInterval);
            this.pingInterval = null;
        }
    }

    subscribe(delayMs: number) {
        this.currentDelayMs = delayMs;
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            const message = JSON.stringify({
                type: 'subscribe',
                delay_ms: delayMs,
            });
            this.ws.send(message);
            console.log(`[WebSocket] 📡 Subscribed with delay: ${delayMs}ms`);
        } else {
            console.log(`[WebSocket] Cannot subscribe - connection state: ${this.ws?.readyState}`);
        }
    }

    updateDelay(delayMs: number) {
        this.currentDelayMs = delayMs;
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            const message = JSON.stringify({
                type: 'set_delay',
                delay: delayMs,
            });
            this.ws.send(message);
            console.log(`[WebSocket] 📡 Delay updated: ${delayMs}ms (set_delay sent)`);
        } else {
            console.log(`[WebSocket] Cannot update delay - connection state: ${this.ws?.readyState}`);
        }
    }

    disconnect() {
        this.stopPingInterval();
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
            this.reconnectTimeout = null;
        }
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }

    private attemptReconnect() {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.log('[WebSocket] Max reconnection attempts reached');
            return;
        }

        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
        }

        const delay = Math.pow(2, this.reconnectAttempts) * 1000;
        this.reconnectAttempts++;

        console.log(`[WebSocket] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);

        this.reconnectTimeout = setTimeout(() => {
            this.connect(this.currentDelayMs);
        }, delay);
    }

    onMessage(handler: MessageHandler) {
        this.messageHandlers.push(handler);
        console.log(`[WebSocket] Added handler, total: ${this.messageHandlers.length}`);
        return () => {
            this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
            console.log(`[WebSocket] Removed handler, total: ${this.messageHandlers.length}`);
        };
    }

    onStatusChange(handler: StatusHandler) {
        this.statusHandlers.push(handler);
        return () => {
            this.statusHandlers = this.statusHandlers.filter(h => h !== handler);
        };
    }

    private notifyHandlers(snapshot: RaceSnapshot) {
        console.log(`[WebSocket] Notifying ${this.messageHandlers.length} handlers about snapshot ${snapshot.sequence}`);
        this.messageHandlers.forEach(handler => {
            try {
                handler(snapshot);
            } catch (error) {
                console.error('[WebSocket] Handler error:', error);
            }
        });
    }

    private notifyStatusChange(connected: boolean) {
        console.log(`[WebSocket] Status change: ${connected ? 'connected' : 'disconnected'}`);
        this.statusHandlers.forEach(handler => handler(connected));
    }

    isConnected(): boolean {
        return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
    }
}

export const websocketService = new WebSocketService();