# Quick Start

## Ver la app

1. Abre [PREVIEW.html](PREVIEW.html) en tu navegador.
2. Usa la demo interactiva para probar el flujo de la taquería.

## Levantar el proyecto localmente

```bash
npm install
npm run dev
```

## Generar build

```bash
npm run build
```

## Qué esperar

- `npm run dev` levanta el entorno local con Vite.
- `npm run build` genera `dist/`.
- El repositorio no incluye backend Django ejecutable.

## Problemas comunes

- Si el build falla, revisa que Node.js y npm estén instalados.
- Si `PREVIEW.html` no carga bien, ábrelo con un navegador moderno.
- Si Vercel no detecta la app, confirma que la salida del build sea `dist`.

# Mac/Linux
python3 -m venv venv
source venv/bin/activate

# Verifica que esté activo (debe mostrar (venv) en terminal)
```

---

## 📝 Comandos Útiles

### Frontend

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Previsualizar build
npm run preview

# Lint (verificar errores)
npm run lint

# Formatear código
npm run format
```

### Backend

```bash
# Crear migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser

# Ejecutar servidor
python manage.py runserver

# Shell interactivo de Django
python manage.py shell

# Crear datos de ejemplo
python manage.py populate_tacos

# Recolectar archivos estáticos
python manage.py collectstatic
```

---

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Tests con cobertura
npm test -- --coverage

# Tests en modo watch
npm test -- --watch
```

---

## 📊 Verificar Instalación

### Checklist

```bash
# 1. Node.js instalado
node --version  # Debe ser 16+

# 2. npm instalado
npm --version   # Debe ser 8+

# 3. Python instalado
python --version  # Debe ser 3.8+

# 4. Dependencias React instaladas
npm list react  # Debe estar listado

# 5. Dependencias Django instaladas
pip list | grep Django  # Debe estar listado

# 6. Puerto 5173 disponible
netstat -ano | findstr :5173  # No debe mostrar nada

# 7. Puerto 8000 disponible
netstat -ano | findstr :8000  # No debe mostrar nada
```

---

## 🎯 Estructura de Carpetas Mínima para Empezar

```
Algoritmo de sabor/
├── src/
│   ├── TacoPicker.jsx      ✅ Ya creado
│   ├── App.jsx             ✅ Ya creado
│   └── main.jsx            (crear)
│
├── tailwind.config.js       ✅ Ya creado
├── package.json            ✅ Ya creado
├── .env.example            ✅ Ya creado
│
└── django_backend/         (crear)
    ├── manage.py           (crear)
    ├── requirements.txt    (crear)
    ├── config/
    │   ├── settings.py     (crear)
    │   └── urls.py         (crear)
    └── tacos/
        ├── models.py       (crear)
        ├── views.py        (crear)
        └── urls.py         (crear)
```

---

## 📞 Recursos de Ayuda

- **React Docs:** https://react.dev
- **Tailwind Docs:** https://tailwindcss.com/docs
- **Django Docs:** https://docs.djangoproject.com
- **Vite Docs:** https://vitejs.dev

---

## ✅ Checklist de Verificación

### Frontend Funcionando

- [ ] `npm run dev` sin errores
- [ ] Browser abre automáticamente en http://localhost:5173
- [ ] Pantalla home visible con botón "Descubrir mi taco ideal"
- [ ] Estilos coloridos (rojo, naranja) visibles
- [ ] Click en botón no da error (esperará API)

### Backend Funcionando

- [ ] `python manage.py runserver` sin errores
- [ ] http://localhost:8000/admin/ accesible
- [ ] http://localhost:8000/api/recommend-taco/ retorna error 405 (normal sin POST)

### Integración Funcionando

- [ ] Responder preguntas en frontend
- [ ] Ver spinner de carga
- [ ] Recibir recomendación del backend
- [ ] Mostrar resultado con taco

---

## 🔐 Seguridad Pre-Producción

**¡IMPORTANTE! Antes de ir a producción:**

```bash
# 1. Cambiar SECRET_KEY
python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'

# 2. DEBUG = False
echo "DEBUG=False" >> .env

# 3. ALLOWED_HOSTS configurado
echo "ALLOWED_HOSTS=tudominio.com,www.tudominio.com" >> .env

# 4. CSRF token en requests
# (automático con Django)

# 5. HTTPS habilitado
# (configurar en hosting)
```

---

## 🎓 Próximos Pasos

1. **Lee:** `README.md`
2. **Código:** `TacoPicker.jsx`
3. **Backend:** `DJANGO_BACKEND.md`
4. **Testing:** `TESTING.md`
5. **Deploy:** `DESPLIEGUE.md`

---

**¡Estás listo para empezar! 🚀**

*Si tienes dudas, consulta la documentación completa o los archivos de ejemplo.*
