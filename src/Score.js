import React, { useRef, useEffect } from 'react'
import VexFlow from 'vexflow'

const VF = VexFlow.Flow
const { Formatter, Renderer, Stave, StaveNote } = VF



 function Score(props) {

  const container = useRef()
  const rendererRef = useRef()
  const timeSignature = `${props.staves.length}/8`

  useEffect(() => {

    if (rendererRef.current == null ){
        rendererRef.current = new Renderer(
        container.current,
        Renderer.Backends.SVG
      )
    }
    const renderer = rendererRef.current
    renderer.resize(720, 440)
    const context = renderer.getContext()
   
    const topStave = new Stave(20, 0, 300)
    const lowerStave = new Stave(20, 150, 300)
    if (props.staves.length !== 0 ) {
      topStave.addTimeSignature(timeSignature)
      lowerStave.addTimeSignature(timeSignature) }
      else {console.log('there should not be time signature right now!')};

      topStave.addClef('treble')
      lowerStave.addClef('bass')

    const brace = new VF.StaveConnector(topStave, lowerStave).setType(3); // 3 = brace
    const lineRight = new VF.StaveConnector(topStave, lowerStave).setType(6);
    const lineLeft = new VF.StaveConnector(topStave, lowerStave).setType(1);

    
    brace.setContext(context).draw();
    lineLeft.setContext(context).draw();
    lineRight.setContext(context).draw();
     
    
      
  const reformattedNotes = props.staves.map((verticalSonority) => {
    return verticalSonority.map((note) => {
      if ( note.length === 3 ) {
        return `${note.slice(0, 2)}${'/'}${note.slice(2)}`
      } else if ( note.length === 2 ){
        return  `${note.slice(0, 1)}${'/'}${note.slice(1)}`
      } else  { 
            return note 
          }
        })  
      })
        
  const trebleClefNotes = reformattedNotes.map((chords) => {
    const top = [];
      chords.map((notes) => {
      if (notes.slice(-1) >= 4 ) top.push(notes)    
      return top  
    })
    return top
  })
  
  const bassClefNotes = reformattedNotes.map((chords) => {
    const bottom = [];
      chords.map((notes) => {
      if (notes.slice(-1) <= 3 ) bottom.push(notes)    
      return bottom  
    })
    return bottom
  })
  
  console.log(trebleClefNotes)

  const finalTrebleClefNotes = trebleClefNotes.map((beat) => {
    console.log(beat)
    if (beat.length === 0) {
      return new StaveNote({ 
        keys: ["c/4"], 
        duration: "8r" })
    } else {
    return new StaveNote({ 
      keys: beat, 
      duration: "8" })
    }
  })

  const finalBassClefNotes = bassClefNotes.map((beat) => {
    console.log(beat)
    if (beat.length === 0) {
      return new StaveNote({ 
        keys: ["c/4"], 
        duration: "8r" })
    } else {
    return new StaveNote({ 
      keys: beat, 
      duration: "8" })
    }
  })

  topStave.setContext(context).draw()
  lowerStave.setContext(context).draw()
  // Formatter.FormatAndDraw(context, topStave, finalTrebleClefNotes);
  // Formatter.FormatAndDraw(context, lowerStave, finalBassClefNotes)
   
  }, [props, timeSignature])

  return <div className='scoreContainer' ref={container} />
}


export default Score;