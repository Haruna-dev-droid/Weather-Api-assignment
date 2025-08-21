const APIKey = "1fa486d6c5822e02fb63a283d4072799";
const searchBtn = document.getElementById("btnSearch");
const searchInput = document.getElementById("search-input");
const weatherResult = document.getElementById("weather-result");
const seeMore = document.getElementById("see-more");

function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      weatherResult.innerHTML = `
      <div class="bg-white/10 backdrop-blur-lg border  border-white/20 rounded-2xl shadow-2xl p-8 text-center max-w-lg mx-auto animate-fadeIn">
        
      
        <h2 class="text-3xl font-bold text-white mb-2">${data.name}, ${
        data.sys.country
      }</h2>
        
     
        <div class="flex flex-col items-center mt-4">
        <p class="text-6xl">⛅</p>
          <p class="text-6xl font-extrabold text-sky-300 mb-2">${Math.round(
            data.main.temp
          )}°C</p>
          <p class="capitalize text-gray-300 text-lg"> ${
            data.weather[0].description
          } </p>
        </div>

      
        <div class="mt-6 flex justify-center gap-8 text-gray-200 text-md">
          <p>💧 Humidity: ${data.main.humidity}%</p>
          <p>🌬 Wind: ${data.wind.speed} m/s</p>
        </div>

      
        <div id="see-more-info" class="hidden mt-6 grid grid-cols-2 gap-4 text-gray-100 ">
          <div class="bg-white/10 p-3 rounded-lg">🌡 Feels like: ${Math.round(
            data.main.feels_like
          )}°C</div>
          <div class="bg-white/10 p-3 rounded-lg">📈 Max Temp: ${Math.round(
            data.main.temp_max
          )}°C</div>
          <div class="bg-white/10 p-3 rounded-lg">📉 Min Temp: ${Math.round(
            data.main.temp_min
          )}°C</div>
          <div class="bg-white/10 p-3 rounded-lg ">🗓 Pressure: ${
            data.main.pressure
          } hPa</div>
        </div>

       
        <button id="toggle-more" class="mt-6 bg-sky-500/90 cursor-pointer hover:bg-sky-600 px-6 py-2 rounded-xl font-semibold transition">
          See More
        </button>
      </div>
    `;

      const toggleBtn = document.getElementById("toggle-more");
      const seeMoreInfo = document.getElementById("see-more-info");

      toggleBtn.addEventListener("click", () => {
        if (seeMoreInfo.classList.contains("hidden")) {
          seeMoreInfo.classList.remove("hidden");
          toggleBtn.textContent = "See Less";
        } else {
          seeMoreInfo.classList.add("hidden");
          toggleBtn.textContent = "See More";
        }
      });
    })
    .catch((error) => {
      weatherResult.innerHTML = `
        <div class="bg-red-100 text-center mx-auto w-md text-red-800 p-4 rounded-lg">
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
    weatherResult.innerHTML = `<div class="bg-red-600 text-center mx-auto w-md text-white p-4 rounded-lg">
      <p class="font-bold">Warning:</p>
      <p>Please enter a city name.</p>
    </div>`;
  }
});
