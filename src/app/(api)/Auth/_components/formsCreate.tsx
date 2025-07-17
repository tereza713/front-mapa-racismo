"use client"; // Para hooks

import { useForm } from "react-hook-form";
//import { useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
//import { Usuario } from "@/types";//pegando interface
//import { AuthContext } from "@/app/context/authContext"; //pegando contexto CASO QUEIRA QUE LOGE AUTOMATICAMENTE
//import authAPI from "@/app/api/typeAuth/api";


// 1. Defina o schema de validação com Zod
// //nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
const formSchema = z.object({
  
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type FormData = z.infer<typeof formSchema>;//recebe a 

export default function FormularioCreate() {
    //const [loading, setLoading] = useState(false);

  // Configuração da validação do formulário
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try{
        const resposta = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/criar`,
            {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(data),
                credentials: "include",//envio de cookie
            }
        );

        if(!resposta.ok){
          const error = await resposta.json();
            throw new Error(error?.error ||"Erro ao criar post");
        }
        const { resposta: respostaAPI } = await resposta.json();
        //const novoUsuario = respostaAPI.resposta

        console.log(`DEBUG: usuario criado`);
        reset();//limpa form

        toast.success("Post de usuário criado com sucesso!");
        //ERRO
    }catch(error){
        console.error("Erro ao criar post:", error);
        toast.error("Erro ao criar post. Tente novamente.");
    }
  };

  //RETORNO JWX ---------------------------------------------------------------------------------------------------------------------------------
  return (
    // 3. Formulário semântico com tags HTML5
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col justify-center items-center w-full max-w-md gap-4 bg-amber-100 rounded-3xl border-2 border-amber-300 shadow-lg p-8 hover:shadow-amber-200/50 transition-shadow duration-300"
    >
      <fieldset className="w-full space-y-6 ">
        <legend className="text-amber-900 text-center font-bold text-2xl mb-6 px-4">
          Criar conta
        </legend>

        {/* EMAIL------------------------------------------------------------------------------------------------------ */}
        <div className="flex flex-col justify-center items-start">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-amber-800 mb-1 transition-all duration-200 group-hover:text-amber-900"
          >
            E-mail
          </label>
          <div className="relative w-full group">
            <input
              id="email"
              type="email"
              className="
                w-full px-4 py-2 text-amber-900 bg-amber-50 rounded-lg
                border-2 border-amber-200 outline-none
                transition-all duration-300
                focus:border-amber-500 focus:bg-amber-50 focus:ring-2 focus:ring-amber-200
                hover:border-amber-400 placeholder-amber-400/70
                peer"
              {...register("email")}
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
              placeholder="Digite o seu melhor e-mail"
            />
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-amber-300 transform scale-x-0 origin-left transition-transform duration-300 peer-focus:scale-x-100 peer-hover:scale-x-100"></div>
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

        {/* SENHA------------------------------------------------------------------------------------------------------ */}
        <div className="flex flex-col justify-center items-start">
          <label
            htmlFor="senha"
            className="block text-sm font-medium text-amber-800 mb-1 transition-all duration-200 group-hover:text-amber-900"
          >
            Senha
          </label>
          <div className="relative w-full group">
            <input
              id="senha"
              type="password"
              {...register("senha")}
              className="
                w-full px-4 py-2 text-amber-900 bg-amber-50 rounded-lg
                border-2 border-amber-200 outline-none
                transition-all duration-300
                focus:border-amber-500 focus:bg-amber-50 focus:ring-2 focus:ring-amber-200
                hover:border-amber-400 placeholder-amber-400/70
                peer"
              aria-invalid={!!errors.senha}
              aria-describedby="senha-error"
              placeholder="Digite uma senha segura"
            />
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-amber-300 transform scale-x-0 origin-left transition-transform duration-300 peer-focus:scale-x-100 peer-hover:scale-x-100"></div>
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
        
        {/* BOTAO------------------------------------------------------------------------------------------------------ */}
        <div className="flex flex-col justify-center items-center mt-8">
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="
              relative overflow-hidden
              w-full max-w-xs bg-gradient-to-r from-amber-700 to-amber-600
              text-white font-medium rounded-lg py-3 px-6
              hover:from-amber-600 hover:to-amber-500
              focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2
              disabled:opacity-70 disabled:cursor-not-allowed
              shadow-md hover:shadow-lg transform hover:-translate-y-0.5
              transition-all duration-300 ease-in-out
              group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? (
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
                  Enviando...
                </>
                //se não
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
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Cadastrar
                </>
              )}
            </span>
            <span className="absolute inset-0 bg-amber-900 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
          </button>
        </div>
      </fieldset>
    </form>
  );
}