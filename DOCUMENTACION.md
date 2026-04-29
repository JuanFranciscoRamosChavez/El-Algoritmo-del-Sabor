# Documentación Técnica

## Resumen

El repositorio contiene una interfaz mobile-first para una taquería y una demo interactiva. El foco de este proyecto, tal como está en esta carpeta, es la experiencia visual y la preparación para despliegue estático.

## Archivos principales

- [index.html](index.html): portada del proyecto.
- [PREVIEW.html](PREVIEW.html): demo interactiva.
- [TacoPicker.jsx](TacoPicker.jsx): referencia del componente principal.
- [App.jsx](App.jsx): wrapper de la app.
- [hooks.js](hooks.js): hooks auxiliares.

## Tecnología usada

- React 18
- Vite
- Tailwind CSS vía CDN en la vista previa estática
- JavaScript moderno

## Flujo de la interfaz

1. Home con llamada a la acción.
2. Quiz de 3 preguntas.
3. Pantalla de carga.
4. Pantalla de resultado.

## Construcción local

```bash
npm install
npm run build
```

El comando de build genera `dist/`, que es la carpeta que usa Vercel para publicar el sitio.

## Vista previa

Abre [PREVIEW.html](PREVIEW.html) en el navegador si quieres probar el flujo sin levantar el servidor de desarrollo.

## Integración con backend

Si más adelante conectas un backend Django, la URL se debe definir por variable de entorno `VITE_API_URL` en la integración del frontend. Esta carpeta no incluye un backend ejecutable.

## Notas de consistencia

- No existe una carpeta `src/` en este repositorio.
- No hay una configuración de producción de Django dentro de esta carpeta.
- El repositorio está pensado para GitHub y Vercel como hosting estático del frontend/demo.

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
