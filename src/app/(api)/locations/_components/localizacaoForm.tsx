"use client";
"use client";
import { useState, useContext } from "react";
import apiLocal from "../apiLocation";
import { TypeRacismContext } from "@/context/typeRacismContext";
import { useForm, SubmitHandler } from "react-hook-form";
interface FormInputs {
  nome: string;
  descricao: string;
  bairro: string;
  rua: string;
  latitude: string;
  longitude: string;
  tipoRacismoId: string;
}

export default function LocalizacaoForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormInputs>();
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    bairro: "",
    rua: "",
    latitude: "",
    longitude: "",
    tipoRacismoId: "",
  });

  const typeRacismContext = useContext(TypeRacismContext);

  if (!typeRacismContext) {
    console.error("LocalizacaoForm deve ser renderizado dentro de um TypeRacismProvider.");
    return <div>Erro: Contexto de Tipo de Racismo não disponível.</div>;
  }

  const { types: existingTypesRacism, loading: loadingTypesRacism } = typeRacismContext;
  const isFormDisabled = isSubmitting;

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log("Dados do formulário para envio:", data);

    const dadosConvertidos = {
      ...data,
      latitude: data.latitude ? parseFloat(data.latitude) : undefined,
      longitude: data.longitude ? parseFloat(data.longitude) : undefined,
    };

    try {
      await apiLocal.criarLocalizacao(dadosConvertidos);
      alert("Localização criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar localização:", error);
      alert("Erro ao criar localização. Verifique o console.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <input
        type="text"
        placeholder="Nome"
        {...register("nome", { required: "Nome é obrigatório" })}
        className="w-full border p-2 rounded"
      />
      {errors.nome && <span className="text-red-500 text-sm mt-1">{errors.nome.message}</span>}

      <input
        type="text"
        placeholder="Descrição"
        className="w-full border p-2 rounded"
      />
      {errors.descricao && <span className="text-red-500 text-sm mt-1">{errors.descricao.message}</span>}

      <input
        type="text"
        placeholder="Bairro"
        className="w-full border p-2 rounded"
      />
      
      <input
        type="text"
        placeholder="Rua"
        className="w-full border p-2 rounded"
      />
      
      <input
        type="number"
        placeholder="Latitude"
        className="w-full border p-2 rounded"
        step="any"
      />
      
      <input
        type="number"
        placeholder="Longitude"
        {...register("longitude")}
        className="w-full border p-2 rounded"
        step="any"
      />
      
      <div>
        <label htmlFor="tipoRacismoId" className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de Racismo
        </label>
        <select
          id="tipoRacismoId"
          {...register("tipoRacismoId", { required: "Selecione um tipo de racismo" })}
          className="text-black w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
          disabled={isFormDisabled || loadingTypesRacism}
        >
          <option value="">{loadingTypesRacism ? "Carregando tipos de racismo..." : "Selecione um tipo de racismo"}</option>
          {existingTypesRacism.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.descricao}
            </option>
          ))}
        </select>
        {errors.tipoRacismoId && (
          <span className="text-red-500 text-sm mt-1">
            {errors.tipoRacismoId.message}
          </span>
        )}
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={isFormDisabled}>
        Salvar
      </button>
    </form>
  );
}