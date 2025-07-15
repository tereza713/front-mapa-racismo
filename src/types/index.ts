export interface TypesRacismProps{ // tipando
    id?: string;
    descricao: string;
    }

  export interface Usuario {
    id?: string;
    email: string;
    papel: "USER" | "ADMIN";
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


  