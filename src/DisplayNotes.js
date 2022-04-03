function DisplayNotes(props) {

    return(
        <ul className="notes">
            { props.listNotes.map( function (triad) {
                return (
                    <li key={triad} >{triad}</li>
                )
            })}
        </ul>
    )
}

export default DisplayNotes;