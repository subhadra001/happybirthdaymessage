// Improved visuals + melody + continuous soft hearts
const lightBtn = document.getElementById('lightBtn');
const card = document.querySelector('.card');
const candles = document.querySelectorAll('.candle');
const confettiLayer = document.getElementById('confetti-layer');
const cake = document.getElementById('cake');

let audioCtx, masterGain;

// same gentle "Happy Birthday"-ish melody (approx)
const melody = [
  [392, 300], [392, 300], [440, 600], [392, 600], [523, 600], [494, 1200],
  [392, 300], [392, 300], [440, 600], [392, 600], [587, 600], [523, 1200],
  [392, 300], [392, 300], [784,600], [659,600], [523,600], [494,600], [440,1200],
  [698,300], [698,300], [659,600], [523,600], [587,600], [523,1200]
];

// Audio init (user gesture required on many browsers)
function initAudio(){
  if(audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
  masterGain.connect(audioCtx.destination);
}

// synth tone (two oscillators + soft envelope)
function playTone(freq, startTime, duration){
  const osc1 = audioCtx.createOscillator();
  osc1.type = 'sine'; osc1.frequency.value = freq;

  const osc2 = audioCtx.createOscillator();
  osc2.type = 'triangle'; osc2.frequency.value = freq * 0.997;

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(1.0, startTime + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration / 1000);

  osc1.connect(gain); osc2.connect(gain); gain.connect(masterGain);

  osc1.start(startTime); osc2.start(startTime);
  osc1.stop(startTime + duration/1000 + 0.06);
  osc2.stop(startTime + duration/1000 + 0.06);
}

function playMelody(){
  if(!audioCtx) initAudio();
  audioCtx.resume().then(()=> {
    const now = audioCtx.currentTime + 0.03;
    let t = now;
    for(let i=0;i<melody.length;i++){
      const [f,d] = melody[i];
      playTone(f, t, d);
      t += d/1000;
    }
  }).catch(()=>{/* blocked */});
}

// light candles with stagger + glow effect
function lightCandles(){
  card.classList.add('lit');
  cake.classList.add('glow');

  candles.forEach((c,i) => {
    setTimeout(()=> {
      c.classList.add('lit');
      // tiny scale pop for candle
      c.style.transition = 'transform .22s cubic-bezier(.2,.9,.3,1)';
      c.style.transform = 'translateY(-2px) scale(1.02)';
      setTimeout(()=> c.style.transform = '', 300);
    }, i * 140);
  });

  spawnHearts(14);
  spawnSparkles(6);
}

// create heart confetti
function spawnHearts(count=10){
  for(let i=0;i<count;i++){
    createHeart(i);
  }
}

// create single heart element that floats up and fades
function createHeart(i){
  const heart = document.createElement('div');
  heart.className = 'heart';
  const w = 16 + Math.random()*12;
  heart.style.width = w + 'px';
  heart.style.height = w + 'px';
  heart.style.position = 'fixed';
  const startX = window.innerWidth/2 + (Math.random()-0.5) * 260;
  const startY = window.innerHeight * 0.52 + (Math.random()-0.5) * 50;
  heart.style.left = startX + 'px';
  heart.style.top = startY + 'px';
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = 2000;
  heart.style.opacity = '0.95';
  heart.style.borderRadius = '6px 6px 10px 10px';
  heart.style.backgroundImage = `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.65), transparent 20%),
                               linear-gradient(180deg, rgba(255,160,180,0.95), rgba(255,120,150,0.95))`;
  heart.style.clipPath = 'path("M10 3 C10 3 14 1 16 4 C18 6 14 10 10 13 C6 10 2 6 4 4 C6 1 10 3 10 3 Z")';
  confettiLayer.appendChild(heart);

  requestAnimationFrame(()=>{
    const xMove = (Math.random()-0.5) * 140;
    const yMove = -(420 + Math.random()*220);
    const rotate = (Math.random()-0.5) * 120;
    heart.style.transition = `transform ${5 + Math.random()*3}s cubic-bezier(.2,.8,.2,1), opacity ${5 + Math.random()*3}s linear`;
    heart.style.transform = `translate(${xMove}px, ${yMove}px) rotate(${rotate}deg) scale(${0.9 + Math.random()*0.8})`;
    heart.style.opacity = '0';
  });

  setTimeout(()=> heart.remove(), 7000 + Math.random()*2000);
}

// small sparkles near cake for a few seconds
function spawnSparkles(n=6){
  for(let i=0;i<n;i++){
    const s = document.createElement('div');
    s.className = 'spark';
    s.style.position = 'absolute';
    s.style.width = s.style.height = (6 + Math.random()*10) + 'px';
    s.style.left = (120 + Math.random()*80) + 'px';
    s.style.top = (30 + Math.random()*40) + 'px';
    s.style.borderRadius = '50%';
    s.style.background = 'radial-gradient(circle, rgba(255,255,255,0.95), rgba(255,190,210,0.8))';
    s.style.filter = 'blur(2px)';
    s.style.opacity = '0.95';
    s.style.zIndex = 8;
    cake.appendChild(s);
    setTimeout(()=> {
      s.style.transition = 'transform 1400ms ease, opacity 1400ms linear';
      s.style.transform = `translateY(-40px) scale(1.6)`;
      s.style.opacity = '0';
    }, 80 + i*120);
    setTimeout(()=> s.remove(), 1800 + i*300);
  }
}

// button handlers
lightBtn.addEventListener('click', async () => {
  try{ initAudio(); await audioCtx.resume(); } catch(e){}
  if(!card.classList.contains('lit')) lightCandles();
});

// cake click to light
document.querySelector('.cake').addEventListener('click', () => {
  if(!card.classList.contains('lit')) lightBtn.click();
});

// gentle auto-spawn tiny hearts continuously (background, subtle)
setInterval(()=> { createHeart(); }, 1200);

// warm up audio context on load (best effort)
window.addEventListener('load', () => {
  if(typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined'){
    try{ initAudio(); if(audioCtx.state === 'suspended') audioCtx.resume().catch(()=>{}); } catch(e){}
  }
});
