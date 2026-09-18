"use client";

import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useAvatar } from "@/lib/avatar/store";
import { Avatar } from "./Avatar";
import { Lights } from "./Lights";

export default function AvatarCanvas() {
  const background = useAvatar((s) => s.config.background);
  const autoRotate = useAvatar((s) => s.autoRotate);
  const setCanvas = useAvatar((s) => s.setCanvas);
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0.6, 1.9, 7.2], fov: 28 }}
      gl={{ preserveDrawingBuffer: true, antialias: true }}
      onCreated={({ gl }) => setCanvas(gl.domElement)}
    >
      <color attach="background" args={[background]} />
      <fog attach="fog" args={[background, 9, 22]} />
      <Lights background={background} />
      <Avatar />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[30, 64]} />
        <meshStandardMaterial color={background} roughness={1} />
      </mesh>
      <ContactShadows position={[0, 0.005, 0]} opacity={0.45} scale={6} blur={2.4} far={3} />
      <OrbitControls
        target={[0, 1.3, 0]}
        enablePan={false}
        enableZoom
        zoomSpeed={0.8}
        minDistance={2.5}
        maxDistance={11}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2 - 0.02}
        autoRotate={autoRotate}
        autoRotateSpeed={2}
      />
    </Canvas>
  );
}
