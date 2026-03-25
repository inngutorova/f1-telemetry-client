// mock-server.js
// Запуск: node mock-server.js

const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const PORT = 8081;
const INTERVAL_MS = 2000; // 2 секунды

// Генерация уникального ID
function generateId() {
  return Math.random().toString(36).substring(2, 15);
}

// Текущее состояние
let sequence = 0;
let snapshotId = generateId();
let currentSnapshot = null;

// Данные пилотов
const drivers = [
  { racing_number: "44", tla: "HAM", full_name: "Lewis Hamilton", team: "Ferrari", team_color: "ED1131" },
  { racing_number: "16", tla: "LEC", full_name: "Charles Leclerc", team: "Ferrari", team_color: "ED1131" },
  { racing_number: "1", tla: "VER", full_name: "Max Verstappen", team: "Red Bull Racing", team_color: "3671C6" },
  { racing_number: "11", tla: "PER", full_name: "Sergio Perez", team: "Red Bull Racing", team_color: "3671C6" },
  { racing_number: "63", tla: "RUS", full_name: "George Russell", team: "Mercedes", team_color: "6CD3BF" },
  { racing_number: "4", tla: "NOR", full_name: "Lando Norris", team: "McLaren", team_color: "FF8700" },
  { racing_number: "81", tla: "PIA", full_name: "Oscar Piastri", team: "McLaren", team_color: "FF8700" },
  { racing_number: "55", tla: "SAI", full_name: "Carlos Sainz", team: "Williams", team_color: "64C4FF" },
  { racing_number: "14", tla: "ALO", full_name: "Fernando Alonso", team: "Aston Martin", team_color: "229971" },
  { racing_number: "18", tla: "STR", full_name: "Lance Stroll", team: "Aston Martin", team_color: "229971" },
];

// Генерация случайного времени круга
function randomLapTime() {
  const sec = 80 + Math.random() * 10;
  const min = Math.floor(sec / 60);
  const remainingSec = (sec % 60).toFixed(3);
  return `${min}:${remainingSec.toString().padStart(6, '0')}`;
}

// Генерация сектора
function randomSector() {
  const sec = 20 + Math.random() * 15;
  return sec.toFixed(3);
}

// Генерация снапшота
function generateSnapshot() {
  const now = new Date().toISOString();
  sequence++;
  
  const driversState = drivers.map((driver, index) => {
    const position = index + 1;
    const gapToLeader = position === 1 ? null : `+${(Math.random() * 30).toFixed(3)}`;
    const intervalToAhead = position === 1 ? null : `+${(Math.random() * 2).toFixed(3)}`;
    
    const compounds = ["soft", "medium", "hard", "intermediate", "wet"];
    const compound = compounds[Math.floor(Math.random() * 3)]; // чаще soft/medium/hard
    
    return {
      racing_number: driver.racing_number,
      line: position,
      position: position,
      show_position: true,
      identity: {
        tla: driver.tla,
        broadcast_name: `${driver.tla} ${driver.full_name.split(' ').pop()}`,
        full_name: driver.full_name,
        first_name: driver.full_name.split(' ')[0],
        last_name: driver.full_name.split(' ')[1],
        team_name: driver.team,
        team_color: driver.team_color,
      },
      timing: {
        number_of_laps: Math.floor(Math.random() * 50) + 1,
        gap_to_leader: gapToLeader,
        interval_to_ahead: intervalToAhead,
        best_lap: {
          value: randomLapTime(),
          lap: Math.floor(Math.random() * 30) + 1,
          personal_fastest: position === 1 || Math.random() > 0.8,
          overall_fastest: position === 1,
        },
        last_lap: {
          value: randomLapTime(),
          lap: Math.floor(Math.random() * 50) + 1,
        },
        sectors: [
          {
            sector: 1,
            value: randomSector(),
            personal_fastest: Math.random() > 0.9,
            overall_fastest: Math.random() > 0.95,
          },
          {
            sector: 2,
            value: randomSector(),
            personal_fastest: Math.random() > 0.9,
            overall_fastest: Math.random() > 0.95,
          },
          {
            sector: 3,
            value: randomSector(),
            personal_fastest: Math.random() > 0.9,
            overall_fastest: Math.random() > 0.95,
          },
        ],
        speeds: {
          fl: { value: 280 + Math.random() * 40, personal_fastest: Math.random() > 0.9 },
          i1: { value: 260 + Math.random() * 40 },
          i2: { value: 270 + Math.random() * 40 },
          st: { value: 290 + Math.random() * 30 },
        },
      },
      tyres: {
        current_compound: compound,
        is_new: Math.random() > 0.7,
        tyre_age_laps: Math.floor(Math.random() * 20),
        stints: [
          {
            index: 1,
            compound: compound,
            is_new: true,
            total_laps: Math.floor(Math.random() * 15),
            start_laps: 1,
          }
        ],
      },
      track: {
        in_pit: Math.random() > 0.95,
        pit_out: false,
        stopped: false,
        retired: false,
      },
    };
  });
  
  // Сортируем по позиции
  driversState.sort((a, b) => a.position - b.position);
  
  return {
    schema_version: 1,
    snapshot_id: snapshotId,
    session_key: "australian_gp_2025_race",
    sequence: sequence,
    generated_at: now,
    source_timestamp: now,
    interval_ms: 2000,
    is_delta_from_previous: false,
    session: {
      meeting_key: 1234,
      session_key: 5678,
      grand_prix_name: "Australian Grand Prix",
      official_name: "FORMULA 1 AUSTRALIAN GRAND PRIX 2025",
      location: "Melbourne",
      country_code: "AUS",
      country_name: "Australia",
      circuit_short_name: "Albert Park",
      session_type: "race",
      session_name: "Race",
      session_number: null,
      qualifying_part: null,
      session_part: null,
      start_time: "2025-03-16T04:00:00Z",
      end_time: "2025-03-16T06:00:00Z",
      gmt_offset: "+11:00",
    },
    race_state: {
      session_status: "started",
      track_status: Math.random() > 0.95 ? "yellow" : "all_clear",
      track_status_message: Math.random() > 0.95 ? "Yellow flag in sector 2" : "All Clear",
      clock: {
        utc: now,
        remaining_ms: 7200000 - (sequence * 2000), // 2 часа минус прошедшее время
        extrapolating: false,
      },
      classification_generated_at: now,
      leader_racing_number: driversState[0]?.racing_number || "44",
      total_cars: driversState.length,
      classified_cars: driversState.length,
    },
    weather: {
      air_temp_c: 22 + Math.random() * 5,
      track_temp_c: 35 + Math.random() * 8,
      humidity_pct: 40 + Math.random() * 30,
      pressure_hpa: 1010 + Math.random() * 15,
      rainfall_mm: Math.random() > 0.9 ? Math.random() * 2 : 0,
      wind_direction_deg: Math.floor(Math.random() * 360),
      wind_speed_mps: 2 + Math.random() * 5,
    },
    drivers: driversState,
    race_control: generateRaceControlMessages(),
    team_radio: generateTeamRadio(),
  };
}

// Генерация Race Control сообщений
let lastMessageTime = 0;
function generateRaceControlMessages() {
  const messages = [
    { category: "flag", message: "Yellow flag in sector 2", flag: "yellow", scope: "sector", sector: 2 },
    { category: "flag", message: "Green flag, track is clear", flag: "green", scope: "track" },
    { category: "safety_car", message: "Safety Car deployed", safety_car_mode: "sc", safety_car_status: "deployed" },
    { category: "drs", message: "DRS enabled", flag: "green" },
    { category: "penalty", message: "5-second penalty for track limits" },
    { category: "incident", message: "Incident between HAM and VER at turn 3" },
  ];
  
  const now = Date.now();
  const newMessages = [];
  
  // Редко добавляем новое сообщение
  if (now - lastMessageTime > 30000 && Math.random() > 0.7) {
    const msg = messages[Math.floor(Math.random() * messages.length)];
    lastMessageTime = now;
    newMessages.push({
      id: generateId(),
      utc: new Date().toISOString(),
      ...msg,
      message: msg.message,
    });
  }
  
  // Всегда возвращаем последние 3 сообщения
  return [
    {
      id: "msg_1",
      utc: new Date(Date.now() - 120000).toISOString(),
      category: "flag",
      message: "Green flag, session started",
      flag: "green",
      scope: "track",
    },
    ...newMessages,
  ];
}

// Генерация Team Radio
function generateTeamRadio() {
  if (Math.random() > 0.8) {
    const driver = drivers[Math.floor(Math.random() * drivers.length)];
    return [
      {
        id: generateId(),
        utc: new Date().toISOString(),
        racing_number: driver.racing_number,
        path: `/radio/${driver.racing_number}_${Date.now()}.mp3`,
      }
    ];
  }
  return [];
}

// Генерация дельты
function generateDelta() {
  sequence++;
  
  // Выбираем случайного пилота для обновления
  const driverIndex = Math.floor(Math.random() * drivers.length);
  const driverNumber = drivers[driverIndex].racing_number;
  
  // Генерируем случайное изменение
  const changeTypes = [
    { path: `drivers.${driverNumber}.position`, value: driverIndex + 1 + (Math.random() > 0.7 ? 1 : 0) },
    { path: `drivers.${driverNumber}.timing.gap_to_leader`, value: `+${(Math.random() * 30).toFixed(3)}` },
    { path: `drivers.${driverNumber}.timing.interval_to_ahead`, value: `+${(Math.random() * 2).toFixed(3)}` },
    { path: `drivers.${driverNumber}.timing.last_lap.value`, value: randomLapTime() },
    { path: `drivers.${driverNumber}.tyres.tyre_age_laps`, value: Math.floor(Math.random() * 25) },
    { path: `drivers.${driverNumber}.track.in_pit`, value: Math.random() > 0.95 },
    { path: `race_state.track_status`, value: Math.random() > 0.9 ? "yellow" : "all_clear" },
    { path: `race_state.clock.remaining_ms`, value: 7200000 - (sequence * 2000) },
  ];
  
  const change = changeTypes[Math.floor(Math.random() * changeTypes.length)];
  
  return {
    type: "delta",
    snapshot_id: snapshotId,
    sequence: sequence,
    generated_at: new Date().toISOString(),
    changes: [change],
  };
}

// Создание WebSocket сервера
const wss = new WebSocket.Server({ port: PORT });

console.log(`🔌 WebSocket mock server started on ws://localhost:${PORT}`);
console.log(`📡 Sending updates every ${INTERVAL_MS}ms`);
console.log('');

let intervalId = null;
let currentClient = null;

wss.on('connection', (ws, req) => {
  console.log(`✅ Client connected from ${req.socket.remoteAddress}`);
  
  // Сбрасываем состояние для нового клиента
  sequence = 0;
  snapshotId = generateId();
  currentClient = ws;
  
  // Отправляем первый snapshot
  const snapshot = generateSnapshot();
  currentSnapshot = snapshot;
  ws.send(JSON.stringify(snapshot));
  console.log(`📤 Sent snapshot #${snapshot.sequence}`);
  
  // Очищаем предыдущий интервал
  if (intervalId) {
    clearInterval(intervalId);
  }
  
  // Запускаем отправку дельт каждые 2 секунды
  intervalId = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      // Иногда отправляем новый snapshot вместо дельты
      if (sequence % 10 === 0) { // Каждые 20 секунд
        const newSnapshot = generateSnapshot();
        currentSnapshot = newSnapshot;
        ws.send(JSON.stringify(newSnapshot));
        console.log(`📤 Sent new snapshot #${newSnapshot.sequence}`);
      } else {
        const delta = generateDelta();
        // Применяем дельту к текущему снапшоту для сохранения консистентности
        if (currentSnapshot) {
          for (const change of delta.changes) {
            const parts = change.path.split('.');
            let target = currentSnapshot;
            for (let i = 0; i < parts.length - 1; i++) {
              if (!target[parts[i]]) target[parts[i]] = {};
              target = target[parts[i]];
            }
            target[parts[parts.length - 1]] = change.value;
          }
          currentSnapshot.generated_at = delta.generated_at;
          currentSnapshot.sequence = delta.sequence;
        }
        ws.send(JSON.stringify(delta));
        console.log(`📤 Sent delta #${delta.sequence} - ${delta.changes[0].path} = ${delta.changes[0].value}`);
      }
    }
  }, INTERVAL_MS);
  
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
  
  ws.on('close', () => {
    console.log('❌ Client disconnected');
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    currentClient = null;
  });
});

// Обработка завершения процесса
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down...');
  if (intervalId) clearInterval(intervalId);
  wss.close(() => {
    console.log('Server stopped');
    process.exit(0);
  });
});