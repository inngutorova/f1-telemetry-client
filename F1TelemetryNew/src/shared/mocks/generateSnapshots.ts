// scripts/generateSnapshots.ts
import { generateRaceSnapshots } from "./fakeSnapshots";
import * as fs from 'fs';
import * as path from 'path';

/**
 * Генерирует и сохраняет N снэпшотов в JSON файлы
 * @param count - количество снэпшотов для генерации
 * @param outputDir - директория для сохранения (по умолчанию 'snapshots')
 */
function generateAndSaveSnapshots(count: number = 5, outputDir: string = 'snapshots') {
  // Создаем директорию если её нет
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Генерируем снэпшоты (race session)
  const snapshots = generateRaceSnapshots(count);
  
  console.log(`✅ Сгенерировано ${snapshots.length} снэпшотов\n`);

  // Сохраняем каждый снэпшот в отдельный файл
  snapshots.forEach((snapshot, index) => {
    const snapshotNumber = index + 1;
    const fileName = `snapshot_${String(snapshotNumber).padStart(3, '0')}.json`;
    const filePath = path.join(outputDir, fileName);
    
    // Форматируем JSON с отступами для читаемости
    const jsonContent = JSON.stringify(snapshot, null, 2);
    
    fs.writeFileSync(filePath, jsonContent, 'utf-8');
    console.log(`📁 Сохранен: ${fileName}`);
    console.log(`   - Снэпшот ID: ${snapshot.snapshot_id}`);
    console.log(`   - Последовательность: ${snapshot.sequence}`);
    console.log(`   - Время: ${snapshot.source_timestamp}`);
    console.log(`   - Пилоты: ${snapshot.drivers.length}`);
    console.log(`   - Сообщения race control: ${snapshot.race_control_messages.length}`);
    console.log(`   - Team radio: ${snapshot.team_radio.length}\n`);
  });

  // Сохраняем все снэпшоты в один файл (опционально)
  const allSnapshotsFile = path.join(outputDir, 'all_snapshots.json');
  fs.writeFileSync(allSnapshotsFile, JSON.stringify(snapshots, null, 2), 'utf-8');
  console.log(`📦 Сохранены все снэпшоты в: ${allSnapshotsFile}`);
  
  return snapshots;
}

// Запускаем генерацию
try {
  const snapshots = generateAndSaveSnapshots(5, './generated_snapshots');
  console.log('✨ Готово! Снэпшоты сохранены в папку "generated_snapshots"');
} catch (error) {
  console.error('❌ Ошибка при генерации снэпшотов:', error);
}