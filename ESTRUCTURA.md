# 📚 Índice de Archivos - El Algoritmo del Sabor

## 📖 Documentación Principal

### [README.md](README.md)
**Inicio rápido y guía general**
- Descripción del proyecto
- Requisitos previos
- Instrucciones de instalación
- Estructura del proyecto
- Troubleshooting
- Roadmap futuro

---

### [DOCUMENTACION.md](DOCUMENTACION.md)
**Especificación técnica completa**
- Arquitectura y stack
- Flujo de pantallas (Home → Quiz → Loading → Result)
- Endpoint API esperado (POST `/api/recommend-taco/`)
- Variables de estado
- Funciones principales
- Paleta de colores
- Optimizaciones implementadas
- Consideraciones móviles

---

### [DJANGO_BACKEND.md](DJANGO_BACKEND.md)
**Guía completa del backend Django**
- Configuración de settings.py (CORS, REST Framework)
- Modelo Taco (campos y opciones)
- Serializers (TacoSerializer, TacoRecommendationSerializer)
- Views y lógica de recomendación
- URLs routing
- Admin configuration
- Script de población de datos
- Paso a paso de setup

---

### [TESTING.md](TESTING.md)
**Estrategia de testing**
- Tests unitarios del componente
- Tests de hooks
- Configuración de Vitest
- Ejemplos de tests para cada pantalla
- Mocking de API
- Setup de testing

---

### [EXTENSIONES.md](EXTENSIONES.md)
**Código adicional y mejoras**
1. Integración con carrito de compras
2. Componente ShoppingCart
3. Sistema de contextos (CartContext)
4. Persistencia con localStorage
5. Sistema de notificaciones
6. Autenticación y historial
7. Analytics y tracking
8. Optimizaciones de performance
9. Lazy loading e images

---

### [DESPLIEGUE.md](DESPLIEGUE.md)
**Guía de despliegue a producción**
- Opciones Frontend: Vercel, Netlify, AWS S3, Cloudflare
- Opciones Backend: Heroku, Railway, DigitalOcean, EC2, Docker
- Configuración de variables de entorno
- Checklist pre-producción
- Monitoreo post-producción
- Comandos útiles

---

## 💻 Código React

### [TacoPicker.jsx](TacoPicker.jsx)
**Componente principal - 500+ líneas**
- Gestión de estados (4 pantallas)
- Cuestionario dinámico con 3 preguntas
- Comunicación con API (fetch)
- Manejo de errores
- Animaciones y transiciones
- Responsivo mobile-first

**Características:**
```
✅ Home Screen - Pantalla de inicio
✅ Quiz Screen - Cuestionario con stepper
✅ Loading Screen - Spinner animado
✅ Result Screen - Resultado con detalles
✅ Error Handling - Manejo robusto de errores
✅ Thin Client - Envía datos a Django
```

### [App.jsx](App.jsx)
**Componente wrapper**
- Importa y renderiza TacoPicker
- Estructura base de la aplicación

### [hooks.js](hooks.js)
**Hooks personalizados reutilizables**
- `useTacoRecommendation()` - Lógica de fetch con timeout
- `useQuizState()` - Gestión del estado del quiz

---

## ⚙️ Configuración

### [tailwind.config.js](tailwind.config.js)
**Configuración de Tailwind CSS**
- Paleta de colores personalizada (rojo, naranja, verde)
- Tipografía del proyecto
- Espaciado y borderRadius
- Animaciones personalizadas
- Fuentes de Google (Plus Jakarta Sans, Be Vietnam Pro)

### [package.json](package.json)
**Dependencias y scripts**
- Scripts: dev, build, preview, lint, format
- Dependencias: React 18+
- DevDependencies: Vite, Tailwind, ESLint, Prettier

### [.env.example](.env.example)
**Plantilla de variables de entorno**
- VITE_API_URL
- VITE_API_TIMEOUT
- VITE_ENV
- Feature flags

---

## 🗂️ Estructura Recomendada del Proyecto

```
el-algoritmo-del-sabor/
│
├── 📁 public/
│   └── index.html
│
├── 📁 src/
│   ├── 📁 components/
│   │   ├── TacoPicker.jsx          ← Componente principal
│   │   ├── ShoppingCart.jsx        ← De extensiones
│   │   └── NotificationToast.jsx   ← De extensiones
│   │
│   ├── 📁 contexts/
│   │   ├── CartContext.jsx         ← De extensiones
│   │   └── NotificationContext.jsx ← De extensiones
│   │
│   ├── 📁 hooks/
│   │   ├── useTacoRecommendation.js
│   │   ├── useQuizState.js
│   │   ├── useCart.js              ← De extensiones
│   │   ├── useLocalStorage.js      ← De extensiones
│   │   └── useNotification.js      ← De extensiones
│   │
│   ├── 📁 utils/
│   │   ├── analytics.js            ← De extensiones
│   │   └── performance.js          ← De extensiones
│   │
│   ├── 📁 __tests__/
│   │   ├── TacoPicker.test.jsx
│   │   └── setup.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── 📁 django_backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env.example
│   │
│   ├── 📁 config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   │
│   ├── 📁 tacos/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   └── 📁 management/
│   │       └── 📁 commands/
│   │           └── populate_tacos.py
│   │
│   └── 📁 staticfiles/ (generado)
│
├── .gitignore
├── .env.example
├── package.json
├── tailwind.config.js
├── vite.config.js
├── vitest.config.js
│
├── 📄 README.md              ← Empieza aquí
├── 📄 DOCUMENTACION.md
├── 📄 DJANGO_BACKEND.md
├── 📄 TESTING.md
├── 📄 EXTENSIONES.md
├── 📄 DESPLIEGUE.md
└── 📄 ESTRUCTURA.md          ← Este archivo
```

---

## 🎯 Flujo de Aprendizaje Recomendado

1. **Lee primero:** `README.md`
   - Entiende qué es el proyecto
   - Instala dependencias

2. **Código principal:** `TacoPicker.jsx`
   - Componente central
   - Lógica de flujo

3. **Técnica:** `DOCUMENTACION.md`
   - Entiende la arquitectura
   - Estados y funciones

4. **Backend:** `DJANGO_BACKEND.md`
   - Configura Django
   - Crea modelo y endpoints

5. **Mejoras:** `EXTENSIONES.md`
   - Agrega carrito
   - Notificaciones
   - Analytics

6. **Testing:** `TESTING.md`
   - Aprende a testear
   - Ejecuta tests

7. **Deploy:** `DESPLIEGUE.md`
   - Elige tu hosting
   - Deploy a producción

---

## 🎨 Pantallas Visuales

### Flujo de Usuario

```
START
  ↓
[HOME SCREEN]
  • Icono de taco animado 🌮
  • Título: "El Algoritmo del Sabor"
  • Botón: "Descubrir mi taco ideal"
  ↓
[QUIZ - PREGUNTA 1]
  • Barra de progreso: 33%
  • Pregunta: "¿Qué tanto te gusta el picante?"
  • Opciones: 🟢 Suave | 🟡 Medio | 🔴 Picoso
  • Botón: "Siguiente →"
  ↓
[QUIZ - PREGUNTA 2]
  • Barra de progreso: 66%
  • Pregunta: "¿Cuánta hambre tienes?"
  • Opciones: 🥙 Aperitivo | 🤤 Normal | 🦁 ¡Mucha!
  • Botones: "← Atrás" | "Siguiente →"
  ↓
[QUIZ - PREGUNTA 3]
  • Barra de progreso: 100%
  • Pregunta: "¿Cuál es tu proteína favorita?"
  • Opciones: 🐔 Pollo | 🐄 Res | 🐷 Cerdo
  • Botones: "← Atrás" | "¡Encontrar! 🎯"
  ↓
[LOADING SCREEN]
  • Spinner animado
  • Mensaje: "Analizando tu sabor..."
  • Puntos pulsantes
  ↓
[RESULT SCREEN]
  • Icono del taco 🌮
  • Nombre: "El Fuego Absoluto"
  • Descripción breve
  • Detalles: Picante | Porción | Proteína
  • Precio: $8.99
  • Botones: "🛒 Pedir ahora" | "🔄 Descubrir otro taco"
  ↓
END / LOOP
```

---

## 📊 Resumen de Tecnologías

### Frontend
- **React 18** - UI Library
- **Vite** - Build tool (súper rápido)
- **Tailwind CSS 3** - Styling
- **Vitest** - Testing
- **Fetch API** - HTTP requests

### Backend
- **Django 4** - Web framework
- **Django REST Framework** - API
- **PostgreSQL** - Database
- **Gunicorn** - WSGI server
- **Nginx** - Reverse proxy

### Deployment
- **Frontend:** Vercel, Netlify, AWS S3, Cloudflare Pages
- **Backend:** Heroku, Railway, DigitalOcean, AWS EC2, Docker

---

## 🚀 Quick Start (30 segundos)

```bash
# 1. Frontend
npm install
cp .env.example .env.local
npm run dev
# → http://localhost:5173

# 2. Backend (en otra terminal)
cd django_backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py populate_tacos
python manage.py runserver
# → http://localhost:8000
```

---

## 📞 Soporte y Contribución

- **Issues:** GitHub Issues
- **Pull Requests:** Welcome!
- **Documentación:** Mejoras siempre bienvenidas

---

## ✅ Checklist Completado

- ✅ Componente React profesional (TacoPicker.jsx)
- ✅ Diseño Mobile-first responsive
- ✅ Colores vibrantes (rojo, naranja, verde)
- ✅ Thin client (lógica en backend)
- ✅ 3 preguntas cuestionario con stepper
- ✅ Pantalla de carga animada
- ✅ Pantalla de resultado
- ✅ Hooks reutilizables
- ✅ Error handling robusto
- ✅ Documentación completa
- ✅ Ejemplos de Django backend
- ✅ Testing setup
- ✅ Extensiones opcionales
- ✅ Guía de despliegue
- ✅ Variables de entorno
- ✅ Configuración Tailwind

---

**Proyecto completado y listo para producción 🎉**

*Última actualización: 29 de abril de 2026*
