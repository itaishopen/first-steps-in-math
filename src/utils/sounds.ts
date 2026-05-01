let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

function tone(
  freq: number,
  startAt: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume = 0.25,
) {
  const ac = getCtx();
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.connect(gain);
  gain.connect(ac.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ac.currentTime + startAt);
  gain.gain.setValueAtTime(volume, ac.currentTime + startAt);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + startAt + duration);
  osc.start(ac.currentTime + startAt);
  osc.stop(ac.currentTime + startAt + duration + 0.01);
}

export function playSuccess() {
  // Happy ascending ding
  tone(523, 0.00, 0.12);   // C5
  tone(659, 0.10, 0.12);   // E5
  tone(784, 0.20, 0.18);   // G5
}

export function playFail() {
  // Gentle "bwah" — soft, not scary for kids
  tone(350, 0.00, 0.12, 'triangle', 0.2);
  tone(280, 0.10, 0.18, 'triangle', 0.2);
}

export function playFinish() {
  // Short fanfare
  tone(523, 0.00, 0.10);   // C5
  tone(659, 0.10, 0.10);   // E5
  tone(784, 0.20, 0.10);   // G5
  tone(1047, 0.30, 0.25);  // C6
  tone(784, 0.55, 0.10);   // G5
  tone(1047, 0.65, 0.30);  // C6
}

// Resume suspended AudioContext on first user gesture
export function unlockAudio() {
  if (ctx && ctx.state === 'suspended') ctx.resume();
}
