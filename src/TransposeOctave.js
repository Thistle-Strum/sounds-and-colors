function TransposeOctave(props) {
    console.log(props)
    return(
        <button
        onClick={props.handleTransposition}>Random Transposition</button>
    )
} 

export default TransposeOctave