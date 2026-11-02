import { useGLTF } from '@react-three/drei';

export function Chair(props) {
  // Carga el modelo 3D desde la carpeta public
  const { scene } = useGLTF('/models/chair.glb');
  
  return <primitive object={scene} {...props} />;
}

// Precarga el modelo para que cargue más rápido
useGLTF.preload('/models/chair.glb');