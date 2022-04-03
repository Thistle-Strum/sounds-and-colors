import './App.css';
import * as Tone from 'tone'
import axios from 'axios';
import { useState, useEffect } from 'react';
import PlayButton from './PlayButton';
import PaintingSelector from './PaintingSelector'
import HexColorCodes from './HexColorCodes';
import DisplayNotes from './DisplayNotes';
import Tempo from './Tempo'
import Mode from './Mode'

import { synth } from './synth'


function App() {

  document.Tone = Tone;

  const [ paintingForm, setPaintingForm ] = useState([])
  const [ painting, setPainting ] = useState([]);
  const [ title, setTitle ] = useState([]);
  const [ colors, setColors ] = useState([]);
  const [ scale, setScale ] = useState([]);
  const [ notes, setNotes ] = useState([]);
  const [ playButton, setPlayButton ] = useState(false);
  const [ tempo, setTempo ] = useState('100');
  const [ loading, setLoading ] = useState(false);

  const play = function () {
    // Tone.setContext(new Tone.Context({ latencyHint : "playback" }))
    // console.log(Tone.Transport.context)
    setPlayButton(true);
    Tone.Transport.stop()
    Tone.Transport.cancel()
    Tone.Transport.clear(0)
    Tone.start()
    Tone.Transport.start('+0.1');
   
    
    
    toSound(
      convertToPitch(
        convertToBase12(
          callTone()
          )
        )
      );
    }
    
  const stop = function () {
    
    // Tone.Transport.dispose()
    Tone.Transport.stop()
    Tone.Transport.cancel(0);
    setPlayButton(false);
  }

  // convertHexCodeToPercentage
  const callTone = () => {
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
 
  // convert percentage To one of four positions for each color c, db, d, eb/1-24/25-49/50-74/75-99 // e f gb g -> 0 1 2 3

  // this divides the octave into 12 parts

  const convertToBase12 = (chords) => {
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
    // console.log(base12Chords)
    return base12Chords.map( function(currentChord) {

          return currentChord.map((note) => { 
          //  return ionian.includes(note) ? note : null
            console.log(scale.includes(note) ? note : null)
           return scale.includes(note) ? note : null
           })
        });
  }

  // 

  const convertToPitch = (base12Chords) => {
    console.log(base12Chords)

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
        default: console.log('default case')
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
        default: console.log('default case')
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
        default: console.log('default case')
      }
    }
    console.log(finalChordArray)
    return finalChordArray
  }

  const toSound = ((finalChordArray) => {
    console.log(finalChordArray)
   
    Tone.Transport.bpm.value = tempo;
    
    // Tone.Transport.start('+0.1');


    setNotes(finalChordArray)
  
    let highNotes = finalChordArray.map(chord => chord[2])
    let midNotes = finalChordArray.map(chord => chord[1])
    let lowNotes = finalChordArray.map(chord => chord[0])

    // const highSynth = new Tone.PolySynth().toDestination();
    // const midSynth = new Tone.PolySynth().toDestination();
    // const lowSynth = new Tone.PolySynth().toDestination();

    function playChordSequence(synth, chordSequence) {
      return new Tone.Sequence(function(time, chord) {
        synth.triggerAttackRelease(chord, '4n', time)
      }, chordSequence, '4n')
    }


    const highVoice = playChordSequence(synth, highNotes);
    const midVoice = playChordSequence(synth, midNotes);
    const lowVoice = playChordSequence(synth, lowNotes);

    // const highVoice = new Tone.Sequence(
    //   function (time, note) {
    //     highSynth.triggerAttackRelease(note, '4n', time)
    //   }, highNotes, '4n', '+0.9');

    // const midVoice = new Tone.Sequence(
    //   function (time, note) {
    //     midSynth.triggerAttackRelease(note, '4n', time)
    //   }, midNotes, '4n', '+0.9');

    // const lowVoice = new Tone.Sequence(
    //   function (time, note) {
    //     lowSynth.triggerAttackRelease(note, '4n', time)
    //   }, lowNotes, '4n', '+0.9');

    //   const highVoice = new Tone.Loop(
    //   time => {
    //     highSynth.triggerAttackRelease(highNotes, '4n', time)
    //   }, '4n').start(0);

    // const midVoice = new Tone.Loop(
    //   time => {
    //     midSynth.triggerAttackRelease(midNotes, '4n', time)
    //   }, '4n').start(0);

    // const lowVoice = new Tone.Loop(
    //   time => {
    //     lowSynth.triggerAttackRelease(lowNotes, '4n', time)
    //   }, '4n').start(0);



    highVoice.start();
    midVoice.start();
    lowVoice.start();
  });


  useEffect(function () {
    setLoading(true);
    axios({
      url: `https://www.rijksmuseum.nl/api/en/collection/${paintingForm}`,
      params: {
        key: 'ATefFwWi',
      }
    }).then((artData) => {
      setLoading(false);
      setPainting(artData.data.artObject.webImage.url)
      setTitle(artData.data.artObject.longTitle)

      let colorPercentages = [];
      let hexColors = [];
      
      for (let i = 0; i < (artData.data.artObject.colors.length); i++) {
        colorPercentages.push(artData.data.artObject.colors[i].percentage);
        hexColors.push(artData.data.artObject.colors[i].hex);

      }
      setColors(hexColors)
    })
  }, [paintingForm]);

  const selectPainting = function (chosenPainting) {
    console.log('selectPainting()')
    setPaintingForm(chosenPainting);
  }

  const selectTempo = function (event, chosenBpm) {
    event.preventDefault();
    setTempo(chosenBpm)
  }

  const selectMode = function (event, chosenScale) {
    event.preventDefault();
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
    chosenScale === 'chormatic' ? setScale([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    : setScale([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
  }

  return loading ? <div>LOADING</div> : (
    <div className="wrapper">
      <div className="onPageLoad">
        <h1>Sounds and Colors</h1>
        <PaintingSelector onPaintingChange={selectPainting} />
        <Mode handleMode={selectMode}/>
        <Tempo handleSubmit={selectTempo} />
        <PlayButton handleMusic={playButton} playButton={play} stopButton={stop} />
      </div>
        <HexColorCodes listHexCodes={colors} />
        <DisplayNotes listNotes={notes} />
        <h2>{title}</h2>
        <div className='paintingContainer' >
          <img src={painting} alt={title} />
        </div>
        <footer><a href="https://www.rijksmuseum.nl/en" target="_blank" rel="noreferrer">Paintings courtesy of the Rijks Museum API</a></footer>
    </div>
  );
}

export default App;

      // <div className="onPageLoad">
      //   <h1>Sounds and Colors</h1>
      //   <PaintingForm handleSubmit={selectPainting} />
      //   <Mode handleMode={selectMode}/>
      //   <Tempo handleSubmit={selectTempo} />
      //   <PlayButton handleMusic={playButton} playButton={play} stopButton={stop} />
      // </div>