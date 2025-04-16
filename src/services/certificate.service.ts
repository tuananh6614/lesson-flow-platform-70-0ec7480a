
import api from '@/lib/axios';

interface Certificate {
  id: number;
  user_id: number;
  course_id: number;
  certificate_url: string;
  issued_at: string;
  course_title?: string;
  full_name?: string;
}

interface CertificateApiResponse {
  success: boolean;
  certificates?: Certificate[];
  certificate?: Certificate;
  message?: string;
}

interface VerifyCertificateResponse {
  success: boolean;
  isValid: boolean;
  certificate?: {
    course_title: string;
    full_name: string;
    issued_at: string;
  };
  message?: string;
}

const certificateService = {
  getUserCertificates: async (): Promise<Certificate[]> => {
    const response = await api.get<CertificateApiResponse>('/certificates/user');
    return response.data.certificates || [];
  },
  
  getCertificateById: async (certificateId: number): Promise<Certificate | null> => {
    const response = await api.get<CertificateApiResponse>(`/certificates/${certificateId}`);
    return response.data.certificate || null;
  },
  
  verifyCertificate: async (certificateUrl: string): Promise<VerifyCertificateResponse> => {
    const response = await api.get<VerifyCertificateResponse>(`/certificates/verify/${certificateUrl}`);
    return response.data;
  }
};

export default certificateService;
