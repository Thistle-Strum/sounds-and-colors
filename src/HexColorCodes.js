

    function HexColorCodes(props) {
        // console.log(props)
        return(      
            <ul className="colors">
                { props.listHexCodes.map( function(hexCode) {
                    return(                      
                        <li style={{
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

// <div className="color" aria-hidden="true"></div>