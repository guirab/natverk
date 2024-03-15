"use client";
import React, { useEffect, useState } from "react";
import { AvaliacaoForm, ScoreDisplay } from "./components";
import { CadastroProvedor } from "./components/cadastroProvedor";

const HomePage = () => {
  const [provedores, setProvedores] = useState<string[]>([]);
  const [provedorSelecionado, setProvedorSelecionado] = useState<string>("");
  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoType>({
    qualidadeConexao: 0,
    suporteCliente: 0,
    coberturaServico: 0,
    preco: 0,
    segurancaRede: 0,
  });

  const fetchProvedores = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/provedores");
      const data = await response.json();
      setProvedores(data.provedores.map((p: any) => p));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAvaliacoes = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/avaliacoes/:${provedorSelecionado}`
      );
      const data = await response.json();
      setAvaliacoes(data.avaliacoes[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const RenderComponents = () => {
    if (!provedorSelecionado) return;

    return (
      <>
        <AvaliacaoForm avaliacoes={avaliacoes} setAvaliacoes={setAvaliacoes} />
        <ScoreDisplay avaliacoes={avaliacoes} provedor={provedorSelecionado} />
      </>
    );
  };

  useEffect(() => {
    fetchProvedores();
  }, []);

  useEffect(() => {
    if (!provedorSelecionado) return;
    fetchAvaliacoes();
  }, [provedorSelecionado]);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="h-full w-full flex flex-col items-center gap-4 p-10">
        <CadastroProvedor fetchProvedores={fetchProvedores} />
        {provedores.length > 0 && (
          <div className="flex flex-col gap-2 h-[10%]">
            <h1>Provedores Cadastrados:</h1>
            {provedores.map((provedor) => (
              <p
                key={provedor}
                onClick={() => setProvedorSelecionado(provedor)}
                className="text-blue-500 cursor-pointer"
              >
                {provedor}
              </p>
            ))}
          </div>
        )}
        <RenderComponents />
        <button onClick={() => setProvedorSelecionado("")}>desdarle</button>
      </div>
    </div>
  );
};

export default HomePage;