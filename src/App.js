import './App.css';
import * as Tone from 'tone'
import axios from 'axios';
import VexFlow from 'vexflow'
import { useState, useEffect } from 'react';
import { synth } from './synth'
import PlayerButtons from './PlayerButtons';
import PaintingSelector from './PaintingSelector'
import HexColorCodes from './HexColorCodes';
// import DisplayNotes from './DisplayNotes';
import TempoSelector from './TempoSelector'
import ScaleSelector from './ScaleSelector'
import LoadingAnimation from './LoadingAnimation';
// import Score from './Score'
// import Score2   from './Score2';

function App() {

  // document.Tone = Tone;

  const [ painting, setPainting ] = useState('')
  const [ paintingUrl, setPaintingUrl ] = useState([]);
  const [ paintingTitle, setPaintingTitle ] = useState([]);
  const [ colors, setColors ] = useState([]);
  const [ scale, setScale ] = useState([]);
  const [ scaleName, setScaleName ] = useState('');
  const [ notes, setNotes ] = useState([]);
  // const [ playButton, setPlayButton ] = useState(false);
  const [ tempo, setTempo ] = useState('100');
  const [ loading, setLoading ] = useState(false);
  const [ score, setScore ] = useState()
// ******Buttons**************************************
  const play = function () {
    // setPlayButton(true);
    Tone.Transport.stop()
    Tone.Transport.cancel()
    Tone.Transport.clear()
    Tone.start()
    Tone.Transport.start('+0.1');
   
    
    
    toTone(
      convertToPitchNames(
        convertToBase12(
          hexToPercentage()
          )
        )
      );
    }
    
  const stop = function () {
    
    Tone.Transport.stop()
    Tone.Transport.cancel();
    // setPlayButton(false);
  }
// ******NumberStuff**************************************
  const hexToPercentage = () => {
    const chords = colors.map((color) => {
      let hexValue = color.trim().substring(1, 7)
      let newArray = [];
      for (let x = 0, y = 2; x <= 4; x += 2, y += 2) {
        newArray.push(
          (Math.floor(
            (parseInt((hexValue.slice(x, y)), 16) / 255) * 100)
          )
        );
      }
      return newArray
    });

    return chords
  };
 
  const convertToBase12 = (chords) => {
    // console.log(chords)
    let base12Chords = [];

    for (let x = 0; x < chords.length; x++) {

      base12Chords[x] = [];

      for (let y = 0; y < chords[x].length; y++) {

        if (y === 0) {

          if (chords[x][y] < 24) {
            base12Chords[x].push(0)
          }
          else if (chords[x][y] >= 25 && chords[x][y] < 49) {
            base12Chords[x].push(1)
          }
          else if (chords[x][y] >= 50 && chords[x][y] < 74) {
            base12Chords[x].push(2)
          }
          else {
            base12Chords[x].push(3)
          }
        }
        if ( y === 1) {
          if (chords[x][y] < 24) {
            base12Chords[x].push(4)
          }
          else if (chords[x][y] >= 25 && chords[x][y] < 49) {
            base12Chords[x].push(5)
          }
          else if (chords[x][y] >= 50 && chords[x][y] < 74) {
            base12Chords[x].push(6)
          }
          else {
            base12Chords[x].push(7)
          }
        }
        if ( y === 2) {
          if (chords[x][y] < 24) {
            base12Chords[x].push(8)
          }
          else if (chords[x][y] >= 25 && chords[x][y] < 49) {
            base12Chords[x].push(9)
          }
          else if (chords[x][y] >= 50 && chords[x][y] < 74) {
            base12Chords[x].push(10)
          }
          else {
            base12Chords[x].push(11)
          }
        } 
      }
    }
    
    return base12Chords.map(function(currentChord) {
      // console.log(currentChord)
          return currentChord.map((note) => { 
          //  return ionian.includes(note) ? note : null
          // console.log(note)
          // console.log(scale.includes(note) ? note : '8/r')
           return scale.includes(note) ? note : '';
           })
        });
  }

  const convertToPitchNames = (base12Chords) => {
    // console.log(base12Chords)
    let finalChordArray = [];

    for (let x = 0; x < base12Chords.length; x++) {
      finalChordArray[x] = [];

      let lowRegister = base12Chords[x][0];
      let midRegister = base12Chords[x][1];
      let highRegister = base12Chords[x][2];

      switch (lowRegister) {
        case 0:
          finalChordArray[x].push(`C${Math.floor(Math.random() * 3) + 2}`);
          break;
        case 1:
          finalChordArray[x].push(`Db${Math.floor(Math.random() * 3) + 2}`);
          break;
        case 2:
          finalChordArray[x].push(`D${Math.floor(Math.random() * 3) + 2}`);
          break;
        case 3:
          finalChordArray[x].push(`Eb${Math.floor(Math.random() * 3) + 2}`);
          break;
        default: console.log('0 -> 3')
      }
      switch (midRegister) {
        case 4:
          finalChordArray[x].push(`E${Math.floor(Math.random() * 4) + 2}`);
          break;
        case 5:
          finalChordArray[x].push(`F${Math.floor(Math.random() * 4) + 2}`);
          break;
        case 6:
          finalChordArray[x].push(`Gb${Math.floor(Math.random() * 4) + 2}`);
          break;
        case 7:
          finalChordArray[x].push(`G${Math.floor(Math.random() * 4) + 2}`);
          break;
        default: console.log('4 -> 7')
          break;
      }
      switch (highRegister) {
        case 8:
          finalChordArray[x].push(`Ab${Math.floor(Math.random() * 4) + 2}`);
          break;
        case 9:
          finalChordArray[x].push(`A${Math.floor(Math.random() * 4) + 2}`);
          break;
        case 10:
          finalChordArray[x].push(`Bb${Math.floor(Math.random() * 4) + 2}`);
          break;
        case 11:
          finalChordArray[x].push(`B${Math.floor(Math.random() * 4) + 2}`);
          break;
        default: console.log('8 -> 11')
      }
    }
    finalChordArray.forEach((chord) => {
      // console.log(chord)
    }) 
      // console.log(finalChordArray[3])
    return finalChordArray
  }
// ******Tone**************************************
  const toTone = ((finalChordArray) => {

    Tone.Transport.bpm.value = tempo;

    setNotes(finalChordArray)
  
    let highNotes = finalChordArray.map(chord => chord[2])
    let midNotes = finalChordArray.map(chord => chord[1])
    let lowNotes = finalChordArray.map(chord => chord[0])

    function playChordSequence(synth, chordSequence) {
      return new Tone.Sequence(function(time, chord) {
        synth.triggerAttackRelease(chord, '4n', time)
      }, chordSequence, '4n')
    }

    const highVoice = playChordSequence(synth, highNotes);
    const midVoice = playChordSequence(synth, midNotes);
    const lowVoice = playChordSequence(synth, lowNotes);

    highVoice.start();
    midVoice.start();
    lowVoice.start();
  });
  // ******Rijks**************************************
  useEffect(function () {
      setLoading(true);
    
      axios({
        url: `https://www.rijksmuseum.nl/api/en/collection/${painting}`,
        params: {
          key: 'ATefFwWi',
        }
      }).then((artData) => {
        setLoading(false);
        setPaintingUrl(artData.data.artObject.webImage.url)
        setPaintingTitle(artData.data.artObject.longTitle)

        let hexColors = [];
        
        for (let i = 0; i < (artData.data.artObject.colors.length); i++) {
    
          hexColors.push(artData.data.artObject.colors[i].hex);

        }
        setColors(hexColors)
      })

  }, [painting]);

// ******setState functions**************************************
  const selectPainting = function (  chosenPainting ) {
    setPainting(chosenPainting);
  }

  const selectScale = function ( chosenScale ) {
    setScaleName(chosenScale)
    chosenScale === 'ionian' ? setScale([0, 2, 4, 5, 7, 9, 11]) :
    chosenScale === 'dorian' ? setScale([0, 2, 3, 5, 7, 9, 10]) :
    chosenScale === 'phrygian' ? setScale([0, 1, 3, 5, 7, 8, 10]) :
    chosenScale === 'lydian' ? setScale([0, 2, 4, 6, 7, 9, 11]) :
    chosenScale === 'mixolydian' ? setScale([0, 2, 4, 5, 7, 9, 10]) :
    chosenScale === 'aeolian' ? setScale([0, 2, 3, 5, 7, 8, 10]) :
    chosenScale === 'locrian' ? setScale([0, 1, 3, 5, 6, 8, 10]) :
    chosenScale === 'whole-tone' ? setScale([0, 2, 4, 6, 8, 10]) :
    chosenScale === 'half-whole' ? setScale([0, 2, 3, 5, 6, 8, 9, 11]) :
    chosenScale === 'whole-half' ? setScale([0, 1, 3, 4, 6, 7, 9, 10]) :
    chosenScale === 'chromatic' ? setScale([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    : setScale([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
  }

  const selectTempo = function (chosenBpm) {
    setTempo(chosenBpm)
  }


// ******Vexflow**************************************


useEffect(() => {
  const VF = VexFlow.Flow

  let timeSignature = `${notes.length}/8`;
  // Create an SVG renderer and attach it to the DIV element named "score2".
  const vf = new VF.Factory({renderer: {elementId: 'score2', height: 700}});
  const score = vf.EasyScore();
  let system = vf.System();

  // console.log(notes)
  const replaceEmptyArrays = notes.map( chord => {
    return chord.length === 0 ? chord.concat('C4/8/r') :
        chord;
  });

  console.log(replaceEmptyArrays)

  // let pulseValue = '/8'

  const addPulseValToChords = replaceEmptyArrays.map( chordArray  => { 
    return chordArray.map(chord => { 
      // need to make pulse value a state eventually
      return chord.length === 2 || chord.length === 3 ?
        chord.concat('/8') : chord;
        });
      });

    
  console.log(addPulseValToChords)

  
  const soprano = addPulseValToChords.map(voice => {
    console.log(voice)
      return voice.map(sopranoString => {
        return sopranoString.includes('5') ? 
              sopranoString :
              !isNaN(sopranoString.charAt(1)) 
      })
    });

    console.log(soprano)
    // console.log(addPulseValToFirstArrayElement(soprano, pulseValue))

      // make this a state eventually
  

  // function addPulseValue(voice, pulseValue) {
  //   console.log(voice[0])
  // }

  // console.log(addPulseValue(soprano, pulseValue))

  // const sopranoVoice = `${soprano.flat().toString()}`;
  // console.log(sopranoVoice)

  // function insert(sopranoVoice, pulseValue) {
    
  //   return str.substr(0, index) + value + str.substr(index);
  // }

  system.addStave({
    voices: [
      score.voice(score.notes('C5/8/r,B4/r,A4,G#4, C5/r,B4/r,A4,G#4', {stem: 'up'})),
      score.voice(score.notes('C#4/h/r, C#4', {stem: 'down'}))
    ]
  }).addClef('treble').addTimeSignature(timeSignature);

  system.addStave({
    voices: [
      score.voice(score.notes('C#3/q, B2, A2/8, B2, C#3, D3', {clef: 'bass', stem: 'up'})),
      score.voice(score.notes('C#2/h, C#2', {clef: 'bass', stem: 'down'}))
    ]
  }).addClef('bass').addTimeSignature(timeSignature)

  system.addConnector()
  system.addConnector().setType(3); // 3 = brace

  vf.draw();

 

  }, [notes])

  return loading ? 
    <div>
        <LoadingAnimation />      
    </div> : (
    <div className="wrapper">
      <div className="contentContainer">
        <div className="player">
          <h1>Sounds and Colors</h1>
          <PaintingSelector onPaintingChange={selectPainting} painting={painting} />
          <ScaleSelector onScaleChange={selectScale} scaleName={scaleName} />
          <TempoSelector onTempoChange={selectTempo} />
          <PlayerButtons  playButton={play} stopButton={stop} />
        </div>
          <HexColorCodes listHexCodes={colors} />

          <div className='scoreContainer' >
            <div id="score2"></div>
          </div>
          
          <h2>{paintingTitle}</h2>
          <div className='paintingContainer' >
            <img src={paintingUrl} alt={paintingTitle} />
          </div>
          <footer>
          <p>Created by <a href="https://sounds-and-colors.netlify.app/" target="_blank" rel="noreferrer">David Benitez</a> at <a href="https://junocollege.com/" target="_blank" rel="noreferrer">Juno College of Technology</a></p> 
          <a href="https://www.rijksmuseum.nl/en" target="_blank" rel="noreferrer">Paintings courtesy of the Rijks Museum API</a></footer>
      </div>
    </div>
  );
}

export default App;


// <div className='scoreContainer' >
// <Score2 chordSequenceArray={notes} score={score}/>
// </div>

// <Score staves={notes}/>

// <DisplayNotes onChordSeqCreation={notes} />

// <PlayerButtons handleMusic={playButton} playButton={play} stopButton={stop} />