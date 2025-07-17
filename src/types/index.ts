export interface TypesRacismProps{ // tipando
    id?: string;
    descricao: string;
    }

  export interface OccurrencesProps {
  id?: string;
  descricao: string;
  data: string;
  status: string;
  localizacaoId: string;
  tipoRacismoId: string;
}
  export interface Usuario {
    id?: string;
    email: string;
    senha: string;
};

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

//roger está aqui
  