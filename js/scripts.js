const apiKey = '9d52832445de4d18b0c152812240202';
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');

gradientFill1 = 'black';
gradientFill2 = 'grey';
pointerFill = 'yellowgreen';

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

  // Values from weather API to use as adjustments to style
  const palettes = [
    { name: "Clear", gradientFill1: '#cdf5f5', gradientFill2: '#287bf8', pointerFill: '#d0d8e3'},
    { name: "Partly cloudy", gradientFill1: '#babab6', gradientFill2: '#f5f5f1', pointerFill: '#037675'},
    { name: "Overcast", gradientFill1: '#7f9bc5', gradientFill2: '#7e7f81', pointerFill: '#d2d5db'},
    { name: "Light drizzle", gradientFill1: '#80e6ff', gradientFill2: '#0180a0', pointerFill: '#d2d5db'},
    { name: "Light rain", gradientFill1: '#80e6ff', gradientFill2: '#0180a0', pointerFill: '#d2d5db'},
    { name: "Mist", gradientFill1: '#ffffff', gradientFill2: '#ffffff', pointerFill: '#d2d5db'},
  ];

  for (let i = 0; i < palettes.length; i++) {
    if (palettes[i].name === currentWeather.condition.text) {
        gradientFill1 = palettes[i].gradientFill1;
        gradientFill2 = palettes[i].gradientFill2;
        pointerFill = palettes[i].pointerFill;

        gradient.addColorStop(0, gradientFill1);
        gradient.addColorStop(1, gradientFill2);
        
    }
    
}

 

  // Update the canvas background gradient
  canvas.style.background = `radial-gradient(${gradientFill1}, ${gradientFill2})`;

  // Redraw the pointer with the updated fill color
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

    // Setup canvas and context :
// Get the reference to the HTML canvas element with the id 'canvas1'
const canvas = document.getElementById('canvas1');

canvas.style.background = `radial-gradient(${gradientFill1}, ${gradientFill2})`;
const canvas2 = document.getElementById('canvas2');
// Get the 2D rendering context of the canvas, which allows drawing on it
const ctx = canvas.getContext('2d');
const ctx2 = canvas2.getContext('2d');
// Set the width of the canvas to match the inner width and height of the browser window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;

let isHoveringLink = false;
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
  
function drawpointer() {
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.beginPath();
    ctx2.arc(mouseX, mouseY, 10, 0, Math.PI * 2);
    ctx2.shadowColor = pointerFill;
    ctx2.shadowBlur = 20;
    ctx2.fillStyle = pointerFill;
    ctx2.fill();
  
    requestAnimationFrame(drawpointer);
};
  
drawpointer();
  


// Create a linear gradient for the canvas background, starting from (0, 0) to (canvas.width, canvas.height)
const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
// Add color stops to the gradient: starting with a greenish color, transitioning to black at the middle, and ending with the same greenish color
gradient.addColorStop(0, gradientFill1);
console.log("gfill1: " + gradientFill1);
gradient.addColorStop(1, gradientFill2);
console.log("gfill1: " + gradientFill2);
// Set the canvas fill style to the created gradient
ctx.fillStyle = gradient;
// Set the stroke style (outline color) for shapes drawn on the canvas to the greenish color
ctx.strokeStyle = gradient; // using gradient is resource heavy

// Number of particles to render
const renderParticles = 400;
const maxParticleSize = 10;
const minParticleSize = 1;
const lineDistance = 100;

// Particle class definition
class Particle {
    constructor(effect, index) {
        this.effect = effect;
        this.index = index;
        this.radius = Math.floor(Math.random() * maxParticleSize + minParticleSize);
        if(this.index % 10 === 0){
            this.radius = Math.floor(Math.random() * (maxParticleSize + 1) + (minParticleSize + 20));
        }
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
        this.vx = Math.random() * 1 - 0.5;
        this.vy = Math.random() * 1 - 0.5;
        this.pushX = 0;
        this.pushY = 0;
        this.friction = 0.9;
    }

    // Method to draw the particle
    draw(context) {
        if(this.index % 5 === 0){
            context.save();
            context.globalAlpha = 0.4;
            context.moveTo(this.x, this.y);
            context.lineTo(this.effect.mouse.x, this.effect.mouse.y);
            context.stroke();
            context.restore();
        }
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        //context.stroke(); // outline stroke
    }

    // Update function for a particle or object
update() {
    // Check if the mouse is pressed in the effect
    if (this.effect.mouse.pressed) {
        // Calculate the distance between the particle and the mouse position
        const dx = this.x - this.effect.mouse.x;
        const dy = this.y - this.effect.mouse.y;
        const distance = Math.hypot(dx, dy);

        // Calculate the force based on the mouse radius and the distance
        const force = (this.effect.mouse.radius / distance);

        // If the particle is within the mouse radius, apply forces
        if (distance < this.effect.mouse.radius) {
            // Calculate the angle between the particle and the mouse
            const angle = Math.atan2(dy, dx);

            // Apply forces to push the particle away from the mouse
            this.pushX += Math.cos(angle) * force;
            this.pushY += Math.sin(angle) * force;
        }
    }
    // Update particle's position based on velocity, friction, and applied forces
    this.x += (this.pushX *= this.friction) + this.vx;
    this.y += (this.pushY *= this.friction) + this.vy;

    // Check for collisions with the canvas boundaries and bounce back if necessary
    if (this.x < this.radius) {
        this.x = this.radius;
        this.vx *= -1;
    } else if (this.x > this.effect.width - this.radius) {
        this.x = this.effect.width - this.radius;
        this.vx *= -1;
    }
    if (this.y < this.radius) {
        this.y = this.radius;
        this.vy *= -1;
    } else if (this.y > this.effect.height - this.radius) {
        this.y = this.effect.height - this.radius;
        this.vy *= -1;
    }
}


    // Method to reset particle position
    reset() {
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
    }
}

// Effect class definition
class Effect {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = renderParticles;
        this.createParticles();

        // Mouse interaction properties
        this.mouse = {
            x: 0,
            y: 0,
            pressed: false,
            radius: 150
        }

        // Event listeners for window resize and mouse movement
        window.addEventListener('resize', e => {
            this.resize(e.target.window.innerWidth, e.target.window.innerHeight);
        });
        window.addEventListener('mousemove', e => {
            if (this.mouse.pressed) {
                this.mouse.x = e.x;
                this.mouse.y = e.y;
              
            }
        });
        window.addEventListener('mousedown', e=>{
            this.mouse.pressed = true; // Flip for inverted mouse/particle interaction
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
        window.addEventListener('mouseup', e=>{
            this.mouse.pressed = false; // Flip for inverted mouse/particle interaction
        });
    }

    // Method to create particles
    createParticles() {
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new Particle(this,i));
        }
    }

    // Method to handle and render particles
    handleParticles(context) {
        this.connectParticles(context);
        this.particles.forEach(particle => {
            particle.draw(context);
            particle.update();
        });
    }

    // Method to connect particles with lines based on distance
    connectParticles(context) {
        const maxDistance = lineDistance;
        for (let a = 0; a < this.particles.length; a++) {
            for (let b = a; b < this.particles.length; b++) {
                const dx = this.particles[a].x - this.particles[b].x;
                const dy = this.particles[a].y - this.particles[b].y;
                const distance = Math.hypot(dx, dy);
                if (distance < maxDistance) {
                    context.save();
                    const opacity = 1 - (distance / maxDistance);
                    context.globalAlpha = opacity;
                    context.beginPath();
                    context.moveTo(this.particles[a].x, this.particles[a].y);
                    context.lineTo(this.particles[b].x, this.particles[b].y);
                    context.stroke();
                    context.restore();
                }
            }
        }
    }

    // Method to handle canvas resize
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;

        // Update gradient based on new dimensions
        const gradient = this.context.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0,gradientFill1);
        //gradient.addColorStop(0.5,'black');
        gradient.addColorStop(1,gradientFill2);
        this.context.fillStyle = gradient;
        this.context.strokeStyle = gradient;

        // Reset particle positions
        this.particles.forEach(particle => {
            particle.reset();
        });

        let mouseX = 0;
        let mouseY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
          });

          function drawpointer() {
            ctx2.clearRect(0, 0, canvas.width, canvas.height);
            ctx2.beginPath();
            ctx2.arc(mouseX, mouseY, 10, 0, Math.PI * 2);
            ctx2.shadowColor = pointerFill;
            ctx2.shadowBlur = 20;
            ctx2.fillStyle = pointerFill;
            ctx2.fill();
          
            requestAnimationFrame(drawpointer);
          }
          
          drawpointer();
    }
}

// Create an instance of the Effect class
const effect = new Effect(canvas, ctx);

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.handleParticles(ctx);
    requestAnimationFrame(animate);
}

// Start the animation loop
animate();


// Add resize event listener to update canvas size
window.addEventListener('resize', () => {
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;
  });