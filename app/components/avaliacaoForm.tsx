import React from "react";
import { Card } from ".";

export const AvaliacaoForm = ({
  avaliacoes,
  setAvaliacoes,
}: AvaliacaoFormProps) => {
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setAvaliacoes({ ...avaliacoes, [name]: parseInt(value) });
  };

  // utilizar ReactStars

  return (
    <div className="h-[80%] w-full p-10">
      <h1 className="text-center text-2xl m-4">Insira suas avaliações:</h1>
      <div className="flex justify-center text-left w-full gap-2">
        <Card id="qualidadeConexao" title="Qualidade da Conexão:">
          <input
            type="number"
            name="qualidadeConexao"
            id="qualidadeConexao"
            min="1"
            max="5"
            value={avaliacoes.qualidadeConexao}
            onChange={handleInputChange}
          />
        </Card>

        <Card id="suporteCliente" title="Suporte ao Cliente:">
          <input
            type="number"
            name="suporteCliente"
            id="suporteCliente"
            min="1"
            max="5"
            value={avaliacoes.suporteCliente}
            onChange={handleInputChange}
          />
        </Card>

        <Card id="coberturaServico" title="Cobertura do Serviço:">
          <input
            type="number"
            name="coberturaServico"
            id="coberturaServico"
            min="1"
            max="5"
            value={avaliacoes.coberturaServico}
            onChange={handleInputChange}
          />
        </Card>
      </div>

      <div className="flex w-full justify-center gap-2 mt-2">
        <Card id="preco" title="Preço:">
          <input
            type="number"
            name="preco"
            id="preco"
            min="1"
            max="5"
            value={avaliacoes.preco}
            onChange={handleInputChange}
          />
        </Card>

        <Card id="segurancaRede" title="Segurança da Rede:">
          <input
            type="number"
            name="segurancaRede"
            id="segurancaRede"
            min="1"
            max="5"
            value={avaliacoes.segurancaRede}
            onChange={handleInputChange}
          />
        </Card>
      </div>
    </div>
  );
};
