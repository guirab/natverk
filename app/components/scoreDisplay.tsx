import React, { useState, useEffect } from "react";

export const ScoreDisplay = ({
  avaliacoes,
  provedor,
}: {
  avaliacoes: AvaliacaoType;
  provedor: string;
}) => {
  const [scoreFinal, setScoreFinal] = useState(0);

  const calcularScore = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/avaliacoes/:${provedor}`,
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
      // Lidar com o erro, se necessário
    }
  };

  useEffect(() => {
    if (Object.values(avaliacoes).every((avaliacao) => avaliacao === 0)) return;
    calcularScore();
  }, [avaliacoes]);

  return (
    <div className="h-[10%] w-full">
      <h2>Score Calculado:</h2>
      <p>
        {scoreFinal !== 0 && scoreFinal !== null ? scoreFinal.toFixed(2) : 0}
      </p>
    </div>
  );
};
