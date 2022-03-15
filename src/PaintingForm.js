import { useState } from 'react'

function PaintingForm (props) {

    const [ selectValue, setSelectValue ] = useState('placeholder');

    const handleChange = function(event) {

        setSelectValue(event.target.value);
    }

    // a submit event on the form
        //  call the function passed via props from the App component which will update the photoOrientation state within App

    const handleUserSelect = function(event) {
        props.handleSubmit(event, selectValue);
    }
    
    return (
        // track a submit event on the form element
        // when the form is submitted, we will call the function passed to this component via props
        <form className='selectMenu' action="" onSubmit={ handleUserSelect }>
            <select 
                id="PaintingForm" 
                name="PaintingForm"
                // when a new option is selected - AKA a "change" is detected within the select - fire the handleChange callback function
                onChange={ handleChange }
                // in order to convert this element into a "controlled component", its value needs to be dictated by React
                value={selectValue}
            >
                <option value="placeholder" disabled>Select a painting:</option>
                <option value='SK-C-5'>The Night Watch</option>
                <option value="SK-C-149">A Mother's Duty</option>
                <option value="SK-A-3059">The Sick Child</option>
                <option value="SK-A-175">The Floating Feather</option>
                <option value="SK-A-4821">fix this </option>
            </select>

            <button>Display Painting</button>
        </form>
    )
}


export default PaintingForm;