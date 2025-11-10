document.addEventListener("DOMContentLoaded", () => {
  const lightBtn = document.getElementById("lightPlayBtn");
  const cake = document.getElementById("cake");
  const candles = document.querySelectorAll(".candle");
  const message = document.getElementById("message");
  const audio = document.getElementById("birthdayAudio");
  const cuteGif = document.getElementById("cuteGif");

  // 🩷 Allow Chrome to unlock audio
  function enableAudio() {
    audio.play().then(() => {
      audio.pause();
      audio.currentTime = 0;
    }).catch(() => {});
  }

  // 🎉 Show message and activate GIF
  function showMessage() {
    message.classList.add("show-message");
    setTimeout(() => {
      cuteGif.classList.add("active");
    }, 800); // show GIF slightly after message appears
  }

  // 🕯️ Light candles + trigger everything
  function lightCandles() {
    cake.classList.add("glow");
    showMessage();

    candles.forEach((candle, i) => {
      setTimeout(() => candle.classList.add("lit"), i * 200);
    });

    // 🎵 Play audio
    setTimeout(() => {
      audio.currentTime = 0;
      audio.play().catch(err => console.log("Audio play error:", err));
    }, 600);

    // 🎊 Confetti
    if (typeof confetti === "function") {
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ["#ffb3c6", "#ffe5ec", "#ff8fab", "#ffc8dd", "#ffd6a5"]
          });
        }, i * 300);
      }
    }

    // 🌸 Fade out the button
    lightBtn.style.transition = "opacity 1s ease, transform 1s ease";
    lightBtn.style.opacity = "0";
    lightBtn.style.transform = "scale(0.9)";
    setTimeout(() => lightBtn.style.display = "none", 1000);
  }

  // 💗 Button click handler
  lightBtn.addEventListener("click", () => {
    enableAudio();
    if (!cake.classList.contains("glow")) {
      lightCandles();
    }
  });
});
