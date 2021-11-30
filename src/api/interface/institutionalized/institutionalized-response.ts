import { InstitutionalizedRequest } from './institutionalized-request';

export interface InstitutionalizedResponse extends InstitutionalizedRequest {
  id: number;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
}

export interface InstitutionalizedListContentResponse {
  id: number;
  name: string;
  cpf: string;
  phone: string;
  birthDay: string;
  gender: string;
}

export interface InstitutionalizedListResponse {
  content: InstitutionalizedListContentResponse[];
  first: boolean;
  last: boolean;
  number: number;
  totalPages: number;
}
