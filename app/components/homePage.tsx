"use client";
import React, { useContext, useEffect, useState } from "react";
import { AvaliacoesContext } from "@/store/context";
import { listProvedores } from "./listProvedores";
import { AvaliacaoForm } from ".";
import { CadastroProvedor } from "./cadastroProvedor";

export const Home = () => {
  const [provedores, setProvedores] = useState<string[]>([]);
  const [provedorSelecionado, setProvedorSelecionado] = useState<string>("");
  const [scoreFinal, setScoreFinal] = useState<number>(0);
  const [currentAvaliacao, setCurrentAvaliacao] = useState<AvaliacaoType>();

  const { avaliacoes, setAvaliacoes } = useContext(AvaliacoesContext);

  async function fetchProvedores() {
    await listProvedores()
      .then((data: any) => {
        setProvedores(data.provedores);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  const fetchAvaliacoes = async (provedor: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/avaliacoes/:${provedor}`
      );
      const data = await response.json();
      setAvaliacoes(data.avaliacoes[0]);
      setCurrentAvaliacao(data.avaliacoes[0]);
      setProvedorSelecionado(provedor);
      if (!data.scoreFinal) {
        setScoreFinal(0);
        return;
      }
      setScoreFinal(data.scoreFinal);
    } catch (error) {
      console.error(error);
    }
  };

  async function calcularScore() {
    if (avaliacoes === currentAvaliacao) return;
    try {
      const response = await fetch(
        `http://localhost:3001/api/avaliacoes/:${provedorSelecionado}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(avaliacoes),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao calcular score");
      }

      const data = await response.json();
      setScoreFinal(data.scoreFinal);
    } catch (error) {
      console.error(error);
    }
  }

  const RenderComponents = () => {
    if (!provedorSelecionado) return;

    return (
      <>
        <AvaliacaoForm />
        <div className="h-[10%] w-full flex justify-center">
          <h2>Score Calculado:</h2>
          <p>
            {scoreFinal !== 0 && scoreFinal !== null
              ? scoreFinal.toFixed(2)
              : 0}
          </p>
        </div>
      </>
    );
  };

  useEffect(() => {
    if (Object.values(avaliacoes).every((value) => value === 0)) return;
    calcularScore();
  }, [avaliacoes]);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="h-full w-full flex flex-col items-center gap-4 p-10">
        <CadastroProvedor fetchProvedores={fetchProvedores} />
        <button onClick={fetchProvedores}>Listar provedores cadastrados</button>
        {provedores.length > 0 && (
          <div className="flex flex-col gap-2 h-[10%]">
            <h1>Provedores Cadastrados:</h1>
            {provedores.map((provedor) => (
              <p
                key={provedor}
                onClick={() => fetchAvaliacoes(provedor)}
                className="text-blue-500 cursor-pointer"
              >
                {provedor}
              </p>
            ))}
          </div>
        )}
        <RenderComponents />
      </div>
    </div>
  );
};
