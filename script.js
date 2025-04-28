let startTime = 0;
let elapsedTime = 0;
let interval;
let running = false;

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = ms % 1000;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

function updateDisplay() {
  const currentTime = Date.now() - startTime;
  display.textContent = formatTime(currentTime);
}

startBtn.addEventListener('click', () => {
  if (!running) {
    running = true;
    startTime = Date.now() - elapsedTime;
    interval = setInterval(updateDisplay, 10);
  }
});

pauseBtn.addEventListener('click', () => {
  if (running) {
    running = false;
    clearInterval(interval);
    elapsedTime = Date.now() - startTime;
  }
});

resetBtn.addEventListener('click', () => {
  running = false;
  clearInterval(interval);
  startTime = 0;
  elapsedTime = 0;
  display.textContent = '00:00.000';
  lapsContainer.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
  if (running) {
    const lapTime = Date.now() - startTime;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapsContainer.children.length + 1}: ${formatTime(lapTime)}`;
    lapsContainer.appendChild(lapItem);
  }
});
