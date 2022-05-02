import {  useState, useEffect, useRef } from 'react'
import VexFlow from 'vexflow'


const VF = VexFlow.Flow
const { Formatter, Renderer, StaveNote } = VF

function DisplayNotes(props) {

        // const [ timeSignature, setTimeSignature ] = useState('')

        // setTimeSignature(props.onChordSeqCreation.length)

       let timeSignature = props.onChordSeqCreation.length 
     
     
        const container = useRef();
        const rendererRef = useRef();
   

//     console.log(timeSignature === '0' ? true : false)
    
useEffect(() => {

    rendererRef.current = new Renderer(container.current, Renderer.Backends.SVG);

    // Configure the rendering context.
    const renderer = rendererRef.current
    renderer.resize(720, 440);
    const context = renderer.getContext();


    // Create the staves 
    const topVoice = new VF.Stave(10, 0, 300);
    const  bottomVoice = new VF.Stave(10, 150, 300);     
        topVoice.addClef("treble").addTimeSignature(`${timeSignature}/8`);
        bottomVoice.addClef("bass").addTimeSignature(`${timeSignature}/8`);

    const brace = new VF.StaveConnector(topVoice, bottomVoice).setType(3); // 3 = brace
    const lineRight = new VF.StaveConnector(topVoice, bottomVoice).setType(6);
    const lineLeft = new VF.StaveConnector(topVoice, bottomVoice).setType(1);

    const topVoiceNotes = [
            new StaveNote({ 
                    keys: ["c/4"], 
                    duration: "q" }),
            new StaveNote({ 
                    keys: ["d/4"], 
                    duration: "q" }), 
            new StaveNote({ 
                    keys: ["b/4"], 
                    duration: "qr" }), 
            new StaveNote({ 
                    keys: ["c/4", "e/4", "g/4"], 
                    duration: "q" })
                ];

    const bottomVoiceNotes = [
            new StaveNote({ 
                    keys: ["c/3"], 
                    duration: "q" }),
            new StaveNote({ 
                    keys: ["d/3"], 
                    duration: "q" }), 
            new StaveNote({ 
                    keys: ["b/3"], 
                    duration: "q" }), 
            new StaveNote({ 
                    keys: ["c/3", "e/3", "g/3"], 
                    duration: "q" })
                ];
       
    topVoice.setContext(context).draw();
    bottomVoice.setContext(context).draw();

    brace.setContext(context).draw();
    lineLeft.setContext(context).draw();
    lineRight.setContext(context).draw();

    // Helper function to justify and draw a 4/4 voice
    Formatter.FormatAndDraw(context, topVoice, topVoiceNotes);
    Formatter.FormatAndDraw(context, bottomVoice, bottomVoiceNotes)
    }, [])
        
    return (
        <div>
               
                <div className="scoreContainer">
                        <div ref={container} />
                </div>
              
        
        </div>

    )
}


export default DisplayNotes;


// <ul className="notes">
//             { props.onChordSeqCreation.map( function (triad) {consol
//                 return (
//                     <li key={Math.random()} >{triad}</li>
//                 )
//             })}
//             timeSignature === '0' ? console.log('zero') : 
//                 <div className="scoreContainer">
//                         <div ref={container} />
//                 </div>
        
//         </ul>


