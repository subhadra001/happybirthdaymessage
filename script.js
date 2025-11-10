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
      setTimeout(burst, 300);
      setTimeout(burst, 600);
    }
  }

  // 💗 Click handler
  lightBtn.addEventListener("click", () => {
    enableAudio();
    if (!cake.classList.contains("glow")) lightCandles();
  });

  // 🍰 Click cake to trigger
  cake.addEventListener("click", () => {
    enableAudio();
    if (!cake.classList.contains("glow")) lightCandles();
  });
});

