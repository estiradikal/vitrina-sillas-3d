import { useGLTF } from '@react-three/drei'; // Sirve específicamente para leer y cargar archivos 3D (como los .glb).

export function Chair({ modelPath, ...props }) { // Componente que recibe la ruta del modelo y props extra posición, rotación, etc
  const { scene } = useGLTF(modelPath); //Carga el modelo de la ruta y extrae solo el objeto 3D real scene
  return <primitive object={scene} {...props} />; //Renderiza el objeto 3D en pantalla aplicándole los props extra
}

// Precargamos ambos modelos para que el cambio sea instantáneo
useGLTF.preload('/models/chair.glb');
useGLTF.preload('/models/chair-gamer.glb');