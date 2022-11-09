const searchBtn = document.getElementById('searchBtn');
let userInput = document.getElementById('userInput');
const weatherDisplay = document.getElementById('weatherDisplay');
const fiveDayForecast = document.getElementById('fiveDayForecast');
const searchHistory = document.getElementById('searchHistory');
const cityWeather = document.getElementById('cityWeather');


const today = dayjs().format('L LT');
let city = "";
const apiKey = '8c6afd615baf70a3f5611f6679bd0674';
let weatherArr = [];
// button function to search for city 



// User eneters name of city and gets the coordinates for that city 
let citySearch = function () {
    

    let city = userInput.value.trim();

    let apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
    .then(function (coordinateResponse){
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
    .then(function (response){
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

        for(i=1; i<6; i++) {
            console.log(weatherArr[i]);
        }
        const description = weatherData.list[0].weather[0].description;
        cityWeather.append(`description: ${description}`);
        const temp = weatherData.list[0].main.temp;
        const wind = weatherData.list[0].wind.gust;
        const humidity = weatherData.list[0].main.humidity;

        console.log(temp);
        console.log(wind);
        console.log(humidity );
};




searchBtn.addEventListener('click', function() {


    if (userInput.value === "") {
        alert("Please enter a city")
    } else {
        localStorage.setItem('City', userInput.value);
    }



    citySearch();
});