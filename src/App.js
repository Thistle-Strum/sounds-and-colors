import './App.css';
import * as Tone from 'tone'
import axios from 'axios';
import { useState, useEffect } from 'react';
import PlayButton from './PlayButton';
import PaintingForm from './PaintingForm'
import HexColorCodes from './HexColorCodes';

function App() {

  const [ paintingForm, setPaintingForm ] = useState([]) 
  const [ painting, setPainting ] = useState([]);
  const [ title, setTitle ] = useState([]);
  const [ colors, setColors ] = useState([]);
  const [ playButton, setPlayButton] = useState(false);

  const play = function() {
    setPlayButton(true);
    Tone.Transport.clear();
    toSound(
      convertToPitch(
        convertToBase4(
          callTone())));
    
    // console.log("play")
  }

  const stop = function() {
    
   
    Tone.Transport.stop()
    setPlayButton(false);
    // console.log("stop")
    
  }

  const callTone  = () => {
  const chords = colors.map((color) => {
    let hexValue = color.replace(' ', '').substring(1, 7)
    console.log(hexValue)
    let newArray = [];
      for (let x = 0, y = 2; x <= 4; x += 2, y += 2) {
        // let tone = Math.floor(
        //   (parseInt((hexValue.slice(x, y)), 16) / 255) * 100)
          // console.log(hexValue.slice(x, y))
        newArray.push(
                      (Math.floor(
                              (parseInt((hexValue.slice(x, y)), 16) / 255) * 100)
                      )
                );                 
        }
      return newArray
  });
  console.log(chords)
    return chords
    
 
};

const convertToBase4 = (chords) => {
  let newArray = [];

  // iterate through the entire array
  for(let x=0; x < chords.length; x++) {

      newArray[x] = [];

      // iterate through the subarray values
      for(let y=0; y < chords[x].length; y++) {

          if(chords[x][y] < 24) {
              newArray[x].push(0)
          }
          else if(chords[x][y] >= 25 && chords[x][y] < 49) {
              newArray[x].push(1)
          }
          else if(chords[x][y] >= 50 && chords[x][y] < 74) {
              newArray[x].push(2)
          }
          else {
              newArray[x].push(3)
          }
      }
  }
  
  console.log(newArray)
  return newArray
}

const convertToPitch = (base4Chords) => {
  let newArray = [];
  
  for (let x=0; x < base4Chords.length; x++ ) {
    newArray[x] = [];

      let lowRegister = base4Chords[x][0] 
      let midRegister = base4Chords[x][1] 
      let highRegister = base4Chords[x][2]

        switch (lowRegister) {
          case 0:
            newArray[x].push('C4');
            break;
          case 1:
            newArray[x].push('Db4');
            break;
          case 2:
            newArray[x].push('D4');
            break;
          case 3:
            newArray[x].push('Eb4');
          }
          switch (midRegister) {
            case 0:
            newArray[x].push('E4');
              break;
            case 1:
            newArray[x].push('F4');
              break;
            case 2:
            newArray[x].push('Gb4');
              break;
            case 3:
            newArray[x].push('G4');
          }
          switch (highRegister) {
            case 0:
            newArray[x].push('Ab4');
              break;
            case 1:
            newArray[x].push('A4');
              break;
            case 2:
            newArray[x].push('Bb4');
              break;
            case 3:
            newArray[x].push('B4');
          }
      }
 
  return newArray
}

const toSound = ((finalChordArray) => {


    let low = finalChordArray.map( chord => chord[0])
    let lowIndex = 0;
    let mid = finalChordArray.map( chord => chord[1])
    let midIndex = 0;
    let high = finalChordArray.map( chord => chord[2])
    let highIndex = 0;

console.log(low, mid, high);


const highSynth = new Tone.PolySynth().toDestination();
const midSynth = new Tone.PolySynth().toDestination();
const lowSynth = new Tone.PolySynth().toDestination();


    Tone.Transport.scheduleRepeat((time) => {
      repeat1(time);
  }, '4n')

  const repeat1 = ((time) =>  {
    let highVoice = high[highIndex % high.length]
    highSynth.triggerAttackRelease(highVoice, '4n', time);
    highIndex++;
  })

  // ***************************

  Tone.Transport.scheduleRepeat((time) => {
    repeat2(time);
}, '4n')

  const repeat2 = ((time) =>  {
  let midVoice = mid[midIndex % mid.length]
  midSynth.triggerAttackRelease(midVoice, '4n', time);
  midIndex++;
  })

  // ***************************

  Tone.Transport.scheduleRepeat((time) => {
    repeat3(time);
}, '4n')

  const repeat3 = ((time) =>  {
  let lowVoice = low[lowIndex % low.length]
  lowSynth.triggerAttackRelease(lowVoice, '4n', time);
  lowIndex++;
  })

  Tone.Transport.start();
  // Tone.Transport.stop();
  // Tone.Transport.pause();
  Tone.Transport.bpm.value = 30;

  // setTimeout(() => {
  //   Tone.Transport.stop();
  // }, 30000)

});


  useEffect( function() {

    axios({
        url: `https://www.rijksmuseum.nl/api/en/collection/${paintingForm}`,
        params: {
          key: 'ATefFwWi',
        }
      }).then( (artData) => {
        
        // console.log(artData)

          setPainting(artData.data.artObject.webImage.url)
      
          setTitle(artData.data.artObject.longTitle)

          let colorPercentages = [];
          let hexColors = [];
          
          for ( let i = 0; i < (artData.data.artObject.colors.length); i++) {
            
            colorPercentages.push(artData.data.artObject.colors[i].percentage);
            hexColors.push(artData.data.artObject.colors[i].hex);
            
          } 

          // setVolume(colorPercentages)
          // console.log(colorPercentages)
          setColors(hexColors)
          // console.log(hexColors)

        })
      
  }, [paintingForm]);

  const selectPainting = function(event, chosenPainting) {
    event.preventDefault();
    // console.log(artData)
    setPaintingForm(chosenPainting);
  }

  return (
    <div className='wrapper'>
      <h1>Colours to Chords:</h1> 
      <div>
        <PaintingForm handleSubmit={selectPainting} />
        <img className='painting' src={painting} alt={title} />
        <h2>{title}</h2>
        <HexColorCodes handleHexCodes={colors} />
        <PlayButton handleMusic={playButton} playButton={play} stopButton={stop} />
      </div>
    </div>
  );
}

export default App;

