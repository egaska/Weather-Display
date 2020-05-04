
function buildQueryURL() {

    var cityName = "Gardner";
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=2aa3937301d9ea4d1d3ffd9639357512";
    // cityName = $("#search-term").val().trim();
   

    
    console.log(queryURL);

}
buildQueryURL();