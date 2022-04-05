

function ScaleSelector (props) {

    const handleChange = function(event) {
        props.onScaleChange(event.target.value)
    };

    return (
            <select 
                name="scale"     
                id="scale"
                onChange={ handleChange }
                value={props.scaleName}
            >
                <option value="placeholder">Select filter:</option>
                <option value="ionian">ionian</option>
                <option value="dorian">dorian</option>
                <option value="phrygian">phrygian</option>
                <option value="lydian">lydian</option>
                <option value="mixolydian">mixolydian</option>
                <option value="aeolian">aeolian</option>
                <option value="locrian">locrian</option>
                <option value="whole-tone">whole-tone</option>
                <option value="half-whole">half-whole</option>
                <option value="whole-half">whole-half</option>
                <option value="chromatic">chromatic</option>
            </select>
       
    )
}

export default ScaleSelector;