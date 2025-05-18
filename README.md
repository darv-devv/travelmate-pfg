
# TravelMate

**TravelMate** es una red social/prototipo de viajes desarrollada como parte de proyecto final de DAW. Permite a los usuarios registrarse, iniciar sesión, explorar destinos y planificar viajes.

---

## Tecnologías utilizadas

- **React** con **TypeScript**
- **Vite** como bundler
- **TailwindCSS** (vía CDN) para los estilos
- **React Router** para la navegación
- **LocalStorage** para simular autenticación

---

## Funcionalidades principales

- Registro y login de usuarios
- Logout
- Protección de rutas privadas
- Redirección según el estado de autenticación
- Estilo responsive
- Página de bienvenida (landing) personalizada
- Panel de usuario (Dashboard) tras login
- Ventana de destinos con simulación (hasta implementación de API y lógica)
- Actualizando * * * *

---


Para ejecutar el proyecto: 

1. Clonar el repositorio:
git clone


2. Instalar las dependencias:
npm install

3. Iniciar el proyecto en modo dev:
npm run dev

4. Abrir el navegador:
http://localhost:5173


## Estructura del proyecto

```bash
travelmate/
│
├── public/
│   ├── vertical-shot-beautiful-eiffel-tower-captured-paris-france.jpg
│   ├── high-angle-shot-city-buildings-new-york-manhattan.jpg
│   ├── ...
│
├── src/
│   ├── components/
│   │   ├── LogoutButton.tsx
│   │   ├── navbar.tsx
│   │   └── PrivateRoute.tsx
│   │
│   ├── features/
│   │   └── auth/
│   │       ├── AuthContext.tsx
│   │       ├── LoginForm.tsx
│   │       └── RegisterForm.tsx
│   │
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Destinations.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Profile.tsx
│   │   └── Register.tsx
│   │
│   ├── routes/
│   │   └── AppRouter.tsx
│   │
│   ├── services/
│   │   └── geoNamesApi.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── App.css
│   └── vite-env.d.ts
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.cjs
├── tailwind.config.js (si existiera)
├── tsconfig.json (si existiera)
└── README.md








# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
