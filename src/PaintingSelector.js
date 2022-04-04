import { useState } from "react";

function PaintingSelector(props) {

  
 const [ painting, setPainting ] = useState('placeholder')
  const handleChange = function (event, painting) {
    event.preventDefault();
    setPainting(event.target.value);
    props.onPaintingChange(event.target.value);
  };

  return (
    <select
      id="PaintingForm"
      name="PaintingForm"
      onChange={handleChange}
      value={painting}
    >
      
      <option value="placeholder" disabled>
      Select a painting: </option>
      <option value="SK-C-5">The Night Watch</option>
      <option value="SK-C-149">A Mother's Duty</option>
      <option value="SK-A-3059">The Sick Child</option>
      <option value="SK-A-175">The Floating Feather</option>
      <option value={`SK-A-${Math.floor(Math.random() * 3000)}`}>
        Random Painting
      </option>
    </select>
  );
}

export default PaintingSelector;

// <option value='SK-C-5'>The Night Watch</option>
// <option value="SK-C-149">A Mother's Duty</option>
// <option value="SK-A-3059">The Sick Child</option>
// <option value="SK-A-175">The Floating Feather</option>
