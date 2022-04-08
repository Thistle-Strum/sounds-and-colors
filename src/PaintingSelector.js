

function PaintingSelector(props) {

  const handleChange = function (event) {
   props.onPaintingChange(event.target.value);
  };

  return (
    <select
      className="paintingSelector"
      id="painting"
      name="painting"
      onChange={ handleChange }
      value={props.painting}
    >
      
      <option value="placeholder" >
      Select a painting </option>
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
