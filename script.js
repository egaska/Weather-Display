
function buildQueryURL() {
    cityName = $("#searchinput").val().trim();
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=2aa3937301d9ea4d1d3ffd9639357512";
    console.log(queryURL);
    renderButtons(cityName);
    return queryURL;
}

function pullCityInformation(buildQueryURL){

}

function renderButtons(cityName) {
    let buttonSearchedCity = $("<button>");
    buttonSearchedCity.addClass("city-button btn btn-light col-12");
    buttonSearchedCity.attr("data-name", cityName);
    buttonSearchedCity.text(cityName);
    $("#previousSearch").append(buttonSearchedCity);
}


 
$("#searchButton").on("click", buildQueryURL);
