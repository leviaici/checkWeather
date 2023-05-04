const container=document.querySelector('.container');
const search=document.querySelector('.search-box button');
const weatherBox=document.querySelector('.weather-box');
const weatherDetails=document.querySelector('.weather-details');
const notFound=document.querySelector('.not-found');

search.addEventListener('click', ()=>{
    const apiKey = '0c8badd560e9c5002106806a8e9cedef';
    const location = document.querySelector('.search-box input').value;

    if(city=='')
        return;
    
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`).then(response => response.json()).then(json => {
        if(json.cod==='404'){
            container.style.height='400px';
            weatherBox.style.display='none';
            weatherDetails.style.display='none';
            notFound.style.display='block';
            notFound.classList.add('fadeIn');
            return;
        }

        notFound.style.display='none';
        notFound.classList.remove('fadeIn');

        const image=document.querySelector('.weather-box img');
        const temperature=document.querySelector('.weather-box .temperature');
        const description=document.querySelector('.weather-box .description');
        const humidity=document.querySelector('.weather-details .humidity span');
        const wind=document.querySelector('.weather-details .wind span');

        switch(json.weather[0].main) {
            case 'Clear':
                image.src='./images/sunny.jpg';
                break;

            case 'Rain':
                image.src='./images/rainy.jpg';
                break;

            case 'Snow':
                image.src='./images/snowy.jpg';
                break;

            case 'Clouds':
                image.src='./images/cloudy.jpg';
                break;

            case 'Haze':
                image.src='./images/thunderstorm.jpg';
                break;

            default:
                image.src='';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';
    });
});