import { useState } from 'react'

function Mode (props) {

    const [ mode, setMode ] = useState('placeholder');

    const handleChange = function(event) {
        setMode(event.target.value);
    } 

    const handleUserSelect = function(event) {
        props.handleMode(event, mode);
    }

    return (
        <div>
            <select name="mode" 
                    id="mode"
                    onChange={handleChange}
                    onClick={handleUserSelect}
                    value={mode}
                    >
                <option value="placeholder" disabled>Select filter:</option>
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
        </div>
    )
}

export default Mode;