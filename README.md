# 🌮 El Algoritmo del Sabor - Frontend React

Una aplicación móvil moderna y vibrante para descubrir tu taco ideal usando React, Tailwind CSS y Django REST Framework.

## ✨ Características Principales

- 📱 **Mobile-First Design**: Optimizado para dispositivos móviles con soporte para notch/isla
- 🎨 **Diseño Vibrante**: Paleta de colores de taquería (rojo, naranja, verde)
- ⚡ **Ultra Rápido**: Thin client con lógica en backend
- 🎯 **Cuestionario Intuitivo**: 3 preguntas simples con interfaz tipo stepper
- 🔄 **Animaciones Suaves**: Transiciones y efectos visuales profesionales
- 🎓 **Arquitectura Limpia**: Componentes reutilizables y hooks personalizados

## 📋 Requisitos Previos

- **Node.js** 16+ y npm/yarn
- **Python** 3.8+ y Django 4.0+
- **React** 18+
- **Tailwind CSS** 3.3+

## 🚀 Inicio Rápido

### 1. Clonar o descargar el proyecto

```bash
git clone <tu-repo>
cd el-algoritmo-del-sabor
```

### 2. Configurar Frontend (React)

```bash
# Instalar dependencias
npm install

# Crear archivo de variables de entorno
cp .env.example .env.local

# Editar .env.local con tu URL de API
# VITE_API_URL=http://localhost:8000

# Ejecutar en modo desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

### 3. Configurar Backend (Django)

Consulta [DJANGO_BACKEND.md](./DJANGO_BACKEND.md) para instrucciones completas de:
- Instalación de dependencias
- Configuración de CORS
- Creación del modelo Taco
- Población de datos de ejemplo

```bash
# Comandos rápidos
python manage.py makemigrations
python manage.py migrate
python manage.py populate_tacos
python manage.py runserver
```

El backend estará disponible en `http://localhost:8000`

## 📁 Estructura del Proyecto

```
src/
├── TacoPicker.jsx          # Componente principal
├── App.jsx                 # Wrapper de la aplicación
├── hooks.js                # Hooks personalizados
├── index.css               # Estilos globales
└── main.jsx               # Entry point

public/
└── index.html             # HTML base

.env.example               # Plantilla de variables de entorno
tailwind.config.js         # Configuración de Tailwind CSS
package.json               # Dependencias del proyecto
```

## 🎮 Flujo de Usuario

1. **Pantalla de Inicio** → Usuario ve el botón "Descubrir mi taco ideal"
2. **Cuestionario** → 3 preguntas con opciones interactivas:
   - ¿Qué tanto te gusta el picante?
   - ¿Cuánta hambre tienes?
   - ¿Cuál es tu proteína favorita?
3. **Carga** → Spinner mientras se consulta el backend
4. **Resultado** → Muestra el taco recomendado con detalles y botón "Pedir ahora"

## 🔧 Configuración

### Variables de Entorno

```env
# .env.local
VITE_API_URL=http://localhost:8000
VITE_API_TIMEOUT=10000
VITE_ENV=development
```

### Tailwind CSS

Personaliza los colores en `tailwind.config.js`:
- **primary** (Rojo): #b90027
- **secondary** (Naranja): #fd8100
- **tertiary** (Verde/Teal): #00656f

## 📡 API Endpoint

### Recomendación de Taco

**POST** `/api/recommend-taco/`

**Request:**
```json
{
  "spiciness": "hot" | "medium" | "mild",
  "hunger": "heavy" | "normal" | "light",
  "preference": "beef" | "chicken" | "pork"
}
```

**Response (HTTP 200):**
```json
{
  "id": 1,
  "name": "El Fuego Absoluto",
  "description": "Explosión de sabor con carne asada marinada en chipotle",
  "price": "8.99",
  "spiciness": "hot",
  "size": "heavy",
  "protein": "beef",
  "ingredients": ["carne asada", "chipotle", "cebolla"],
  "calories": 450
}
```

## 🎨 Componentes Principales

### TacoPicker.jsx
Componente principal que maneja todo el flujo:
- Gestión de estados (home, quiz, loading, result)
- Navegación entre pantallas
- Comunicación con API

### Hooks Personalizados

**useTacoRecommendation**
```jsx
const { recommend, loading, error, result } = useTacoRecommendation();
```

**useQuizState**
```jsx
const {
  screen,
  currentStep,
  answers,
  handleOptionSelect,
  goToNextStep,
  goToPreviousStep,
  reset
} = useQuizState();
```

## 🎓 Buenas Prácticas Implementadas

✅ **Thin Client**: Toda lógica de negocio en Django
✅ **Mobile-First**: Diseño primero en móvil, escalable a desktop
✅ **Componentes Reutilizables**: Hooks para lógica compartida
✅ **Error Handling**: Manejo robusto de errores
✅ **Responsive**: Funciona en cualquier tamaño de pantalla
✅ **Accesibilidad**: Safe area padding para notch/isla
✅ **Performance**: Animaciones optimizadas sin bloqueos
✅ **Semántica**: Código limpio y bien documentado

## 🚢 Deployment

### Frontend (Vercel, Netlify, etc.)

```bash
npm run build
# Subir carpeta 'dist/' a tu proveedor de hosting
```

### Backend (Heroku, Railway, etc.)

Consulta [DJANGO_BACKEND.md](./DJANGO_BACKEND.md) para instrucciones específicas.

## 🐛 Troubleshooting

### Error: CORS bloqueado
- Asegúrate que Django tiene CORS configurado correctamente
- Verifica `CORS_ALLOWED_ORIGINS` en settings.py

### Error: API no responde
- Verifica que Django está ejecutándose en `http://localhost:8000`
- Comprueba la URL en `.env.local`

### Estilos no se aplican
- Ejecuta `npm run build` para compilar Tailwind
- Limpia caché del navegador (Ctrl+Shift+R)

## 📚 Documentación Adicional

- [DOCUMENTACION.md](./DOCUMENTACION.md) - Especificación técnica completa
- [DJANGO_BACKEND.md](./DJANGO_BACKEND.md) - Guía de backend

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor:
1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](./LICENSE) para más detalles.

## 👨‍💻 Autor

**Tu Nombre** - Senior Frontend Developer

## 🎯 Roadmap Futuro

- [ ] Autenticación de usuario
- [ ] Historial de pedidos
- [ ] Sistema de favoritos
- [ ] Integración con carrito
- [ ] PWA support
- [ ] Dark mode
- [ ] Notificaciones push
- [ ] Analytics

---

**¡Disfruta descubriendo tu taco ideal! 🌮✨**
