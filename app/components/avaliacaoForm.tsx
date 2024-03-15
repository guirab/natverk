import React, { useContext } from "react";
import ReactStars from "react-stars";

import { Card } from ".";
import { AvaliacoesContext } from "@/store/context";

export const AvaliacaoForm = () => {
  const { avaliacoes, setAvaliacoes } = useContext(AvaliacoesContext);

  const handleInputChange = (value: number, name: string) => {
    setAvaliacoes({ ...avaliacoes, [name]: value });
  };

  return (
    <div className="h-[40%] w-full">
      <h1 className="text-center text-2xl m-4">Insira suas avaliações:</h1>
      <div className="flex justify-center text-left w-full gap-2">
        <Card id="qualidadeConexao" title="Qualidade da Conexão:">
          <ReactStars
            count={5}
            size={24}
            half={false}
            color2={"#ffd700"}
            value={avaliacoes.qualidadeConexao}
            onChange={(e) => handleInputChange(e, "qualidadeConexao")}
          />
        </Card>

        <Card id="suporteCliente" title="Suporte ao Cliente:">
          <ReactStars
            count={5}
            size={24}
            half={false}
            color2={"#ffd700"}
            value={avaliacoes.suporteCliente}
            onChange={(e) => handleInputChange(e, "suporteCliente")}
          />
        </Card>

        <Card id="coberturaServico" title="Cobertura do Serviço:">
          <ReactStars
            count={5}
            size={24}
            half={false}
            color2={"#ffd700"}
            value={avaliacoes.coberturaServico}
            onChange={(e) => handleInputChange(e, "coberturaServico")}
          />
        </Card>
      </div>

      <div className="flex w-full justify-center gap-2 mt-2">
        <Card id="preco" title="Preço:">
          <ReactStars
            count={5}
            size={24}
            half={false}
            color2={"#ffd700"}
            value={avaliacoes.preco}
            onChange={(e) => handleInputChange(e, "preco")}
          />
        </Card>

        <Card id="segurancaRede" title="Segurança da Rede:">
          <ReactStars
            count={5}
            size={24}
            half={false}
            color2={"#ffd700"}
            value={avaliacoes.segurancaRede}
            onChange={(e) => handleInputChange(e, "segurancaRede")}
          />
        </Card>
      </div>
    </div>
  );
};
