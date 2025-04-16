
import api from '@/lib/axios';
import { Course, Chapter, Lesson, Page } from '@/types';

interface CourseApiResponse {
  success: boolean;
  courses?: Course[];
  course?: Course;
  message?: string;
}

interface ChapterApiResponse {
  success: boolean;
  chapters?: Chapter[];
  chapter?: Chapter & { lessons?: Lesson[] };
  message?: string;
}

interface LessonApiResponse {
  success: boolean;
  lessons?: Lesson[];
  lesson?: Lesson & { pages?: Page[] };
  message?: string;
}

interface PageApiResponse {
  success: boolean;
  pages?: Page[];
  page?: Page;
  message?: string;
}

const courseService = {
  getAllCourses: async (): Promise<Course[]> => {
    const response = await api.get<CourseApiResponse>('/courses');
    return response.data.courses || [];
  },
  
  getCourseById: async (courseId: number): Promise<Course | null> => {
    const response = await api.get<CourseApiResponse>(`/courses/${courseId}`);
    return response.data.course || null;
  },
  
  getChaptersByCourseId: async (courseId: number): Promise<Chapter[]> => {
    const response = await api.get<ChapterApiResponse>(`/chapters/course/${courseId}`);
    return response.data.chapters || [];
  },
  
  getChapterById: async (chapterId: number): Promise<(Chapter & { lessons: Lesson[] }) | null> => {
    const response = await api.get<ChapterApiResponse>(`/chapters/${chapterId}`);
    return (response.data.chapter as (Chapter & { lessons: Lesson[] })) || null;
  },
  
  getLessonsByChapterId: async (chapterId: number): Promise<Lesson[]> => {
    const response = await api.get<LessonApiResponse>(`/lessons/chapter/${chapterId}`);
    return response.data.lessons || [];
  },
  
  getLessonById: async (lessonId: number): Promise<(Lesson & { pages: Page[] }) | null> => {
    const response = await api.get<LessonApiResponse>(`/lessons/${lessonId}`);
    return (response.data.lesson as (Lesson & { pages: Page[] })) || null;
  },
  
  getPagesByLessonId: async (lessonId: number): Promise<Page[]> => {
    const response = await api.get<PageApiResponse>(`/pages?lessonId=${lessonId}`);
    return response.data.pages || [];
  }
};

export default courseService;
