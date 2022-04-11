import Vex  from "vexflow";
import { render } from "react-dom";

function DisplayNotes(props) {

  const VF = Vex.Flow;

// // Create an SVG renderer and attach it to the DIV element named "boo".
// const vf = new VF.Factory({renderer: {elementId: 'boo', height: 700}});
// const score = vf.EasyScore();
// const system = vf.System();

// system.addStave({
//   voices: [
//     score.voice(score.notes('C#5/q, B4, A4, G#4', {stem: 'up'})),
//     score.voice(score.notes('C#4/h, C#4', {stem: 'down'}))
//   ]
// }).addClef('treble').addTimeSignature('4/4');

// system.addStave({
//   voices: [
//     score.voice(score.notes('C#3/q, B2, A2/8, B2, C#3, D3', {clef: 'bass', stem: 'up'})),
//     score.voice(score.notes('C#2/h, C#2', {clef: 'bass', stem: 'down'}))
//   ]
// }).addClef('bass').addTimeSignature('4/4');

// system.addConnector()

// vf.draw();

  

    return(
        <div>
     
                <ul className="notes">
                
                    { props.listNotes.map( function (triad) {
                        return (
                            <li key={Math.random()} >{triad}</li> 
                        )
                    })}
            </ul>
        </div>
    )
}

export default DisplayNotes;