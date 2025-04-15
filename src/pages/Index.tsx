import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCourses } from "@/lib/mock-data";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import CourseCard from "@/components/CourseCard";
import { BookOpen, BookOpenCheck, GraduationCap } from "lucide-react";

const Index = () => {
  const { data: courses, isLoading } = useQuery({
    queryKey: ["featured-courses"],
    queryFn: fetchCourses
  });

  const featuredCourses = courses?.slice(0, 3) || [];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-lesson-primary to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center md:text-left md:w-2/3 slide-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Nâng Cao Hành Trình Học Tập
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Truy cập các khóa học chất lượng cao, theo dõi tiến độ và đạt được mục tiêu học tập với nền tảng tương tác của chúng tôi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/courses">
                <Button size="lg" className="bg-white text-lesson-primary hover:bg-purple-100 scale-in">
                  Khám Phá Khóa Học
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 scale-in">
                  Đăng Ký Miễn Phí
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Wave shape divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="white">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl font-bold text-gray-900">Tại Sao Chọn LessonFlow?</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Nền tảng của chúng tôi cung cấp trải nghiệm học tập toàn diện được thiết kế để giúp bạn thành công.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-lesson-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Thư Viện Khóa Học Phong Phú</h3>
              <p className="text-gray-600">
                Truy cập bộ sưu tập khóa học đa dạng trên nhiều lĩnh vực, được tổ chức thành các chương và bài học dễ theo dõi.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-lesson-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Học Tập Tương Tác</h3>
              <p className="text-gray-600">
                Tương tác với nội dung thông qua nhiều định dạng bao gồm văn bản, video và bài kiểm tra để củng cố kiến thức.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpenCheck className="h-8 w-8 text-lesson-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Theo Dõi Tiến Độ</h3>
              <p className="text-gray-600">
                Theo dõi hành trình học tập của bạn với số liệu tiến độ chi tiết và chứng chỉ hoàn thành cho mỗi khóa học.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 fade-in">
            <h2 className="text-3xl font-bold text-gray-900">Khóa Học Nổi Bật</h2>
            <p className="mt-4 text-xl text-gray-600">
              Bắt đầu hành trình học tập với các khóa học phổ biến nhất của chúng tôi
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm h-96 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link to="/courses">
              <Button size="lg" className="scale-in">Xem Tất Cả Khóa Học</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-lesson-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in">
          <h2 className="text-3xl font-bold mb-4">Sẵn Sàng Bắt Đầu Học?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Tham gia cùng hàng nghìn học viên đang nâng cao kỹ năng của họ với LessonFlow.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-lesson-primary hover:bg-purple-100 scale-in">
              Tạo Tài Khoản Miễn Phí
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
