

    function HexColorCodes(props) {
        console.log(props)
        return(      
            <ul className="colors">
                { props.handleHexCodes.map(function(colorCode) {
                    return(
                        
                        <li style={{
                            backgroundColor: `${colorCode}`}
                        }
                        >   
                            <div className="hexColorCodes"> {colorCode} </div>  
                        </li>
                    )
                })}
            </ul>
        )
    }
    
export default HexColorCodes

// <div className="color" aria-hidden="true"></div>