"use client";
import React, { useState } from "react";
import { AvaliacaoForm, ScoreDisplay } from "./components";

const HomePage = () => {
  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoType>({
    qualidadeConexao: 0,
    suporteCliente: 0,
    coberturaServico: 0,
    preco: 0,
    segurancaRede: 0,
  });

  return (
    <div className="h-screen w-screen overflow-hidden">
      <AvaliacaoForm avaliacoes={avaliacoes} setAvaliacoes={setAvaliacoes} />
      <ScoreDisplay avaliacoes={avaliacoes} />
    </div>
  );
};

export default HomePage;
