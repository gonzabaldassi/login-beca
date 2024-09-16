
//Hook: Un hook es una función especial proporcionada por React que te permite utilizar características como el estado y el ciclo de vida en componentes funcionales, algo que anteriormente solo estaba disponible en componentes de clase.
//Importamos hooks de react
import { useContext, createContext, useState, useEffect } from "react";
import { AccessTokenResponse, AuthResponse, User } from "../types/types";
import { json } from "react-router-dom";
import { API_URL } from "./constants";

//Se define que tipo de propiedades puede recibir un componente. 
interface AuthProviderProps{
    children: React.ReactNode
}

//children: React.ReactNode: Define una propiedad llamada children que debe ser de tipo React.ReactNode. En React, React.ReactNode representa cualquier cosa que se pueda renderizar dentro de un componente, como elementos JSX, texto, componentes, arrays, etc

//Creamos nuestro contexto para establecer el valor predeterminado del contexto que, en este caso, indica que el usuario no está autenticado.
const AuthContext = createContext({
    isAuthenticated: false,
    getAccessToken: () => {},
    getRefreshToken: () => {},
    saveUser:(userData:AuthResponse)=>{},
    getUser:()=>({} as User|undefined),
});

//Componente que usa useContext para guardar todo el estado y las funciones que necesitamos a lo largo de la aplicacion
export function AuthProvider({children}: AuthProviderProps) {
    //useState: utilizado para añadir estado a los componentes funcionales.
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState<string>("");
    const [user, setUser] = useState<User>();
    const [isLoading, setIsLoading] = useState(true);
    //const [refreshToken, setRefreshToken] = useState<string>("");

    useEffect(() =>{
        
        checkAuth();
        console.log(getAccessToken())
    },[]);

    //Funcion para hacer la solicitud HTTP del nuevo AccessToken
    async function requestNewAccessToken(refreshToken:string) {
        try{
            const response = await fetch(`${API_URL}/refresh-token`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${refreshToken}`,
                },
            });

            if (response.ok) {
                const json = (await response.json()) as AccessTokenResponse;

                if (json.error) {
                    throw new Error(json.error);
                }

                return json.body.accessToken;
            } else{
                throw new Error(response.statusText);
            }
        }catch(error){
            return null;
        }
    }

    //Funcion para hacer la solicitud HTTP de los datos del usuario
    async function getUserInfo(accessToken:string){
        try{
            const response = await fetch(`${API_URL}/user`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                const json = await response.json();

                if (json.error) {
                    throw new Error(json.error);
                }

                return json.body;
            } else{
                throw new Error(response.statusText);
            }
        }catch(error){
            return null;
        }
    }

    async function checkAuth() {
        if (accessToken) {
            //El user esta autenticado
            const userInfo = await getUserInfo(accessToken);
            if (userInfo) {
                saveSessionInfo(userInfo, accessToken, getRefreshToken()!);
                setIsLoading(false);
                return;
            }
        }else{
            //El user no esta autenticado
            const token = getRefreshToken();
            if (token) {
                const newAccessToken = await requestNewAccessToken(token);

                if (newAccessToken) {
                    const userInfo = await getUserInfo(newAccessToken);

                    if (userInfo) {
                        saveSessionInfo(userInfo, newAccessToken, token);
                        setIsLoading(false);
                        return;
                    }
                }
            }
        }
        setIsLoading(false);
    }

    function saveSessionInfo(userInfo: User, accessToken:string, refreshToken:string) {
        setAccessToken(accessToken);
        

        setUser(userInfo);
        
        localStorage.setItem("token",JSON.stringify(refreshToken));

        setIsAuthenticated(true);
    }

    function getAccessToken() {
        return accessToken;
    }

    function getRefreshToken():string|null {
        const tokenData = localStorage.getItem("token");

        if (tokenData) {
            const refreshToken = JSON.parse(tokenData);
            return refreshToken
        }
        return null;
    }


    function saveUser(userData:AuthResponse) {
        saveSessionInfo(userData.body.user, userData.body.accessToken, userData.body.refreshToken);
    }

    function getUser() {
        return user;
    }


    /*
    <AuthContext.Provider>:     
        *Es un componente especial que envuelve a los componentes hijos y "proporciona" el contexto. Cualquier componente que esté envuelto dentro de este proveedor (AuthContext.Provider) tendrá acceso al contexto.
        
        * value={{ isAuthenticated }}: Aquí, el valor que se comparte en el contexto es el estado isAuthenticated. Esto permite que cualquier componente que consuma AuthContext (usando useContext) pueda acceder a si el usuario está autenticado.

        {children}:
        Los componentes hijos que están envueltos por AuthProvider se renderizan aquí. El children hace referencia a cualquier componente anidado dentro de AuthProvider cuando es utilizado en otro lugar.
        Al envolver children dentro de <AuthContext.Provider>, cualquier componente hijo puede acceder a los valores del contexto, como isAuthenticated.
    */


    return(
    <AuthContext.Provider value={{isAuthenticated, getAccessToken,getRefreshToken, saveUser, getUser}}>
        {isLoading? <div>Loading...</div>: children}
    </AuthContext.Provider>
    );
}

//Se crea un custom hook llamado useAuth, que te permite acceder al contexto de autenticación (AuthContext) de manera más sencilla y reutilizable en cualquier componente.
export const useAuth = ()=> useContext(AuthContext);