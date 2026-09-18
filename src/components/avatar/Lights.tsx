export function Lights({ background }: { background: string }) {
  return (
    <>
      <hemisphereLight args={["#ffffff", background, 0.6]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 7, 5]} intensity={2.2} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0004}>
        <orthographicCamera attach="shadow-camera" args={[-4, 4, 4, -4, 0.5, 20]} />
      </directionalLight>
      <directionalLight position={[-5, 3, 3]} intensity={0.6} />
      <directionalLight position={[0, 4, -6]} intensity={0.8} />
    </>
  );
}
