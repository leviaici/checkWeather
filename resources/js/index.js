const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const notFound = document.querySelector('.not-found');

search.addEventListener('click', ()=>{
    const apiKey = '0c8badd560e9c5002106806a8e9cedef';
    const location = document.querySelector('.search-box input').value;

    if(location=='')
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
        const message=document.querySelector('.message span');
        let willBeSent;

        switch(json.weather[0].main) {
            case 'Clear':
                image.src='/resources/images/sunny.jpg';
                willBeSent='Lovely weather! Come get some Vitamin D!';
                break;

            case 'Rain':
                image.src='/resources/images/rainy.jpg';
                willBeSent='Pouring outside! Get inside!';
                break;

            case 'Snow':
                image.src='/resources/images/snowy.jpg';
                willBeSent='Do you wanna build a snowman?';
                break;

            case 'Clouds':
                image.src='/resources/images/cloudy.jpg';
                willBeSent='Moody weather...';
                break;

            case 'Haze':
                image.src='/resources/images/thunderstorm.jpg';
                willBeSent='Bleah.';
                break;

            case 'Drizzle':
                image.src='/resources/images/rainy.jpg';
                willBeSent='Drizzle? At least if it would have been raining...';
                break;    

            default:
                willBeSent='Whatever.';
                image.src='';
        }

        temperature.innerHTML=`${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML=`${json.weather[0].description}`;
        humidity.innerHTML=`${json.main.humidity}%`;
        wind.innerHTML=`${parseInt(json.wind.speed)}Km/h`;
        message.innerHTML=`${willBeSent}`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '680px';
    });
});