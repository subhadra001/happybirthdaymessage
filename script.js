document.addEventListener("DOMContentLoaded", () => {
  const lightBtn = document.getElementById("lightPlayBtn");
  const cake = document.getElementById("cake");
  const candles = document.querySelectorAll(".candle");
  const message = document.getElementById("message");
  const audio = document.getElementById("birthdayAudio");
  const cuteGif = document.getElementById("cuteGif");

  function enableAudio() {
    audio.play().then(() => {
      audio.pause();
      audio.currentTime = 0;
    }).catch(() => {});
  }

  function showMessage() {
    message.classList.add("show-message");
  }

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

  function lightCandles() {
    cake.classList.add("glow");
    showMessage();

    candles.forEach((candle, i) => {
      setTimeout(() => candle.classList.add("lit"), i * 200);
    });

    // 🐰 Show cute GIF AFTER button click
    setTimeout(() => {
      cuteGif.classList.add("active");
    }, 2500);

    // Play music
    setTimeout(() => {
      audio.currentTime = 0;
      audio.play().catch(err => console.log("Audio play error:", err));
    }, 600);

    // 💥 Confetti bursts
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

  lightBtn.addEventListener("click", () => {
    lightBtn.classList.add("fade-out");
    setTimeout(() => {
      lightBtn.style.display = "none";
    }, 600);

    enableAudio();
    if (!cake.classList.contains("glow")) {
      lightCandles();
      startHeartRain();
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.id !== "lightPlayBtn") {
      if (audio.paused) audio.play().catch(() => {});
    }
  });
});
