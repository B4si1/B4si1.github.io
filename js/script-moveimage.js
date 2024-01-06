const movingImage = document.getElementById('movingImage');
const container = document.querySelector('.image-container');

container.addEventListener('mousemove', (e) => {
  const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
  movingImage.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
});

container.addEventListener('mouseleave', () => {
  movingImage.style.transform = 'translate(0, 0)';
});