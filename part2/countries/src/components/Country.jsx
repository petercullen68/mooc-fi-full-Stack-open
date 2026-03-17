import { useEffect, useState } from 'react'
import weatherService from '../services/weatherService'

const Language = ({ language }) => {
    return (
        <li>{language}</li>
    )
}

const Languages = ({ languages }) => {
    return (
        <ul>
            {languages.map(language =>
                <Language key={language} language={language} />
            )}
        </ul>)
}


const Country = ({ selectedCountry }) => {
    const [displayWeather, setDisplayWeather] = useState(null)

    const normalizedWeather = (weather) => ({
        temperature: weather.current_weather.temperature,
        temperatureUnit: weather.current_weather_units.temperature,
        wind: weather.current_weather.windspeed,
        windUnit: weather.current_weather_units.windspeed,
        code: weather.current_weather.weathercode
    })

    const getWeatherIcon = (code) => {
        if (code === 0) return "01d"        // clear
        if (code <= 3) return "03d"         // cloudy
        if (code < 70) return "10d"         // rain/drizzle
        if (code < 80) return "13d"         // snow
        if (code >= 80) return "09d"        // showers / storm
    }

    useEffect(() => {
        if (selectedCountry !== null) {
            weatherService
                .getWeatherByLatLong(selectedCountry.lat, selectedCountry.lng)
                .then(response => {
                    setDisplayWeather(normalizedWeather(response))
                })
        }
    }, [selectedCountry])

    if (!selectedCountry) {
        return null
    }

    return (
        <div>
            <h1>{selectedCountry.name}</h1>
            <p>Capital: {selectedCountry.capital}</p>
            <p>Area: {selectedCountry.area}</p>
            <h2>Languages:</h2>
            <Languages languages={selectedCountry.languages} />
            <img src={selectedCountry.flag} alt={selectedCountry.name} width="250" />
            <h2>Weather in {selectedCountry.capital}</h2>
            {displayWeather && (
                <>
                    <p>Temperature: {displayWeather.temperature} {displayWeather.temperatureUnit}</p>
                    <img src={`https://openweathermap.org/img/wn/${getWeatherIcon(displayWeather.code)}@2x.png`} alt="weather icon" width="100" />
                    <p>Wind: {displayWeather.wind} {displayWeather.windUnit}</p>
                </>
            )}
        </div>
    )
}
export default Country