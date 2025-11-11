document.addEventListener("DOMContentLoaded", () => {
  const lightBtn = document.getElementById("lightPlayBtn");
  const cake = document.getElementById("cake");
  const candles = document.querySelectorAll(".candle");
  const audio = document.getElementById("birthdayAudio");
  const cuteGif = document.getElementById("cuteGif");
  const message = document.getElementById("message");
  const subMsg = document.querySelector(".sub-message");
  const loveNote = document.querySelector(".love-note");

  // 🩷 Unlock audio on Chrome
  function enableAudio() {
    audio.play().then(() => {
      audio.pause();
      audio.currentTime = 0;
    }).catch(() => {});
  }

  // 💖 Constant heart confetti
  function startHeartRain() {
    if (typeof confetti === "function") {
      setInterval(() => {
        confetti({
          particleCount: 5,
          angle: 90,
          spread: 70,
          origin: { x: Math.random(), y: 0 },
          shapes: ["heart"],
          colors: ["#ff5c8d", "#ff8fab", "#ffc8dd", "#ffd6a5", "#ffe5ec"],
        });
      }, 300);
    }
  }

  // 🎂 Light candles and trigger sequence
  function lightCandles() {
    cake.classList.add("glow");

    candles.forEach((candle, i) => {
      setTimeout(() => candle.classList.add("lit"), i * 200);
    });

    // Play music with slightly higher volume
    setTimeout(() => {
      audio.volume = 0.9; // increase loudness
      audio.currentTime = 0;
      audio.play().catch(err => console.log("Audio play error:", err));
    }, 500);

    // 🎇 Burst confetti 8 times
    if (typeof confetti === "function") {
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          confetti({
            particleCount: 200,
            spread: 130,
            origin: { y: 0.6 },
            colors: ["#ffb3c6", "#ffe5ec", "#ff8fab", "#ffc8dd", "#ffd6a5"],
          });
        }, i * 250);
      }
    }

    // 🐰 Show cute GIF *after* cake lights up
    setTimeout(() => {
      cuteGif.classList.add("active");
    }, 2000);

    // ✨ Show messages *after* GIF appears
    setTimeout(() => message.classList.add("show-message"), 3500);
    setTimeout(() => subMsg.classList.add("show-sub-message"), 4500);
    setTimeout(() => loveNote.classList.add("show-sub-message"), 5500);
  }

  // 💗 Button click
  lightBtn.addEventListener("click", () => {
    lightBtn.classList.add("fade-out");
    setTimeout(() => (lightBtn.style.display = "none"), 600);
    enableAudio();

    if (!cake.classList.contains("glow")) {
      lightCandles();
      startHeartRain();
    }
  });

  // Prevent music pause
  document.addEventListener("click", (e) => {
    if (e.target.id !== "lightPlayBtn" && audio.paused) {
      audio.play().catch(() => {});
    }
  });
});

