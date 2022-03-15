import * as Tone from 'tone'


function HexTriad(colors) {
    
const chords = colors.map((color) => {
  let hexValue = color.substring(1, 7);
  let newArray = [];
    for (let x = 0, y = 2; x <= 2; x++, y++) {
      newArray.push(
                    (Math.floor(
                            (parseInt((hexValue.slice(x, y)), 16) / 255) * 100)
                    )
              );                 
      }
    return newArray
});

const convertToBase4 = () => {
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
  return newArray
}

let base4Chords = convertToBase4(chords);
// console.log(base4Chords)
      
const convertToPitch = () => {
  let newArray = [];

  for (let x=0; x < base4Chords.length; x++ ) {
    newArray[x] = [];

      let  expr1 = base4Chords[x][0] 
      let  expr2 = base4Chords[x][1] 
      let  expr3 = base4Chords[x][2]

        switch (expr1) {
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
          switch (expr2) {
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
          switch (expr3) {
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

let finalChordArray = convertToPitch(base4Chords);
// console.log(finalChordArray)


// ***************************************************

    let low = finalChordArray.map( chord => chord[0])
    let lowIndex = 0;
    let mid = finalChordArray.map( chord => chord[1])
    let midIndex = 0;
    let high = finalChordArray.map( chord => chord[2])
    let highIndex = 0;

// console.log(low, mid, high);


const highSynth = new Tone.PolySynth().toDestination();
const midSynth = new Tone.FMSynth().toDestination();
const lowSynth = new Tone.AMSynth().toDestination();


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

  Tone.Transport.bpm.value = 30;

  setTimeout(() => {
    Tone.Transport.stop();
  }, 20000)
}

export default HexTriad;
  

      // return (
          // <div className="gainSliders">
          //     <label htmlFor="A">A</label>
          //     <input type="range" min="0" max="100" value="" id="A"/>
          //     <label htmlFor="Bb">Bb</label>
          //     <input type="range" min="0" max="100" value="" id="Bb"/>
          //     <label htmlFor="B">B</label>
          //     <input type="range" min="0" max="100" value="" id="B"/>
          //     <label htmlFor="C">C</label>
          //     <input type="range" min="0" max="100" value="" id="C"/>
          //     <label htmlFor="Db">Db</label>
          //     <input type="range" min="0" max="100" value="" id="Db"/>
          //     <label htmlFor="D">D</label>
          //     <input type="range" min="0" max="100" value="" id="D"/>
          //     <label htmlFor="Eb">Eb</label>
          //     <input type="range" min="0" max="100" value="" id="Eb"/>
          //     <label htmlFor="E">E</label>
          //     <input type="range" min="0" max="100" value="" id="E"/>
          //     <label htmlFor="F">F</label>
          //     <input type="range" min="0" max="100" value="" id="F"/>
          //     <label htmlFor="Gb">Gb</label>
          //     <input type="range" min="0" max="100" value="" id="Gb"/>
          //     <label htmlFor="G">G</label>
          //     <input type="range" min="0" max="100" value="" id="G"/>
          //     <label htmlFor="Ab">Ab</label>
          //     <input type="range" min="0" max="100" value="" id="Ab"/>
          // </div>
      // )
  // }
  


