# 🌮 El Algoritmo del Sabor

Interfaz mobile-first para una taquería, con preview interactivo, landing page y archivos de referencia en React. El repositorio está preparado para GitHub y Vercel.

## Qué incluye

- [index.html](index.html): portada principal del proyecto.
- [PREVIEW.html](PREVIEW.html): demo interactiva del flujo de la app.
- [TacoPicker.jsx](TacoPicker.jsx): componente principal de referencia.
- [App.jsx](App.jsx) y [hooks.js](hooks.js): integración y lógica auxiliar.
- [DESPLIEGUE.md](DESPLIEGUE.md), [DJANGO_BACKEND.md](DJANGO_BACKEND.md), [TESTING.md](TESTING.md): documentación de apoyo.

## Tecnologías

- React 18
- Vite
- Tailwind CSS
- JavaScript moderno

## Requisitos

- Node.js 16 o superior
- npm

## Inicio rápido

```bash
npm install
npm run build
```

El build genera la carpeta `dist/`, lista para desplegar en Vercel u otro hosting estático.

## Vista previa local

```bash
npm run dev
```

Si prefieres revisar la demo sin levantar el entorno de desarrollo, abre [PREVIEW.html](PREVIEW.html) directamente en el navegador.

## Despliegue en Vercel

1. Sube este repositorio a GitHub.
2. Importa el proyecto en Vercel.
3. Usa estas opciones si Vercel no las detecta automáticamente:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Agrega `VITE_API_URL` si conectas un backend Django.

## Estado del proyecto

- La carpeta está lista para GitHub.
- `npm run build` funciona correctamente.
- `dist/` y `node_modules/` están ignorados por Git.

## Notas

- La documentación técnica completa está en [DOCUMENTACION.md](DOCUMENTACION.md).
- La guía de despliegue está en [DESPLIEGUE.md](DESPLIEGUE.md).
# El-Algoritmo-del-Sabor
