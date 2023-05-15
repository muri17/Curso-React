import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { RecetasRoutes } from "../recetas/routes/RecetasRoutes"
import { PublicRoute } from "./PublicRoute"
import { PrivateRoute } from "./PrivateRoute"


export const AppRouter = () => {
    return (
      <Routes>

          <Route path="auth/*" element={
              <PublicRoute>
                {/* <LoginPage /> */}
                <Routes>
                  <Route path="/*" element={ <AuthRoutes /> } />
                </Routes>
              </PublicRoute>
            }
          />

          <Route path="/*" element={
              <PrivateRoute>
                <RecetasRoutes />
              </PrivateRoute>
            } 
          />
  
          {/* Login y Registro */}
          {/* <Route path="/auth/*" element={ <AuthRoutes /> } /> */}
  
          {/* RecetasApp */}
          {/* <Route path="/*" element={ <RecetasRoutes /> } /> */}
  
      </Routes>
    )
  }