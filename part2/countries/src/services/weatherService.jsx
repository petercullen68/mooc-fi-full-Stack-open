import axios from 'axios'
const baseUrl = 'https://api.open-meteo.com/v1/forecast'

const getWeatherByLatLong = (latitude, longitude) => {
    const searchUrl = `${baseUrl}?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    const request = axios.get(searchUrl)
    return request.then(response => response.data)
}

export default { getWeatherByLatLong }