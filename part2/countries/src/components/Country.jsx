import React from 'react'

const Country = ({country}) => {
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
    </>
  )
}

export default Country