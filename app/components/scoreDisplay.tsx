import React, { useState, useEffect } from "react";

export const ScoreDisplay = ({ avaliacoes }: { avaliacoes: AvaliacaoType }) => {
  const [scoreFinal, setScoreFinal] = useState(0);

  useEffect(() => {
    const calcularScore = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/avaliacoes/:natverk",
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

    calcularScore();
  }, [avaliacoes]);

  return (
    <div className="h-[20%] w-full p-10">
      <h2>Score Calculado:</h2>
      <p>
        {scoreFinal !== 0 && scoreFinal !== null ? scoreFinal.toFixed(2) : 0}
      </p>
    </div>
  );
};
