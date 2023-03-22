const apiKey = "d1e2d0763204896fd894698f5c6e27ee";
const today = moment().format("L");
let weatherArr = [];

function currentCondition(city) {
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(queryURL)
    .then((response) => response.json())
    .then((cityWeatherResponse) => {
      $("#weatherContent").css("display", "block");
      $("#cityDetail").empty();

      const iconCode = cityWeatherResponse.weather[0].icon;
      const iconURL = `https://openweathermap.org/img/w/${iconCode}.png`;

      const currentCity = $(`
      <h2 id="currentCity">
        ${cityWeatherResponse.name} ${today} <img src="${iconURL}" alt="${cityWeatherResponse.weather[0].description}" />
      </h2>
      <p>Temperature: ${cityWeatherResponse.main.temp} °F</p>
      <p>Humidity: ${cityWeatherResponse.main.humidity}\%</p>
      <p>Wind Speed: ${cityWeatherResponse.wind.speed} MPH</p>
    `);

      $("#cityDetail").append(currentCity);

      const lat = cityWeatherResponse.coord.lat;
      const lon = cityWeatherResponse.coord.lon;
      const uviQueryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;

      fetch(uviQueryURL)
        .then((response) => response.json())
        .then((uviResponse) => {
          const uvIndex = uviResponse.value;
          const uvIndexP = $(`
          <p>UV Index: 
            <span id="uvIndexColor" class="px-2 py-2 rounded">${uvIndex}</span>
          </p>
        `);

          $("#cityDetail").append(uvIndexP);

          futureCondition(lat, lon);

          if (uvIndex >= 0 && uvIndex <= 2) {
            $("#uvIndexColor")
              .css("background-color", "#3EA72D")
              .css("color", "white");
          } else if (uvIndex >= 3 && uvIndex <= 5) {
            $("#uvIndexColor").css("background-color", "#FFF300");
          } else if (uvIndex >= 6 && uvIndex <= 7) {
            $("#uvIndexColor").css("background-color", "#F18B00");
          } else if (uvIndex >= 8 && uvIndex <= 10) {
            $("#uvIndexColor")
              .css("background-color", "#E53210")
              .css("color", "white");
          } else {
            $("#uvIndexColor")
              .css("background-color", "#B567A4")
              .css("color", "white");
          }
        });
    });
}

function futureCondition(lat, lon) {
  const futureURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;

  fetch(futureURL)
    .then((response) => response.json())
    .then((futureResponse) => {
      $("#fiveDay").empty();
      for (let i = 1; i < 6; i++) {
        const cityInfo = {
          date: futureResponse.daily[i].dt,
          icon: futureResponse.daily[i].weather[0].icon,
          temp: futureResponse.daily[i].temp.day,
          humidity: futureResponse.daily[i].humidity,
        };
        const currDate = moment.unix(cityInfo.date).format("MM/DD/YYYY");
        const iconURL = `<img src="https://openweathermap.org/img/w/${cityInfo.icon}.png" alt="${futureResponse.daily[i].weather[0].main}" />`;
        const futureCard = $(`
          <div class="pl-3">
            <div class="card pl-3 pt-3 mb-3 bg-primary text-light" style="width: 12rem;>
              <div class="card-body">
                <h5>${currDate}</h5>
                <p>${iconURL}</p>
                <p>Temp: ${cityInfo.temp} °F</p>
                <p>Humidity: ${cityInfo.humidity}\%</p>
              </div>
            </div>
          </div>
        `);
        $("#fiveDay").append(futureCard);
      }
    });
}

$("#searchBtn").on("click", function (event) {
  event.preventDefault();

  const city = $("#enterCity").val().trim();
  currentCondition(city);
  if (!weatherArr.includes(city)) {
    weatherArr.push(city);
    const searchedCity = $(`
            <li class="list-group-item">${city}</li>
            `);
    $("#searchHistory").append(searchedCity);
  }

  localStorage.setItem("city", JSON.stringify(weatherArr));
  console.log(weatherArr);
});

$(document).on("click", ".list-group-item", function () {
  const listCity = $(this).text();
  currentCondition(listCity);
});

$(document).ready(function () {
  const searchHistoryArr = JSON.parse(localStorage.getItem("city"));

  if (searchHistoryArr !== null) {
    const lastSearchedIndex = searchHistoryArr.length - 1;
    const lastSearchedCity = searchHistoryArr[lastSearchedIndex];
    currentCondition(lastSearchedCity);
  }
});
