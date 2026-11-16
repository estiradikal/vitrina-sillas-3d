import { useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Bounds, Center } from '@react-three/drei';
import { Chair } from './components/Chair';
import { useConfigStore } from './store/useConfigStore';
import './App.css';

function AutoLockZoom({ isGamer }) {
  const { camera, controls } = useThree();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (controls) controls.maxDistance = camera.position.distanceTo(controls.target);
    }, 150);
    return () => clearTimeout(timer);
  }, [camera, controls, isGamer]);
  return null;
}

export default function App() {
  const [isGamer, setIsGamer] = useState(false);
  const [menuActivo, setMenuActivo] = useState(null); 
  
  const { colorTela, setColorTela, materialPatas, setMaterialPatas } = useConfigStore();

  const modelPath = isGamer ? '/models/chair-gamer.glb' : '/models/chair.glb';
  const coloresDisponibles = ['#a0a0a0', '#2a2a2a', '#1a56db', '#991b1b', '#15803d'];

  return (
    <div className="app-container">
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
          <p className="category">{isGamer ? 'AERO ONE - SILLA GAMER' : 'AERO ONE - SILLA ERGONÓMICA'}</p>
          <h1 className="title">{isGamer ? 'Domina el juego.' : 'Diseñada para durar.'}</h1>
          <p className="price">{isGamer ? 'Desde $450 USD' : 'Desde $1.290 USD'}</p>
        </div>

        <div className="bottom-menu">
          <button onClick={() => setMenuActivo(menuActivo === 'color' ? null : 'color')}>Color</button>
          <button onClick={() => setMenuActivo(menuActivo === 'material' ? null : 'material')}>Material</button>
        </div>

        {menuActivo === 'color' && (
          <div className="customization-panel">
            <p className="panel-title">Selecciona el color de la tela:</p>
            <div className="color-options">
              {coloresDisponibles.map((color) => (
                <button 
                  key={color}
                  onClick={() => setColorTela(color)}
                  className={`color-btn ${colorTela === color ? 'active' : ''}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )}

        {menuActivo === 'material' && (
          <div className="customization-panel">
            <p className="panel-title">Selecciona el material de las patas:</p>
            <div className="material-options">
              {['Metal', 'Madera', 'Plastico'].map((mat) => (
                <button 
                  key={mat}
                  onClick={() => setMaterialPatas(mat)}
                  className={`material-btn ${materialPatas === mat ? 'active' : ''}`}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="canvas-wrapper">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} shadows>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow intensity={1.5} />
          <Environment preset="city" />

          <Bounds fit clip observe margin={1.2} key={isGamer ? 'gamer' : 'ergo'}>
            <Center>
              <Chair modelPath={modelPath} castShadow rotation={isGamer ? [0, Math.PI, 0] : [0, 0, 0]} />
            </Center>
          </Bounds>

          <ContactShadows position={[0, -1.5, 0]} opacity={0.7} scale={10} blur={2} far={4} />
          <OrbitControls makeDefault enablePan={false} minDistance={1.5} />
          <AutoLockZoom isGamer={isGamer} />
        </Canvas>
      </div>
    </div>
  );
}