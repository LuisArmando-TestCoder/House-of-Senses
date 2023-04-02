/**
 * @todo there should be three canvases on each extreme
 */

import { Scenes } from "scene-preset/lib/types/consulters"

import getPathPositions from "./getPathPositions"
import getGalleryPath from "./getGalleryPath"
import getGalleryCanvases from "./getGalleryCanvases"
import lightFollower from "../../stages/lightFollower"

const pathPositions = getPathPositions(798838645950457, 2) // 123456789 fails miserably, use it for debugging
const pathSize = 10
const displacement = pathSize / 2

export default {
  ...getGalleryPath(pathPositions, pathSize),
  ...getGalleryCanvases({ pathPositions, pathSize, getImage: getAIPhotos, displacement }),
  ...lightFollower,
  // tags: {
  //   object: () =>
  //     pathPositions.map(async ({ x, z, laneType }, index) => {
  //       const text = await Text({
  //         text: "x" + x + ",z" + z + "\n" + laneType + index,
  //         path: "./fonts/Montserrat_Regular.json",
  //         color: "#f00",
  //         thickness: 0.1,
  //         size: 0.5,
  //       });

  //       text.position.set(x * pathSize, 3, z * pathSize);

  //       return text;
  //     }),
  //   onAnimation: ({ object3D }: SceneExport, canvasState: CanvasState) => {
  //     for (const child of object3D.children)
  //       child.lookAt(
  //         canvasState.camera?.position.x as number,
  //         canvasState.camera?.position.y as number,
  //         canvasState.camera?.position.z as number
  //       );
  //   },
  // } as unknown as Scene,
} as Scenes

function getPexelsSrc(index: number, pair: number): string {
  const imageIndex = 1671323 + (index + pathPositions.length * pair)

  return (
    "https://images.pexels.com/photos/" +
    imageIndex +
    "/pexels-photo-" +
    imageIndex +
    ".jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  )
}

function getAIPhotos(index: number, pair: number): string {
  return (
    "https://luisarmando-testcoder.github.io/keeper/ai/ai%20(" +
    index * pair +
    ").png"
  )
}
