"use client";

import React, { useContext, useState } from 'react';
import { OccurrencesContext } from '@/context/occurrencesContext';
import api from '../apiOccurrences';
import { OccurrencesProps } from '@/types';

const OccurrenceList = () => {
  const [dados, setDados] = useState<OccurrencesProps[]>([]);
  const context = useContext(OccurrencesContext);

  const list = async () => {
    const data = await api.getOccurrences();
    setDados(data);
  };

  if (!context) {
    console.error("TypeRacismContext não está disponível.");
    return (
      <div className="text-amber-600 p-4 border border-amber-300 rounded-md bg-amber-50">
        Erro: Contexto de Tipos de Racismo não carregado.
      </div>
    );
  }

  const { loading, error } = context;

  if (loading) {
    return (
      <section className="my-8 p-6 bg-lime-50 shadow-md rounded-lg border border-lime-200">
        <h2 className="text-2xl font-bold text-lime-800 mb-4">Ocorrências Cadastradas</h2>
        <p className="text-lime-600">Carregando ocorrências...</p>
      </section>
    );
  }

  return (
    <section className="my-8 p-6 bg-zinc-50 shadow-md rounded-lg border border-zinc-200">
      <h2 className="text-2xl font-bold text-zinc-800 mb-4">Ocorrências Cadastradas</h2>
      <ul className="space-y-2">
        {dados.map((item) => (
          <li key={item.id} className="p-2 bg-amber-100 rounded text-amber-900">
            {item.descricao}
          </li>
        ))}
      </ul>
      <button
        onClick={list}
        className="mt-4 px-4 py-2 bg-lime-800 text-white rounded hover:bg-lime-900 transition"
      >
        Mostrar Lista
      </button>
    </section>
  );
};

export default OccurrenceList;
