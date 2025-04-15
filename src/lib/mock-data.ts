
import { Course, Chapter, Lesson, Page, User, Enrollment, Exam, Question } from "@/types";

// Mock Courses
export const courses: Course[] = [
  {
    id: 1,
    title: "Introduction to Web Development",
    description: "Learn the fundamentals of HTML, CSS, and JavaScript to build your first website.",
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=500",
    status: "active",
    created_at: "2023-01-15T10:00:00Z",
    updated_at: "2023-02-20T14:30:00Z",
    chaptersCount: 5,
    lessonsCount: 20,
    enrollmentCount: 328
  },
  {
    id: 2,
    title: "Advanced React Programming",
    description: "Master React with hooks, context API, and advanced state management patterns.",
    thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=500",
    status: "active",
    created_at: "2023-03-10T09:15:00Z",
    updated_at: "2023-04-05T11:45:00Z",
    chaptersCount: 7,
    lessonsCount: 35,
    enrollmentCount: 215
  },
  {
    id: 3,
    title: "Python for Data Science",
    description: "Explore data analysis and visualization using Python's powerful libraries.",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=500",
    status: "active",
    created_at: "2023-02-20T14:20:00Z",
    updated_at: "2023-03-15T16:10:00Z",
    chaptersCount: 8,
    lessonsCount: 40,
    enrollmentCount: 422
  },
  {
    id: 4,
    title: "UI/UX Design Principles",
    description: "Learn the fundamentals of user experience design and create beautiful interfaces.",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=500",
    status: "active",
    created_at: "2023-04-05T08:30:00Z",
    updated_at: "2023-05-10T13:20:00Z",
    chaptersCount: 4,
    lessonsCount: 16,
    enrollmentCount: 186
  },
  {
    id: 5,
    title: "Mobile App Development with Flutter",
    description: "Build cross-platform mobile applications using Google's Flutter framework.",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=500",
    status: "maintenance",
    created_at: "2023-05-12T11:40:00Z",
    updated_at: "2023-06-18T09:55:00Z",
    chaptersCount: 6,
    lessonsCount: 28,
    enrollmentCount: 157
  },
  {
    id: 6,
    title: "Machine Learning Fundamentals",
    description: "Understand core concepts of machine learning and build your first models.",
    thumbnail: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=500",
    status: "active",
    created_at: "2023-06-08T15:20:00Z",
    updated_at: "2023-07-14T10:15:00Z",
    chaptersCount: 9,
    lessonsCount: 45,
    enrollmentCount: 298
  }
];

// Mock Chapters for Course 1
export const chapters: Chapter[] = [
  {
    id: 1,
    course_id: 1,
    title: "Getting Started with HTML",
    chapter_order: 1,
    created_at: "2023-01-15T10:30:00Z",
    updated_at: "2023-01-16T09:45:00Z"
  },
  {
    id: 2,
    course_id: 1,
    title: "CSS Basics",
    chapter_order: 2,
    created_at: "2023-01-17T11:20:00Z",
    updated_at: "2023-01-18T14:35:00Z"
  },
  {
    id: 3,
    course_id: 1,
    title: "Introduction to JavaScript",
    chapter_order: 3,
    created_at: "2023-01-19T13:10:00Z",
    updated_at: "2023-01-20T15:25:00Z"
  },
  {
    id: 4,
    course_id: 1,
    title: "Building Your First Webpage",
    chapter_order: 4,
    created_at: "2023-01-21T09:50:00Z",
    updated_at: "2023-01-22T12:15:00Z"
  },
  {
    id: 5,
    course_id: 1,
    title: "Web Development Tools",
    chapter_order: 5,
    created_at: "2023-01-23T14:40:00Z",
    updated_at: "2023-01-24T16:30:00Z"
  }
];

// Mock Lessons for Chapter 1
export const lessons: Lesson[] = [
  {
    id: 1,
    chapter_id: 1,
    title: "Understanding HTML Structure",
    lesson_order: 1,
    created_at: "2023-01-15T10:35:00Z",
    updated_at: "2023-01-15T11:20:00Z"
  },
  {
    id: 2,
    chapter_id: 1,
    title: "HTML Elements and Tags",
    lesson_order: 2,
    created_at: "2023-01-15T11:30:00Z",
    updated_at: "2023-01-15T12:15:00Z"
  },
  {
    id: 3,
    chapter_id: 1,
    title: "Working with Headers and Paragraphs",
    lesson_order: 3,
    created_at: "2023-01-15T13:45:00Z",
    updated_at: "2023-01-15T14:30:00Z"
  },
  {
    id: 4,
    chapter_id: 1,
    title: "Adding Links and Images",
    lesson_order: 4,
    created_at: "2023-01-15T15:10:00Z",
    updated_at: "2023-01-15T16:00:00Z"
  }
];

// Mock Pages for Lesson 1
export const pages: Page[] = [
  {
    id: 1,
    lesson_id: 1,
    page_number: 1,
    page_type: "text",
    content: `
      <h1>Understanding HTML Structure</h1>
      <p>HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It defines the structure and content of a web page.</p>
      <p>Every HTML document has a basic structure that includes the following elements:</p>
      <ul>
        <li><strong>DOCTYPE declaration</strong>: Tells the browser which version of HTML the page is using.</li>
        <li><strong>HTML element</strong>: The root element that contains all other HTML elements.</li>
        <li><strong>HEAD element</strong>: Contains meta-information about the document, such as title, links to CSS, etc.</li>
        <li><strong>BODY element</strong>: Contains the visible content of the page.</li>
      </ul>
      <p>Here's a simple example of an HTML document structure:</p>
      <pre>
        &lt;!DOCTYPE html&gt;
        &lt;html&gt;
          &lt;head&gt;
            &lt;title&gt;My First Webpage&lt;/title&gt;
          &lt;/head&gt;
          &lt;body&gt;
            &lt;h1&gt;Hello, World!&lt;/h1&gt;
            &lt;p&gt;This is my first web page.&lt;/p&gt;
          &lt;/body&gt;
        &lt;/html&gt;
      </pre>
    `,
    created_at: "2023-01-15T10:40:00Z",
    updated_at: "2023-01-15T11:00:00Z"
  },
  {
    id: 2,
    lesson_id: 1,
    page_number: 2,
    page_type: "video",
    content: "https://www.youtube.com/embed/UB1O30fR-EE",
    created_at: "2023-01-15T10:45:00Z",
    updated_at: "2023-01-15T11:05:00Z"
  },
  {
    id: 3,
    lesson_id: 1,
    page_number: 3,
    page_type: "text",
    content: `
      <h1>The DOCTYPE Declaration</h1>
      <p>The DOCTYPE declaration must be the very first thing in your HTML document, before the HTML tag. The DOCTYPE declaration is not an HTML tag; it is an instruction to the web browser about what version of HTML the page is written in.</p>
      <p>In HTML5, the declaration is simple:</p>
      <pre>&lt;!DOCTYPE html&gt;</pre>
      <p>This declaration is case-insensitive in HTML5, so any of these are acceptable:</p>
      <ul>
        <li>&lt;!DOCTYPE html&gt;</li>
        <li>&lt;!DOCTYPE HTML&gt;</li>
        <li>&lt;!doctype html&gt;</li>
      </ul>
      <p>However, it's a good practice to stick with the lowercase version for consistency.</p>
      <h2>Practice Exercise</h2>
      <p>Try to create a simple HTML document with the proper DOCTYPE declaration and basic structure. Include a title in the head section and a heading and paragraph in the body section.</p>
    `,
    created_at: "2023-01-15T10:50:00Z",
    updated_at: "2023-01-15T11:10:00Z"
  }
];

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
export const enrollments: Enrollment[] = [
  {
    id: 1,
    course_id: 1,
    user_id: 1,
    progress_percent: 35.75,
    status: "enrolled",
    enrolled_date: "2023-02-10T08:30:00Z",
    updated_at: "2023-02-25T16:45:00Z",
    course: courses[0]
  },
  {
    id: 2,
    course_id: 3,
    user_id: 1,
    progress_percent: 15.20,
    status: "enrolled",
    enrolled_date: "2023-03-05T10:15:00Z",
    updated_at: "2023-03-12T11:30:00Z",
    course: courses[2]
  }
];

// Mock Exams
export const exams: Exam[] = [
  {
    id: 1,
    course_id: 1,
    chapter_id: 1,
    title: "HTML Basics Assessment",
    time_limit: 30,
    total_questions: 10,
    created_at: "2023-01-16T09:00:00Z",
    updated_at: "2023-01-16T09:00:00Z"
  }
];

// Mock Questions for Exam 1
export const questions: Question[] = [
  {
    id: 1,
    chapter_id: 1,
    question_text: "What does HTML stand for?",
    option_a: "Hyper Text Markup Language",
    option_b: "High Tech Modern Language",
    option_c: "Hyperlink and Text Markup Language",
    option_d: "Home Tool Markup Language",
    correct_answer: "a",
    created_at: "2023-01-16T09:05:00Z",
    updated_at: "2023-01-16T09:05:00Z"
  },
  {
    id: 2,
    chapter_id: 1,
    question_text: "Which element is used to define the title of an HTML document?",
    option_a: "<head>",
    option_b: "<title>",
    option_c: "<header>",
    option_d: "<meta>",
    correct_answer: "b",
    created_at: "2023-01-16T09:10:00Z",
    updated_at: "2023-01-16T09:10:00Z"
  }
];

// Mock API functions
export const fetchCourses = (): Promise<Course[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(courses);
    }, 500);
  });
};

export const fetchCourseById = (id: number): Promise<Course | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(courses.find(course => course.id === id));
    }, 300);
  });
};

export const fetchChaptersByCourseId = (courseId: number): Promise<Chapter[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(chapters.filter(chapter => chapter.course_id === courseId));
    }, 300);
  });
};

export const fetchLessonsByChapterId = (chapterId: number): Promise<Lesson[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(lessons.filter(lesson => lesson.chapter_id === chapterId));
    }, 300);
  });
};

export const fetchPagesByLessonId = (lessonId: number): Promise<Page[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(pages.filter(page => page.lesson_id === lessonId));
    }, 300);
  });
};

export const fetchUserEnrollments = (userId: number): Promise<Enrollment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(enrollments.filter(enrollment => enrollment.user_id === userId));
    }, 300);
  });
};

export const checkEnrollment = (userId: number, courseId: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(enrollments.some(e => e.user_id === userId && e.course_id === courseId));
    }, 200);
  });
};

export const enrollInCourse = (userId: number, courseId: number): Promise<Enrollment> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEnrollment: Enrollment = {
        id: enrollments.length + 1,
        course_id: courseId,
        user_id: userId,
        progress_percent: 0,
        status: "enrolled",
        enrolled_date: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        course: courses.find(c => c.id === courseId)
      };
      enrollments.push(newEnrollment);
      resolve(newEnrollment);
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
      resolve(exams.filter(exam => exam.chapter_id === chapterId));
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
