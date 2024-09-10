import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './routes/Login.tsx';
import Signup from './routes/Signup.tsx';
import Dashboard from './routes/Dashboard.tsx';
import ProtectedRoute from './routes/ProtectedRoute.tsx';
import { AuthProvider } from './auth/AuthProvider.tsx';

//Creamos un router
const router = createBrowserRouter([
  {
    path:"/",
    element: <Login />,
  },
  {
    path:"/signup",
    element: <Signup />,
  },
  {
    path:"/",
    element: <ProtectedRoute />,
    children: [
      //Cuando busque por dashboard la ruta principal primero es encontrar la raiz y para entrar a dashboard verifica si tengo que renderizar protectedRoute, ahi se valida el estado mediante isAuth para ver si puede o no ver el dashboard
      {
        path:"/dashboard",
        element:<Dashboard/>,
      }
    ]
  },
]);

//Children:  children es una propiedad especial que se utiliza para renderizar contenido anidado dentro de un componente. Básicamente, permite que un componente "padre" envuelva o contenga otros componentes o elementos que se pasan a través de la prop children.

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      {/*  
      Este bloque envuelve el enrutador de la aplicación (RouterProvider) dentro del contexto de autenticación (AuthProvider). Esto significa que toda la aplicación que maneja la navegación a través de RouterProvider tendrá acceso al estado de autenticación proporcionado por AuthProvider.

      Cualquier ruta o componente que esté definido dentro del enrutador tendrá la capacidad de usar el contexto de autenticación y verificar si el usuario está autenticado o no, utilizando el useAuth hook o directamente useContext(AuthContext)
    */}
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)
