
import api from '@/lib/axios';
import { Enrollment } from '@/types';

interface EnrollmentApiResponse {
  success: boolean;
  enrollments?: Enrollment[];
  enrollment?: Enrollment;
  message?: string;
}

interface EnrollmentStatusResponse {
  success: boolean;
  isEnrolled: boolean;
  enrollment?: Enrollment;
  message?: string;
}

interface EnrollmentStatsResponse {
  success: boolean;
  totalEnrollments: number;
  activeEnrollments: number;
  completedEnrollments: number;
  averageProgressPercent: number;
  message?: string;
}

const enrollmentService = {
  getUserEnrollments: async (): Promise<Enrollment[]> => {
    const response = await api.get<EnrollmentApiResponse>('/enrollment/user');
    return response.data.enrollments || [];
  },
  
  getEnrollmentStatus: async (courseId: number): Promise<EnrollmentStatusResponse> => {
    const response = await api.get<EnrollmentStatusResponse>(`/enrollment/status?courseId=${courseId}`);
    return response.data;
  },
  
  enrollInCourse: async (courseId: number): Promise<Enrollment> => {
    const response = await api.post<EnrollmentApiResponse>('/enrollment', { course_id: courseId });
    if (!response.data.enrollment) {
      throw new Error('Failed to enroll in course');
    }
    return response.data.enrollment;
  },
  
  updateProgress: async (enrollmentId: number, progressPercent: number): Promise<Enrollment> => {
    const response = await api.put<EnrollmentApiResponse>(`/enrollment/${enrollmentId}/progress`, { 
      progress_percent: progressPercent 
    });
    
    if (!response.data.enrollment) {
      throw new Error('Failed to update progress');
    }
    return response.data.enrollment;
  },
  
  dropCourse: async (enrollmentId: number): Promise<Enrollment> => {
    const response = await api.put<EnrollmentApiResponse>(`/enrollment/${enrollmentId}/drop`, {});
    
    if (!response.data.enrollment) {
      throw new Error('Failed to drop course');
    }
    return response.data.enrollment;
  },
  
  getCourseEnrollmentStats: async (courseId: number): Promise<EnrollmentStatsResponse> => {
    const response = await api.get<EnrollmentStatsResponse>(`/enrollment/stats/${courseId}`);
    return response.data;
  }
};

export default enrollmentService;
