import axios from "axios";
import { getEnvVariables } from "../src/helpers";

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});

// Configurar interceptores

/**
 * Está función se ejecuta antes de que se envíe una petición. El use se dispara
 * configuración de está petición y al final debemoe regresar esa configuración de nuevo.
 */
calendarApi.interceptors.request.use((config) => {
  // Aquí puedes agregar código antes de enviar la petición

  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  };

  return config; // configuración modificada
});

export default calendarApi;
