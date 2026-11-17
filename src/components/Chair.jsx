import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import {
  DataTexture,
  RepeatWrapping,
  RGBAFormat,
  SRGBColorSpace,
  UnsignedByteType,
} from 'three';
import { useConfigStore } from '../store/useConfigStore';

const GAMER_TELA = new Set([
  'Chair_Seat_Cloth_0',
  'Chair_BackRest_Cloth_0',
  'HipRest1_Cloth_0',
  'HeadRest1_Cloth_0',
  'Chair_LegRest_Cloth_0',
]);

const ERGO_TELA = new Set([
  'Ergo_Asiento',
  'Ergo_Espaldar',
]);

const ERGO_ESTRUCTURA = new Set([
  'Ergo_Reposabrazos',
  'Ergo_Patas',
]);

const TUBOS_METAL_FIJO = new Set([
  'Ergo_Tubo_Soporte',
  'Ergo_Tubo_Superior',
  'Chair_suspension_Aluminium_0',
  'Chair_Pedestal_Aluminium_0',
  'Chair_Height_Adjustable_Plastic_0',
]);

const GAMER_ESTRUCTURA_PREFIXES = [
  'Left_Hand_Rest_',
  'Right_Hand_Rest_',
  'Chair_Base_',
  'Chair_suspension_',
  'Chair_Pedestal_',
  'Chair_Height_Adjustable_',
  'Wheel_',
];

function getPartType(name) {
  if (TUBOS_METAL_FIJO.has(name)) return 'metal-fijo';

  if (name === 'Tela' || ERGO_TELA.has(name)) return 'tela';

  if (GAMER_TELA.has(name)) {
    return 'cuero';
  }

  if (
    name === 'Estructura' ||
    ERGO_ESTRUCTURA.has(name) ||
    GAMER_ESTRUCTURA_PREFIXES.some((prefix) => name.startsWith(prefix))
  ) {
    return 'estructura';
  }

  return null;
}

function cloneMaterial(material) {
  return Array.isArray(material)
    ? material.map((item) => item.clone())
    : material.clone();
}

function withoutTextureMaps(material) {
  [
    'map',
    'alphaMap',
    'aoMap',
    'emissiveMap',
    'metalnessMap',
    'normalMap',
    'roughnessMap',
  ].forEach((property) => {
    if (property in material) material[property] = null;
  });
}

let fabricTexture;
let leatherTexture;
let metalTexture;
let woodTexture;
let plasticTexture;

function createTexture(size, repeat, pixelColor) {
  const data = new Uint8Array(size * size * 4);

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const offset = (y * size + x) * 4;
      const value = pixelColor(x, y);
      data[offset] = value;
      data[offset + 1] = value;
      data[offset + 2] = value;
      data[offset + 3] = 255;
    }
  }

  const texture = new DataTexture(
    data,
    size,
    size,
    RGBAFormat,
    UnsignedByteType,
  );
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(repeat, repeat);
  texture.needsUpdate = true;
  return texture;
}

function getFabricTexture() {
  if (!fabricTexture) {
    fabricTexture = createTexture(64, 18, (x, y) => {
      const warp = x % 6 === 0 ? -24 : 0;
      const weft = y % 5 === 0 ? -18 : 0;
      const thread = ((x * 17 + y * 13) % 9) - 4;
      return Math.max(145, Math.min(235, 210 + warp + weft + thread));
    });
  }
  return fabricTexture;
}

function getLeatherTexture() {
  if (!leatherTexture) {
    leatherTexture = createTexture(96, 7, (x, y) => {
      const grain = ((x * 37 + y * 57 + x * y * 3) % 23) - 11;
      const pore = (x * 11 + y * 7) % 19 === 0 ? -34 : 0;
      return Math.max(155, Math.min(238, 222 + grain + pore));
    });
  }
  return leatherTexture;
}

function getMetalTexture() {
  if (!metalTexture) {
    metalTexture = createTexture(96, 10, (x, y) => {
      const brush = ((x * 9 + y * 3) % 15) - 7;
      const line = y % 12 === 0 ? -16 : 0;
      return Math.max(145, Math.min(245, 218 + brush + line));
    });
  }
  return metalTexture;
}

function getWoodTexture() {
  if (!woodTexture) {
    woodTexture = createTexture(128, 5, (x, y) => {
      const wave = Math.sin((x + Math.sin(y * 0.22) * 9) * 0.22) * 32;
      const knot = (x * 7 + y * 13) % 41 === 0 ? -30 : 0;
      return Math.max(105, Math.min(245, 198 + wave + knot));
    });
  }
  return woodTexture;
}

function getPlasticTexture() {
  if (!plasticTexture) {
    plasticTexture = createTexture(64, 12, (x, y) => {
      const grain = ((x * 29 + y * 17) % 13) - 6;
      return Math.max(185, Math.min(230, 212 + grain));
    });
  }
  return plasticTexture;
}

function applyFabricMaterial(material, colorTela) {
  withoutTextureMaps(material);
  material.map = getFabricTexture();
  material.color.set(colorTela);
  material.metalness = 0;
  material.roughness = 0.86;
}

function applyLeatherMaterial(material, colorTela) {
  withoutTextureMaps(material);
  material.map = getLeatherTexture();
  material.color.set(colorTela);
  material.metalness = 0.02;
  material.roughness = 0.34;

  if ('clearcoat' in material) {
    material.clearcoat = 0.35;
    material.clearcoatRoughness = 0.2;
  }
}

function applyMetalMaterial(material) {
  withoutTextureMaps(material);
  material.map = getMetalTexture();
  material.color.set('#b9bec6');
  material.metalness = 0.92;
  material.roughness = 0.2;
}

function applyStructureMaterial(material, materialPatas) {
  withoutTextureMaps(material);

  if (materialPatas === 'Metal') {
    applyMetalMaterial(material);
  } else if (materialPatas === 'Madera') {
    material.map = getWoodTexture();
    material.color.set('#8B4513');
    material.metalness = 0;
    material.roughness = 0.68;
  } else if (materialPatas === 'Plastico') {
    material.map = getPlasticTexture();
    material.color.set('#222222');
    material.metalness = 0.05;
    material.roughness = 0.46;
  }
}

export function Chair({ modelPath, ...props }) {
  const { scene } = useGLTF(modelPath);
  const { colorTela, materialPatas } = useConfigStore();

  useEffect(() => {
    scene.traverse((child) => {
      if (!child.isMesh && !child.isSkinnedMesh) return;

      const partType = getPartType(child.name);
      if (!partType) return;

      // Only clone customizable meshes; the rest keep their original materials.
      if (!child.userData.vitrinaMaterialClone) {
        child.material = cloneMaterial(child.material);
        child.userData.vitrinaMaterialClone = true;
      }

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((material) => {
        if (!material) return;

        if (partType === 'metal-fijo') {
          applyMetalMaterial(material);
        } else if (partType === 'tela') {
          applyFabricMaterial(material, colorTela);
        } else if (partType === 'cuero') {
          applyLeatherMaterial(material, colorTela);
        } else {
          applyStructureMaterial(material, materialPatas);
        }

        material.needsUpdate = true;
      });
    });
  }, [scene, colorTela, materialPatas]);

  return <primitive object={scene} {...props} />;
}

useGLTF.preload('/models/chair.glb?v=ergo-materials-v7');
useGLTF.preload('/models/chair-gamer.glb?v=gamer-materials-v9');
