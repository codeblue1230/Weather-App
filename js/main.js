// getInfo function takes in a city and state input by the user and uses those values as parameters to call the getCoordinates function
let formSelector = document.getElementById("form-id");
formSelector.addEventListener("submit", getInfo)

function getInfo(e) {
    e.preventDefault()
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;
    console.log(document.querySelector("#city"))
    getCoordinates(city, state)
}

const getCoordinates = async (cityname, statecode) => { 
    let response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityname},${statecode},us&appid=69d48671410a771c5e033a39b7878fd6`)
    let latitude =  response.data[0]["lat"]
    let longitude =  response.data[0]["lon"]
    
    let weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=69d48671410a771c5e033a39b7878fd6`)
    let desc =  weatherResponse.data["weather"][0]["description"]
    let temp = Math.round((( weatherResponse.data["main"]["temp"]) - 273.15) * 9/5 + 32)
    let feel = Math.round((( weatherResponse.data["main"]["feels_like"]) - 273.15) * 9/5 + 32)
    let low = Math.round((( weatherResponse.data["main"]["temp_min"]) - 273.15) * 9/5 + 32)
    let high = Math.round((( weatherResponse.data["main"]["temp_max"]) - 273.15) * 9/5 + 32)
    let humidity =  weatherResponse.data["main"]["humidity"]
    
    insertWeather(desc, temp, feel, low, high, humidity, cityname, statecode) // function down below to insert DOM elements on to our page
}

// function to hold our DOM elements

const DOMElements = {
    weatherList: ".weather-list"
}

const getThermo = async (temperature) => {
    document.getElementById("thermo-image").style.display = "block"
}

// function to hold our html variable that we interject into our html file

const insertWeather = (desc, temp, feel, low, high, humidity, displaycity, displaystate) => {
    console.log(`test: ${temp}`)
    if (temp <= 32) {
        picture = "/images/freezing.png"
    } else if (temp > 32 && temp <= 55) {
        picture = "/images/cool.png"
    } else if (temp > 55 && temp <= 69) {
        picture = "/images/inbetween.jpg"
    } else if (temp > 69 && temp <= 85) {
        picture = "/images/warm.png"
    } else {
        picture = "/images/fire.jpg"
    }
    const html = `<div id="loadingWeather">
                        <ul>
                            <li><h4>Today's Weather in ${displaycity}, ${displaystate}:</h4></li>
                            <li>Today's Forecast: ${desc}</li>
                            <li>Current Temperature: ${temp}°F</li>
                            <img src=${picture} alt="thermometer image" id="thermo-image">
                            <li>Feels Like: ${feel}°F</li>
                            <li>Today's Low: ${low}°F</li>
                            <li>Today's High: ${high}°F</li>
                            <li>Current Humidity: ${humidity}%</li>
                            <li><a href="#top" id="jump-text">Jump to Top</a></li>
                        </ul>
                </div>`

    document.querySelector(DOMElements.weatherList).insertAdjacentHTML('beforeend', html)
}
