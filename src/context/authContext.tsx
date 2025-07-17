"use client";

import authAPI from "@/app/(api)/typeAuth/api";
import { ContextProps, LoginProps, Usuario } from "@/types";
import React, { createContext, useState, useEffect } from "react";
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<ContextProps | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar se o usuário já está autenticado quando o componente carrega
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await authAPI.eu(); // Método para verificar o usuário atual
        if (response.usuario) {
          setUsuario(response.usuario);
        }
      } catch (error) {
        console.log("Usuário não autenticado:", error);
        setUsuario(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async ({ email, senha }: LoginProps) => {
    const response = await authAPI.login({ email, senha });
    console.log(response.usuario);
    const usuario = response.usuario;
    setUsuario(usuario);
    console.log(usuario); // FAZENDO SEM SEGURANÇA POIS ESTAMOS PEGANDO A RESPOSTA DO USUÁRIO DIRETAMENTE DA API
    // O CERTO SERIA CRIAR UM MIDDLEWARE QUE LÊ-SE O TOKEN DO COOKIE, E VERIFICASSE PELO BACKEND AS INFORMAÇÕES BASEADAS
    // NAQUELE TOKEN
  };

  const logout = () => {
    authAPI.logout();
    setUsuario(null);
  };

  const value: ContextProps = {
    usuario,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}