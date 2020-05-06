//Global Variables
var apiKey = "2aa3937301d9ea4d1d3ffd9639357512";

var searchedCities = [];
loadSearched();
console.log(searchedCities);

function loadSearched() {
    var searchedStorage = localStorage.getItem("cities");
    if (searchedStorage !== null) {
        searchedCities = JSON.parse(searchedStorage);
    }
    for (var i = 0; i < searchedCities.length; i++) {
        renderSearchedButtons(searchedCities[i]);
    }
}

//Renders the buttons that show previously seached cities. 
function renderSearchedButtons(cityName) {
    var buttonSearchedCity = $("<button>");
    buttonSearchedCity.addClass("city-button btn btn-light col-12");
    buttonSearchedCity.attr("data-name", cityName);
    buttonSearchedCity.attr("id", "cityButton");
    buttonSearchedCity.text(cityName);
    $("#previousSearch").prepend(buttonSearchedCity);
}

//Function to get the UV Index
function getUV(lat, lon) {
    var latitude = lat;
    var longitude = lon;
    var uvIndex = "";

    // Creating storing div tag
    var forecastDiv = $("<div>");
    var queryURL_UV = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + latitude + "&lon=" + longitude;
    $.ajax({
        url: queryURL_UV,
        method: "GET"
    })
        .then(function (response) {

            //Assigning variables
            uvIndex = response.value;
            // console.log("UV Index: " + uvIndex);
            //If statment sets the correct color of the p tage based on the UV index rating
            // then appends the div to the HTML
            if (uvIndex >= 11) {
                var uvIndexEl = $("<p>").html('UV Index: <p class="alert" style = "background-color: purple; color: white" >' + uvIndex + '</p>');
                forecastDiv.append(uvIndexEl);
                $("#forecast").append(forecastDiv);
            }
            else if (uvIndex >= 8) {
                var uvIndexEl = $("<p>").html('UV Index: <p class="alert alert-danger">' + uvIndex + '</p>');
                forecastDiv.append(uvIndexEl);
                $("#forecast").append(forecastDiv);
            }
            else if (uvIndex >= 6) {
                var uvIndexEl = $("<p>").html('UV Index: <p class="alert alert-warning">' + uvIndex + '</p>');
                forecastDiv.append(uvIndexEl);
                $("#forecast").append(forecastDiv);
            }
            else if (uvIndex >= 3) {
                var uvIndexEl = $("<p>").html('UV Index: <p class="alert alert-primary">' + uvIndex + '</p>');
                forecastDiv.append(uvIndexEl);
                $("#forecast").append(forecastDiv);
            }
            else {
                var uvIndexEl = $("<p>").html('UV Index: <p class="alert alert-light">' + uvIndex + '</p>');
                forecastDiv.append(uvIndexEl);
                $("#forecast").append(forecastDiv);
            }

        })


}

//Creates the Five Day Forecast cards
function getFiveDay(cityName) {
    $("#fiveDayForecast").empty();
    var day = 1;

    queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey + "&units=imperial";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            var headerEl = $("<h4>").text("Five Day Forecast");
            $("#fiveDayForecast").append(headerEl);
            for (let i = 0; i < response.list.length; i++) {
                var temperature = response.list[i].main.temp;
                // console.log("Temp: " + i + temperature);
                var humidity = response.list[i].main.humidity;
                var weatherIcon = response.list[i].weather[0].icon;
                var dateAndTime = response.list[i].dt_txt;
                var date = dateAndTime.split(" ")[0];
                var time = dateAndTime.split(" ")[1];
                // console.log("Date: " + i + date);
                if (time === "18:00:00") {
                    var year = date.split("-")[0];
                    var month = date.split("-")[1];
                    var day = date.split("-")[2];
                    var dateEl = $("<h5>").text(month + "/" + day + "/" + year).attr("class", "card-title");
                    var iconEl = $("<img>").attr("src", "https://api.openweathermap.org/img/w/" + weatherIcon + ".png")
                    var tempEl = $("<p>").text("Temp: " + temperature + "°F").attr("class", "card-text");
                    var humidEl = $("<p>").text("Humidity: " + humidity + "%").attr("class", "card-text");
                    var forecastFiveDiv = $("<div>").attr("class", "card text-white bg-info p-2");
                    forecastFiveDiv.append(dateEl);
                    forecastFiveDiv.append(iconEl);
                    forecastFiveDiv.append(tempEl);
                    forecastFiveDiv.append(humidEl);
                    forecastFiveDiv.attr("id", "forecastCard")
                }
                $("#fiveDayForecast").append(forecastFiveDiv);

            }

        })
}
function displaySearchHistory() {

    $("#previousSearch").empty();
    searchHistory.forEach(function (city) {

        console.log(searchHistory);
        var searchHistoryEL = renderSearchedButtons(searchHistory);
        loadSearched();

        $("#previousSearch").append(searchHistoryEL);
    });

}
function search(cityName) {
    $("#forecast").empty();


    cityName = $("#searchinput").val().trim();
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey + "&units=imperial";
    searchedCities.push(cityName);
    localStorage.setItem("cities", JSON.stringify(searchedCities));
    renderSearchedButtons(cityName);

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            console.log(localStorage);

            var pulledName = response.city.name;
            var latitude = response.city.coord.lat;
            var longitude = response.city.coord.lon;
            var temperature = response.list[0].main.temp;
            var humidity = response.list[0].main.humidity;
            var windSpeed = response.list[0].wind.speed;
            var weatherIcon = response.list[0].weather[0].icon;
            console.log(weatherIcon);

            // Creating storing div tag
            var forecastDiv = $("<div>");

            //Creating tags with the city information
            var cityEl = $("<h2>").text(pulledName);
            var tempEl = $("<p>").text("Temperature: " + temperature + "°F");
            var humidEl = $("<p>").text("Humidity: " + humidity + "%");
            var windEl = $("<p>").text("Wind Speed: " + windSpeed + "MPH");
            var iconEl = $("<img>").attr("src", "https://api.openweathermap.org/img/w/" + weatherIcon + ".png")


            //Appending the forecast div
            forecastDiv.append(cityEl);
            forecastDiv.append(iconEl);
            forecastDiv.append(tempEl);
            forecastDiv.append(humidEl);
            forecastDiv.append(windEl);
            getUV(latitude, longitude);

            $("#forecast").append(forecastDiv);

            getFiveDay(cityName);
        })

}
$(".city-button").click(function () {
    $("#forecast").empty();
    cityName = $(this).text();
    console.log("Ran");
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey + "&units=imperial";
    searchedCities.push(cityName);
    localStorage.setItem("cities", JSON.stringify(searchedCities));
    renderSearchedButtons(cityName);

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            console.log(localStorage);

            var pulledName = response.city.name;
            var latitude = response.city.coord.lat;
            var longitude = response.city.coord.lon;
            var temperature = response.list[0].main.temp;
            var humidity = response.list[0].main.humidity;
            var windSpeed = response.list[0].wind.speed;
            var weatherIcon = response.list[0].weather[0].icon;
            console.log(weatherIcon);

            // Creating storing div tag
            var forecastDiv = $("<div>");

            //Creating tags with the city information
            var cityEl = $("<h2>").text(pulledName);
            var tempEl = $("<p>").text("Temperature: " + temperature + "°F");
            var humidEl = $("<p>").text("Humidity: " + humidity + "%");
            var windEl = $("<p>").text("Wind Speed: " + windSpeed + "MPH");
            var iconEl = $("<img>").attr("src", "https://api.openweathermap.org/img/w/" + weatherIcon + ".png")


            //Appending the forecast div
            forecastDiv.append(cityEl);
            forecastDiv.append(iconEl);
            forecastDiv.append(tempEl);
            forecastDiv.append(humidEl);
            forecastDiv.append(windEl);
            getUV(latitude, longitude);

            $("#forecast").append(forecastDiv);

            getFiveDay(cityName);
        })
})

$("#searchButton").on("click", search);
