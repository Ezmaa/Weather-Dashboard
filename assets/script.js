const searchBtn = document.getElementById('searchBtn');
let userInput = document.getElementById('userInput');
const weatherDisplay = document.getElementById('weatherDisplay');
const fiveDayForecast = document.getElementById('fiveDayForecast');
const searchHistory = document.getElementById('searchHistory');
const cityWeather = document.getElementById('cityWeather');


// const today = dayjs().format('MM-DD-YYYY');
// let city = "";
// const apiKey = '8c6afd615baf70a3f5611f6679bd0674';
// let weatherArr = [];
// button function to search for city 

const apiKey = "8c6afd615baf70a3f5611f6679bd0674";
const today = moment().format('L');
let weatherArr = [];

// User eneters name of city and gets the coordinates for that city 
function currentCondition(city) {

    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(cityWeatherResponse) {
        console.log(cityWeatherResponse);
        
        $("#weatherContent").css("display", "block");
        $("#cityDetail").empty();
        
        const iconCode = cityWeatherResponse.weather[0].icon;
        const iconURL = `https://openweathermap.org/img/w/${iconCode}.png`;

        // WHEN I view current weather conditions for that city
        // THEN I am presented with the city name
        // the date
        // an icon representation of weather conditions
        // the temperature
        // the humidity
        // the wind speed
        const currentCity = $(`
            <h2 id="currentCity">
                ${cityWeatherResponse.name} ${today} <img src="${iconURL}" alt="${cityWeatherResponse.weather[0].description}" />
            </h2>
            <p>Temperature: ${cityWeatherResponse.main.temp} °F</p>
            <p>Humidity: ${cityWeatherResponse.main.humidity}\%</p>
            <p>Wind Speed: ${cityWeatherResponse.wind.speed} MPH</p>
        `);

        $("#cityDetail").append(currentCity);

        // UV index
        const lat = cityWeatherResponse.coord.lat;
        const lon = cityWeatherResponse.coord.lon;
        const uviQueryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        $.ajax({
            url: uviQueryURL,
            method: "GET"
        }).then(function(uviResponse) {
            console.log(uviResponse);

            const uvIndex = uviResponse.value;
            const uvIndexP = $(`
                <p>UV Index: 
                    <span id="uvIndexColor" class="px-2 py-2 rounded">${uvIndex}</span>
                </p>
            `);

            $("#cityDetail").append(uvIndexP);

            futureCondition(lat, lon);

            // WHEN I view the UV index
            // THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
            // 0-2 green#3EA72D, 3-5 yellow#FFF300, 6-7 orange#F18B00, 8-10 red#E53210, 11+violet#B567A4
            if (uvIndex >= 0 && uvIndex <= 2) {
                $("#uvIndexColor").css("background-color", "#3EA72D").css("color", "white");
            } else if (uvIndex >= 3 && uvIndex <= 5) {
                $("#uvIndexColor").css("background-color", "#FFF300");
            } else if (uvIndex >= 6 && uvIndex <= 7) {
                $("#uvIndexColor").css("background-color", "#F18B00");
            } else if (uvIndex >= 8 && uvIndex <= 10) {
                $("#uvIndexColor").css("background-color", "#E53210").css("color", "white");
            } else {
                $("#uvIndexColor").css("background-color", "#B567A4").css("color", "white"); 
            };  
        });
    });
}


function displayCityWeather(weatherData) {

    let weatherArr = weatherData.list;
    console.log(weatherArr);

    const todaysWeather = weatherArr[0]
    console.log(todaysWeather);

    let i = 0;
    for (i = 1; i < 6; i++) {

        let cityInfo = {
            temp5: (Math.round((weatherArr[i].main.temp) - 273.15) * 9 / 5 + 32),
            wind5: weatherArr[i].wind.speed,
            humidity5: weatherArr[i].main.humidity,
            icon5: weatherArr[i].weather[0].icon,
        
        };

        
        console.log(cityInfo.temp5);
        console.log(cityInfo);
        console.log(weatherArr[i]);


    }
    // const description = weatherData.list[0].weather[0].description;
    // cityWeather.append(`description: ${description}`);
    const temp = (Math.round(weatherData.list[0].main.temp - 273.15) * 9 / 5 + 32);
    const wind = weatherData.list[0].wind.speed;
    const humidity = weatherData.list[0].main.humidity;
    const icon = weatherData.list[0].weather[0].icon;
    const cityInput = weatherData.city.name;

    console.log(cityInput);
    //    let todayWeather = $("<div>").addClass("card-body bg-dark border mt-3");
    //     cityWeather.append(todayWeather);


    //display city name
    let cityName = document.createElement("h1");
    cityName.textContent = cityInput;
    cityWeather.append(cityName);

    console.log(cityName);

    let cityDate = document.createElement("h1");
    cityDate.textContent = today;
    cityWeather.append(cityDate);

    console.log(cityDate);


    //display weather icon
    // const iconPic = document.createElement("img").attributes;
    //         "src"
    //         "https://openweathermap.org/img/wn/" + icon + "@2x.png")

    // cityWeather.append(iconPic);


    // Todays forecast 
    let cityTemp = document.createElement("h3");
    cityTemp.textContent = ("Temp: " + temp + " °F");
    cityWeather.append(cityTemp);

    let cityWind = document.createElement("h3");
    cityWind.textContent = ("Wind " + wind + " mph");
    cityWeather.append(cityWind);

    let cityHumidity = document.createElement("h3");
    cityHumidity.textContent = ("Humidity: " + humidity + " %");
    cityWeather.append(cityHumidity);

    localStorage.setItem("City", cityInput);


    // Five day forecast 
    let cityTemp5 = document.createElement("h3");
    cityInfo.temp5.value = ("Temp: " + temp + " °F");
    fiveDayForecast.append(cityTemp5);

    let cityWind5 = document.createElement("h3");
    cityInfo.wind5.value = ("Wind " + wind + " mph");
    fiveDayForecast.append(cityWind5);

    let cityHumidity5 = document.createElement("h3");
    cityInfo.humidity5.value = ("Humidity: " + humidity + " %");
    fiveDayForecast.append(cityHumidity5);



    console.log(temp);
    console.log(wind);
    console.log(humidity);
    console.log(icon);
};



searchBtn.addEventListener('click', function () {


    if (userInput.value === "") {
        alert("Please enter a city")
    } else {
        localStorage.setItem('City', userInput.value);

    }



    citySearch();
});