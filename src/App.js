import './App.css';
import * as Tone from 'tone'
import axios from 'axios';
import { useState, useEffect } from 'react';
import PlayButton from './PlayButton';
import PaintingForm from './PaintingForm'
import HexColorCodes from './HexColorCodes';
import DisplayNotes from './DisplayNotes';
import Tempo from './Tempo'

function App() {

  const [ paintingForm, setPaintingForm ] = useState([])
  const [ painting, setPainting ] = useState([]);
  const [ title, setTitle ] = useState([]);
  const [ colors, setColors ] = useState([]);
  const [ notes, setNotes ] = useState([]);
  const [ playButton, setPlayButton ] = useState(false);
  const [ tempo, setTempo ] = useState('400');
  

  const play = function () {
    Tone.Transport.clear(0);
    Tone.Transport.cancel(0)
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
    Tone.Transport.cancel(0);
    Tone.Transport.clear(0);
    setPlayButton(false);
  }

  
  
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

  const convertToBase4 = (chords) => {
    let base4Chords = [];

    for (let x = 0; x < chords.length; x++) {

      base4Chords[x] = [];

      for (let y = 0; y < chords[x].length; y++) {

        if (chords[x][y] < 24) {
          base4Chords[x].push(0)
        }
        else if (chords[x][y] >= 25 && chords[x][y] < 49) {
          base4Chords[x].push(1)
        }
        else if (chords[x][y] >= 50 && chords[x][y] < 74) {
          base4Chords[x].push(2)
        }
        else {
          base4Chords[x].push(3)
        }
      }
    }

    console.log(base4Chords)
    return base4Chords
  }

  
  const convertToPitch = (base4Chords) => {
    let finalChordArray = [];

    for (let x = 0; x < base4Chords.length; x++) {
      finalChordArray[x] = [];

      let lowRegister = base4Chords[x][0]
      let midRegister = base4Chords[x][1]
      let highRegister = base4Chords[x][2]

      switch (lowRegister) {
        case 0:
          finalChordArray[x].push(`C${Math.floor(Math.random() * 3) + 1}`);
          break;
        case 1:
          finalChordArray[x].push(`Db${Math.floor(Math.random() * 3) + 1}`);
          break;
        case 2:
          finalChordArray[x].push(`D${Math.floor(Math.random() * 3) + 1}`);
          break;
        case 3:
          finalChordArray[x].push(`E${Math.floor(Math.random() * 3) + 1}`);
          break;
        default: console.log('default case')
      }
      switch (midRegister) {
        case 0:
          finalChordArray[x].push(`E${Math.floor(Math.random() * 4) + 1}`);
          break;
        case 1:
          finalChordArray[x].push(`F${Math.floor(Math.random() * 4) + 1}`);
          break;
        case 2:
          finalChordArray[x].push(`Gb${Math.floor(Math.random() * 4) + 1}`);
          break;
        case 3:
          finalChordArray[x].push(`G${Math.floor(Math.random() * 4) + 1}`);
          break;
        default: console.log('default case')
          break;
      }
      switch (highRegister) {
        case 0:
          finalChordArray[x].push(`Ab${Math.floor(Math.random() * 4) + 1}`);
          break;
        case 1:
          finalChordArray[x].push(`A${Math.floor(Math.random() * 4) + 1}`);
          break;
        case 2:
          finalChordArray[x].push(`Bb${Math.floor(Math.random() * 4) + 1}`);
          break;
        case 3:
          finalChordArray[x].push(`B${Math.floor(Math.random() * 4) + 1}`);
          break;
        default: console.log('default case')
      }
    }

    return finalChordArray
  }

  const toSound = ((finalChordArray) => {

      setNotes(finalChordArray)
  
    let highNotes = finalChordArray.map(chord => chord[2])
    let midNotes = finalChordArray.map(chord => chord[1])
    let lowNotes = finalChordArray.map(chord => chord[0])

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

    Tone.Transport.bpm.value = tempo;
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

  const selectPainting = function (event, chosenPainting) {
    event.preventDefault();
    setPaintingForm(chosenPainting);
  }

  const selectTempo = function (event, chosenBpm) {
    event.preventDefault();
    console.log(chosenBpm)
    setTempo(chosenBpm);
  }

  return (
    <div className="wrapper">
      <div className="onPageLoad">
        <h1>Color as Sound</h1>
        <PaintingForm handleSubmit={selectPainting} />
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
