const searchBtn = document.getElementById('searchBtn');
let userInput = document.getElementById('userInput');
const weatherDisplay = document.getElementById('weatherDisplay');
const fiveDayForecast = document.getElementById('fiveDayForecast');
const searchHistory = document.getElementById('searchHistory');
const cityWeather = document.getElementById('cityWeather');


const today = dayjs().format('MM-DD-YYYY');
let city = "";
const apiKey = '8c6afd615baf70a3f5611f6679bd0674';
let weatherArr = [];
// button function to search for city 



// User eneters name of city and gets the coordinates for that city 
let citySearch = function () {


    let city = userInput.value.trim();

    let apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(function (coordinateResponse) {
            return coordinateResponse.json();
        })
        .then(function (coordinatedata) {

            const lon = coordinatedata[0].lon;
            const lat = coordinatedata[0].lat;

            getCityWeather(lat, lon);
        });


};

// city coordinates are read here and weather is displayed 
function getCityWeather(lat, lon) {

    const latUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(latUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (weatherData) {
            console.log('city: \n---------');
            console.log(weatherData);

            displayCityWeather(weatherData);
        });



    // cityWeather.append(weatherData.list[0].weather);

};


function displayCityWeather(weatherData) {

    let weatherArr = weatherData.list;
    console.log(weatherArr);

    const todaysWeather = weatherArr[0]
    console.log(todaysWeather);

    for (i = 1; i < 6; i++) {
        console.log(weatherArr[i]);
    }
    // const description = weatherData.list[0].weather[0].description;
    // cityWeather.append(`description: ${description}`);
    const temp = (Math.round(weatherData.list[0].main.temp - 273.15) * 9/5 + 32);
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
    // var iconPic = document.createElement("img").attributes;
    //         "src"
    //         "https://openweathermap.org/img/wn/" + icon + "@2x.png")
        
    // cityWeather.append(iconPic);

    let cityTemp = document.createElement("h3");
    cityTemp.textContent = ("Temp: " + temp + " °F");
    cityWeather.append(cityTemp);

    let cityWind = document.createElement("h3");
    cityWind.textContent = ("Wind " + wind + " mph");
    cityWeather.append(cityWind);

    let cityHumidity = document.createElement("h3");
    cityHumidity.textContent = ("Humidity: " + humidity);
    cityWeather.append(cityHumidity);

    localStorage.setItem("City", cityInput);

    // const weathercard = 

    for (i = 1; i < 6; i++) {
        console.log(weatherArr[i]);
    }

    console.log(temp);
    console.log(wind);
    console.log(humidity);
    console.log(icon);
};



    

// function savedSearches() {
//     let searched = localStorage.getItem("city");

//     if (searched === "") {
//         userInput.value = "";
//     } else {
//         userInput.value = searched;
//     }

//     searchHistory.textContent = userInput.value;

// }



searchBtn.addEventListener('click', function () {


    if (userInput.value === "") {
        alert("Please enter a city")
    } else {
        localStorage.setItem('City', userInput.value);

    }



    citySearch();
});