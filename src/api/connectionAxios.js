import Axios from "axios";

const api = Axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 30000 // Espera hasta 30 segundos antes de marcar error
});

export default api;