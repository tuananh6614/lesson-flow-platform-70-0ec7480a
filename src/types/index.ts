
// Toast types
export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

// Course types
export interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  status: string;
  enrollmentCount: number;
  lessonsCount: number;
}

// User types
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Chapter types
export interface Chapter {
  id: number;
  title: string;
  description: string;
  chapter_order: number;
  courseId: number;
}
