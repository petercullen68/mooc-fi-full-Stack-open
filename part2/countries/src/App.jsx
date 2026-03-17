import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Country from './components/Country'
import Countries from './components/Countries'
import countriesService from './services/countries'

const App = () => {
  const [searchCountry, setSearchCountry] = useState('')
  const [displayCountries, setDisplayCountries] = useState([])

  const normalizeCountry = (country) => ({
    name: country.name.common,
    capital: country.capital?.[0],
    area: country.area,
    languages: Object.values(country.languages || {}),
    flag: country.flags.png,
    lat: country.latlng[0],
    lng: country.latlng[1]
  })

  useEffect(() => {
    countriesService
      .getall()
      .then(countries => {
        const newCountryNames = countries.map(country => normalizeCountry(country))
        setDisplayCountries(newCountryNames)
      })
  }, [])

  const filteredCountries = () => {
    let returnCountries = []
    const normalizedSearch = searchCountry.trim().toLocaleUpperCase()
    if (searchCountry.length > 0) {
      returnCountries = displayCountries.filter(country => country.name.trim().toLocaleUpperCase().indexOf(normalizedSearch) !== -1)
    }
    return returnCountries
  }

  const filtered = filteredCountries()

  const selectedCountry =
    filtered.length === 1 ? filtered[0] : null


  const handleFilterChange = (event) => {
    setSearchCountry(event.target.value)
  }

  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} filterStart={searchCountry} />
      <Countries filteredCountries={filteredCountries()} setSearchCountry={setSearchCountry} show={selectedCountry === null} />
      <Country selectedCountry={selectedCountry} />
    </div>
  )
}

export default App
