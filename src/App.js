import './App.css';
import * as Tone from 'tone'
import axios from 'axios';
import { useState, useEffect } from 'react';
import PlayButton from './PlayButton';
import PaintingForm from './PaintingForm'
import HexColorCodes from './HexColorCodes';

function App() {

  const [paintingForm, setPaintingForm] = useState([])
  const [painting, setPainting] = useState([]);
  const [title, setTitle] = useState([]);
  const [colors, setColors] = useState([]);
  const [playButton, setPlayButton] = useState(false);

  const play = function () {
    setPlayButton(true);
    toSound(
      convertToPitch(
        convertToBase4(
          callTone()
        )
      )
    );
  }

  const stop = function () {
    Tone.Transport.cancel(0)
    Tone.Transport.clear()
    setPlayButton(false);
  }

  const callTone = () => {
    const chords = colors.map((color) => {
      // let hexValue = color.replace(' ', '').substring(1, 7)
      let hexValue = color.trim().substring(1, 7)
      console.log(hexValue)
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
    console.log(chords)
    return chords


  };

  const convertToBase4 = (chords) => {
    let newArray = [];

    // iterate through the entire array
    for (let x = 0; x < chords.length; x++) {

      newArray[x] = [];

      // iterate through the subarray values
      for (let y = 0; y < chords[x].length; y++) {

        if (chords[x][y] < 24) {
          newArray[x].push(0)
        }
        else if (chords[x][y] >= 25 && chords[x][y] < 49) {
          newArray[x].push(1)
        }
        else if (chords[x][y] >= 50 && chords[x][y] < 74) {
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

    for (let x = 0; x < base4Chords.length; x++) {
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
          break;
        default: console.log('default case')
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
          break;
        default: console.log('default case')
          break;
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
          break;
        default: console.log('default case')
      }
    }

    return newArray
  }

  const toSound = ((finalChordArray) => {
    // console.log(finalChordArray)

    // let bpm = $bpmRange.value;

    let highNotes = finalChordArray.map(chord => chord[2])

    // let highIndex = 0;
    let midNotes = finalChordArray.map(chord => chord[1])

    // let midIndex = 0;
    let lowNotes = finalChordArray.map(chord => chord[0])

    // let lowIndex = 0;



    // console.log(lowNotes, midNotes, highNotes);


    const highSynth = new Tone.PolySynth().toDestination();
    const midSynth = new Tone.PolySynth().toDestination();
    const lowSynth = new Tone.PolySynth().toDestination();


    const highVoice = new Tone.Sequence(
      function (time, note) {
        highSynth.triggerAttackRelease(note, '4n', time)
      }, highNotes, '4n');

    const midVoice = new Tone.Sequence(
      function (time, note) {
        midSynth.triggerAttackRelease(note, '4n', time)
      }, midNotes, '4n');

    const lowVoice = new Tone.Sequence(
      function (time, note) {
        lowSynth.triggerAttackRelease(note, '4n', time)
      }, lowNotes, '4n');


    highVoice.start();
    midVoice.start();
    lowVoice.start();

    // bpmRange.addEventListener('input', function() {
    //   bpm = bpmRange.value;
    //   Tone.Transport.bpm.value = bpm;
    // });


    Tone.Transport.bpm.value = 30;
    Tone.Transport.loopStart = 0;
    Tone.Transport.start('+0.1');
  });


  useEffect(function () {

    axios({
      url: `https://www.rijksmuseum.nl/api/en/collection/${paintingForm}`,
      params: {
        key: 'ATefFwWi',
      }
    }).then((artData) => {

      // console.log(artData)

      setPainting(artData.data.artObject.webImage.url)

      setTitle(artData.data.artObject.longTitle)

      let colorPercentages = [];
      let hexColors = [];

      for (let i = 0; i < (artData.data.artObject.colors.length); i++) {

        colorPercentages.push(artData.data.artObject.colors[i].percentage);
        hexColors.push(artData.data.artObject.colors[i].hex);

      }

      // setVolume(colorPercentages)
      // console.log(colorPercentages)
      setColors(hexColors)
      // console.log(hexColors)

    })

  }, [paintingForm]);

  const selectPainting = function (event, chosenPainting) {
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

