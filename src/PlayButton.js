
function PlayButton(props) {
  
    return (
        <div className="playControls">
            <button className="play"
                onClick={props.playButton}>Play/Shuffle Registers
            </button>
            <button  className="stop"
                onClick={props.stopButton}>Stop
            </button>
        </div>
    )
}

export default PlayButton;

