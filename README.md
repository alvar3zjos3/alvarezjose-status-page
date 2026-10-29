# alvarezjose.me — Status Page

Página empresarial de mantenimiento y estado operativo para [alvarezjose.me](https://alvarezjose.me), diseñada con una estética tecnológica premium y preparada para funcionar como una Progressive Web App.

## Descripción

Este proyecto presenta una experiencia de mantenimiento clara, elegante y orientada a la continuidad del servicio. Informa sobre actualizaciones programadas de infraestructura, muestra el estado de conectividad del dispositivo y conserva una versión funcional mediante caché local cuando el usuario está fuera de línea.

## Características

- Interfaz responsive con enfoque mobile-first.
- Diseño oscuro de estilo tecnológico premium.
- Glassmorphism, iluminación ambiental y acentos ámbar.
- Badge dinámico con los estados `Sistema en Mantenimiento` y `Fuera de Red`.
- Diagnóstico en vivo mediante `navigator.onLine`.
- Indicador de disponibilidad de caché local.
- Botón para verificar manualmente el estado de conexión.
- Service Worker con estrategia de caché offline.
- Manifest PWA preparado para instalación.
- Captura global de errores mediante `window.onerror` y `unhandledrejection`.
- HTML semántico y atributos ARIA para mejorar la accesibilidad.

## Estructura del proyecto

```text
.
├── index.html          # Estructura semántica y contenido principal
├── styles.css          # Sistema visual, responsive y animaciones
├── app.js              # Estado de red, caché y captura de errores
├── sw.js               # Service Worker y funcionamiento offline
├── manifest.json       # Configuración PWA
├── favicon.svg         # Favicon de marca
├── icon-192.svg        # Icono PWA de 192 × 192
├── icon-512.svg        # Icono PWA de 512 × 512
├── routes.json         # Declaración de rutas para el entorno gestionado
├── vercel.json         # Configuración de build y cabeceras para Vercel
├── package.json        # Scripts de desarrollo y build estático
└── LICENSE             # Licencia propietaria
```

## Ejecución local

El proyecto no necesita dependencias externas. Requiere Python 3 para iniciar un servidor local y probar correctamente el Service Worker:

```bash
python3 -m http.server 3000
```

Después abre:

```text
http://localhost:3000
```

También puedes utilizar el script incluido:

```bash
npm run dev
```

## Build estático

Para generar una carpeta lista para publicar:

```bash
npm run build
```

El resultado se generará en `dist/`.

## Publicación en Vercel

### Importación desde GitHub

1. Sube este proyecto a un repositorio de GitHub.
2. Accede a [vercel.com/new](https://vercel.com/new).
3. Pulsa **Continue with GitHub** y autoriza el acceso al repositorio.
4. Selecciona el repositorio `alvarezjose-status-page`.
5. Comprueba esta configuración:

```text
Framework Preset: Other
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Root Directory: ./
```

6. Pulsa **Deploy**.

El archivo `vercel.json` ya contiene el build y las cabeceras necesarias para el Service Worker. No necesitas añadir variables de entorno.

### Dominio personalizado

En el proyecto de Vercel, abre **Settings → Domains**, añade:

```text
alvarezjose.me
```

Vercel mostrará los registros DNS exactos que debes configurar en tu proveedor de dominio. Normalmente se utiliza un registro `A` para el dominio raíz y un registro `CNAME` para `www`.

Después de verificar el dominio, establece `alvarezjose.me` como dominio principal y activa la redirección de `www` si lo deseas.

## Redes sociales

- GitHub: [@alvar3zjos3](https://github.com/alvar3zjos3)
- Instagram: [@alvarez_jos3](https://instagram.com/alvarez_jos3)

## Autor

© 2026 José Álvarez. Todos los derechos reservados.

## Licencia

Este proyecto está protegido por una licencia propietaria. No se permite copiar, modificar, redistribuir, sublicenciar, publicar o utilizar el código sin autorización expresa por escrito del titular.

Consulta el archivo [LICENSE](./LICENSE) para conocer las condiciones completas.
