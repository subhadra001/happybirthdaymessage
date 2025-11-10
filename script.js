const btn = document.getElementById("lightPlayBtn");
const audio = document.getElementById("birthdayTune");
const flames = document.querySelectorAll(".flame");
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

function randomColor() {
  const pastelColors = ["#FFD1DC", "#FFDAC1", "#E2F0CB", "#CBAACB", "#B5EAD7"];
  return pastelColors[Math.floor(Math.random() * pastelColors.length)];
}

function createConfetti() {
  for (let i = 0; i < 100; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      color: randomColor(),
      speed: Math.random() * 3 + 2,
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach((c) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
    ctx.fillStyle = c.color;
    ctx.fill();
  });
}

function updateConfetti() {
  confetti.forEach((c) => {
    c.y += c.speed;
    if (c.y > canvas.height) {
      c.y = -10;
      c.x = Math.random() * canvas.width;
    }
  });
}

function animateConfetti() {
  drawConfetti();
  updateConfetti();
  requestAnimationFrame(animateConfetti);
}

btn.addEventListener("click", () => {
  flames.forEach(f => f.style.opacity = "1");
  audio.play();
  createConfetti();
  animateConfetti();
  btn.disabled = true;
  btn.textContent = "🎉 Enjoy!";
});
