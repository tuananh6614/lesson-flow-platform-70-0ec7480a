
import React from "react";
import Layout from "@/components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center fade-in">
            Giới thiệu về LessonFlow
          </h1>
          
          <div className="bg-white p-8 rounded-lg shadow-md space-y-6 slide-in">
            <p className="text-lg text-gray-700">
              LessonFlow là nền tảng học trực tuyến được thiết kế để mang đến trải nghiệm học tập tốt nhất cho người dùng. 
              Chúng tôi cung cấp các khóa học chất lượng cao với nội dung đa dạng và phương pháp học tập hiệu quả.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900">Tầm nhìn của chúng tôi</h2>
            <p className="text-lg text-gray-700">
              Xây dựng một cộng đồng học tập nơi mọi người đều có cơ hội tiếp cận với kiến thức chất lượng cao và phát triển bản thân.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900">Điểm nổi bật</h2>
            <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
              <li>Nội dung học tập đa dạng và chất lượng</li>
              <li>Giao diện thân thiện, dễ sử dụng</li>
              <li>Hệ thống theo dõi tiến độ học tập</li>
              <li>Chứng chỉ sau khi hoàn thành khóa học</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
