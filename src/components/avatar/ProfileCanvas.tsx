"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useAvatar } from "@/lib/avatar/store";
import { HeadAssembly } from "./HeadAssembly";
import { Lights } from "./Lights";

export default function ProfileCanvas() {
  const config = useAvatar((s) => s.config);
  const setProfileCanvas = useAvatar((s) => s.setProfileCanvas);
  return (
    <Canvas
      dpr={[2, 3]}
      camera={{ position: [0.45, 0.2, 3.3], fov: 30 }}
      gl={{ preserveDrawingBuffer: true, antialias: true }}
      onCreated={({ gl }) => setProfileCanvas(gl.domElement)}
    >
      <color attach="background" args={[config.background]} />
      <Lights background={config.background} />
      <group position={[0, -0.02, 0]}>
        <HeadAssembly config={config} />
      </group>
      <OrbitControls target={[0, 0, 0]} enablePan={false} enableZoom={false} minPolarAngle={0.8} maxPolarAngle={2.2} />
    </Canvas>
  );
}
