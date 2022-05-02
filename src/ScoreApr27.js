import React, { useRef, useEffect } from 'react'
import VexFlow from 'vexflow'

const VF = VexFlow.Flow
const { Formatter, Renderer, Stave, StaveNote } = VF

// const clefAndTimeWidth =  60

 function Score({
  staves = [],
  // clef = 'treble',
  // timeSignature = '4/4',
  width = 500,
  height = 450,
}) {
  const container = useRef()
  const rendererRef = useRef()
  const timeSignature = `${staves.length}/8`
  console.log(staves)
 
  useEffect(() => {
    if (rendererRef.current == null) {
      rendererRef.current = new Renderer(
        container.current,
        Renderer.Backends.SVG
      )
    }
    const renderer = rendererRef.current
    renderer.resize(width, height)
    const context = renderer.getContext()
    context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed')
    // const staveWidth = (width - clefAndTimeWidth) / staves.length

    let currX = 0
    staves.forEach((notes, i) => {
      // console.log(notes)
      const topStave = new Stave(currX, 0, 300)
      const lowerStave = new Stave(currX, 150, 300)
      
      if (i === 0) {
        // topStave.setWidth(staveWidth + clefAndTimeWidth)
        topStave.addClef('treble').addTimeSignature(timeSignature)
        // lowerStave.setWidth(staveWidth + clefAndTimeWidth)
        lowerStave.addClef('bass').addTimeSignature(timeSignature)
      }
      currX += topStave.getWidth()
      currX += lowerStave.getWidth()
      topStave.setContext(context).draw()
      lowerStave.setContext(context).draw()
      
      
      const brace = new VF.StaveConnector(topStave, lowerStave).setType(3); // 3 = brace
      const lineRight = new VF.StaveConnector(topStave, lowerStave).setType(6);
      const lineLeft = new VF.StaveConnector(topStave, lowerStave).setType(1);

      brace.setContext(context).draw();
      lineLeft.setContext(context).draw();
      lineRight.setContext(context).draw();
      
      const reformattedNotes = notes.map((verticalSonority) => {
        // console.log(verticalSonority.length)
          if ( verticalSonority.length === 3 ) {
            return `${verticalSonority.slice(0, 2)}${'/'}${verticalSonority.slice(2)}`
          } else if ( verticalSonority.length === 2 ){
            return  `${verticalSonority.slice(0, 1)}${'/'}${verticalSonority.slice(1)}`
          } else  { 
                return verticalSonority += 'z/1'
              }
          })
    
      
      // console.log(reformattedNotes)
  

      const processedNotes = reformattedNotes
        .map(note => (typeof note === 'string' ? { key: note } : note))
        .map(note =>
          Array.isArray(note) ? { key: note[0], duration: note[1] } : note
        )
        .map(({ key, ...rest }) =>
          typeof key === 'string'
            ? {
                key: key.includes('/') ? key : `${key[0]}/${key.slice(1)}`,
                ...rest,
              }
            : rest
        )
        .map(
          ({ key, keys, duration = '8' }) =>
            new StaveNote({
              keys: key ? [key] : keys,
              duration: String(duration),
            })
        )
      Formatter.FormatAndDraw(context, topStave,  processedNotes, {
        auto_beam: true,
      })
    })
  }, [staves])

  return <div ref={container} />
}

export default Score;