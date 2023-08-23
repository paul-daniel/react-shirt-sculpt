import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";

import state from "../store";
import { Group } from "three/src/Three.js";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const CameraRig = ({ children }: Props) => {
  const snap = useSnapshot(state);
  const group = useRef() as React.MutableRefObject<Group>;

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 680;

    // set the initial position of the model
    let targetPosition: [number, number, number] = [-0.3, 0, 2];
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0.2, 0.8];
      if (isMobile) targetPosition = [0, 0.1, 0.7];
    } else {
      if (isMobile) targetPosition = [0, 0, 1.1];
      else targetPosition = [0, 0, 2];
    }

    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);
    // set the model rotation
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
