function getWeather() {
  const apiKey = 'd848a96993e640fe8c765333c5ad09ac';
  const cityInput = document.getElementById('cityInput');
  const weatherInfo = document.getElementById('weatherInfo');

  const city = cityInput.value;

  if (city === '') {
    showErrorPopup('Please enter a city!');
    return;
}
  
  const apiUrl = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}&include=minutely`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const weatherData = data.data[0];

      const weatherHTML = `
        <h2>${weatherData.city_name}, ${weatherData.country_code}</h2>
        <p>Temperature: ${weatherData.temp}°C</p>
        <p>Weather: ${weatherData.weather.description}</p>
        <p>Humidity: ${weatherData.rh}%</p>
        <p>Wind: ${weatherData.wind_spd} m/s, ${weatherData.wind_cdir_full}</p>
      `;

      weatherInfo.innerHTML = weatherHTML;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      showErrorPopup('Error fetching weather data. Please try again.');
    });

    function showErrorPopup(message) {
      const errorText = document.getElementById('errorText');
      errorText.textContent = message;
      const errorPopup = document.getElementById('errorPopup');
      errorPopup.style.display = 'block';
  }

    
}
