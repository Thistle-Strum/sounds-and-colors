import { useState } from 'react'

const PaintingForm2 = () => {
  const options = [
        {
        label: 'Select a painting',
        value: 'null',
        id: '0',
        },
        {
        label: 'The Night Watch',
        value: 'SK-C-5',
        id: 'SK-C-5',
        },
        {
        label: "A Mother's Duty",
        value: 'K-C-149',
        id: 'K-C-149',
        },
        {
        label: 'The Sick Child',
        value: 'SK-A-3059',
        id: 'SK-A-3059',
         },
        {
        label: 'The Floating Feather',
        value: 'SK-A-175',
        id: 'SK-A-175',
        },
        {
        label: 'Random Painting',
        value: `SK-A-${Math.floor(Math.random() * 3000)}`,
        id: '1',
        },
  ]


    const [selectedOption, setSelectedOption] = useState(options[0].value);
    return (
        <select
          value={selectedOption}
          onChange={e => setSelectedOption(e.target.value)}>
          {options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
    );
};

  export default PaintingForm2;

//   <option value="placeholder" disabled>Select a painting:</option>
//                 <option value='SK-C-5'>The Night Watch</option>
//                  <option value="SK-C-149">A Mother's Duty</option> 
//                  <option value="SK-A-3059">The Sick Child</option>
//                 <option value="SK-A-175">The Floating Feather</option>
//                 <option value={`SK-A-${Math.floor(Math.random() * 3000)}`}>Random Painting</option>