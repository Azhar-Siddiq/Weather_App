const apiKey = 'cf784e13b7ade5886a25237974418e86';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector('.searchCity input');
const searchBtn = document.querySelector('.searchCity button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        // document.querySelector('.errorMsg').style.display = 'block';
        Swal.fire({
            title: "Oops!",
            text: "The city you entered doesn't exist in the world!",
            icon: "warning"
          });
        document.querySelector('.weatherContainer').style.display = 'none';
    }else{
        let data = await response.json();

        document.querySelector('.cityName').innerHTML = data.name;
        document.querySelector('.temprature').innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";
    
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "./assets/clouds.png";
        } else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "./assets/clear.png";
        } else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "./assets/rain.png";
        } else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "./assets/drizzle.png";
        } else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "./assets/mist.png";
        }
    
        document.querySelector('.weatherContainer').style.display = 'block';
        // document.querySelector('.errorMsg').style.display = 'none';

    }

   
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);

})