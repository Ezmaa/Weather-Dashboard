const searchBtn = $('#searchBtn');
const apiKey = '8c6afd615baf70a3f5611f6679bd0674';
// button function to search for city 

// function currentCity() {

//     let apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={apiKey}';

//     $.ajax({
//         url: apiUrl,
//         method: 'GET',
//       }).then(function (response) {
//         console.log('Ajax Reponse \n-------------');
//         console.log(response);
//       });

// console.log(currentCity);
    
// };


function currentCity() {

    let apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={apiKey}';

    fetch(apiUrl)
    .then(function (response){
        return response.json();
})
    .then(function (data) {
        console.log(data)
    });
}
searchBtn.on('click', function() {
    currentCity();
});
