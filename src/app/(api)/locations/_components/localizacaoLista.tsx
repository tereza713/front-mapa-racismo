"use client";
import { useEffect, useState } from "react";
import apiLocal from "../apiLocation"; 
import { LocationProps } from "@/types";
export default function LocalizacaoLista() {
  const [locais, setLocais] = useState<LocationProps[]>([]);

  useEffect(() => {
    async function fetchData() {
      const dados = await apiLocal.getAllLocalizacoes();
      setLocais(dados);
    }
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Localizações Registradas</h2>
      <ul className="space-y-2">
        {locais.map((local) => (
          <li key={local.id} className="p-4 border rounded-lg shadow-md bg-amber-300">
            <p className="font-semibold">{local.nome}</p>
            <p className="text-sm text-zinc-800">{local.descricao}</p>
            <p className="text-xs">Bairro: {local.bairro || "N/A"}</p>
            <p className="text-xs">Tipo de Racismo: {local.tipoRacismoId || "N/A"}</p>
            <p className="text-xs text-zinc-800">
              Respostas: {local._count?.respostas || 0}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}