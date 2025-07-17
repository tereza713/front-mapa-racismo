"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useState } from "react";

// Esquema de validação para login
const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function FormularioLogin() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const response = await fetch("https://mapa-do-racismo.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Erro no login");
      }

      // Armazena o token ou dados do usuário
      localStorage.setItem("token", result.token); // ou result.user/token etc

      console.log("Login realizado com sucesso!")
      toast.success("Login realizado com sucesso!");
      reset();
    } catch (error: any) {
      console.error("Erro no login:", error);
      toast.error(error.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col justify-center items-center w-full max-w-md gap-4 bg-lime-100 rounded-3xl border-2 border-lime-300 shadow-lg p-8 hover:shadow-lime-200/50 transition-shadow duration-300"
    >
      <fieldset className="w-full space-y-6">
        <legend className="text-lime-900 text-center font-bold text-2xl mb-6 px-4">
          Login
        </legend>

        {/* Grupo de campo: E-MAIL */}
        <div className="flex flex-col justify-center items-start">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-lime-800 mb-1 transition-all duration-200 group-hover:text-lime-900"
          >
            E-mail
          </label>
          <div className="relative w-full group">
            <input
              id="email"
              type="email"
              className="
                w-full px-4 py-2 text-zinc-900 bg-lime-50 rounded-lg
                border-2 border-lime-200 outline-none
                transition-all duration-300
                focus:border-lime-500 focus:bg-lime-50 focus:ring-2 focus:ring-lime-200
                hover:border-lime-400 placeholder-lime-400/70
                peer"
              {...register("email")}
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
              placeholder="Digite seu e-mail"
            />
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-lime-300 transform scale-x-0 origin-left transition-transform duration-300 peer-focus:scale-x-100 peer-hover:scale-x-100"></div>
          </div>
          {errors.email && (
            <span
              id="email-error"
              role="alert"
              className="text-red-600 text-sm mt-1 flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Grupo de campo: Senha */}
        <div className="flex flex-col justify-center items-start">
          <label
            htmlFor="senha"
            className="block text-sm font-medium text-lime-800 mb-1 transition-all duration-200 group-hover:text-lime-900"
          >
            Senha
          </label>
          <div className="relative w-full group">
            <input
              id="senha"
              type="password"
              {...register("senha")}
              className="
                w-full px-4 py-2 text-zinc-900 bg-lime-50 rounded-lg
                border-2 border-lime-200 outline-none
                transition-all duration-300
                focus:border-lime-500 focus:bg-lime-50 focus:ring-2 focus:ring-lime-200
                hover:border-lime-400 placeholder-lime-400/70
                peer"
              aria-invalid={!!errors.senha}
              aria-describedby="senha-error"
              placeholder="Digite sua senha"
            />
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-lime-300 transform scale-x-0 origin-left transition-transform duration-300 peer-focus:scale-x-100 peer-hover:scale-x-100"></div>
          </div>
          {errors.senha && (
            <span
              id="senha-error"
              role="alert"
              className="text-red-600 text-sm mt-1 flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.senha.message}
            </span>
          )}
        </div>

        {/* Botão de Login */}
        <div className="flex flex-col justify-center items-center mt-8">
          <button
            type="submit"
            disabled={loading}
            className="
              relative overflow-hidden
              w-full max-w-xs bg-gradient-to-r from-lime-700 to-lime-600
              text-white font-medium rounded-lg py-3 px-6
              hover:from-lime-600 hover:to-lime-500
              focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2
              disabled:opacity-70 disabled:cursor-not-allowed
              shadow-md hover:shadow-lg transform hover:-translate-y-0.5
              transition-all duration-300 ease-in-out
              group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Entrando...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Entrar
                </>
              )}
            </span>
            <span className="absolute inset-0 bg-lime-900 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
          </button>
        </div>
      </fieldset>
    </form>
  );
}