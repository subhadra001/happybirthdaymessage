document.addEventListener("DOMContentLoaded", () => {
  const lightBtn = document.getElementById("lightPlayBtn");
  const candles = document.querySelectorAll(".candle");
  const message = document.getElementById("message");
  const subMessage = document.getElementById("subMessage");
  const audio = document.getElementById("birthdayAudio");
  const cuteGif = document.getElementById("cuteGif");

  // Show cute gif entrance
  setTimeout(() => {
    cuteGif.classList.add("active");
  }, 800);

  // Allow audio unlocking (for Chrome)
  function enableAudio() {
    audio.play().then(() => {
      audio.pause();
      audio.currentTime = 0;
    }).catch(() => {});
  }
  enableAudio();

  // Button click
  lightBtn.addEventListener("click", () => {
    candles.forEach(candle => candle.classList.add("lit"));
    audio.currentTime = 0;
    audio.play();

    // Show message
    setTimeout(() => message.classList.add("show-message"), 1000);

    // Show sub-message
    setTimeout(() => subMessage.classList.add("show-sub"), 2000);

    // Confetti
    setTimeout(() => {
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
    }, 1500);

    // Hide button
    lightBtn.style.display = "none";
  });
});
