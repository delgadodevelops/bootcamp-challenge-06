var today = dayjs();
var cityName;
var cityId;
var clicked = false;
var searchHistory = [];
var searchList = document.querySelector("#previous-search-list");
var currentCity = document.querySelector("#current-city");


$("#searchBtn").click(function(event){
    event.preventDefault();
    var cityName = $(this).siblings(".form-control").val();
    document.querySelector("#old-search").value = "";
    getApi();
   
        $("#previous-search-list").click(function(event){
          previousCity = event.target.textContent;
          console.log(previousCity);
          clicked = true;
          cityName = previousCity;
          getApi();
        });
  
  
    // Get API Function
      function getApi() {
        var requestFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=7da2a05016a781d4b33e98e2ad107397&units=metric";
        var requestToday = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid=7da2a05016a781d4b33e98e2ad107397&units=metric";
    
    // Fetch For 5 day forecast, push to local storage
      fetch(requestFiveDay)
          .then (function (response) {
              return response.json();
            })
          .then (function(data) {
  
          
            var cityId = JSON.stringify(data.city.id);
            var citySearch = {
                idOfCity: cityId,
                nameOfCity: cityName
                }
  
            searchHistory.push(citySearch);
            localStorage.setItem("search",JSON.stringify(searchHistory));
  
  
            if (!clicked == true){
                renderSearchHistory();
            }
  
            currentCity.textContent = citySearch.nameOfCity;
  
            for (i = 1; i < 6; i++){
              var dayOfWeek = dayjs().add(i, 'day').format('MM/DD/YYYY');
              var weekdays = document.querySelector(".card-day-"+(i-1));
              var icon = document.querySelector(".card-placeholder-"+(i-1));
              var weekdaysTemp = document.querySelector(".card-tempature-"+(i-1));
              var weekdaysWind = document.querySelector(".card-wind-"+(i-1));
              var weekdaysHum = document.querySelector(".card-humidity-"+(i-1));
              weekdays.textContent = dayOfWeek;
              weekdaysTemp.textContent = "Temperature: " + (((data.list[(i-1)*8].main.temp)*9/5)+32).toFixed(2) + " °F";
              weekdaysWind.textContent = "Wind Speed: " + data.list[(i-1)*8].wind.speed + " MPH";
              weekdaysHum.textContent = "Humidity: " + data.list[(i-1)*8].main.humidity + "%";
  
            if (data.list[(i-1)*8].weather[0].main === "Clear"){            
              icon.src = "https://openweathermap.org/img/wn/01d@2x.png"
              
            }
            if (data.list[(i-1)*8].weather[0].main === "Clouds"){            
              icon.src = "https://openweathermap.org/img/wn/02d@2x.png"
              
            }
            if (data.list[(i-1)*8].weather[0].main === "Rain"){            
              icon.src = "https://openweathermap.org/img/wn/10d@2x.png"
              
            }
            if (data.list[(i-1)*8].weather[0].main === "Thunderstorm"){            
              icon.src = "https://openweathermap.org/img/wn/11d@2x.png"
              
            }
            if (data.list[(i-1)*8].weather[0].main === "Snow"){            
              icon.src = "https://openweathermap.org/img/wn/13d@2x.png"
              
            }
            if (data.list[(i-1)*8].weather[0].main === "Mist"){            
              icon.src = "https://openweathermap.org/img/wn/50d@2x.png"
              
            }
          }
        }
      );
  
        // Fetch For todays forecast, push to local storage, added icons for each weather variable
      fetch(requestToday)
          .then(function (response) {
            return response.json();
            })
          .then(function (todayData) {
              var todayWeather = document.querySelector("#current-weather");
              var icon = document.querySelector(".today-placeholder");
              var todayTemp = document.querySelector(".today-tempature");
              var todayWind = document.querySelector(".today-wind");
              var todayHum = document.querySelector(".today-humidity");
  
              todayWeather.textContent = today.format('MMM D, YYYY');
              todayTemp.textContent = "Temperature: " + (((todayData.main.temp)*9/5)+32).toFixed(2) + " °F";
              todayWind.textContent = "Wind Speed: " + todayData.wind.speed + " MPH";
              todayHum.textContent = "Humidity: " + todayData.main.humidity + " %";
  
            if (todayData.weather[0].main === "Clear"){            
              icon.src = "https://openweathermap.org/img/wn/01d@2x.png"
              
            }
            if (todayData.weather[0].main === "Clouds"){            
              icon.src = "https://openweathermap.org/img/wn/02d@2x.png"
              
            }
            if (todayData.weather[0].main === "Rain"){            
              icon.src = "https://openweathermap.org/img/wn/10d@2x.png"
              
            }
            if (todayData.weather[0].main === "Thunderstorm"){            
              icon.src = "https://openweathermap.org/img/wn/11d@2x.png"
              
            }
            if (todayData.weather[0].main === "Snow"){            
              icon.src = "https://openweathermap.org/img/wn/13d@2x.png"
              
            }
            if (todayData.weather[0].main === "Mist"){            
              icon.src = "https://openweathermap.org/img/wn/50d@2x.png"
              
            }
          }
        );
      } 
    }
  )
  
//   Function to display previously searched cities
  function renderSearchHistory(){
    
      var previousCity = searchHistory[searchHistory.length - 1].nameOfCity;     
      var list = document.createElement("span");
      var link = document.createElement("a");
  
      list.append(link);
      link.href = "#old-search";
      link.textContent = previousCity + "  ";
  
      searchList.append(list, link);
       
  }