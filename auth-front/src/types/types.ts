export interface AuthResponse {
    body:{
        user: User;
        accessToken: string;
        refreshToken: string;
    }
} 

export interface AuthResponseError {
    body: {
        error: string;
    };
}

//No guardamos el pass del lado del cliente por seguridad
export interface User{
    _id: string,
    name: string,
    username: string,
}