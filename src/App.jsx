import { useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Bounds, Center } from '@react-three/drei';
import { Chair } from './components/Chair';
import './App.css';

// Este componente mágico mide la distancia inicial y bloquea el zoom-out
function AutoLockZoom({ isGamer }) {
  const { camera, controls } = useThree();

  useEffect(() => {
    // Esperamos 150ms a que <Bounds> haga su encuadre perfecto
    const timer = setTimeout(() => {
      if (controls) {
        // Medimos la distancia exacta desde la cámara hasta la silla
        const distance = camera.position.distanceTo(controls.target);
        // Bloqueamos el alejamiento máximo a esa distancia
        controls.maxDistance = distance;
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [camera, controls, isGamer]);

  return null;
}

export default function App() {
  const [isGamer, setIsGamer] = useState(false);
  const modelPath = isGamer ? '/models/chair-gamer.glb' : '/models/chair.glb';

  return (
    <div className="app-container">
      
      {/* --- INTERFAZ DE USUARIO --- */}
      <div className="ui-overlay">
        <div className="logo">VITRINA</div>

        <div className="chair-selector">
          <button className={!isGamer ? 'active' : ''} onClick={() => setIsGamer(false)}>
            Silla Ergonómica
          </button>
          <button className={isGamer ? 'active' : ''} onClick={() => setIsGamer(true)}>
            Silla Gamer
          </button>
        </div>

        <div className="product-info">
          <p className="category">
            {isGamer ? 'AERO ONE - SILLA GAMER' : 'AERO ONE - SILLA ERGONÓMICA'}
          </p>
          <h1 className="title">
            {isGamer ? 'Domina el juego.' : 'Diseñada para durar.'}
          </h1>
          <p className="price">
            {isGamer ? 'Desde $450 USD' : 'Desde $1.290 USD'}
          </p>
        </div>

        <div className="bottom-menu">
          <button>Color</button>
          <button>Material</button>
          <button>Vista</button>
        </div>
      </div>

      {/* --- ESCENA 3D --- */}
      <div className="canvas-wrapper">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} shadows>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow intensity={1.5} />
          <Environment preset="city" />

          <Bounds fit clip observe margin={1.2} key={isGamer ? 'gamer' : 'ergo'}>
            <Center>
              {isGamer ? (
                <Chair 
                  modelPath={modelPath} 
                  castShadow 
                  rotation={[0, Math.PI, 0]} 
                />
              ) : (
                <Chair modelPath={modelPath} castShadow />
              )}
            </Center>
          </Bounds>

          <ContactShadows position={[0, -1.5, 0]} opacity={0.7} scale={10} blur={2} far={4} />

          {/* Controles con el zoom-out limitado automáticamente */}
          <OrbitControls 
            makeDefault 
            enablePan={false} 
            minDistance={1.5} 
          />
          
          <AutoLockZoom isGamer={isGamer} />
        </Canvas>
      </div>

    </div>
  );
}