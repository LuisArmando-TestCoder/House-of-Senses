import * as THREE from "three"
import PointLightSet from "../meshes/PointLightSet"
import { CanvasState } from "scene-preset/lib/types/state"
import { Scene, SceneExport } from "scene-preset/lib/types/consulters"


export default {
  lightFollower: ({
    object: () =>
      PointLightSet([
        {
          color: "#fff",
          position: new THREE.Vector3(0, 2, 0),
          distance: 20,
          intensity: 0.5,
        },
      ]),
    onAnimation: ({ object3D }: SceneExport, canvasState: CanvasState) => {
      object3D.position.set(
        canvasState.camera?.position.x as number,
        canvasState.camera?.position.y as number,
        canvasState.camera?.position.z as number
      )
    },
  } as unknown) as Scene,
}
