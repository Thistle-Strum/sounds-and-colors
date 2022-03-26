import { useState } from 'react'

function Tempo (props) {

    const [ selectValue, setSelectValue ] = useState('placeholder');

    const handleChange = function(event) {
        setSelectValue(event.target.value);
    }

    const handleUserSelect = function(event) {
        props.handleSubmit(event, selectValue);
    }
    
    return (
        <div>
            <select 
                id="Tempo" 
                name="Tempo"
                onChange={ handleChange }
                onClick={ handleUserSelect}
                value={selectValue}
            >
                <option value="placeholder" disabled>Select tempo:</option>
                <option value="20">20bpm</option>
                <option value="30">30bpm</option>
                <option value="40">40bpm</option>
                <option value="50">50bpm</option>
                <option value="60">60bpm</option>
                <option value="70">70bpm</option>
                <option value="80">80bpm</option>
                <option value="90">90bpm</option>
                <option value="100">100bpm</option>
                <option value="110">110bpm</option>
                <option value="120">120bpm</option>
                <option value="130">130bpm</option>
                <option value="140">140bpm</option>
                <option value="150">150bpm</option>
                <option value="160">160bpm</option>
                <option value="170">170bpm</option>
                <option value="180">180bpm</option>
                <option value="190">190bpm</option>
                <option value="200">200bpm</option>
                <option value="210">210bpm</option>
                <option value="220">220bpm</option>
                <option value="230">230bpm</option>
                <option value="240">240bpm</option>
                <option value="250">250bpm</option>
                <option value="260">260bpm</option>
                <option value="270">270bpm</option>
                <option value="280">280bpm</option>
                <option value="290">290bpm</option>
                <option value="300">300bpm</option>
                <option value="310">310bpm</option>
                <option value="320">320bpm</option>
                <option value="330">330bpm</option>
                <option value="340">340bpm</option>
                <option value="350">350bpm</option>
                <option value="360">360bpm</option>
                <option value="370">370bpm</option>
                <option value="380">380bpm</option>
                <option value="390">390bpm</option>
                <option value="400">400bpm</option> 
            </select>
        </div>
    )
}


export default Tempo;
