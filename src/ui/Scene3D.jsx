import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="purple" />
        </mesh>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
