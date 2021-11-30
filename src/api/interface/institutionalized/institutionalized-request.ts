export interface InstitutionalizedRequest {
  name: string;
  cpf: string;
  phone: string;
  birthDay: string;
  gender: number;
}

export interface InstitutionalizedListRequest {
  name?: string;
  page?: number;
}
