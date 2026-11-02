# Vitrina 3D de Sillas Ergonómicas y Gamer

Una aplicación web interactiva desarrollada con React, Vite y React Three Fiber que permite a los usuarios explorar y visualizar modelos 3D de sillas de oficina (Ergonómica y Gamer) desde cualquier ángulo, con controles de rotación y zoom optimizados.

## Demo en Vivo

Puedes ver la aplicación desplegada y funcionando en el siguiente enlace:

**[https://vitrina-sillas-3d.vercel.app/](https://vitrina-sillas-3d.vercel.app/)**

## Características Principales (Sprint 1)

Este proyecto fue desarrollado siguiendo la metodología ágil SCRUM. Las funcionalidades implementadas corresponden al Sprint 1, que incluye:

- Visualización 3D Interactiva (HU-01): Renderizado de modelos 3D (`.glb`) con capacidad de rotación de 360 grados y zoom.
- Selector de Producto: Interfaz de usuario para alternar fluidamente entre la silla Ergonómica y la Gamer, actualizando dinámicamente el modelo 3D y la información del producto (nombre y precio).
- Diseño Responsive (HU-02): La escena 3D y la interfaz gráfica se adaptan a diferentes tamaños de pantalla.
- Control de Zoom Inteligente: Implementación de límites de cámara para asegurar que los modelos siempre se visualicen en su tamaño óptimo, evitando que se pierdan en el lienzo.
- Interfaz de Usuario Premium: Diseño oscuro, tipografía moderna y componentes flotantes que no interfieren con la interacción del modelo 3D.

## Stack Tecnológico, Librerías y Versiones

Para garantizar el correcto funcionamiento de la aplicación, se utilizaron las siguientes herramientas y librerías:

### Entorno de Ejecución y Gestión de Paquetes
- **Node.js:** v20.19.0 o superior (Requerido por Vite).
- **npm:** v10.0.0 o superior (Gestor de paquetes).

### Núcleo del Frontend
- **Vite:** v6.0.0 o superior (Herramienta de construcción y servidor de desarrollo).
- **React:** v18.3.1 o superior (Biblioteca principal de UI).
- **React DOM:** v18.3.1 o superior (Renderizador de React para el navegador).
- **ESLint:** v9.0.0 o superior (Herramienta de análisis estático de código para mantener buenas prácticas).

### Gráficos 3D y Utilidades
- **Three.js:** v0.170.0 o superior (Motor principal de gráficos 3D).
- **@react-three/fiber:** v8.17.0 o superior (Renderizador de React para Three.js).
- **@react-three/drei:** v9.114.0 o superior (Colección de abstracciones y utilidades para React Three Fiber, como OrbitControls, Bounds, Center y Environment).

### Herramientas de Desarrollo y Despliegue
- **Visual Studio Code:** Editor de código.
- **Git:** Sistema de control de versiones (v2.40.0 o superior).
- **GitHub:** Plataforma de alojamiento del repositorio de código.
- **Vercel:** Plataforma de despliegue en la nube (CI/CD).
- **Sketchfab:** Plataforma de origen de los modelos 3D en formato `.glb`.

## Requisitos Previos

Antes de ejecutar este proyecto, asegúrate de tener instalado:
- Node.js (versión 20.19.0 o superior).
- npm o yarn/pnpm.

## Instalación y Ejecución Local

Sigue estos pasos para clonar y ejecutar el proyecto en tu máquina:

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/estiradikal/vitrina-sillas-3d.git
    cd vitrina-sillas-3d