import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
    const apikey = import.meta.env.VITE_WEATHER_API_KEY
    const url = `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${country.capital}`
    const [weather, setWeather] = useState(null)

    useEffect(()=>{
        axios
            .get(url)
            .then(res=>{
                const trimmed = {
                    conditionIcon: res.data.current.condition.icon,
                    windSpeed: res.data.current.wind_kph,
                    temperature: res.data.current.heatindex_c
                }
                setWeather(trimmed)
            })
            .catch(e=>console.log(e.message))
    },[country])
    
  return (
    <>
        <h1> {country.name} </h1>
        <p> Capital {country.capital} </p>
        <p> Area {country.area} </p>
        <h2>Languages</h2>
        <ul>
            {Object.values(country.languages).map((lang, i) => (
                <li key={i}>{lang}</li>
            ))}
        </ ul>
        <img src={country.flag} alt="Country flag"></img>
        {weather && (
            <>
                <h2>Weather in {country.capital}</h2>
                <p>Temperature: {weather.temperature} °C</p>
                <img src={weather.conditionIcon} alt="Weather condition" />
                <p>Wind: {weather.windSpeed} km/h</p>
            </>
        )}
    </>
  )
}

export default Country