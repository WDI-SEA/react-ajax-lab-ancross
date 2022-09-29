function DisplayCards(props) {
    const villagers = props.villagers.map((villager, i) => {
        return (
            <li 
                key={`villager${villager.id}`}
                style={{ listStyleType: 'none' }}
            >
                <img 
                    src={villager.image_uri}
                    alt={villager.name['name-USen']}
                    onClick={() => props.handleClick(villager, i)}
                />

                <p>{villager.name['name-USen']}</p>
            </li>
        )
    })

    return (
        <ul>
            {villagers}
        </ul>
    )

}

export default DisplayCards