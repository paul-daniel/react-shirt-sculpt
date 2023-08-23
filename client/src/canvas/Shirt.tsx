import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshStandardMaterial } from "three";

import state from "../store";

type GLTFResult = GLTF & {
  nodes: {
    [x: string]: THREE.Mesh;
  };
  materials: {
    lambert1: THREE.MeshStandardMaterial;
  };
};

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes } = useGLTF("/shirt_baked.glb") as GLTFResult;
  const material = new MeshStandardMaterial({ color: snap.color });

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  useFrame(() => material.color.set(snap.color));

  const stateString = JSON.stringify(state);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={material}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
