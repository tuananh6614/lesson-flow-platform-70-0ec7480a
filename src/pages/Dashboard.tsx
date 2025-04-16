import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchUserEnrollments, getCurrentUser } from "@/lib/mock-data";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, CheckCircle2, Clock } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();

  const { data: enrollments, isLoading: enrollmentsLoading } = useQuery({
    queryKey: ["user-enrollments", user?.id],
    queryFn: () => fetchUserEnrollments(user?.id || 0),
    enabled: !!user,
  });

  // Calculate the overall progress across all courses
  const overallProgress = enrollments?.length 
    ? enrollments.reduce((sum, enrollment) => sum + enrollment.progress_percent, 0) / enrollments.length
    : 0;

  // Group enrollments by status
  const completedCourses = enrollments?.filter(e => e.status === "completed") || [];
  const inProgressCourses = enrollments?.filter(e => e.status === "enrolled") || [];

  if (!user) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Vui lòng đăng nhập để xem bảng điều khiển</h2>
          <Link to="/login">
            <Button>Đăng nhập</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-lesson-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">Xin chào, {user.full_name}</h1>
          <p className="text-xl text-purple-100">Theo dõi tiến độ học tập của bạn</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card>
            <CardHeader className="pb-2">
              <h3 className="text-lg font-medium">Tiến độ tổng thể</h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-gray-200"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="42"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-lesson-primary"
                      strokeWidth="8"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="42"
                      cx="50"
                      cy="50"
                      strokeDasharray={264}
                      strokeDashoffset={264 - (264 * overallProgress) / 100}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">
                      {overallProgress.toFixed(0)}%
                    </span>
                  </div>
                </div>
                <p className="text-gray-500 text-center">
                  Keep up the great work!
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <h3 className="text-lg font-medium">Khóa học của bạn</h3>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-lesson-primary mb-2">
                  {enrollments?.length || 0}
                </div>
                <p className="text-gray-500">Enrolled Courses</p>
                <div className="flex justify-center items-center gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">
                      {completedCourses.length}
                    </div>
                    <p className="text-sm text-gray-500">Completed</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-500">
                      {inProgressCourses.length}
                    </div>
                    <p className="text-sm text-gray-500">In Progress</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/courses" className="w-full">
                <Button variant="outline" className="w-full">
                  Xem tất cả khóa học
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <h3 className="text-lg font-medium">Thống kê học tập</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-lesson-primary mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Time Spent Learning</p>
                    <p className="font-medium">15 hours</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Lessons Completed</p>
                    <p className="font-medium">24 lessons</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-purple-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Learning Streak</p>
                    <p className="font-medium">3 days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mb-6">Khóa học của bạn</h2>

        {enrollmentsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm h-48 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-2 bg-gray-200 rounded mb-4"></div>
              </div>
            ))}
          </div>
        ) : enrollments && enrollments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrollments.map((enrollment) => (
              <Card key={enrollment.id}>
                <div className="flex flex-col sm:flex-row h-full">
                  <div 
                    className="w-full sm:w-1/3 bg-gray-100 bg-cover bg-center" 
                    style={{ 
                      backgroundImage: `url(${enrollment.course?.thumbnail})`,
                      minHeight: "120px" 
                    }}
                  />
                  <div className="w-full sm:w-2/3 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold line-clamp-1">
                        {enrollment.course?.title}
                      </h3>
                      <Badge 
                        variant={enrollment.status === "completed" ? "secondary" : "outline"}
                        className="capitalize"
                      >
                        {enrollment.status}
                      </Badge>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{enrollment.progress_percent.toFixed(1)}%</span>
                      </div>
                      <ProgressBar progress={enrollment.progress_percent} />
                    </div>
                    
                    <div className="mt-auto">
                      <Link to={`/learn/${enrollment.course_id}/chapter/1/lesson/1`}>
                        <Button className="w-full">
                          {enrollment.status === "completed" ? "Review Course" : "Continue Learning"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No courses yet</h3>
            <p className="text-gray-500 mb-6">
              You haven't enrolled in any courses yet. Browse our catalogue to get started.
            </p>
            <Link to="/courses">
              <Button>Browse Courses</Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
