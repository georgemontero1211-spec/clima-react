# Buscador de Clima

Aplicación web que muestra el clima actual de una ciudad. El usuario escribe una ciudad, elige un país y obtiene la temperatura actual, la mínima y la máxima, consultando la API de [OpenWeatherMap](https://openweathermap.org/).

## Cómo funciona

1. Con la ciudad y el país, consulta la API de geocodificación de OpenWeatherMap para obtener la latitud y la longitud.
2. Con esas coordenadas, consulta el clima actual.
3. Valida la respuesta con **Zod** antes de mostrarla. En el código también quedan, comentadas, las alternativas que se probaron: type guards y Valibot.

## Funcionalidades

- Formulario de búsqueda por ciudad y país, con validación de campos vacíos.
- Temperatura actual, mínima y máxima.
- Spinner mientras se carga la información.
- Mensaje de alerta si la ciudad no se encuentra.

## Tecnologías

- React + TypeScript + Vite
- Axios
- Zod
- CSS Modules

## Configuración

Necesitas una API key gratuita de OpenWeatherMap. Crea un archivo `.env` en la raíz:

```env
VITE_API_KEY=tu_api_key_de_openweathermap
```

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

| Script            | Descripción                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Servidor de desarrollo            |
| `npm run build`   | Compila TypeScript y genera build |
| `npm run preview` | Sirve el build de producción      |
| `npm run lint`    | Ejecuta ESLint                    |
