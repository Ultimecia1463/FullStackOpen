import { useState, useEffect } from 'react'
import axios from 'axios'
import Content from "./components/Content";
import Filter from './components/Filter';

const App = () => {
  const [countries,setCountries] = useState(null)
  const [filteredCountries,setFilteredCountries] = useState([])

  useEffect(()=>{
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/alle")
      .then(res =>{
        const trimmed = res.data.map(({ name, capital, area, flags, languages }) => ({
          name: name.common,
          capital: capital?.[0],
          area,
          flag: flags.png,
          languages
        }))
        setCountries(trimmed)
      })
      .catch(e=>console.log(e.message))
  },[])

  if(countries===null){
    return(
      <h1>Loading...</h1>
    )
  } else {
    return (
      <>
        <Filter countries={countries} setFilteredCountries={setFilteredCountries} />
        <Content countries={filteredCountries} />
      </>
    )
  }
}

export default App