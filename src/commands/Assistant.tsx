import React, { useEffect, useState } from "react"
import preset from "canvas-preset"
import commander from "./commander";
import commandsObject from "./controller";
import "../styles/index.scss";

const Assistant = () => {
  const [say, setSay] = useState(() => () => {});
  const [recognitionResult, setRecognitionResult] = useState('');
  const [availableCommands, setAvailableCommands] = useState(Object.keys(commandsObject));
  useEffect(() => { // enhance: use promises instead of callbacks
    preset(props => {
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
        <button className='btn start-btn' onClick={say}>Start</button>
      </section>
  )
}

export default Assistant