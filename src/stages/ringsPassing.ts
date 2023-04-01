import * as THREE from "three";
import { CanvasState } from "scene-preset/lib/types/state";
import { Scene, Scenes, SceneExport } from "scene-preset/lib/types/consulters";

export default {
  lightFollower: {
    object: () => {

    },
    onAnimation: ({ object3D }: SceneExport, canvasState: CanvasState) => {
    //   object3D.position.set(
    //     canvasState.camera?.position.x as number,
    //     canvasState.camera?.position.y as number,
    //     canvasState.camera?.position.z as number
    //   );
    },
  } as unknown as Scene,
} as Scenes;