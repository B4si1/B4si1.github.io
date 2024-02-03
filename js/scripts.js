const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const ctx2 = canvas.getContext('2d');
console.log(ctx);
const apiKey = '9d52832445de4d18b0c152812240202';
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');

// Add resize event listener to update canvas size
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(ctx.fillStyle)
    ctx.fillRect(10,10, 200, 200);
  });

ctx.fillStyle = 'white';
console.log(ctx.fillStyle)
ctx.fillRect(10,10, 200, 200);


let isHoveringLink = false;
let mouseX = 0;
let mouseY = 0;

let gradientFill1, gradientFill2, pointerFill; // Initialize outside the loop

function renderWeather(data) {
  const location = data.location;
  const currentWeather = data.current;

  const weatherHTML = `
    <h2>${location.name}, ${location.country}</h2>
    <p>Temperature: ${currentWeather.temp_c}°C</p>
    <p>Weather: ${currentWeather.condition.text}</p>
    <img src="${currentWeather.condition.icon}" alt="Weather Icon">
    <p>Humidity: ${currentWeather.humidity}%</p>
    <p>Wind: ${currentWeather.wind_kph} km/h, ${currentWeather.wind_dir}</p>
  `;

  weatherInfo.innerHTML = weatherHTML;

  const palettes = [
    { name: "Clear", gradientFill1: '#cdf5f5', gradientFill2: '#287bf8', pointerFill: '#d0d8e3' },
    { name: "Partly cloudy", gradientFill1: '#babab6', gradientFill2: '#f5f5f1', pointerFill: '#037675'},
    { name: "Overcast", gradientFill1: '#7f9bc5', gradientFill2: '#7e7f81', pointerFill: '#d2d5db'},
    { name: "Sunny", gradientFill1: '#f4efba', gradientFill2: '#fcfbf5', pointerFill: '#f2ae1d'},
    { name: "Light rain", gradientFill1: '#8edcef', gradientFill2: '#02c5f6', pointerFill: '#d9e7eb'},
  ];

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

  for (let i = 0; i < palettes.length; i++) {
    if (palettes[i].name === currentWeather.condition.text) {
      gradientFill1 = palettes[i].gradientFill1;
      gradientFill2 = palettes[i].gradientFill2;
      pointerFill = palettes[i].pointerFill;

      gradient.addColorStop(0, gradientFill1);
      gradient.addColorStop(1, gradientFill2);
    }
  }

  canvas.style.background = `radial-gradient(${gradientFill1}, ${gradientFill2})`;
  drawpointer();
}

function onLoadWeather() {
  fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Rome&aqi=no`)
    .then(response => response.json())
    .then(data => {
      renderWeather(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      alert('Error fetching weather data. Please try again.');
    });
}

onLoadWeather();

function getWeather() {
  const city = cityInput.value;

  if (city === '') {
    alert('Please enter a city.');
    return;
  }

  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      renderWeather(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      alert('Error fetching weather data. Please try again.');
    });
};

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function drawpointer() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(mouseX, mouseY, 10, 0, Math.PI * 2);
  ctx.shadowColor = 'yellowgreen';
  ctx.shadowBlur = 20;
  ctx.fillStyle = 'yellowgreen';
  ctx.fill();

  requestAnimationFrame(drawpointer);
}

drawpointer();


