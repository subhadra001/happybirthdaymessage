document.addEventListener("DOMContentLoaded", () => {
  const lightBtn = document.getElementById("lightBtn");
  const card = document.querySelector(".card");
  const candles = document.querySelectorAll(".candle");
  const confettiLayer = document.getElementById("confetti-layer");
  const cake = document.getElementById("cake");
  const audio = document.getElementById("birthdayAudio");

  // ensure audio can be played after user click
  function enableAudio() {
    audio.play().then(() => {
      audio.pause();
      audio.currentTime = 0;
    }).catch(() => {});
  }

  // 🕯️ Light candles
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

    // Play music after lighting
    setTimeout(() => {
      audio.currentTime = 0;
      audio.play().catch(err => console.log("Audio play error:", err));
    }, 500);

    // Confetti burst
    if (typeof confetti === "function") {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#ffb3c6", "#ffe5ec", "#ff8fab", "#ffc8dd", "#ffd6a5"]
      });
    }
  }

  // 🩷 Button click
  lightBtn.addEventListener("click", () => {
    enableAudio(); // unlocks sound
    if (!card.classList.contains("lit")) {
      lightCandles();
    }
  });

  // 🍰 Cake click = same effect
  cake.addEventListener("click", () => {
    enableAudio();
    if (!card.classList.contains("lit")) {
      lightCandles();
    }
  });
});
