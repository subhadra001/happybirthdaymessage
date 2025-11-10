// 🌸 Final Birthday Card Script 🌸
document.addEventListener("DOMContentLoaded", () => {
  const lightBtn = document.getElementById("lightBtn");
  const card = document.querySelector(".card");
  const candles = document.querySelectorAll(".candle");
  const confettiLayer = document.getElementById("confetti-layer");
  const cake = document.getElementById("cake");

  let audioCtx, masterGain;

  // 🎵 Gentle melody (Happy Birthday-like)
  const melody = [
    [392, 300], [392, 300], [440, 600], [392, 600], [523, 600], [494, 1200],
    [392, 300], [392, 300], [440, 600], [392, 600], [587, 600], [523, 1200],
    [392, 300], [392, 300], [784, 600], [659, 600], [523, 600], [494, 600], [440, 1200],
    [698, 300], [698, 300], [659, 600], [523, 600], [587, 600], [523, 1200]
  ];

  // 🎧 Audio context setup
  function initAudio() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);
  }

  function playTone(freq, startTime, duration) {
    const osc1 = audioCtx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.value = freq;

    const osc2 = audioCtx.createOscillator();
    osc2.type = "triangle";
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
    osc1.stop(startTime + duration / 1000 + 0.06);
    osc2.stop(startTime + duration / 1000 + 0.06);
  }

  function playMelody() {
    if (!audioCtx) initAudio();
    audioCtx.resume().then(() => {
      const now = audioCtx.currentTime + 0.03;
      let t = now;
      for (let [f, d] of melody) {
        playTone(f, t, d);
        t += d / 1000;
      }
    });
  }

  // 🕯️ Candle lighting animation
  function lightCandles() {
    card.classList.add("lit");
    cake.classList.add("glow");

    candles.forEach((c, i) => {
      setTimeout(() => {
        c.classList.add("lit");
        // create flame if not already there
        if (!c.querySelector(".flame")) {
          const flame = document.createElement("div");
          flame.className = "flame";
          c.appendChild(flame);
        }
        c.style.transition = "transform .22s cubic-bezier(.2,.9,.3,1)";
        c.style.transform = "translateY(-2px) scale(1.02)";
        setTimeout(() => (c.style.transform = ""), 300);
      }, i * 140);
    });

    throwConfetti();
    spawnHearts(15);
    spawnSparkles(8);
  }

  // 💖 Hearts floating up
  function spawnHearts(count = 10) {
    for (let i = 0; i < count; i++) createHeart();
  }

  function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    const w = 16 + Math.random() * 12;
    heart.style.width = w + "px";
    heart.style.height = w + "px";
    heart.style.position = "fixed";
    const startX = window.innerWidth / 2 + (Math.random() - 0.5) * 260;
    const startY = window.innerHeight * 0.52 + (Math.random() - 0.5) * 50;
    heart.style.left = startX + "px";
    heart.style.top = startY + "px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = 2000;
    heart.style.opacity = "0.95";
    heart.style.borderRadius = "6px 6px 10px 10px";
    heart.style.backgroundImage = `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.65), transparent 20%),
                                  linear-gradient(180deg, rgba(255,160,180,0.95), rgba(255,120,150,0.95))`;
    heart.style.clipPath =
      'path("M10 3 C10 3 14 1 16 4 C18 6 14 10 10 13 C6 10 2 6 4 4 C6 1 10 3 10 3 Z")';
    confettiLayer.appendChild(heart);

    requestAnimationFrame(() => {
      const xMove = (Math.random() - 0.5) * 140;
      const yMove = -(420 + Math.random() * 220);
      const rotate = (Math.random() - 0.5) * 120;
      heart.style.transition = `transform ${
        5 + Math.random() * 3
      }s cubic-bezier(.2,.8,.2,1), opacity ${
        5 + Math.random() * 3
      }s linear`;
      heart.style.transform = `translate(${xMove}px, ${yMove}px) rotate(${rotate}deg) scale(${
        0.9 + Math.random() * 0.8
      })`;
      heart.style.opacity = "0";
    });

    setTimeout(() => heart.remove(), 7000 + Math.random() * 2000);
  }

  // ✨ Sparkles on cake
  function spawnSparkles(n = 6) {
    for (let i = 0; i < n; i++) {
      const s = document.createElement("div");
      s.className = "spark";
      s.style.position = "absolute";
      s.style.width = s.style.height = 6 + Math.random() * 10 + "px";
      s.style.left = 120 + Math.random() * 80 + "px";
      s.style.top = 30 + Math.random() * 40 + "px";
      s.style.borderRadius = "50%";
      s.style.background =
        "radial-gradient(circle, rgba(255,255,255,0.95), rgba(255,190,210,0.8))";
      s.style.filter = "blur(2px)";
      s.style.opacity = "0.95";
      s.style.zIndex = 8;
      cake.appendChild(s);
      setTimeout(() => {
        s.style.transition = "transform 1400ms ease, opacity 1400ms linear";
        s.style.transform = `translateY(-40px) scale(1.6)`;
        s.style.opacity = "0";
      }, 80 + i * 120);
      setTimeout(() => s.remove(), 1800 + i * 300);
    }
  }

  // 🎊 Confetti burst
  function throwConfetti() {
    const burst = () => {
      if (typeof confetti === "function") {
        confetti({
          particleCount: 180,
          spread: 100,
          startVelocity: 40,
          origin: { y: 0.6 },
          colors: ["#ffb3c6", "#ffe5ec", "#ff8fab", "#ffc8dd", "#ffd6a5"]
        });
      }
    };
    burst();
    setTimeout(burst, 300);
    setTimeout(burst, 600);
  }

  // 🩷 Button click handler
  lightBtn.addEventListener("click", async () => {
    try {
      initAudio();
      await audioCtx.resume();
      if (!card.classList.contains("lit")) {
        lightCandles();
        playMelody();
      }
    } catch (e) {
      console.error("Audio context error:", e);
    }
  });

  // 🍰 Cake click triggers button
  cake.addEventListener("click", () => {
    if (!card.classList.contains("lit")) lightBtn.click();
  });

  // continuous background hearts
  setInterval(() => createHeart(), 1200);
});
