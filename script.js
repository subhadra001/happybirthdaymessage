document.addEventListener("DOMContentLoaded", () => {
  const lightBtn = document.getElementById("lightBtn");
  const card = document.querySelector(".card");
  const candles = document.querySelectorAll(".candle");
  const confettiLayer = document.getElementById("confetti-layer");
  const cake = document.getElementById("cake");
  const audio = document.getElementById("birthdayAudio"); // your added <audio> tag

  // 🎵 Function to play the birthday song
  function playMusic() {
    audio.currentTime = 0;
    audio.play().catch(err => console.log("Autoplay blocked:", err));
  }

  // ✨ Simple confetti burst
  function throwConfetti() {
    if (typeof confetti === "function") {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#ffb3c6", "#ffe5ec", "#ff8fab", "#ffc8dd", "#ffd6a5"]
      });
    }
  }

  // 🕯️ Light the candles
  function lightCandles() {
    card.classList.add("lit");
    candles.forEach((candle, i) => {
      setTimeout(() => {
        candle.classList.add("lit");
        if (!candle.querySelector(".flame")) {
          const flame = document.createElement("div");
          flame.className = "flame";
          candle.appendChild(flame);
        }
      }, i * 150);
    });
    throwConfetti();
    playMusic();
  }

  // 🎂 Button click
  lightBtn.addEventListener("click", () => {
    if (!card.classList.contains("lit")) {
      lightCandles();
    }
  });

  // 🎂 Clicking the cake also lights candles
  cake.addEventListener("click", () => {
    if (!card.classList.contains("lit")) {
      lightCandles();
    }
  });
});
