import React, { useState, useEffect } from "react";
import * as Components from "../components";

// "undefined" means the URL will be computed from the `window.location` object
const URL = process?.env?.NODE_ENV === "production" ? undefined : "http://localhost:5000";

export default () => {

  useEffect(() => {

    // Send a voice note as soon as the client connects to the server
    fetch(`${URL}/voice-note?note=${`In this digital art piece by Casey Baugh, a moonlit room sets the stage for a tender scene between two young lovers. The female, characterized by her lustrous black hair and a ghostly beauty, is partly awake, seated on a couch caring for the sleeping male with his head nestled in her lap. The blue moonlight illuminates the scene, casting a surreal glow and creating a stark contrast in the room.

    The composition, shot from a distance of 10 meters, positions the couple centrally, occupying only one-ninth of the frame. The piece, which is trending on CGSociety and Artstation, is influenced by various artists, blending their styles into a unique masterpiece.
    
    Rendered in Unreal Engine 5, the artwork is presented in an 8K ultra-high definition that breathes life into each detail. The meticulous application of the golden ratio gives the piece a pleasing balance. This artwork emanates a dreamy, cinematic quality reminiscent of Dreamworks animations, enveloping viewers in its captivating charm`}`)
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  }, []);

  return (
    <Components.strings.GlobalWrapper title="Scenes | Home">
      <Components.atoms.InteractiveArtCanvas />
    </Components.strings.GlobalWrapper>
  );
};