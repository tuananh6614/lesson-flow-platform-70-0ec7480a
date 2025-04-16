import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCourseById, fetchChaptersByCourseId, fetchLessonsByChapterId, fetchPagesByLessonId, updateUserProgress } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X, 
  BookOpen, 
  CheckCircle,
  PlayCircle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import ProgressBar from "@/components/ProgressBar";
import { Page } from "@/types";
import { Separator } from "@/components/ui/separator";

const LessonView = () => {
  const { courseId, chapterId, lessonId } = useParams<{ 
    courseId: string; 
    chapterId: string;
    lessonId: string;
  }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Fetch course details
  const { data: course } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => fetchCourseById(Number(courseId)),
  });

  // Fetch course chapters
  const { data: chapters } = useQuery({
    queryKey: ["chapters", courseId],
    queryFn: () => fetchChaptersByCourseId(Number(courseId)),
    enabled: !!courseId,
  });

  // Fetch lessons for the current chapter
  const { data: lessons } = useQuery({
    queryKey: ["lessons", chapterId],
    queryFn: () => fetchLessonsByChapterId(Number(chapterId)),
    enabled: !!chapterId,
  });

  // Fetch pages for the current lesson
  const { data: pages, isLoading: pagesLoading } = useQuery({
    queryKey: ["pages", lessonId],
    queryFn: () => fetchPagesByLessonId(Number(lessonId)),
    enabled: !!lessonId,
  });

  // Update progress when navigating between pages
  useEffect(() => {
    if (user && pages && pages.length > 0) {
      // Calculate lesson progress based on current page index
      const lessonProgress = ((currentPageIndex + 1) / pages.length) * 100;
      
      // Calculate overall course progress (simplified calculation)
      // In a real implementation, we would track completed lessons across all chapters
      const estimatedCourseProgress = (Number(lessonId) / 10) * 100; // Assuming 10 lessons total
      
      // Update user progress in the course
      updateUserProgress(user.id, Number(courseId), estimatedCourseProgress)
        .catch(error => {
          console.error("Failed to update progress:", error);
        });
      
      // Set local progress state
      setProgress(lessonProgress);
    }
  }, [currentPageIndex, pages, user, courseId, lessonId]);

  const currentPage = pages && pages.length > 0 ? pages[currentPageIndex] : null;

  const nextPage = () => {
    if (pages && currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    } else {
      // Move to next lesson
      if (lessons) {
        const currentLessonIndex = lessons.findIndex(l => l.id === Number(lessonId));
        if (currentLessonIndex < lessons.length - 1) {
          // Navigate to next lesson
          const nextLesson = lessons[currentLessonIndex + 1];
          navigate(`/learn/${courseId}/chapter/${chapterId}/lesson/${nextLesson.id}`);
          setCurrentPageIndex(0);
        } else {
          // Move to next chapter
          if (chapters) {
            const currentChapterIndex = chapters.findIndex(c => c.id === Number(chapterId));
            if (currentChapterIndex < chapters.length - 1) {
              // Navigate to first lesson of next chapter
              const nextChapter = chapters[currentChapterIndex + 1];
              navigate(`/learn/${courseId}/chapter/${nextChapter.id}/lesson/1`);
              setCurrentPageIndex(0);
            } else {
              // Course completed
              toast({
                title: "Congratulations!",
                description: "You've completed this course.",
              });
              navigate(`/dashboard`);
            }
          }
        }
      }
    }
  };

  const prevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    } else {
      // Move to previous lesson
      if (lessons) {
        const currentLessonIndex = lessons.findIndex(l => l.id === Number(lessonId));
        if (currentLessonIndex > 0) {
          // Navigate to previous lesson
          const prevLesson = lessons[currentLessonIndex - 1];
          navigate(`/learn/${courseId}/chapter/${chapterId}/lesson/${prevLesson.id}`);
          // Set to last page of previous lesson (simplified - would need additional fetch)
          setCurrentPageIndex(2); // Assuming each lesson has 3 pages
        } else {
          // Move to previous chapter
          if (chapters) {
            const currentChapterIndex = chapters.findIndex(c => c.id === Number(chapterId));
            if (currentChapterIndex > 0) {
              // Navigate to last lesson of previous chapter (simplified)
              const prevChapter = chapters[currentChapterIndex - 1];
              navigate(`/learn/${courseId}/chapter/${prevChapter.id}/lesson/4`); // Assuming 4 lessons per chapter
              setCurrentPageIndex(2); // Assuming each lesson has 3 pages
            }
          }
        }
      }
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderPageContent = (page: Page) => {
    if (page.page_type === "text") {
      return (
        <div 
          className="lesson-content prose prose-sm sm:prose lg:prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      );
    } else if (page.page_type === "video") {
      return (
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={page.content}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-96 rounded-lg"
          ></iframe>
        </div>
      );
    } else {
      return <div className="text-center py-8">Unsupported content type</div>;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <BookOpen className="h-12 w-12 text-lesson-primary mb-4" />
        <h1 className="text-2xl font-bold mb-2">Login Required</h1>
        <p className="text-gray-600 mb-6 text-center">
          Please log in to access this lesson.
        </p>
        <div className="flex gap-4">
          <Link to="/login">
            <Button>Login</Button>
          </Link>
          <Link to="/">
            <Button variant="outline">Go to Homepage</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar for navigation */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:z-auto`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center">
              <BookOpen className="h-6 w-6 text-lesson-primary mr-2" />
              <span className="font-bold text-lg">LessonFlow</span>
            </Link>
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 px-4 py-6">
            <h2 className="font-bold text-lg mb-4">{course?.title}</h2>
            
            <div className="space-y-4">
              {chapters?.map((chapter) => (
                <div key={chapter.id} className="space-y-2">
                  <div className="font-medium text-sm text-gray-500">
                    Chapter {chapter.chapter_order}: {chapter.title}
                  </div>
                  <ul className="pl-4 space-y-1">
                    {/* Mock lessons for each chapter */}
                    {Array.from({ length: 4 }).map((_, idx) => {
                      const lessonNumber = idx + 1;
                      const isCurrentLesson = 
                        Number(chapterId) === chapter.id && 
                        Number(lessonId) === lessonNumber;
                      
                      return (
                        <li key={idx}>
                          <Link
                            to={`/learn/${courseId}/chapter/${chapter.id}/lesson/${lessonNumber}`}
                            className={`flex items-center py-1 px-2 rounded-md text-sm ${
                              isCurrentLesson
                                ? "bg-lesson-primary text-white"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            <span className="mr-2 text-xs">
                              {isCurrentLesson ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : (
                                lessonNumber
                              )}
                            </span>
                            <span className="truncate">
                              {idx === 0 ? `Understanding ${chapter.title} Basics` : 
                               idx === 1 ? `Core Concepts of ${chapter.title}` :
                               idx === 2 ? `Advanced ${chapter.title} Techniques` :
                               `${chapter.title} in Practice`}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="bg-white border-b px-4 py-3 flex items-center justify-between lg:justify-end">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="outline" size="sm">Back to Dashboard</Button>
            </Link>
          </div>
        </header>

        {/* Lesson content */}
        <main className="flex-1 overflow-auto bg-white p-6">
          {pagesLoading ? (
            <div className="animate-pulse space-y-4 max-w-4xl mx-auto">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-64 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
            </div>
          ) : currentPage ? (
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <div className="flex items-center text-gray-500 text-sm mb-1">
                  <Link to={`/courses/${courseId}`} className="hover:text-lesson-primary">
                    {course?.title}
                  </Link>
                  <ChevronRight className="h-4 w-4 mx-1" />
                  <span>Chapter {chapterId}</span>
                  <ChevronRight className="h-4 w-4 mx-1" />
                  <span>Lesson {lessonId}</span>
                </div>
                <h1 className="text-2xl font-bold mb-2">
                  {lessons?.find(l => l.id === Number(lessonId))?.title || "Lesson"}
                </h1>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">
                    Page {currentPageIndex + 1} of {pages?.length}
                  </span>
                  <ProgressBar progress={progress} className="flex-1" />
                </div>
              </div>

              <Separator className="my-6" />

              <div className="mb-8">
                {renderPageContent(currentPage)}
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={prevPage}
                  disabled={currentPageIndex === 0 && Number(lessonId) === 1 && Number(chapterId) === 1}
                  className="flex items-center"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button
                  onClick={nextPage}
                  className="flex items-center"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium mb-2">Lesson content not found</h2>
              <p className="text-gray-500 mb-6">
                We couldn't find the content for this lesson.
              </p>
              <Link to="/dashboard">
                <Button>Back to Dashboard</Button>
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default LessonView;
