import VexFlow from 'vexflow'
import { useEffect } from 'react'


const VF = VexFlow.Flow
// const { Formatter, Renderer, Stave, StaveNote } = VF

function Score2(props) {
  
  const chordSequence = props.chordSequenceArray;
  let timeSignature = `${props.chordSequenceArray.length}/8`;
  let score = props.score
  console.log(chordSequence)

useEffect(() => {
// Create an SVG renderer and attach it to the DIV element named "boo".
const vf = new VF.Factory({renderer: {elementId: 'score2', height: 700}});
const score = vf.EasyScore();
let system = vf.System();






chordSequence.map((chord) => {
  console.log(chord)
})

system.addStave({
  voices: [
    score.voice(score.notes('C#5/q, B4, A4, G#4', {stem: 'up'})),
    score.voice(score.notes('C#4/h, C#4', {stem: 'down'}))
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

}, [ score, chordSequence ])
  return (
   
      <div id="score2"></div>
   
  )
}


export default  Score2


  
      
  
 

  