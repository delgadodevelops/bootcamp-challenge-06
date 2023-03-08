var today = dayjs();
var cityName;
var cityId;
var clicked = false;
var searchHistory = [];
var currentCity = document.querySelector("#current-city");

function getApi() {
    var requestFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=03e2b0141cd0f7d9d15a27103279bb3e&units=metric";
    var requestToday = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid=03e2b0141cd0f7d9d15a27103279bb3e&units=metric";
}