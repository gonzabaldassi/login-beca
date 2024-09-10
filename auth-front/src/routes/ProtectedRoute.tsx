//Navigate : cambiar de ruta programáticamente sin necesidad de recargar la página. 
//Outlet: componente que se utiliza como un marcador de posición para representar el contenido de rutas anidadas. Permite que las rutas secundarias (hijas) se muestren dentro del componente padre, dependiendo de la ruta actual.
import { Outlet, Navigate } from "react-router-dom";


import { useAuth } from "../auth/AuthProvider";

//Validar si el user esta autenticado, entonces muestra el contenido de esta ruta, sino te redirecciona a una ruta publica
export default function ProtectedRoute() {
    const auth = useAuth();

    return auth.isAuthenticated ? <Outlet/> : <Navigate to="/"/>;
}