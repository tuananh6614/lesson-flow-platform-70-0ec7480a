
import api from '@/lib/axios';
import { Exam, Question, UserExam } from '@/types';

interface ExamApiResponse {
  success: boolean;
  exams?: Exam[];
  exam?: Exam;
  message?: string;
}

interface QuestionApiResponse {
  success: boolean;
  questions?: Question[];
  message?: string;
}

interface ExamResultApiResponse {
  success: boolean;
  userExam: UserExam;
  message?: string;
}

interface SubmitExamRequest {
  answers: {
    questionId: number;
    answer: string;
  }[];
}

const examService = {
  getExamsByChapterId: async (chapterId: number): Promise<Exam[]> => {
    const response = await api.get<ExamApiResponse>(`/exams/chapter/${chapterId}`);
    return response.data.exams || [];
  },
  
  getExamById: async (examId: number): Promise<Exam | null> => {
    const response = await api.get<ExamApiResponse>(`/exams/${examId}`);
    return response.data.exam || null;
  },
  
  getQuestionsForExam: async (examId: number): Promise<Question[]> => {
    const response = await api.get<QuestionApiResponse>(`/exams/${examId}/questions`);
    return response.data.questions || [];
  },
  
  submitExam: async (examId: number, answers: SubmitExamRequest): Promise<ExamResultApiResponse> => {
    const response = await api.post<ExamResultApiResponse>(`/exams/${examId}/submit`, answers);
    return response.data;
  },
  
  getExamResults: async (examId: number): Promise<ExamResultApiResponse> => {
    const response = await api.get<ExamResultApiResponse>(`/exams/${examId}/results`);
    return response.data;
  }
};

export default examService;
