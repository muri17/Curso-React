import { Navigate, Route, Routes } from "react-router-dom"
import { RecetasPage } from "../pages/RecetasPage"
import { AbmRecetaPage } from "../pages/AbmRecetaPage"


export const RecetasRoutes = () => {
  return (
    <Routes>
        <Route path="/recetas" element={ <RecetasPage /> } />
        <Route path="/recetas/agregar" element={ <AbmRecetaPage /> } />

        <Route path="/*" element={ <Navigate to="/recetas" /> } />
    </Routes>
  )
}