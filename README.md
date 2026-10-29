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
- Enlaces seguros a GitHub e Instagram.
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
├── manus-routes.json   # Declaración de rutas para el entorno gestionado
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

## Publicación

El proyecto puede publicarse en cualquier servidor estático compatible con HTTPS, incluyendo GitHub Pages, Cloudflare Pages, Netlify o Vercel. HTTPS es necesario para que el Service Worker funcione fuera de `localhost`.

Para usar el dominio personalizado `alvarezjose.me`, configura el dominio en el proveedor de hosting y añade los registros DNS solicitados por dicho proveedor.

## Redes sociales

- GitHub: [@alvar3zjos3](https://github.com/alvar3zjos3)
- Instagram: [@alvarez_jos3](https://instagram.com/alvarez_jos3)

## Autor

© 2026 José Álvarez. Todos los derechos reservados.

## Licencia

Este proyecto está protegido por una licencia propietaria. No se permite copiar, modificar, redistribuir, sublicenciar, publicar o utilizar el código sin autorización expresa por escrito del titular.

Consulta el archivo [LICENSE](./LICENSE) para conocer las condiciones completas.
