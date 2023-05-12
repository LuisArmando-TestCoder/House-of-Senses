import React, { useEffect, useState } from "react"
import preset from "canvas-preset"
import commander from "./commands/commander";
import commandsObject from "./commands/controller";
import manageCanvas from "./utils/manageCanvas";
import "./styles/index.scss";

const Alfred = () => {
  const [say, setSay] = useState(() => () => {});
  const [recognitionResult, setRecognitionResult] = useState('');
  const [availableCommands, setAvailableCommands] = useState(Object.keys(commandsObject));
  useEffect(() => { // enhance: use promises instead of callbacks
    preset(props => {
      manageCanvas(props);
      const synthesis = props.speech({});
      setSay(() => () => {
        synthesis.listen(result => {
          setRecognitionResult(result);
          commander({result, synthesis, props, callback: commands => {
            setAvailableCommands({...commands});
          }});
        });
      });
    });
  }, []);
  return (
    <>
      <canvas className='canvas'/>
      <section className='main-content'>
        <p className='result-text'>
          {
            Object.keys(availableCommands).map(
              key => <i title={
                typeof availableCommands[key] === 'function' ?
                  availableCommands[key] + '' : ''
              }>{key}</i>
            )
          }
        </p>
        <h1 className='main-title'>Alfred</h1>
        <p className='result-text'>{recognitionResult}</p>
        <button className='btn start-btn' onClick={say}>Start</button>
        <p className='disclaimer-text'>The undo command is return</p>
      </section>
    </>
  )
}

export default Alfred
