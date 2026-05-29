import api from "../api/connectionAxios"

class DatosBD {
    //Peticion get para Datos de la bd
    async getDatos() {
        return await api.get('/persona/buscar')
    }

    async postDatos(data) {
        return await api.post('/persona/create', data)
    }

    async deletePersona(id) {
        return await api.delete(`/persona/eliminar/${id}`)
    }

    async updatePersona(id, data) {
        return await api.put(`/persona/modificar/${id}`, data)
    }
    //Login
    async login(data) {
        const respuesta = await api.post('/auth/login', data)
        return respuesta.data
    }
    //Peticiones para servicios
    async getServicios() {
        return await api.get('/servicio/buscar')
    }

    async postServicio(data) {
        return await api.post('/servicio/create', data)
    }

    async deleteServicio(id) {
        return await api.delete(`/servicio/eliminar/${id}`)
    }

    async updateServicio(id, data) {
        return await api.put(`/servicio/modificar/${id}`, data)
    }
}

export default new DatosBD();