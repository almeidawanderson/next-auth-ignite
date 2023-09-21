import { ReactNode, createContext, useEffect, useState } from "react";
import Router from "next/router";
import { api } from "../services/api";
import { parseCookies, setCookie } from "nookies";

//dados do usuário
type User = {
    email: string;
    permissions: string[];
    roles: string[];
}

//credenciais de login
type SignInCredentials = {
    email: string;
    password: string;
}

//dados do contexto
type AuthContextData = {
    signIn(credentials: SignInCredentials): Promise<void>;
    user: User | undefined;
    isAuthenticated: boolean;
}

//tipagem do children
type AuthProviderProps = {
    children: ReactNode;

}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<User>()
    const isAuthenticated = !!user;

    //verificando se o usuário está autenticado
    useEffect(() => {
        const { "nextauth.token": token } = parseCookies();

        if (token) {            
            api.get("/me").then(response => {
                const { email, permissions, roles } = response.data;
                setUser({ email, permissions, roles });
            }).catch(() => {

            })
        }      

    }, [])

    async function signIn({ email, password }: SignInCredentials) {
        try {
          const response = await api.post("sessions", {
            email,
            password,
          });

          const { token, refresh_token,  permissions, roles } = response.data;

            //salvando o token no cookie
            setCookie(undefined, "nextauth.token", token, {
                maxAge: 60 * 60 * 24 * 30, //30 days
                path: "/", //qual caminho da aplicação terá acesso ao cookie
            })
            
            setCookie(undefined, "nextauth.refreshToken", refresh_token, {
                maxAge: 60 * 60 * 24 * 30, //30 days
                path: "/", //qual caminho da aplicação terá acesso ao cookie

            })

          setUser({
            email,
            permissions,
            roles,
          })   
          
          Router.push("/dashboard");
       
        } catch (err) {
          console.log(err);
        }
      }
      
      return (
        <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
          {children}
        </AuthContext.Provider>
      );
}
