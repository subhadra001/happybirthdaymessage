document.addEventListener("DOMContentLoaded", () => {
  const lightBtn = document.getElementById("lightPlayBtn");
  const cake = document.getElementById("cake");
  const candles = document.querySelectorAll(".candle");
  const message = document.getElementById("message");
  const audio = document.getElementById("birthdayAudio");

  // 🩷 Allow Chrome to unlock audio
  function enableAudio() {
    audio.play().then(() => {
      audio.pause();
      audio.currentTime = 0;
    }).catch(() => {});
  }

  function showMessage() {
  const subMessage = document.getElementById("subMessage");
  const loveNote = document.getElementById("loveNote");

  message.classList.add("show-message");

  // Reveal “to the world's best boyfriend 💌”
  setTimeout(() => {
    subMessage.classList.add("show-sub");
  }, 1200);

  // Reveal “i love you 💖”
  setTimeout(() => {
    loveNote.classList.add("show-sub");
  }, 2400);
}


  // 💖 Constant falling heart confetti
  function startHeartRain() {
    if (typeof confetti === "function") {
      setInterval(() => {
        confetti({
          particleCount: 4,
          angle: 90,
          spread: 60,
          origin: { x: Math.random(), y: 0 },
          shapes: ["heart"],
          colors: ["#ff5c8d", "#ff8fab", "#ffc8dd", "#ffd6a5", "#ffe5ec"],
        });
      }, 300);
    }
  }

  // 🎂 Light candles and burst confetti
  function lightCandles() {
    cake.classList.add("glow");
    showMessage();

    candles.forEach((candle, i) => {
      setTimeout(() => candle.classList.add("lit"), i * 200);
    });

    // 🐰 Show cute GIF entrance
    const cuteGif = document.getElementById("cuteGif");
    setTimeout(() => {
      cuteGif.classList.add("active");
    }, 800);

    // Play music
    setTimeout(() => {
      audio.currentTime = 0;
      audio.play().catch(err => console.log("Audio play error:", err));
    }, 600);

    // 💥 Confetti bursts 8 times
    if (typeof confetti === "function") {
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          confetti({
            particleCount: 180,
            spread: 120,
            origin: { y: 0.6 },
            colors: ["#ffb3c6", "#ffe5ec", "#ff8fab", "#ffc8dd", "#ffd6a5"],
          });
        }, i * 300);
      }
    }
  }

  // 💗 Button click
  lightBtn.addEventListener("click", () => {
    // ✨ Fade out and hide the button
    lightBtn.classList.add("fade-out");
    setTimeout(() => {
      lightBtn.style.display = "none";
    }, 600); // match CSS transition

    enableAudio();
    if (!cake.classList.contains("glow")) {
      lightCandles();
      startHeartRain(); // Start the falling heart confetti
    }
  });

  // Prevent music pause
  document.addEventListener("click", (e) => {
    if (e.target.id !== "lightPlayBtn") {
      if (audio.paused) audio.play().catch(() => {});
    }
  });
});

