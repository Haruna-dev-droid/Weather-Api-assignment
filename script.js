const APIKey = "1fa486d6c5822e02fb63a283d4072799";
const searchBtn = document.getElementById("btnSearch");
const searchInput = document.getElementById("search-input");
const weatherResult = document.getElementById("weather-result");

function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;
  fetch(apiUrl)
    .then((response) => {
      return response.json();
    })

    .then((data) => {
      weatherResult.innerHTML = ` <div class="bg-white rounded-lg shadow-lg p-6 text-center max-w-md mx-auto">
          <h2 class="text-3xl font-bold text-gray-800 mb-2">${data.name}, ${
        data.sys.country
      }</h2>
          <p class="text-lg text-gray-600 mb-4">${
            data.weather[0].description
          }</p>
          <p class="text-6xl font-bold text-sky-500 mb-4">${Math.round(
            data.main.temp
          )}°C</p>
          <div class="flex justify-center gap-6 text-gray-700">
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>🌬 Wind: ${data.wind.speed} m/s</p>
          </div>
        </div>`;
    })
    .catch((error) => {
      weatherResult.innerHTML = `<div class="bg-red-100 text-red-800 p-4 rounded-lg">
        <p>City Not Found!</p>
      </div>`;
    });
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = searchInput.value.trim();
  if (city) {
    getWeather(city);
    searchInput.value = "";
  } else {
    weatherResult.innerHTML = `<div class="bg-red-600 text-white p-4 rounded-lg">
      <p class="font-bold">Warning:</p>
      <p>Please enter a city name.</p>
    </div>`;
  }
});
