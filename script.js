const url = 'https://api.openweathermap.org/data/2.5/';
const key = 'bf5ef9cef6824ab3682a9c4f3b413984';

const setQuery = (e) => {
    if(e.keyCode == '13')
      getResult(search.value)

}

const getResult = (cityName) => {
    let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`
    fetch(query)
    .then(weather => {
        return weather.json()
    })
    .then(displayResult)
}

const displayResult = (result) => {
    let city = document.querySelector('.city')
    city.innerText = `${result.name}, ${result.sys.country}`

    let temp = document.querySelector('.temp')
    temp.innerText = `${Math.round(result.main.temp)}°C`

    let desc = document.querySelector('.desc')
    desc.innerText = result.weather[0].description

    let maxmin = document.querySelector('.maxmin')
    maxmin.innerText = `${Math.round(result.main.temp_min)}°C / ${Math.round(result.main.temp_max)}°C`
   
    let humi = document.querySelector('.humi')
    humi.innerText = `Nem: %${result.main.humidity}`


    let backgroundElement = document.querySelector('.app');
    setBackgroundAndTextColorByTemperature(backgroundElement, result.main.temp);
}

const setBackgroundAndTextColorByTemperature = (element, temperature) => {
    let imageUrl = "";
    let textColor = "";

    if (temperature <= 0) {
        imageUrl = "images/snow.jpg";
        textColor = "brown";
    } else if (temperature > 0 && temperature <= 10) {
        imageUrl = "images/rain.jpg";
        textColor = "white";
    } else if (temperature > 10 && temperature <= 15) {
        imageUrl = "images/cloud.jpg";
        textColor = "black";
    } else if (temperature > 15 && temperature <= 25) {
        imageUrl = "images/cloudsun.jpg";
        textColor = "blue";
    } else {
        imageUrl = "images/sun.jpg";
        textColor = "green";
    }

    element.style.backgroundImage = `url('${imageUrl}')`;

    // Tüm yazı elementlerinin rengini değiştir
    let textElements = document.querySelectorAll('.city, .temp, .desc, .maxmin, .humi');
    textElements.forEach(element => {
        element.style.color = textColor;
    });
};

const search = document.getElementById('search')
search.addEventListener('keypress',setQuery)