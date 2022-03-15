//PlayButton

function PlayButton(props) {
    return (
        <div className="playButtons">
            <button className="play"
                onClick={props.playButton}>Play
            </button>
            <button  className="stop"
                onClick={props.stopButton}>Stop
            </button>
        </div>
    )
}

export default PlayButton;

