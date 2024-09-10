
//Hook: Un hook es una función especial proporcionada por React que te permite utilizar características como el estado y el ciclo de vida en componentes funcionales, algo que anteriormente solo estaba disponible en componentes de clase.
//Importamos hooks de react
import { useContext, createContext, useState, useEffect } from "react";

//Se define que tipo de propiedades puede recibir un componente. 
interface AuthProviderProps{
    children: React.ReactNode
}

//children: React.ReactNode: Define una propiedad llamada children que debe ser de tipo React.ReactNode. En React, React.ReactNode representa cualquier cosa que se pueda renderizar dentro de un componente, como elementos JSX, texto, componentes, arrays, etc

//Creamos nuestro contexto para establecer el valor predeterminado del contexto que, en este caso, indica que el usuario no está autenticado.
const AuthContext = createContext({
    isAuthenticated: false,
});

//Componente que usa useContext para guardar todo el estado y las funciones que necesitamos a lo largo de la aplicacion
export function AuthProvider({children}: AuthProviderProps) {
    //useState: utilizado para añadir estado a los componentes funcionales.
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    /*
    <AuthContext.Provider>:     
        *Es un componente especial que envuelve a los componentes hijos y "proporciona" el contexto. Cualquier componente que esté envuelto dentro de este proveedor (AuthContext.Provider) tendrá acceso al contexto.
        
        * value={{ isAuthenticated }}: Aquí, el valor que se comparte en el contexto es el estado isAuthenticated. Esto permite que cualquier componente que consuma AuthContext (usando useContext) pueda acceder a si el usuario está autenticado.

        {children}:
        Los componentes hijos que están envueltos por AuthProvider se renderizan aquí. El children hace referencia a cualquier componente anidado dentro de AuthProvider cuando es utilizado en otro lugar.
        Al envolver children dentro de <AuthContext.Provider>, cualquier componente hijo puede acceder a los valores del contexto, como isAuthenticated.
    */


    return(
    <AuthContext.Provider value={{isAuthenticated}}>
        {children}
    </AuthContext.Provider>
    );
}

//Se crea un custom hook llamado useAuth, que te permite acceder al contexto de autenticación (AuthContext) de manera más sencilla y reutilizable en cualquier componente.
export const useAuth = ()=> useContext(AuthContext);