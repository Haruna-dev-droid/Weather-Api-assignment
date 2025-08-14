const APIKey = "1fa486d6c5822e02fb63a283d4072799";
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const weatherResult = document.getElementById("weather-result");

// displaying and fetching weather info
async function getWeather(city) {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("City not found!");
    }

    const data = await response.json();

    // for displaying weather info
    weatherResult.innerHTML = `
      <div class="bg-white rounded-lg shadow-lg p-7  text-center max-w-md mx-auto">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">${data.name}, ${
      data.sys.country
    }</h2>
        <p class="text-lg text-gray-600 mb-4">${data.weather[0].description}</p>
        <p class="text-6xl font-bold  text-sky-500 mb-4">${Math.round(
          data.main.temp
        )}°C</p>
        <div class="flex justify-center gap-6 text-gray-700">
          <p>💧 Humidity: ${data.main.humidity}%</p>
          <p>🌬 Wind: ${data.wind.speed} m/s</p>
        </div>
      </div>
    `;
  } catch (error) {
    weatherResult.innerHTML = `
      <p class="text-red-600 font-semibold text-center">${error.message}</p>
    `;
  }
}

// search Btn event listener
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = searchInput.value.trim();
  if (city) {
    getWeather(city);
    searchInput.value = "";
  }
});
