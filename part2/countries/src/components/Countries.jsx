const CountryLine = ({ country, setSearchCountry }) => {
    return (
        <li>
            {country}
            <button onClick={() => setSearchCountry(country)}> Show </button>
        </li>
    )
}

const Countries = ({ filteredCountries, setSearchCountry, show }) => {
    if (!show) {
        return null
    }

    if (filteredCountries.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    } else {
        return (
            <ul>
                {filteredCountries.map(country =>
                    <CountryLine key={country.name} country={country.name} setSearchCountry={setSearchCountry} />
                )}
            </ul>)
    }
}

export default Countries