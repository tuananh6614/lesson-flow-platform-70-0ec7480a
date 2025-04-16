
// User related types
export interface User {
  id: number;
  full_name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive' | 'banned';
  created_at: string;
  updated_at: string;
}

export interface PasswordChange {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Course related types
export interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  status: 'active' | 'inactive' | 'maintenance';
  created_at: string;
  updated_at: string;
  chapters?: Chapter[];
}

export interface Chapter {
  id: number;
  course_id: number;
  title: string;
  chapter_order: number;
  created_at: string;
  updated_at: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id: number;
  chapter_id: number;
  title: string;
  lesson_order: number;
  created_at: string;
  updated_at: string;
}

export interface Page {
  id: number;
  lesson_id: number;
  page_number: number;
  page_type: 'text' | 'video' | 'other';
  content: string;
  created_at: string;
  updated_at: string;
}

// Enrollment related types
export interface Enrollment {
  id: number;
  course_id: number;
  user_id: number;
  progress_percent: number;
  status: 'enrolled' | 'completed' | 'dropped';
  enrolled_date: string;
  updated_at: string;
  course?: Course;
}

// Exam related types
export interface Exam {
  id: number;
  course_id: number;
  chapter_id: number;
  title: string;
  time_limit: number;
  total_questions: number;
  created_at: string;
  updated_at: string;
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
  created_at: string;
  updated_at: string;
}

export interface UserExam {
  id: number;
  exam_id: number;
  user_id: number;
  attempt_count: number;
  score?: number;
  completed_at: string;
  created_at: string;
  updated_at: string;
}

export interface Certificate {
  id: number;
  user_id: number;
  course_id: number;
  certificate_url: string;
  issued_at: string;
  course_title?: string;
}

// Toast notification type
export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}
