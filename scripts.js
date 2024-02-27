const APIkey = "74294344441e172ea5c559c3563c3c68";
var lat = "";
var lon = "";

var temprature = "";
var pressure = "";
var humidity = "";
var wname = "";
var weatherIcon = "";
var windspeed = "";

var addCallCount = 0;


function getLatLon() {
    var place = getLocation();
    if (place != "") {
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=5&appid=${APIkey}`)
            .then(nresponse => {
                if (!nresponse.ok) {
                    throw new Error(nresponse.statusText);
                }
                return nresponse.json();
            })
            .then(ndata => {
                if (ndata.length < 1) {
                    document.getElementsByTagName("input")[0].classList.add("warn");
                    document.getElementsByTagName("input")[0].placeholder = "Error! Place not Found....."
                    document.getElementById("locations").value = "";
                    return 0;
                }
                if (ndata != null) {
                    console.log(ndata);
                    lat = ndata[0].lat;
                    lon = ndata[0].lon;
                    getWeather();
                }
            })
            .catch(error => {
                console.error("There was a problem with your fetch operation:", error);
            });
    }
}
function getLocation() {
    var locations = document.getElementById("locations").value;
    console.log(locations);
    if (locations != "") {
        var search = document.getElementsByClassName("search")[0];
        search.style.marginTop = "1%";
        document.getElementsByTagName("input")[0].classList.remove("warn");
    }
    else {
        document.getElementsByTagName("input")[0].classList.add("warn");
        document.getElementsByTagName("input")[0].placeholder = "Enter a location"
    }
    return locations;

}
function getWeather() {
    console.log("Weather Deatails");
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            temprature = Math.round(data.main.temp);
            pressure = data.main.pressure;
            humidity = data.main.humidity;
            wname = data.weather[0].description;
            weatherIcon = data.weather[0].icon;
            windspeed = data.wind.speed;
            console.log(temprature);
            console.log(pressure);
            console.log(humidity);
            console.log(wname);
            console.log(weatherIcon);
            console.log(windspeed);
            addElements();
        })
        .catch(error => {
            console.error("There was a problem with your fetch operation:", error);
        });
}


function addElements() {
    console.log("add elements called");
    addCallCount += 1;
    if (addCallCount > 1) {
        removeWeatherInfo();
        addCallCount = 1;
    }
    const container = document.querySelector(".container");
    const newContent = `
        <div class="results">
            <div class="resultcon">
                <div class="wicon">
                    <img id="weatherID" alt="icon" height="100">
                    <p id="weatherDesc"></p>
                </div>
                <div id="clumpmain">
                    <div class="clump" id="clump1">
                        <div id="temprature">
                            <div class="smol">
                                <p>Temperature<p>
                                <p id="temp"></p>
                            </div>
                        </div>
                        <div id="humidity">
                            <div class="smol">
                                <p>Humidity<p>
                                <p id="humidityp"></p>
                            </div>
                        </div>
                    </div>
                    <div class="clump" id="clump2">
                        <div id="pressure">
                            <div class="smol">
                                <p>Pressure<p>
                                <p id="pressurep"></p>
                            </div>
                        </div>
                        <div id="wind">
                            <div class="smol">
                                <p>Wind<p>
                                <p id="windspeed"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', newContent);

    document.getElementById("weatherID").src = makeIconURL();
    document.getElementById("weatherDesc").innerHTML = wname;
    document.getElementById("temp").innerHTML = temprature + "°C";
    document.getElementById("pressurep").innerHTML = pressure;
    document.getElementById("humidityp").innerHTML = humidity + " %";
    document.getElementById("windspeed").innerHTML = Math.round(windspeed * 3.6) + " KMPH";
}

function removeWeatherInfo() {
    console.log("remove weather info called");
    const resultsElement = document.querySelector(".results");
    if (resultsElement) {
        resultsElement.remove();
    }
}
function makeIconURL() {
    console.log("imag called");
    return `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
}




//
//img url = https://openweathermap.org/img/wn/${wicon}.png
//
//
//