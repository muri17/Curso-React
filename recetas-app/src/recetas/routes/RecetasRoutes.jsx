import { Navigate, Route, Routes } from "react-router-dom"
import { RecetasPage } from "../pages/RecetasPage"


export const RecetasRoutes = () => {
  return (
    <Routes>
        <Route path="/recetas" element={ <RecetasPage /> } />

        <Route path="/*" element={ <Navigate to="/recetas" /> } />
    </Routes>
  )
}