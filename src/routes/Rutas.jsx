import { Routes, Route, Navigate } from "react-router-dom"
import { Dashboard, Home, Historial, Login, Register, Perfil } from "../pages"
import { AdminLayouts } from "../layouts"
import { FormPersona } from "../components/Persona"
import { RutaProtegida } from "./RutaProtegida"

function Rutas() {
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    )
  }

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      

      {/* Rutas SOLO para técnicos */}
      <Route
        path="/dashboard"
        element={
          <RutaProtegida rolPermitido="tecnico">
            {loadLayout(AdminLayouts, Dashboard)}
          </RutaProtegida>
        }
      />
      <Route
        path="/persona"
        element={
          <RutaProtegida rolPermitido="tecnico">
            {loadLayout(AdminLayouts, FormPersona)}
          </RutaProtegida>
        }
      />

      {/* Rutas SOLO para clientes */}
      <Route
        path="/home"
        element={
          <RutaProtegida rolPermitido="cliente">
            {loadLayout(AdminLayouts, Home)}
          </RutaProtegida>
        }
      />

      {/* Rutas para ambos roles (cualquier usuario logueado) */}
      <Route
        path="/historial"
        element={
          <RutaProtegida>
            {loadLayout(AdminLayouts, Historial)}
          </RutaProtegida>
        }
      />
      <Route
        path="/perfil"
        element={
          <RutaProtegida>
            {loadLayout(AdminLayouts, Perfil)}
          </RutaProtegida>
        }
      />

      {/* Ruta de fallback */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default Rutas