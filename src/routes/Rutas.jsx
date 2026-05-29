import { Routes, Route, Navigate } from "react-router-dom"
import { Dashboard, Home, Historial, Login, Register, SelectRol, Perfil } from "../pages"
import { AdminLayouts } from "../layouts"
import { FormPersona } from "../components/Persona"

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
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/select-rol" element={<SelectRol />} />
      <Route path="/dashboard" element={loadLayout(AdminLayouts, Dashboard)} />
      <Route path="/home" element={loadLayout(AdminLayouts, Home)} />
      <Route path="/historial" element={loadLayout(AdminLayouts, Historial)} />
      <Route path="/perfil" element={loadLayout(AdminLayouts, Perfil)} />
      <Route path="/persona" element={loadLayout(AdminLayouts, FormPersona)} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default Rutas