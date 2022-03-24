import { useState } from 'react'

function PaintingForm (props) {

    const [ selectValue, setSelectValue ] = useState('placeholder');


    const handleChange = function(event) {
        console.log(event.target.value)
        setSelectValue(event.target.value);
        }

    const handleUserSelect = function(event) {
        props.handleSubmit(event, selectValue);
        }
    
    return (
       <div>
            <select 
                id="PaintingForm" 
                name="PaintingForm"               
                onChange={ handleChange } 
                onClick={ handleUserSelect }
                value={selectValue}
            >
                <option value="placeholder" disabled>Select a painting:</option>
                <option value={`SK-A-${Math.floor(Math.random() * 3000)}`}>Random Painting</option>
            </select>
        </div>
    )
}

export default PaintingForm;

// <option value='SK-C-5'>The Night Watch</option>
// <option value="SK-C-149">A Mother's Duty</option>
// <option value="SK-A-3059">The Sick Child</option>
// <option value="SK-A-175">The Floating Feather</option>

