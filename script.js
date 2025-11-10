// Minimal, dependency-free script.
// - Lights candles & reveals message
// - Generates soft "piano-like" melody in WebAudio on click
// - Spawns gentle floating hearts as confetti

const lightBtn = document.getElementById('lightBtn');
const replayBtn = document.getElementById('replayBtn');
const card = document.querySelector('.card');
const candles = document.querySelectorAll('.candle');
const confettiLayer = document.getElementById('confetti-layer');

let audioCtx, masterGain;

// Simple frequency map for a gentle "Happy Birthday" melody (approx.)
const melody = [
  // [freq, duration_ms]
  [392, 300], [392, 300], [440, 600], [392, 600], [523, 600], [494, 1200],
  [392, 300], [392, 300], [440, 600], [392, 600], [587, 600], [523, 1200],
  [392, 300], [392, 300], [784,600], [659,600], [523,600], [494,600], [440,1200],
  [698,300], [698,300], [659,600], [523,600], [587,600], [523,1200]
];

// create AudioContext lazily (must be triggered by user gesture in many browsers)
function initAudio(){
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0.08, audioCtx.currentTime); // soft volume
  masterGain.connect(audioCtx.destination);
}

// Play a soft piano-like tone using multiple oscillators (basic synth)
function playTone(freq, startTime, duration){
  // create an ADSR-ish tone with two oscillators for a richer sound
  const osc1 = audioCtx.createOscillator();
  osc1.type = 'sine';
  osc1.frequency.value = freq;

  const osc2 = audioCtx.createOscillator();
  osc2.type = 'triangle';
  osc2.frequency.value = freq * 0.997;

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(1.0, startTime + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration / 1000);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(masterGain);

  osc1.start(startTime);
  osc2.start(startTime);
  osc1.stop(startTime + duration / 1000 + 0.05);
  osc2.stop(startTime + duration / 1000 + 0.05);
}

// Play the melody (schedules tones)
function playMelody(){
  if (!audioCtx) initAudio();
  // some browsers require resume before playing
  audioCtx.resume().then(()=> {
    const now = audioCtx.currentTime + 0.05;
    let t = now;
    for (let i=0;i<melody.length;i++){
      const [f,d] = melody[i];
      playTone(f, t, d);
      t += d / 1000;
    }
  });
}

// Light candles (toggle class and animate small staggered delay)
function lightCandles(){
  card.classList.add('lit');
  // stagger per-candle class add
  candles.forEach((c, i) => {
    setTimeout(()=> c.classList.add('lit'), i * 120);
  });

  spawnHearts(14);
  // start music
  try{
    initAudio();
    // attempt to play; if blocked, resume on user gesture
    playMelody();
    replayBtn.removeAttribute('aria-hidden');
  } catch(e){
    console.warn('Audio start failed', e);
  }
}

// create gentle floating heart elements
function spawnHearts(count=12){
  for(let i=0;i<count;i++){
    createHeart(i);
  }
}

function createHeart(i){
  const heart = document.createElement('div');
  heart.className = 'heart';
  // random starting position near top center area
  const startX = (window.innerWidth/2) + (Math.random()-0.5) * 260;
  const startY = window.innerHeight * 0.48 + (Math.random()-0.5) * 40;
  heart.style.position = 'fixed';
  heart.style.left = `${startX}px`;
  heart.style.top = `${startY}px`;
  heart.style.pointerEvents = 'none';
  heart.style.width = '18px';
  heart.style.height = '18px';
  heart.style.zIndex = 2000;
  heart.style.opacity = '0.95';
  heart.style.transform = `translateY(0) scale(${0.9 + Math.random()*0.5}) rotate(${(Math.random()-0.5)*30}deg)`;
  heart.style.transition = `transform ${4 + Math.random()*3}s cubic-bezier(.2,.8,.2,1), opacity ${4 + Math.random()*3}s linear`;
  heart.style.backgroundImage = `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), transparent 20%),
                                 linear-gradient(180deg, rgba(255,160,170,0.95), rgba(255,110,140,0.95))`;
  heart.style.borderRadius = '6px 6px 10px 10px';
  heart.style.clipPath = 'path("M10 3 C10 3 14 1 16 4 C18 6 14 10 10 13 C6 10 2 6 4 4 C6 1 10 3 10 3 Z")';

  confettiLayer.appendChild(heart);

  requestAnimationFrame(()=>{
    const xMove = (Math.random()-0.5) * 120;
    const yMove = -(450 + Math.random()*160);
    const rotate = (Math.random()-0.5)*120;
    heart.style.transform = `translate(${xMove}px, ${yMove}px) scale(${0.8 + Math.random()*0.8}) rotate(${rotate}deg)`;
    heart.style.opacity = '0';
  });

  // cleanup after animation
  setTimeout(()=> heart.remove(), 7000 + Math.random()*1800);
}

// Button handlers
lightBtn.addEventListener('click', async (e) => {
  // attempt to resume audio context on click (user gesture)
  try{
    initAudio();
    await audioCtx.resume();
  } catch(e){}
  lightCandles();
});

// Replay music button (after initial gesture)
replayBtn.addEventListener('click', (e)=>{
  if (!audioCtx) initAudio();
  audioCtx.resume().then(playMelody);
});

// Small accessibility: allow pressing Enter on Light button
lightBtn.addEventListener('keydown', (e) => { if(e.key === 'Enter') lightBtn.click(); });

// Also allow clicking the cake area to light (optional)
document.querySelector('.cake').addEventListener('click', () => {
  if (!card.classList.contains('lit')) lightBtn.click();
});

// try to auto-resume audio (some browsers allow if muted)
window.addEventListener('load', () => {
  if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined'){
    try{
      initAudio();
      // try to warm up audio but not play melody unless user interacts
      if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(()=>{/* blocked */});
      }
    } catch(e){}
  }
});
