function DisplayCards(props) {
    const allVillagers = props.villagers.map(v=>{
        return(
            <li key={v.name['name-USen']}>
                <img onClick={()=>props.handleClick(v)} src={v.image_uri} alt={v.name['name-USen']}/>
                <p>{v.name['name-USen']}</p>
            </li>
        )
    })
    return (<ul>{allVillagers}</ul>)
}

export default DisplayCards
