
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { 
  fetchCourseById, 
  fetchChaptersByCourseId,
  checkEnrollment,
  enrollInCourse,
  getCurrentUser
} from "@/lib/mock-data";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Clock, 
  Users,
  BookOpenCheck,
  CheckCircle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Fetch course details
  const { data: course, isLoading: courseLoading } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => fetchCourseById(Number(courseId)),
  });

  // Fetch course chapters
  const { data: chapters, isLoading: chaptersLoading } = useQuery({
    queryKey: ["chapters", courseId],
    queryFn: () => fetchChaptersByCourseId(Number(courseId)),
    enabled: !!courseId,
  });

  // Check if user is enrolled
  const { data: isEnrolled, isLoading: enrollmentLoading } = useQuery({
    queryKey: ["enrollment", user?.id, courseId],
    queryFn: () => checkEnrollment(user?.id || 0, Number(courseId)),
    enabled: !!user && !!courseId,
  });

  const handleEnroll = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to enroll in this course",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await enrollInCourse(user.id, Number(courseId));
      toast({
        title: "Successfully enrolled!",
        description: `You are now enrolled in ${course?.title}`,
      });
      window.location.reload(); // Refresh to update enrollment status
    } catch (error) {
      console.error("Enrollment error:", error);
      toast({
        title: "Enrollment failed",
        description: "There was an error enrolling you in this course",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (courseLoading || !course) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-80 bg-gray-200 rounded mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
          </div>
        </div>
      </Layout>
    );
  }

  const totalLessons = chapters?.reduce((sum, chapter) => sum + 4, 0) || 0; // Using 4 as demo count per chapter

  return (
    <Layout>
      <div className="bg-lesson-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-full md:w-2/3">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-purple-100 mb-6">{course.description}</p>
              
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  <span>{chapters?.length || 0} chapters</span>
                </div>
                <div className="flex items-center">
                  <BookOpenCheck className="mr-2 h-5 w-5" />
                  <span>{totalLessons} lessons</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  <span>Approximately {totalLessons * 20} minutes</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  <span>{course.enrollmentCount} enrolled</span>
                </div>
              </div>
              
              {isEnrolled ? (
                <div className="flex gap-4">
                  <Link to={`/learn/${course.id}/chapter/1/lesson/1`}>
                    <Button className="bg-white text-lesson-primary hover:bg-purple-100">
                      {isEnrolled ? "Continue Learning" : "Start Learning"}
                    </Button>
                  </Link>
                </div>
              ) : (
                <Button 
                  onClick={handleEnroll} 
                  disabled={isLoading || !user}
                  className="bg-white text-lesson-primary hover:bg-purple-100"
                >
                  {isLoading ? "Enrolling..." : "Enroll Now"}
                </Button>
              )}
            </div>
            
            <div className="w-full md:w-1/3 mt-6 md:mt-0">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="bg-white text-gray-800 p-4">
                  <p className="font-semibold flex items-center">
                    <Badge variant="secondary" className="mr-2 capitalize">
                      {course.status}
                    </Badge>
                    {course.status === "active" ? "Available Now" : "Coming Soon"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-6">Course Content</h2>
        
        {chaptersLoading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded"></div>
            ))}
          </div>
        ) : chapters && chapters.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {chapters.map((chapter) => (
              <AccordionItem key={chapter.id} value={`chapter-${chapter.id}`}>
                <AccordionTrigger className="hover:bg-gray-50 px-4 py-3 rounded-lg">
                  <div className="flex items-start text-left">
                    <span className="font-medium">{chapter.chapter_order}. {chapter.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border-l-2 border-gray-200 ml-4 pl-4">
                  <ul className="space-y-2">
                    {/* Mock lessons for each chapter */}
                    {Array.from({ length: 4 }).map((_, idx) => (
                      <li key={idx} className="py-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="mr-2 text-gray-500">Lesson {idx + 1}:</span>
                            <span>
                              {idx === 0 ? `Understanding ${chapter.title} Basics` : 
                               idx === 1 ? `Core Concepts of ${chapter.title}` :
                               idx === 2 ? `Advanced ${chapter.title} Techniques` :
                               `${chapter.title} in Practice`}
                            </span>
                          </div>
                          {isEnrolled ? (
                            <Link to={`/learn/${course.id}/chapter/${chapter.id}/lesson/${idx + 1}`}>
                              <Button variant="outline" size="sm">View</Button>
                            </Link>
                          ) : (
                            <CheckCircle className="h-5 w-5 text-gray-300" />
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-gray-500">No chapters available for this course yet.</p>
        )}
      </div>

      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Skills You'll Gain</h3>
              <ul className="space-y-2">
                {/* Mock skills based on course title */}
                {Array.from({ length: 5 }).map((_, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>
                      {idx === 0 ? `Understanding ${course.title} fundamentals` :
                       idx === 1 ? `Creating effective ${course.title} solutions` :
                       idx === 2 ? `Implementing best practices for ${course.title}` :
                       idx === 3 ? `Building real-world ${course.title} applications` :
                       `Troubleshooting common ${course.title} issues`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Prerequisites</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Basic understanding of computing concepts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Familiarity with web technologies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Eagerness to learn</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands of students who are already enhancing their skills with this course.
          </p>
          
          {isEnrolled ? (
            <Link to={`/learn/${course.id}/chapter/1/lesson/1`}>
              <Button size="lg">
                Continue to Course
              </Button>
            </Link>
          ) : (
            <Button 
              size="lg"
              onClick={handleEnroll} 
              disabled={isLoading || !user}
            >
              {isLoading ? "Enrolling..." : user ? "Enroll Now" : "Sign In to Enroll"}
            </Button>
          )}
          
          {!user && (
            <p className="mt-4 text-gray-500">
              <Link to="/login" className="text-lesson-primary hover:underline">Sign in</Link>
              {" or "}
              <Link to="/register" className="text-lesson-primary hover:underline">create an account</Link>
              {" to enroll."}
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetail;
