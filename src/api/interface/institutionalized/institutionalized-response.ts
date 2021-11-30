export interface InstitutionalizedResponse {
  id: number;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  name: string;
  cpf: string;
  phone: string;
  birthDay: string;
  gender: number;
}

export interface MedicalRecordResponse {
  id: number;
  institutionalized?: InstitutionalizedResponse;
  medicalAppointmentDate: string;
  reason: number;
  anamnesis: string;
  diagnosticHypotheses: string;
  definitiveDiagnosis: string;
  infectiousDiseaseCarrier: boolean;
  infectiousDiseaseDescription: string;
  responsible: string;
  cid?: string;
}
export interface MedicalRecordListResponse {
  content: MedicalRecordResponse[];
  first: boolean;
  last: boolean;
  number: number;
  totalPages: number;
}
