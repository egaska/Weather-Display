
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

            uvIndex = response.value;
            console.log("UV Index: " + uvIndex);
            


        if (uvIndex >= 11){
            var uvIndexEl = $("<p>").html('UV Index: <p class="alert alert-danger" style = "background-color: purple; color: white" >' + uvIndex + '</p>');
            forecastDiv.append(uvIndexEl);
            $("#forecast").append(forecastDiv);
        }
        else if( uvIndex >= 8 ){
            var uvIndexEl = $("<p>").html('UV Index: <p class="alert alert-danger">' + uvIndex + '</p>');
            forecastDiv.append(uvIndexEl);
            $("#forecast").append(forecastDiv);
        }
        else if( uvIndex >= 6 ){
            var uvIndexEl = $("<p>").html('UV Index: <p class="alert alert-warning">' + uvIndex + '</p>');
            forecastDiv.append(uvIndexEl);
            $("#forecast").append(forecastDiv);
        }
        else if( uvIndex >= 3){
            var uvIndexEl = $("<p>").html('UV Index: <p class="alert alert-primary">' + uvIndex + '</p>');
            forecastDiv.append(uvIndexEl);
            $("#forecast").append(forecastDiv);
        }
        else{
            var uvIndexEl = $("<p>").html('UV Index: <p class="alert alert-light">' + uvIndex + '</p>');
            forecastDiv.append(uvIndexEl);
            $("#forecast").append(forecastDiv);
        }
            forecastDiv.append(uvIndexEl);
            $("#forecast").append(forecastDiv);

        })
        console.log("UV Index: " + uvIndex);
      
     

}

$("#searchButton").on("click", function () {

    cityName = $("#searchinput").val().trim();
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey + "&units=imperial";
    renderSearchedButtons(cityName);

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            console.log(response);
            // response.data.weather[0].icon
            var pulledName = response.city.name;
            var latitude = response.city.coord.lat;
            var longitude = response.city.coord.lon;
            var temperature = response.list[0].main.temp;
            var humidity = response.list[0].main.humidity;
            var windSpeed = response.list[0].wind.speed;
            
            // Creating storing div tag
            var forecastDiv = $("<div>");

            //Creating tags with the city information
            var cityEl = $("<h2>").text(pulledName);
            var tempEl = $("<p>").text("Temperature: " + temperature + "°F");
            var humidEl = $("<p>").text("Humidity: " + humidity + "%");
            var windEl = $("<p>").text("Wind Speed: " + windSpeed + "MPH");
          

            //Appending the forecast div
            forecastDiv.append(cityEl);
            forecastDiv.append(tempEl);
            forecastDiv.append(humidEl);
            forecastDiv.append(windEl);
            var uvIndex = getUV(latitude, longitude);
        
            $("#forecast").append(forecastDiv);


            // var uvIndex =
        })

})
