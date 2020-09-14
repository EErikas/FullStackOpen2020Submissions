import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryFinder = ({ countries, setFilteredCountries }) => {
  const searchCountries = (event) => {
    setFilteredCountries(countries.filter(country =>
      country.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }
  return (
    <>
      find countries:
      <input onChange={searchCountries} />
    </>
  );
}
const CountryViewer = ({ filteredCountries, setFilteredCountries }) => {
  if (filteredCountries.length === 1)
    return <CountryInfo country={filteredCountries[0]} />
  else if (filteredCountries.length <= 10)
    return (
      <>
        {filteredCountries.map(filteredCountry =>
          <p key={filteredCountry.name}>{filteredCountry.name}
            <button onClick={() => setFilteredCountries([filteredCountry])}>show</button>
          </p>)}
      </>
    )
  return (<p>Too many matches, specify another filter</p>)
}
const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>Spoken languages</h3>
      <ul>
        {country.languages.map(language =>
          <li key={language.name}>{language.name}</li>)}
      </ul>
      <img style={{ height: 200 }}
        src={country.flag}
        alt={'Flag of ' + country.name} />
      <Weather city={country.capital} />
    </div>
  )
}
const Weather = ({ city }) => {
  const [weather, setWeather] = useState({
    main: {
      temp: 273.15
    },
    wind: {
      speed: 0
    }
  })
  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => setWeather(response.data))
  }, [])

  return (
    <div>
      <h3>Weather in {city}</h3>
      <p><b>temperature: </b>{Math.round(weather.main.temp - 273.15)} Celsius</p>
      <p><b>wind: </b>{weather.wind.speed} m/s</p>
    </div>
  )
}
const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])
  return (
    <div>
      <CountryFinder countries={countries} setFilteredCountries={setFilteredCountries} />
      <CountryViewer filteredCountries={filteredCountries} setFilteredCountries={setFilteredCountries} />
    </div>
  )
}

export default App;
