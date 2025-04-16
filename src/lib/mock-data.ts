import { Course, Chapter, Lesson, Page, User, Enrollment, Exam, Question } from "@/types";

// Mock Courses
export const courses: Course[] = [];

// Mock Chapters for Course 1
export const chapters: Chapter[] = [];

// Mock Lessons for Chapter 1
export const lessons: Lesson[] = [];

// Mock Pages for Lesson 1
export const pages: Page[] = [];

// Mock User
export const currentUser: User = {
  id: 1,
  full_name: "John Doe",
  email: "john.doe@example.com",
  role: "user",
  status: "active",
  created_at: "2022-12-01T09:00:00Z",
  updated_at: "2023-01-05T14:20:00Z"
};

// Mock Enrollments
export const enrollments: Enrollment[] = [];

// Mock Exams
export const exams: Exam[] = [];

// Mock Questions for Exam 1
export const questions: Question[] = [];

// Mock API functions
export const fetchCourses = (): Promise<Course[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]); // Empty array to be replaced by backend data
    }, 500);
  });
};

export const fetchCourseById = (id: number): Promise<Course | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, 300);
  });
};

export const fetchChaptersByCourseId = (courseId: number): Promise<Chapter[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 300);
  });
};

export const fetchLessonsByChapterId = (chapterId: number): Promise<Lesson[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 300);
  });
};

export const fetchPagesByLessonId = (lessonId: number): Promise<Page[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 300);
  });
};

export const fetchUserEnrollments = (userId: number): Promise<Enrollment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 300);
  });
};

export const checkEnrollment = (userId: number, courseId: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(false);
    }, 200);
  });
};

export const enrollInCourse = (userId: number, courseId: number): Promise<Enrollment> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: enrollments.length + 1,
        course_id: courseId,
        user_id: userId,
        progress_percent: 0,
        status: "enrolled",
        enrolled_date: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        course: undefined
      });
    }, 400);
  });
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate a logged-in or logged-out state
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (isLoggedIn) {
        resolve(currentUser);
      } else {
        resolve(null);
      }
    }, 300);
  });
};

export const loginUser = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simple mock authentication logic
      if (email === "john.doe@example.com" && password === "password") {
        localStorage.setItem('isLoggedIn', 'true');
        resolve(currentUser);
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 500);
  });
};

export const logoutUser = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem('isLoggedIn');
      resolve();
    }, 300);
  });
};

export const registerUser = (
  fullName: string, 
  email: string, 
  password: string
): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simple mock registration logic
      if (email === "john.doe@example.com") {
        reject(new Error("Email already exists"));
      } else {
        localStorage.setItem('isLoggedIn', 'true');
        const newUser = {
          ...currentUser,
          full_name: fullName,
          email: email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        resolve(newUser);
      }
    }, 500);
  });
};

export const updateUserProgress = (
  userId: number,
  courseId: number,
  progressPercent: number
): Promise<Enrollment> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const enrollment = enrollments.find(
        e => e.user_id === userId && e.course_id === courseId
      );
      
      if (enrollment) {
        enrollment.progress_percent = progressPercent;
        enrollment.updated_at = new Date().toISOString();
        if (progressPercent >= 100) {
          enrollment.status = "completed";
        }
        resolve(enrollment);
      } else {
        resolve(enrollInCourse(userId, courseId));
      }
    }, 300);
  });
};

export const fetchExamsByChapterId = (chapterId: number): Promise<Exam[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 300);
  });
};

export const fetchQuestionsByExamId = (examId: number): Promise<Question[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const exam = exams.find(e => e.id === examId);
      if (exam) {
        resolve(questions.filter(q => q.chapter_id === exam.chapter_id).slice(0, exam.total_questions));
      } else {
        resolve([]);
      }
    }, 300);
  });
};
