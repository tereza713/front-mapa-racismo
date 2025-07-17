export interface TypesRacismProps{ // tipando
    id?: string;
    descricao: string;
    }

  export interface OccurrencesProps {
  id?: string;
  descricao: string;
  data: string;
  status: string;
  localizacaoId?: string;
  tipoRacismoId?: string;
}

export interface LocationProps { // <--- DEFINIDA AQUI
  id: string;
  nome: string; // Ou 'descricao', 'endereco', o que você usar
  descricao: string;
  bairro?: string;
  rua?: string;
  latitude?: number;
  longitude?: number;
  tipoRacismo: TypesRacismProps; // Uau, isso é um objeto complexo!
  _count?: {
    respostas: number;
  };
}

  export interface Usuario {
    id?: string;
    email: string;
    senha: string;
};

export interface TypeFormData {
  descricao: string;
  localizacaoId: number;
  tipoRacismoId: number;
  status: string;
}


export interface LoginProps {
    email: string; 
    senha: string;
};

export interface ContextProps {
  usuario: Usuario | null; 
  isLoading: boolean;
  login: ({ email, senha }: LoginProps) => Promise<void>;
  logout: () => void;
};
  