export interface IRegisterClient {
  name: string;
  email: string;
  password: string;
}

export interface ILoginClient {
  email: string;
  password: string;
}

export interface IUpdateClient {
  name?: string;
  email?: string;
  password?: string;
}
