const canvas = document.getElementById('glowCanvas');
const ctx = canvas.getContext('2d');
let isHoveringLink = false;

let mouseX = 0;
let mouseY = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw glowing cursor
  ctx.beginPath();
  ctx.arc(mouseX, mouseY, 10, 0, Math.PI * 2);
  ctx.shadowColor = 'yellowgreen';
  ctx.shadowBlur = 20;
  ctx.fillStyle = 'yellowgreen';
  ctx.fill();

  requestAnimationFrame(draw);
}

draw();