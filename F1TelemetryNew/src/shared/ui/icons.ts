// src/shared/ui/icons.ts
// Импортируем все PNG иконки
const backIcon = require('../assets/icons/icons8-rewind-48.png');
const forwardIcon = require('../assets/icons/icons8-fast-forward-48.png');
const playIcon = require('../assets/icons/icons8-play-48.png');
const pauseIcon = require('../assets/icons/icons8-pause-48.png');
const chevronUpIcon = require('../assets/icons/icons8-collapse-arrow-48.png');
const chevronDownIcon = require('../assets/icons/icons8-expand-arrow-48.png');
const settingsIcon = require('../assets/icons/icons8-settings-48.png');

// Экспортируем все иконки одним объектом
export const icons = {
  back: backIcon,
  forward: forwardIcon,
  play: playIcon,
  pause: pauseIcon,
  chevronUp: chevronUpIcon,
  chevronDown: chevronDownIcon,
  settings: settingsIcon
};

// Или экспортируем каждую отдельно
export {
  backIcon,
  forwardIcon,
  playIcon,
  pauseIcon,
  chevronUpIcon,
  chevronDownIcon,
  settingsIcon
};