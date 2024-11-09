var apiobj = { // This object contain information about api and private key.
  api: "https://api.openweathermap.org/data/2.5/weather?q=",
  key: "5a23d8283cd00609e5130d95f233af52"
}

var searchinputbox = document.getElementById("weather_inputbox"); //Here we store value enter by user in input.
var err = document.getElementById("error");
err.textContent = " "; // This hides an error message of paragraph tag.

searchinputbox.addEventListener("keypress", function(e){ //This function was called if user press enter after put the value.
  if(e.keyCode == 13){
    
    var date = new Date(); // Maked date object for dates.
    httpRequest = new XMLHttpRequest(); //Here we make httprequest object
    httpRequest.onreadystatechange = alertContents; 
    httpRequest.open("GET",apiobj.api + searchinputbox.value + '&appid=' + apiobj.key,true);
    httpRequest.send();

    function alertContents(){ //This function takes response from server and executes itself.
        if(httpRequest.readyState === XMLHttpRequest.DONE){ //Cheking wather response is ready.
            if(httpRequest.status === 200){ 
                document.getElementById("weather_body").style.display = "block"; // This set display block when response is correct.
                err.textContent = " "; // This hides an error message of provious call.
                var response = JSON.parse(httpRequest.responseText); // If response is successful then it parses it.
                // Insert response to ui.
                var city = response.name;
                var rescity = document.getElementById("city");
                rescity.textContent = city + ", " + response.sys.country;

                var time = document.getElementById("date");
                time.textContent = dateManage(date); // This function returns updated dates.
 
                var temp = response.main.temp;
                var restemp = document.getElementById("temp");
                restemp.textContent = Math.round(temp)+'\u00B0C';
        
                var tempmax = response.main.temp_max;
                var tempmin = response.main.temp_min;
                var min_max = document.getElementById("min_max");
                min_max.textContent = Math.floor(tempmin) + '\u00B0C (Min) / ' + Math.ceil(tempmax) + '\u00B0C (Max)';
                
                var clouds = response.weather[0].main;
                var weather = document.getElementById("weather");
                weather.textContent = clouds;

                switch(clouds) { // This switch satatement make background image of body daidynamic.
                  case "Clear":
                    document.body.style.backgroundImage = "url(assets/images/clear.webp)";
                    break;
                  case "Clouds":
                    document.body.style.backgroundImage = "url(assets/images/cloudy.webp)";
                    break;
                  case "Rain":
                    document.body.style.backgroundImage = "url(assets/images/rain.jpg)";
                    break;
                  case "Snow":
                    document.body.style.backgroundImage = "url(assets/images/snow.jpg)";
                    break;
                  case "Haze":
                    document.body.style.backgroundImage = "url(assets/images/haze.png)";
                    break;
                  case "Mist":
                    document.body.style.backgroundImage = "url(assets/images/haze.png)";
                    break;
                  case "Thunderstorm":
                    document.body.style.backgroundImage = "url(assets/images/thunderstorm.jpg)";
                    break;
                  case "Drizzle":
                    document.body.style.backgroundImage = "url(assets/images/drizzle.jpg)";
                    break;
                  default:
                    document.body.style.backgroundImage = "url(assets/images/background.jpg)";
                }
            }else{
                err.textContent = "There was a problem with the request. Please enter proper city name.";
            }      
        }
}
  }
})

function dateManage(datearg){ // This function returns current date.
  var days = ["Sunday","Monday","Tuesday","Wednesday","Friday","Saturday"];
  var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  var year = datearg.getFullYear();
  var date = datearg.getDate();
  var month = months[datearg.getMonth()];
  var day = days[datearg.getDay()];

  return date + " " + month + " (" + day + "), " + year;
}

























