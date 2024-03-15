"use client";

import React, { ReactNode, createContext, useState } from "react";

export const AvaliacoesContext: React.Context<AvaliacoesContext> =
  createContext({} as AvaliacoesContext);

export const AvaliacoesProvider = ({ children }: { children: ReactNode }) => {
  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoType>({
    qualidadeConexao: 0,
    suporteCliente: 0,
    coberturaServico: 0,
    preco: 0,
    segurancaRede: 0,
  });

  return (
    <AvaliacoesContext.Provider value={{ avaliacoes, setAvaliacoes }}>
      {children}
    </AvaliacoesContext.Provider>
  );
};
