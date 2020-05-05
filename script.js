
var apiKey = "2aa3937301d9ea4d1d3ffd9639357512";

function pullCityInformation(buildQueryURL) {

}

//Renders the buttons that show previously seached cities. 
function renderSearchedButtons(cityName) {
    let buttonSearchedCity = $("<button>");
    buttonSearchedCity.addClass("city-button btn btn-light col-12");
    buttonSearchedCity.attr("data-name", cityName);
    buttonSearchedCity.text(cityName);
    $("#previousSearch").append(buttonSearchedCity);
}

$("#searchButton").on("click", function () {

    cityName = $("#searchinput").val().trim();
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey + "&units=imperial";
    // var queryURL_UV = ;
    console.log(queryURL);
    renderSearchedButtons(cityName);
    console.log("Test")
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);


            // response.data.weather[0].icon
            var pulledName = response.cityName;
            var latitude = response.city.coord.lat;
            var longitude = response.city.coord.lon;
            var temperature = response.list[0].main.temp;
            var humidity = response.list[0].main.humidity;
            var windSpeed = response.list[0].wind.speed;

            console.log (temperature);
            console.log (humidity);
            console.log (windSpeed);
            
            // var uvIndex =
        })

})
