type AvaliacaoType = {
  qualidadeConexao: number;
  suporteCliente: number;
  coberturaServico: number;
  preco: number;
  segurancaRede: number;
}

type AvaliacaoFormProps = {
  avaliacoes: AvaliacaoType;
  setAvaliacoes: React.Dispatch<React.SetStateAction<AvaliacaoType>>;
}

type CardProps = {
  title: string;
  children: React.ReactNode;
  id: string;
  className?: string;
}