document.addEventListener("DOMContentLoaded", () => {
  const lightBtn = document.getElementById("lightPlayBtn");
  const cake = document.getElementById("cake");
  const candles = document.querySelectorAll(".candle");
  const message = document.getElementById("message");
  const audio = document.getElementById("birthdayAudio");

  // 💕 Continuous falling confetti hearts
  const confettiCanvas = document.getElementById("confettiCanvas");
  const confettiInstance = confetti.create(confettiCanvas, { resize: true, useWorker: true });

  function startHeartConfetti() {
    setInterval(() => {
      confettiInstance({
        particleCount: 5,
        angle: 90,
        spread: 60,
        origin: { x: Math.random(), y: 0 },
        shapes: ["heart"],
        colors: ["#ff6699", "#ff99cc", "#ffb3c6", "#ffcce0"],
        gravity: 0.4,
        ticks: 300
      });
    }, 200);
  }

  function showMessage() {
    message.classList.add("show-message");
  }

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

    // Start confetti
    startHeartConfetti();
  }

  // Enable Chrome audio
  function enableAudio() {
    audio.play().then(() => {
      audio.pause();
      audio.currentTime = 0;
    }).catch(() => {});
  }

  // Button click
  lightBtn.addEventListener("click", () => {
    enableAudio();
    if (!cake.classList.contains("glow")) lightCandles();
  });
});
