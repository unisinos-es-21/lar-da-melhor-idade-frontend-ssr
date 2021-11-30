import { client } from '@base/api/client';

import { InstitutionalizedListRequest } from '@base/api/interface/institutionalized';
import { MedicalRecordListResponse } from '@base/api/interface/institutionalized';

export function getMedicalRecordList(
  param: InstitutionalizedListRequest = {
    page: 0,
    cpf: '0',
  }
) {
  const params = new URLSearchParams();

  params.append('page', String(param.page ?? 0));

  const url = `medicalRecord/findByCpf/${param.cpf}?${params.toString()}`;

  return client.get<MedicalRecordListResponse>(url);
}
