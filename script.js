document.addEventListener("DOMContentLoaded", () => {
  const lightBtn = document.getElementById("lightPlayBtn");
  const cake = document.getElementById("cake");
  const candles = document.querySelectorAll(".candle");
  const message = document.getElementById("message");
  const audio = document.getElementById("birthdayAudio");

  // Enable Chrome audio
  function enableAudio() {
    audio.play().then(() => {
      audio.pause();
      audio.currentTime = 0;
    }).catch(() => {});
  }

  function showMessage() {
    message.classList.add("show-message");
  }

  // 🎂 Light candles + play
  function lightCandles() {
    cake.classList.add("glow");
    showMessage();

    candles.forEach((candle, i) => {
      setTimeout(() => candle.classList.add("lit"), i * 200);
    });

    // Play song
    setTimeout(() => {
      audio.currentTime = 0;
      audio.play().catch(err => console.log("Audio play error:", err));
    }, 600);

    // Confetti burst
    if (typeof confetti === "function") {
      const burst = () => confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#ffb3c6", "#ffe5ec", "#ff8fab", "#ffc8dd", "#ffd6a5"]
      });
      burst();
      setTimeout(burst, 400);
      setTimeout(burst, 800);
    }
  }

  // 💗 Button click
  lightBtn.addEventListener("click", () => {
    enableAudio();
    if (!cake.classList.contains("glow")) lightCandles();
  });

  // Prevent music from pausing accidentally
  document.addEventListener("click", (e) => {
    if (e.target.id !== "lightPlayBtn") {
      if (audio.paused) audio.play().catch(() => {});
    }
  });
});
