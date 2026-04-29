# Documentación: El Algoritmo del Sabor - Frontend React

## 📋 Descripción General

Componente React de thin client para una aplicación móvil de recomendación de tacos. El flujo es:
1. Usuario selecciona preferencias (3 preguntas)
2. Frontend envía datos a Django REST Framework
3. Backend procesa y retorna la recomendación de taco
4. Frontend muestra el resultado

---

## 🏗️ Arquitectura Técnica

### Stack
- **React** 18+
- **Tailwind CSS** (con configuración personalizada)
- **Fetch API** para comunicación HTTP
- **Mobile-First Responsive Design**

### Características
✅ Thin Client (sin lógica de negocio)
✅ Mobile-first + Responsive
✅ Animaciones fluidas y rápidas
✅ UX intuitivo con 4 pantallas
✅ Colores vibrantes de taquería
✅ Estilos definidos en Tailwind CSS

---

## 🎨 Pantallas del Flujo

### 1. Home Screen
- Botón principal: "Descubrir mi taco ideal"
- Animación de taco bouncing
- Descripción del proceso
- Gradiente rojo-naranja

### 2. Quiz Screen (3 pasos)
- **Paso 1**: ¿Qué tanto te gusta el picante? (suave, medio, picoso)
- **Paso 2**: ¿Cuánta hambre tienes? (aperitivo, normal, mucha)
- **Paso 3**: ¿Cuál es tu proteína favorita? (pollo, res, cerdo)

Características:
- Barra de progreso animada
- Tarjetas interactivas con opciones
- Botones Atrás/Siguiente
- Indicadores visuales de respuesta

### 3. Loading Screen
- Spinner animado
- Mensaje: "Analizando tu sabor..."
- Puntos pulsantes

### 4. Result Screen
- Nombre del taco recomendado
- Descripción breve
- Detalles visuales (picante, porción, proteína)
- Precio
- Botón "Pedir ahora"
- Botón "Descubrir otro taco"

---

## 📡 Endpoint Django Esperado

### Solicitud
```
POST http://localhost:8000/api/recommend-taco/
Content-Type: application/json

{
  "spiciness": "hot" | "medium" | "mild",
  "hunger": "heavy" | "normal" | "light",
  "preference": "beef" | "chicken" | "pork"
}
```

### Respuesta Esperada (HTTP 200)
```json
{
  "id": 1,
  "name": "El Fuego Absoluto",
  "description": "Una explosión de sabor con carne asada marinada en chipotle, acompañada de cebolla caramelizada y cilantro.",
  "price": "8.99",
  "spiciness": "hot",
  "size": "heavy",
  "protein": "beef",
  "ingredients": ["carne asada", "chipotle", "cebolla", "cilantro", "lima"],
  "calories": 450
}
```

---

## 🔧 Configuración Requerida

### Django (settings.py)
```python
# Permitir solicitudes desde localhost:3000 (o tu puerto React)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
]

CORS_ALLOW_CREDENTIALS = True

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 100,
}
```

### Django (urls.py)
```python
from django.urls import path
from . import views

urlpatterns = [
    path('api/recommend-taco/', views.recommend_taco, name='recommend_taco'),
]
```

### Django (views.py - Ejemplo)
```python
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse

@api_view(['POST'])
def recommend_taco(request):
    spiciness = request.data.get('spiciness')
    hunger = request.data.get('hunger')
    preference = request.data.get('preference')
    
    # Lógica de recomendación (IA, BD, reglas de negocio, etc.)
    taco = find_best_taco(spiciness, hunger, preference)
    
    return Response({
        'id': taco.id,
        'name': taco.name,
        'description': taco.description,
        'price': taco.price,
        'spiciness': spiciness,
        'size': hunger,
        'protein': preference,
        'ingredients': taco.ingredients,
        'calories': taco.calories,
    })
```

---

## 🚀 Instalación y Uso

### 1. Instalación de Dependencias
```bash
npm install
# o
yarn add
```

### 2. Estructura del Proyecto
```
src/
├── App.jsx              # Componente wrapper
├── TacoPicker.jsx       # Componente principal
├── index.css            # Estilos globales (si aplica)
└── main.jsx             # Entry point
```

### 3. Ejecución
```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm run start
```

### 4. Configurar URL del Backend
En `TacoPicker.jsx`, línea ~95:
```jsx
const response = await fetch('http://localhost:8000/api/recommend-taco/', {
  // Cambiar URL según tu entorno
});
```

---

## 🎯 Características del Componente

### Estados (State)
- `screen`: 'home' | 'quiz' | 'loading' | 'result'
- `currentStep`: número del paso actual (0-2)
- `answers`: { spiciness, hunger, preference }
- `result`: objeto con datos del taco recomendado
- `error`: mensaje de error (si aplica)

### Funciones Principales
- `submitQuiz()`: Envía respuestas al backend
- `handleOptionSelect()`: Captura selección de opción
- `goToNextStep()`: Avanza al siguiente paso
- `goToPreviousStep()`: Retrocede un paso
- `restart()`: Reinicia toda la experiencia

---

## 🎨 Paleta de Colores (Tailwind Config)

```
Rojo (Primario):     #b90027
Naranja (Secundario): #fd8100
Verde/Teal:          #00656f
Blanco:              #fff8f7
Gris:                #5d3f3e (variante)
```

---

## ⚡ Optimizaciones Implementadas

1. **Mobile-First**: Toda la UI es responsive desde móviles
2. **Animaciones Suaves**: `transition-all duration-300`
3. **Feedback Visual**: Escalado en clicks (`active:scale-95`)
4. **Accesibilidad**: Safe area padding para notch/isla
5. **Thin Client**: Toda lógica de negocio en backend
6. **Error Handling**: Manejo de errores con fallback
7. **UX Intuitiva**: Progreso visual con barra y indicadores

---

## 🐛 Manejo de Errores

Si el backend retorna error (500, 404, etc.):
```jsx
catch (err) {
  setError(err.message || 'Algo salió mal. Intenta de nuevo.');
  setScreen('home');
}
```

El usuario verá un mensaje de error en la pantalla home y podrá reintentar.

---

## 📱 Consideraciones Mobile

- Botones grandes (py-4 mínimo) para fácil tapping
- Padding superior para notch: `env(safe-area-inset-top)`
- Gradientes que se adaptan bien en pantallas oscuras
- Emojis para mayor engagement visual
- Animaciones que no afecten rendimiento

---

## 🔄 Flujo de Datos

```
Usuario → [Home] → Click "Descubrir"
         ↓
       [Quiz]
         ↓ (Responde 3 preguntas)
         ↓
    Backend POST request
         ↓ (Django procesa)
         ↓
    [Loading] (spinner)
         ↓ (Backend responde)
         ↓
       [Result] (Mostrar taco)
         ↓
  [Pedir ahora] o [Descubrir otro]
```

---

## 📝 Notas Importantes

1. **CORS**: Asegúrate de habilitar CORS en Django
2. **Timeout**: Si el backend tarda >10s, considera agregar timeout
3. **Validación**: El backend debe validar todas las entradas
4. **Escalabilidad**: El componente es stateless respecto al backend
5. **Testing**: Usa Cypress o Playwright para E2E testing

---

## 🎓 Mejoras Futuras

- [ ] Agregar autenticación de usuario
- [ ] Guardar historial de pedidos
- [ ] Recomendaciones personalizadas basadas en historial
- [ ] Sistema de favoritos
- [ ] Integración con carrito de compras
- [ ] PWA (Progressive Web App)
- [ ] Animaciones más sofisticadas
- [ ] Dark mode

---

**Versión**: 1.0
**Última actualización**: 2026-04-29
**Autor**: Tu Nombre / Tu Equipo
