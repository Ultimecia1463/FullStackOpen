import  { useState,useEffect } from 'react'
import Country from './Country'

const Content = ({countries}) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (countries.length === 1) {
      setSelectedCountry(countries[0])
    } else {
      setSelectedCountry(null)
    }
  }, [countries])

  if (selectedCountry) {
    return <Country country={selectedCountry} />;
  }

  if (countries.length > 10) {
    return (
      <p>
        Too many matches, specify another filter
      </p>
    )
  } else if ((countries.length > 2 && countries.length < 10) || countries.length === 0){
    return (
      <ul>
        {countries.map((country, i) =>
          <li key={i}>
            {country.name} <button onClick={()=>setSelectedCountry(country)} >show</button>
          </li>
        )}
      </ul>
    )
  } else {
    setSelectedCountry(countries[0])
    return null
  }
}

export default Content