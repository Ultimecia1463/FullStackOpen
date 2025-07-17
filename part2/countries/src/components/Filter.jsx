import { useState} from 'react'

const Filter = ({countries,setFilteredCountries}) => {
    const [name, setName] = useState('')
    return (
        <form>
            find countries: <input value={name} onChange={(e)=>{
                setName(e.target.value)
                setFilteredCountries(countries.filter((country)=>{
                    return country.name.toLowerCase().includes(name.toLowerCase());
                }).sort((a, b) => a.name.length - b.name.length))
        }} />
        </form>
    )
}

export default Filter