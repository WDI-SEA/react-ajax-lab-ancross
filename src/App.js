import { useEffect, useState } from 'react'
import './App.css';
import DisplayCards from './DisplayCards'

function App() {
  // api data
  const [data, setData] = useState({ villagers: [] })
  // search input
  const [search, setSearch] = useState('')
  // favorited villagers
  const [faves, setFaves] = useState([])

  useEffect(() => {
    fetch('http://acnhapi.com/v1/villagers/')
      .then(response => response.json())
      .then(responseData => {
        // console.log(responseData)
        responseData = Object.values(responseData)
        console.log(responseData)
        setData({ villagers: responseData })
      })
      .catch(err => console.warn(err))
  }, [])

  const getFilteredVillagers = () => {
    const searchTerm = search.toLowerCase()
    const filteredVillagers = data.villagers.filter(villager => {
      const name = villager.name['name-USen'].toLowerCase()
      return name.includes(searchTerm)
    })
    return filteredVillagers
  }

  const handleClick = villager => {
    // do not add duplicates
    if (faves.indexOf(villager) === -1) {
      setFaves([...faves, villager])
    }
  }

  return (
    <div className="App">
      <label htmlFor='search-input'>Search:</label>
      <input 
        type='text'
        placeholder='enter villager name...'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div style={{ display: 'flex' }}>
        <div>
          <h1>Searched Villagers:</h1>
        
          <DisplayCards 
            villagers={getFilteredVillagers()}
            handleClick={handleClick}
          />
        </div>

        <div>
          <h1>Faved Villagers:</h1>

          <DisplayCards 
            villagers={faves}
            handleClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
