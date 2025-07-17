"use client";
import { useState } from "react";
import { criarLocalizacao } from "../api";
export default function LocalizacaoForm() {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    bairro: "",
    rua: "",
    latitude: "",
    longitude: "",
    tipoRacismoId: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const dadosConvertidos = {
      ...form,
      latitude: form.latitude ? parseFloat(form.latitude) : undefined,
      longitude: form.longitude ? parseFloat(form.longitude) : undefined,
    };

    await criarLocalizacao(dadosConvertidos);
    alert("Localização criada com sucesso!");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input
        type="text"
        placeholder="Nome"
        value={form.nome}
        onChange={(e) => setForm({ ...form, nome: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Descrição"
        value={form.descricao}
        onChange={(e) => setForm({ ...form, descricao: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Bairro"
        value={form.bairro}
        onChange={(e) => setForm({ ...form, bairro: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Rua"
        value={form.rua}
        onChange={(e) => setForm({ ...form, rua: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Latitude"
        value={form.latitude}
        onChange={(e) => setForm({ ...form, latitude: e.target.value })}
        className="w-full border p-2 rounded"
        step="any"
      />
      <input
        type="number"
        placeholder="Longitude"
        value={form.longitude}
        onChange={(e) => setForm({ ...form, longitude: e.target.value })}
        className="w-full border p-2 rounded"
        step="any"
      />
      <input
        type="text"
        placeholder="ID do Tipo de Racismo"
        value={form.tipoRacismoId}
        onChange={(e) => setForm({ ...form, tipoRacismoId: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Salvar
      </button>
    </form>
  );
}