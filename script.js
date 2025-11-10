document.addEventListener("DOMContentLoaded", () => {
  const lightBtn = document.getElementById("lightPlayBtn");
  const cake = document.getElementById("cake");
  const candles = document.querySelectorAll(".candle");
  const message = document.getElementById("message");
  const subMessage = document.getElementById("subMessage");
  const audio = document.getElementById("birthdayAudio");
  const cuteGif = document.getElementById("cuteGif");

  // 🎀 Cute GIF entrance
  setTimeout(() => {
    cuteGif.classList.add("active");
  }, 800);

  // 🩷 Allow Chrome to unlock audio
  function enableAudio() {
    audio.play().then(() => {
      audio.pause();
      audio.currentTime = 0;
    }).catch(() => {});
  }

  enableAudio();

  // 🕯️ When button clicked
  lightBtn.addEventListener("click", () => {
    // Light candles
    candles.forEach(candle => candle.classList.add("lit"));

    // Play song
    audio.currentTime = 0;
    audio.play();

    // Show main message
    setTimeout(() => {
      message.classList.add("show-message");
    }, 1000);

    // Show sub-message a bit later ✨
    setTimeout(() => {
      subMessage.classList.add("show-sub");
    }, 2000);

    // Confetti celebration 🎉
    setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 }
      });
    }, 1500);

    // Hide the button & lock audio
    lightBtn.style.display = "none";
  });
});
