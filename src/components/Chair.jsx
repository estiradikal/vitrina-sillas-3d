import { useGLTF } from '@react-three/drei';

export function Chair({ modelPath, ...props }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} {...props} />;
}

// Precargamos ambos modelos para que el cambio sea instantáneo
useGLTF.preload('/models/chair.glb');
useGLTF.preload('/models/chair-gamer.glb');