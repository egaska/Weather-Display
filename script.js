
var apiKey = "2aa3937301d9ea4d1d3ffd9639357512";

function pullCityInformation(buildQueryURL) {

}

function renderSearchedButtons(cityName) {
    let buttonSearchedCity = $("<button>");
    buttonSearchedCity.addClass("city-button btn btn-light col-12");
    buttonSearchedCity.attr("data-name", cityName);
    buttonSearchedCity.text(cityName);
    $("#previousSearch").append(buttonSearchedCity);
}

$("#searchButton").on("click", function () {

    cityName = $("#searchinput").val().trim();
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;
    var queryURL_UV =
    console.log(queryURL);
    renderSearchedButtons(cityName);
    console.log("Test")
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response.cod);
        })

})
