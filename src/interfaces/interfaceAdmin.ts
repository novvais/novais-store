export interface IRegisterAdm {
  name: string;
  cpf: string;
  username: string;
  password: string;
}

export interface ILoginAdm {
  cpf: string;
  password: string;
}

export interface IUpdateAdm {
  name?: string;
  cpf?: string;
  username?: string;
  password?: string;
}
