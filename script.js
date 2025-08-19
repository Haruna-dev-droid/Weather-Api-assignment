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
        <div class="bg-white rounded-lg shadow-lg p-6 text-center max-w-md mb-10 mx-auto">
          <h2 class="text-3xl font-bold text-gray-800 mb-2">${data.name}, ${
        data.sys.country
      }</h2>
          
          <p class="text-6xl font-bold text-sky-500 mb-4">${Math.round(
            data.main.temp
          )}°C</p>
          
          <div class="flex justify-center gap-6 text-gray-700">
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>🌬 Wind: ${data.wind.speed} m/s</p>
          </div>

           <div id="see-more-info" class="hidden mt-6 grid grid-cols-2 gap-4">
            
            <div class="bg-gray-100 p-3 rounded-lg shadow text-gray-800">
              🌡 <span class="font-bold">Feels like:</span> ${Math.round(
                data.main.feels_like
              )}°C
            </div>
            
            <div class="bg-gray-100 p-3 rounded-lg shadow text-gray-800">
              📈 <span class="font-bold">Max Temp:</span> ${Math.round(
                data.main.temp_max
              )}°C
            </div>
            
            <div class="bg-gray-100 p-3 rounded-lg shadow text-gray-800">
              📉 <span class="font-bold">Min Temp:</span> ${Math.round(
                data.main.temp_min
              )}°C
            </div>
            
            <div class="bg-gray-100 p-3 rounded-lg shadow text-gray-800">
              ☁ <span class="font-bold">Weather:</span> ${
                data.weather[0].description
              }
            </div>
            
            <div class="bg-gray-100 p-3 rounded-lg shadow text-gray-800 col-span-2">
              🗓 <span class="font-bold">Pressure:</span> ${
                data.main.pressure
              } hPa
            </div>
          </div>
          
          <button id="toggle-more" class="mt-4 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600">
            See More
          </button>
        </div>`;

      // 🔑 Add the event listener AFTER injecting HTML
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
        <div class="bg-red-100 text-red-800 p-4 rounded-lg">
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
