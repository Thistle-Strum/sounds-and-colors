

    function HexColorCodes(props) {

        return(      
            <ul className="colors">
                { props.listHexCodes.map( function(hexCode) {
                    return(                      
                        <li key={`${hexCode}`} style={{
                            backgroundColor: `${hexCode}`}
                        }
                        >   
                            <div className="hexColorCodes"> {hexCode} </div>  
                        </li>
                    )
                })}
            </ul>
        )
    }
    
export default HexColorCodes

