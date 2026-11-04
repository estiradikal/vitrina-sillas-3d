import { useState, useEffect } from 'react'; // Importamos useState y useEffect de React para manejar el estado y los efectos secundarios
import { Canvas, useThree } from '@react-three/fiber'; // Importamos Canvas y useThree de @react-three/fiber para renderizar la escena 3D y acceder a la cámara y controles
import { OrbitControls, Environment, ContactShadows, Bounds, Center } from '@react-three/drei'; // Importamos componentes de @react-three/drei para controles de cámara, entorno, sombras y encuadre
import { Chair } from './components/Chair'; // Importamos el componente Chair que renderiza el modelo 3D de la silla
import './App.css'; // Importamos los estilos CSS para la aplicación


function AutoLockZoom({ isGamer }) {// Componente que ajusta automáticamente el zoom máximo de la cámara según la silla seleccionada
  const { camera, controls } = useThree();// Accedemos a la cámara y los controles de la escena 3D usando useThree 

  useEffect(() => {
    // Esperamos 150ms a que <Bounds> haga su encuadre perfecto
    const timer = setTimeout(() => { // Usamos setTimeout para retrasar la ejecución del código y permitir que <Bounds> ajuste la vista antes de bloquear el zoom
      if (controls) {
        // Medimos la distancia exacta desde la cámara hasta la silla
        const distance = camera.position.distanceTo(controls.target);
        // Bloqueamos el alejamiento máximo a esa distancia
        controls.maxDistance = distance; // Establecemos la distancia máxima de alejamiento de la cámara a la distancia medida, evitando que el usuario se aleje demasiado del modelo 3D
      }
    }, 150);

    return () => clearTimeout(timer); // Limpiamos el temporizador si el componente se desmonta antes de que se ejecute el código
  }, [camera, controls, isGamer]); // Ejecutamos el efecto cada vez que cambian la cámara, los controles o la silla seleccionada (isGamer)

  return null;
}

export default function App() { // Componente principal de la aplicación que renderiza la interfaz de usuario y la escena 3D
  const [isGamer, setIsGamer] = useState(false); // Estado que indica si la silla seleccionada es la gamer (true) o la ergonómica (false)
  const modelPath = isGamer ? '/models/chair-gamer.glb' : '/models/chair.glb'; // Ruta del modelo 3D según la silla seleccionada, cambiando dinámicamente entre la silla gamer y la ergonómica

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