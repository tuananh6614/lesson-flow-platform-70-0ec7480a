
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
  status: 'active' | 'inactive' | 'maintenance';
  enrollmentCount: number;
  lessonsCount: number;
  created_at?: string;
  updated_at?: string;
}

// User types
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  full_name: string;
  status?: 'active' | 'inactive' | 'banned';
  created_at?: string;
  updated_at?: string;
}

// Chapter types
export interface Chapter {
  id: number;
  title: string;
  description: string;
  chapter_order: number;
  courseId: number;
  course_id?: number;
  created_at?: string;
  updated_at?: string;
  lessons?: Lesson[];
}

// Additional types needed throughout the application
export interface Lesson {
  id: number;
  chapter_id: number;
  title: string;
  lesson_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Page {
  id: number;
  lesson_id: number;
  page_number: number;
  page_type: 'text' | 'video' | 'other';
  content: string;
  created_at?: string;
  updated_at?: string;
}

export interface Enrollment {
  id: number;
  course_id: number;
  user_id: number;
  progress_percent: number;
  status: 'enrolled' | 'completed' | 'dropped';
  enrolled_date: string;
  updated_at?: string;
  course?: Course;
}

export interface Exam {
  id: number;
  course_id: number;
  chapter_id: number;
  title: string;
  time_limit: number;
  total_questions: number;
  created_at?: string;
  updated_at?: string;
}

export interface Question {
  id: number;
  chapter_id: number;
  question_text: string;
  option_a?: string;
  option_b?: string;
  option_c?: string;
  option_d?: string;
  correct_answer: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserExam {
  id: number;
  exam_id: number;
  user_id: number;
  attempt_count: number;
  score?: number;
  completed_at: string;
  created_at?: string;
  updated_at?: string;
}

export interface Certificate {
  id: number;
  user_id: number;
  course_id: number;
  certificate_url: string;
  issued_at: string;
  course_title?: string;
}

export interface PasswordChange {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
