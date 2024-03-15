import { useState } from "react";

export const CadastroProvedor = ({
  fetchProvedores,
}: {
  fetchProvedores: () => void;
}) => {
  const [nomeProvedor, setNomeProvedor] = useState<string>("");

  const cadastrarProvedor = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome: nomeProvedor }),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar provedor");
      }

      setNomeProvedor("");
      fetchProvedores();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-[10%] w-[50%] flex flex-col">
      <label htmlFor="nome">Cadastrar Provedor</label>
      <input
        type="text"
        name="nome"
        id="nome"
        value={nomeProvedor}
        onChange={(e) => setNomeProvedor(e.target.value)}
        placeholder="Nome do provedor"
        className="border-2 text-black p-2 rounded-lg w-full mt-2"
      />
      <button
        onClick={cadastrarProvedor}
        className="bg-blue-500 text-white p-2 mt-2 rounded-lg"
      >
        Cadastrar
      </button>
    </div>
  );
};
