const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    const { cityDets, weather } = data;
    console.log(weather);

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `
    //update night and day and icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);



    let timeSRC = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    time.setAttribute('src', timeSRC)

    // Display card
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

}

const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return { cityDets, weather }
}

cityForm.addEventListener('submit', e => {
    e.preventDefault();
    // get value
    const city = cityForm.city.value.trim();
    cityForm.reset();
    //update ui
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
})