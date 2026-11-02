import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Center } from '@react-three/drei';
import { Chair } from './components/Chair';

export default function App() {
  return (
    // HU-02: Contenedor 100% responsive
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#121212' }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 45 }} shadows>
        
        {/* Iluminación para que la silla se vea realista (HT-01) */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow intensity={1.5} />
        <Environment preset="city" />

        {/* El modelo 3D centrado (HT-02) */}
        <Center>
          <Chair castShadow />
        </Center>

        {/* Sombra debajo de la silla */}
        <ContactShadows position={[0, -1, 0]} opacity={0.7} scale={10} blur={2} far={4} />

        {/* HU-01: Controles de rotación y zoom */}
        <OrbitControls 
          enablePan={false} 
          minDistance={2}   
          maxDistance={8}   
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2} 
        />
      </Canvas>
    </div>
  );
}