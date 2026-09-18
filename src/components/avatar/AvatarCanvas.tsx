"use client";

import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useAvatar } from "@/lib/avatar/store";
import { Avatar } from "./Avatar";

export default function AvatarCanvas() {
  const background = useAvatar((s) => s.config.background);
  const autoRotate = useAvatar((s) => s.autoRotate);
  const setCanvas = useAvatar((s) => s.setCanvas);
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 1.5, 5.8], fov: 30 }}
      gl={{ preserveDrawingBuffer: true, antialias: true }}
      onCreated={({ gl }) => setCanvas(gl.domElement)}
    >
      <color attach="background" args={[background]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 6, 4]} intensity={1.8} castShadow shadow-mapSize={[2048, 2048]} />
      <directionalLight position={[-4, 3, -3]} intensity={0.5} />
      <Avatar />
      <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={5} blur={2.2} far={3} />
      <OrbitControls
        target={[0, 1.2, 0]}
        enablePan={false}
        minDistance={2.5}
        maxDistance={9}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI / 2 + 0.1}
        autoRotate={autoRotate}
        autoRotateSpeed={2}
      />
    </Canvas>
  );
}
