import './App.css';
import { useEffect, useState } from 'react'
import DisplayCards from './DisplayCards';

function App() {
  let [data, setData] = useState({villagers: []})
  let [search, setSearch] = useState('')
  let [faves, setFaves] = useState([])

  useEffect(()=>{
    fetch('http://acnhapi.com/v1/villagers/')
    .then(response=>response.json())
    .then(rdata=>{
      rdata = Object.values(rdata) // change from object of objects to an array of objects
      setData({villagers: rdata}) // state.data.villagers = rdata
      console.log('Villager Data:', rdata)
    })
  }, [])

  const handleChange = (e) => {
    setSearch(e.target.value)
  } 

  const getFilteredVillagers = () => {
    let searchTerm = search.toLowerCase()
    return data.villagers.filter(v => {
      let lowerCaseName = v.name['name-USen'].toLowerCase()
      return lowerCaseName.includes(searchTerm)
    })
  }

  const handleClick = (villager) => {
    if(faves.indexOf(villager)===-1) {
      setFaves([...faves, villager])
    }
  }

  return (
    <div className="App">
      <div>
        <label htmlFor="villager-search">Search:</label>
        <input 
          type="text" 
          id="villager-search"
          value={search}
          onChange={handleChange}
        />
      </div>
      <DisplayCards handleClick={handleClick} villagers={getFilteredVillagers()}/>
      <div id="faves">
        <h1>These are the Elite Villagers:</h1>
        <DisplayCards handleClick={handleClick} villagers={faves}/>
      </div>
    </div>
  );
}

export default App;
