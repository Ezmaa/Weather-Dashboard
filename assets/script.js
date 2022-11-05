const searchBtn = document.getElementById('searchBtn');
let userInput = document.getElementById('userInput');
const weatherDisplay = document.getElementById('weatherDisplay');
const fiveDayForecast = document.getElementById('fiveDayForecast');
const searchHistory = document.getElementById('searchHistory');

const lat = 42.7654;
const lon = 71.4676;
const today = dayjs().format('L LT');
let city = "";
const apiKey = '8c6afd615baf70a3f5611f6679bd0674';
// button function to search for city 




let citySearch = function (event) {
    event.preventDefault();

    let city = userInput.value.trim();

    let apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
    .then(function (response){
        return response.json();
})
    .then(function (data) {
        console.log('Users input: \n---------');
        console.log(data)
    });



    if (userInput) {
        currentCity(userInput);
    }



};


function currentCity() {

    let lat = 
    let lon =

    let latUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(latUrl)
    .then(function (response){
        return response.json();
})
    .then(function (data) {
        console.log('Users input: \n---------');
        console.log(data)
    });
};




searchBtn.addEventListener('click', citySearch);