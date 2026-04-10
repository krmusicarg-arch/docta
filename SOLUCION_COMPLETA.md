# Docta Music Site — Documentación Completa

## 📋 Resumen Ejecutivo

**Docta** es un sitio web tributario para la banda **Docta Boss**, una agrupación de covers en vivo de **Creedence Clearwater Revival**. Es una aplicación web moderna, progresiva (PWA) y responsive construida con **React**, **Vite** y **Framer Motion**.

**Objetivo**: Presentar música en vivo, información de giras, galerías de fotos, y un reproductor de música integrado.

---

## 🏗️ Arquitectura General

### Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| **Framework Frontend** | React 18.2.0 |
| **Build Tool** | Vite 5.0.0 |
| **Gestor de Estado** | Context API + React Hooks |
| **Animaciones** | Framer Motion 10.16.4 |
| **Iconos** | Lucide React 0.292.0 |
| **Estilos** | CSS + CSS Variables + Componentes inline |
| **PWA** | Service Worker nativo (`public/service-worker.js`) |
| **Linting** | ESLint con soporte React |

### Estructura de Carpetas

```
docta/
├── index.html                 # Punto de entrada HTML
├── package.json               # Dependencias y scripts
├── vite.config.js             # Configuración del build
├── public/
│   ├── manifest.json          # Manifiesto PWA
│   ├── service-worker.js      # Service Worker para offline
│   ├── music/                 # Archivos de audio (.wav)
│   └── carro/                 # Imágenes/assets adicionales
├── src/
│   ├── main.jsx               # Bootstrap + PWA setup
│   ├── App.jsx                # Componente raíz
│   ├── index.css              # Estilos globales
│   ├── components/            # Componentes reutilizables
│   │   ├── Header.jsx
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── PromoBanner.jsx + PromoBanner.css
│   │   ├── Tour.jsx
│   │   ├── FeaturedVideos.jsx
│   │   ├── TrackList.jsx
│   │   ├── Music.jsx
│   │   ├── Gallery.jsx
│   │   ├── ImageCarousel.jsx
│   │   ├── MusicPlayer.jsx
│   │   └── Footer.jsx
│   └── context/
│       └── PlayerContext.jsx  # Estado global de reproducción
└── stitch_tmp/                # Archivos temporales (ignorar)
```

---

## 🎨 Tema y Personalización

### Variables de Color (CSS)

```css
--color-bg: #050505;        /* Negro muy oscuro */
--color-text: #f0f0f0;      /* Blanco muy claro */
--color-accent: #d4a017;    /* Oro */
--font-heading: 'Anton', sans-serif;
--font-body: 'Inter', sans-serif;
```

**Estilo Visual**: Fondo oscuro con acentos dorados. Transmite lujo, sofisticación y rock and roll.

### Estilos Globales

- **Botones**: Borde blanco por defecto; fondo blanco al pasar.
- **Enlaces**: Texto heredado con transición a oro al pasar.
- **Tipografía**: Anton para títulos (uppercase), Inter para cuerpo.
- **Layout**: Sistema de contenedor max-width 1400px.

---

## 🔌 Sistema de Estado Global (Context API)

### `PlayerContext.jsx`

El corazón del manejo de estado de reproducción musical.

#### **Proveedor**: `PlayerProvider`

```jsx
<PlayerProvider>
  {/* Toda la app tiene acceso al contexto de reproductor */}
</PlayerProvider>
```

#### **Hook Personalizado**: `usePlayer()`

Cualquier componente accede al estado con:

```jsx
const { tracks, isPlaying, playTrack, togglePlay, currentTrackIndex } = usePlayer();
```

#### **Estado Manejado**

| Estado | Tipo | Descripción |
|--------|------|------------|
| `isPlaying` | Boolean | Si la música está sonando |
| `currentTrackIndex` | Number | Índice de la canción actual |
| `isExpanded` | Boolean | Si el reproductor está expandido |
| `tracks` | Array | Lista de canciones disponibles |

#### **Métodos del Contexto**

| Método | Parámetros | Efecto |
|--------|-----------|--------|
| `playTrack(index)` | `index: Number` | Reproducir canción específica |
| `togglePlay()` | - | Alternar play/pause |
| `nextTrack()` | - | Siguiente canción (con wrap) |
| `prevTrack()` | - | Canción anterior (con wrap) |
| `setIsPlaying(bool)` | `bool: Boolean` | Controlar reproducción directamente |

---

## 🎵 Lista de Canciones

El reproductor incluye **17 canciones en vivo**:

### Canciones ALABAMA

1. **Who'll Stop The Rain (LIVE)** - 2:30
2. **Further On Up the Road (LIVE)** - 3:45
3. **Have You Ever Seen The Rain (LIVE)** - 2:40
4. **Hey Tonight (LIVE)** - 2:43
5. **Pensar En Nada (LIVE)** - 4:50
6. **Ramble Tamble (LIVE)** - 7:10

### Canciones TEATRO

7. **Cotton Field Teatro (LIVE)** - 7:28
8. **Green River (LIVE)** - 2:43
9. **Ooby Dooby (LIVE)** - 2:17
10. **Commotion Teatro (LIVE)** - 5:24
11. **Bootleg Teatro (LIVE)** - 3:10
12. **Pagan Baby Teatro (LIVE)** - 4:53
13. **Bad Moon Rising Teatro (LIVE)** - 2:25
14. **Down of the Corner Teatro (LIVE)** - 5:43
15. **Fortunate Son Teatro (LIVE)** - 4:11
16. **Proud Mary Teatro (LIVE)** - 3:17
17. **Up Around the Bend Teatro (LIVE)** - 2:38
18. **It Came Out of the Sky Teatro (LIVE)** - 2:42

**Ubicación**: `/public/music/*.wav`

---

## 📱 Componentes Principales

### 1. **App.jsx**

**Propósito**: Orquestador raíz que envuelve toda la aplicación.

**Responsabilidades**:
- Envuelve app con `<PlayerProvider>`
- Controla visibilidad del banner promo (`showPromo`)
- Renderiza estructura de página completa

**Estructura**:
```jsx
<PlayerProvider>
  <PromoBanner /> (condicional)
  <MusicPlayer /> (reproductor flotante)
  <Header />
  <Hero />
  <Tour />
  <FeaturedVideos />
  <TrackList />
  <Gallery />
  <Footer />
</PlayerProvider>
```

---

### 2. **Header.jsx**

**Propósito**: Barra de navegación superior con logo y menú.

**Características**:
- Navegación responsiva (hamburguesa para móvil)
- Detecta scroll para mostrar/ocultar header
- Control del botón "Instalar PWA"
- Manejo de estado del menú

**Dependencias**:
- Hook `usePlayer()` (para reproducidor flotante)
- Framer Motion (animaciones)

---

### 3. **Hero.jsx**

**Propósito**: Sección hero con título principal y CTA.

**Contenido**:
- Logo/imagen principal
- Título de la banda
- Botón de llamada a la acción
- Animaciones entrantes

---

### 4. **Tour.jsx**

**Propósito**: Mostrar fechas y ubicaciones de giras próximas.

**Estructura**:
- Lista de eventos con fecha, hora, ubicación
- Botones "Comprar Entradas" o "Más Info"
- Layout responsivo (grid)

---

### 5. **FeaturedVideos.jsx**

**Propósito**: Galería de videos embebidos (YouTube/Vimeo).

**Características**:
- Grid responsivo de videos
- Reproducción within page
- Títulos y descripciones

---

### 6. **TrackList.jsx**

**Propósito**: Tabla/lista interactiva de canciones.

**Funcionalidad**:
- Muestra todas las 17 canciones
- Click para reproducir
- Indicador de canción actual en reproducción
- Duración de cada pista
- Artista: "Docta Boss"

**Estado Consumido**:
- `tracks` (lista de canciones)
- `currentTrackIndex` (canción actual)
- `isPlaying` (si está reproduciendo)

---

### 7. **MusicPlayer.jsx**

**Propósito**: Reproductor de música flotante en minimalist.

**Características**:
- Botones: Play/Pause, Anterior, Siguiente
- Barra de progreso interactiva
- Control de volumen
- Indicador de tiempo actual / duración
- Expandible/colapsable
- Animaciones suaves con Framer Motion

**Hooks Utilizados**:
- `useState` (control de expandido)
- `useRef` (referencia a elemento audio)
- `useEffect` (sincronización de tiempo)
- `usePlayer()` (contexto de reproducción)

---

### 8. **Gallery.jsx**

**Propósito**: Galería de fotos del evento.

**Características**:
- Grid responsivo
- Hover effects
- Modal o lightbox para ver fotos en tamaño completo (opcional)

---

### 9. **ImageCarousel.jsx**

**Propósito**: Carrusel de imágenes reutilizable.

**Props**:
- `images` (array de URLs)
- `autoplay` (boolean)
- Flechas anterior/siguiente
- Indicadores de dots

---

### 10. **Footer.jsx**

**Propósito**: Pie de página con info de contacto y redes.

**Contenido**:
- Links a redes sociales
- Email de contacto
- Derechos de autor
- Links útiles

---

### 11. **PromoBanner.jsx + PromoBanner.css**

**Propósito**: Banner promocional superior (desactivado por defecto).

**Nota**: Controlado por `showPromo` en `App.jsx`.

---

### 12. **Navbar.jsx & Music.jsx**

**Usos**: Componentes secundarios/modulares para navegación y música.

---

## 🎬 Animaciones (Framer Motion)

**Uso Principal**: MusicPlayer y componentes de página.

**Ejemplos**:
- Fade-in al cargar
- Scale al expandir reproductor
- Slide para transiciones de canción
- Hover effects en botones

```jsx
import { motion } from 'framer-motion';

<motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Contenido
</motion.div>
```

---

## 🚀 Scripts npm

```bash
npm install                 # Instalar dependencias
npm run dev                 # Iniciar servidor de desarrollo (puerto 5173)
npm run build              # Crear build de producción (/dist)
npm run lint               # Validar ESLint
npm run preview            # Vista previa del build de producción
```

### Desarrollo

```bash
npm run dev
# Servidor activo en http://localhost:5173
# Hot reload habilitado
```

### Producción

```bash
npm run build
# Genera carpeta /dist lista para deploy
npm run preview
# Prueba el build antes de publicar
```

---

## ⚙️ Configuración Vite

**Archivo**: `vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

**Características**:
- Hot Module Replacement (HMR) automático
- Optimización de bundling
- Support para JSX nativo

---

## 📲 PWA (Progressive Web App)

### Manifiesto PWA

**Archivo**: `public/manifest.json`

- Define nombre, descripción, iconos
- Configuración de pantalla inicio
- Orientación de display

### Service Worker

**Archivo**: `public/service-worker.js`

- Caching de assets
- Soporte offline
- Actualizaciones de contenido

### Instalación en el Navegador

1. Usuario ve prompt "Instalar"
2. La app se añade a pantalla de inicio (móvil) o escritorio
3. Funciona sin conexión (con assets cacheados)

**Código en Header.jsx**:
```jsx
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // Mostrar botón de instalar
});
```

---

## 📋 Convenciones de Código

### Componentes

- **Naming**: PascalCase (`MusicPlayer.jsx`, `TrackList.jsx`)
- **Tipo**: Componentes funcionales con Hooks
- **JavaScript**: Sin TypeScript
- **JSX**: Soporte total

### Estilos

1. **CSS Global**: `src/index.css`
   - Variables de color, tipografía
   - Estilos base para elementos

2. **CSS Local**: `ComponenteName.css` (cuando sea complejo)
   - Ej: `PromoBanner.css`

3. **Inline Styles**: Props `style={{}}` para casos simples
   - Legible para estilos uno-dos bloques

4. **Prioridad**: Componente CSS > Inline > Global

### Props

Destructuring automático:
```jsx
const Component = ({ prop1, prop2 }) => (
  <div>{prop1}</div>
);
```

### Hooks

Orden recomendado:
1. `useState`
2. `useRef`
3. `useEffect`
4. `useContext` (incluir `usePlayer()`)

---

## 🔍 Detalles de Implementación

### Reproductor de Música

1. **Inicio**: `<audio>` nativo en `MusicPlayer.jsx`
2. **Control**: Context (`playTrack`, `togglePlay`)
3. **Sincronización**: `useEffect` para currentTime
4. **Progreso**: Barra interactiva sincronizada con tiempo
5. **Volumen**: Control deslizante

### Navegación

- Scroll detection → Header hide/show
- Menú hamburguesa (responsivo)
- Smooth scroll a secciones

### Responsividad

- Mobile-first approach
- Media queries en CSS
- Breakpoints: 768px (tablet), 1024px+ (desktop)

---

## 🎯 Flujo de Datos

### Reproducción Musical

```
Usuario hace click en TrackList
    ↓
onClick → playTrack(index)
    ↓
PlayerContext.playTrack actualiza estado
    ↓
MusicPlayer recibe nuevo track
    ↓
Audio HTML se reproduce
    ↓
Barra de progreso se actualiza en tiempo real
```

### Cambio de Canciones

```
Usuario hace click en botón Siguiente
    ↓
onClick → nextTrack()
    ↓
currentTrackIndex incrementa (con wrap)
    ↓
isPlaying se pone en true
    ↓
MusicPlayer re-renderiza con nueva canción
```

---

## ✨ Características Principales

| Feature | Ubicación | Estado |
|---------|-----------|--------|
| Reproductor de Música | MusicPlayer.jsx | ✅ Funcional |
| Lista de Canciones | TrackList.jsx | ✅ Funcional |
| Galería de Fotos | Gallery.jsx | ✅ Funcional |
| Información de Gira | Tour.jsx | ✅ Funcional |
| Videos Destacados | FeaturedVideos.jsx | ✅ Funcional |
| Hero Section | Hero.jsx | ✅ Funcional |
| Header/Nav | Header.jsx + Navbar.jsx | ✅ Funcional |
| Footer | Footer.jsx | ✅ Funcional |
| PWA Instalable | service-worker.js | ✅ Funcional |
| Tema Oscuro | index.css | ✅ Activo |
| Animaciones | Framer Motion | ✅ Habilitadas |
| Responsivo | CSS Media Queries | ✅ Mobile-first |

---

## 🛠️ Mantenimiento

### Agregar Nueva Canción

1. Colocar archivo `.wav` en `public/music/`
2. Editar `PlayerContext.jsx`:
   ```jsx
   const tracks = [
     // ... existentes
     {
       title: "Nueva Canción (LIVE)",
       artist: "Docta Boss",
       src: "/music/ARCHIVO_NUEVO.wav",
       duration: "X:XX"
     }
   ];
   ```

### Cambiar Colores

1. Editar variables en `src/index.css`:
   ```css
   :root {
     --color-bg: #050505;
     --color-accent: #d4a017;
   }
   ```

### Agregar Nueva Sección

1. Crear componente en `src/components/`
2. Importar en `App.jsx`
3. Renderizar en JSX deseado

---

## 📊 Diagrama de Componentes

```
App (raíz)
├── PlayerProvider (Context)
├── PromoBanner (opcional)
├── MusicPlayer (flotante)
├── Header
│   └── Navbar
├── Hero
├── Tour
├── FeaturedVideos
├── TrackList (consume Context)
├── Gallery
│   └── ImageCarousel
└── Footer
```

---

## 🚀 Deploy

### Preparar para Producción

```bash
npm run lint    # Validar código
npm run build   # Build optimizado
```

### Opciones de Hosting

- **Vercel**: Deploy automático desde Git
- **Netlify**: Drag-drop de `/dist`
- **GitHub Pages**: Push a rama `gh-pages`
- **AWS S3 + CloudFront**: Para escala
- **Servidor VPS propio**: Full control

### Checklist Pre-Deploy

- [ ] ESLint sin errores
- [ ] Build generado sin warnings
- [ ] Prueba offline (PWA)
- [ ] Audio plays correctly
- [ ] Responsive en móvil/tablet/desktop
- [ ] Performance aceptable (Lighthouse)

---

## 📝 Notas Funcionales

- **`showPromo` en App.jsx**: Cambiar a `true` para activar banner
- **Idioma**: Principalmente español; audio en inglés/español
- **Audio Format**: `.wav` (sin compresión; considerar cambiar a `.mp3` para peso)
- **Navegador Compatible**: Chrome, Firefox, Safari, Edge (moderno)
- **Mobile**: Funciona en iOS 12+ y Android 6+

---

## 🔗 Enlaces Útiles

- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev
- **Framer Motion**: https://www.framer.com/motion/
- **Lucide Icons**: https://lucide.dev
- **MDN (Web Audio)**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

---

## 📞 Resumen de Contacto (Footer)

- **Email**: [Definir]
- **Teléfono**: [Definir]
- **Redes Sociales**: [Links]
- **Ubicación**: [Ciudad/País]

---

## ✅ Conclusión

Docta Music Site es una aplicación web moderna, escalable y mantenible que celebra la música en vivo de Docta Boss. Combina React, animaciones suaves y un reproductor integrado para una experiencia inmersiva.

**Próximos pasos**: Agregar más contenido (fotos, videos), optimizar audio, y desplegar en producción.

---

**Versión**: 1.0.0  
**Última actualización**: Abril 2026  
**Autor**: Equipo de Desarrollo Docta
