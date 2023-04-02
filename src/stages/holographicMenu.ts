import * as THREE from "three"
import { CanvasState } from "scene-preset/lib/types/state"
import { Scene, SceneExport } from "scene-preset/lib/types/consulters"

export default {
  lightFollower: ({
    object: () => new THREE.Mesh(),
    onSetup: ({ object3D }: SceneExport, canvasState: CanvasState) => {
      followUser(object3D, canvasState)
    },
  } as unknown) as Scene,
}

function followUser(object3D: THREE.Object3D, canvasState: CanvasState) {
  object3D.position.set(
    canvasState.camera?.position.x as number,
    canvasState.camera?.position.y as number,
    canvasState.camera?.position.z as number
  )
}