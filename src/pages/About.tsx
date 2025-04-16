
import React from "react";
import Layout from "@/components/Layout";
import { Building, Users, Target, BookOpen } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] py-12 bg-soft-purple">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center fade-in">
            Giới thiệu về EPUlearn
          </h1>
          
          <div className="bg-white p-8 rounded-lg shadow-md space-y-6 slide-in">
            <section className="mb-6">
              <h2 className="text-2xl font-semibold text-lesson-primary mb-4 flex items-center">
                <BookOpen className="mr-3 text-lesson-primary" />
                Về Chúng Tôi
              </h2>
              <p className="text-gray-700 leading-relaxed">
                EPUlearn là nền tảng học trực tuyến cam kết mang đến trải nghiệm giáo dục chất lượng cao, 
                linh hoạt và dễ tiếp cận cho mọi học viên. Chúng tôi tin rằng việc học không có giới hạn 
                và mục tiêu của chúng tôi là trao quyền cho người học phát triển kỹ năng một cách hiệu quả.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold text-lesson-primary mb-4 flex items-center">
                <Target className="mr-3 text-lesson-primary" />
                Sứ Mệnh
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Chúng tôi cam kết cung cấp các khóa học chất lượng, được thiết kế bởi các chuyên gia 
                trong lĩnh vực, nhằm giúp học viên nắm vững kiến thức và kỹ năng mới một cách dễ dàng 
                và thú vị. Mỗi khóa học đều được xây dựng với mục tiêu giúp bạn phát triển năng lực 
                chuyên môn và cá nhân.
              </p>
            </section>

            <section className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-semibold text-lesson-primary mb-4 flex items-center">
                  <Building className="mr-3 text-lesson-primary" />
                  Giá Trị Cốt Lõi
                </h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="mr-2 text-lesson-primary">•</span> Chất lượng giáo dục hàng đầu
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-lesson-primary">•</span> Tính linh hoạt trong học tập
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-lesson-primary">•</span> Cộng đồng học tập hỗ trợ
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-lesson-primary">•</span> Công nghệ học tập hiện đại
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-lesson-primary mb-4 flex items-center">
                  <Users className="mr-3 text-lesson-primary" />
                  Đối Tượng
                </h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="mr-2 text-lesson-primary">•</span> Sinh viên
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-lesson-primary">•</span> Chuyên viên
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-lesson-primary">•</span> Người muốn học kỹ năng mới
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-lesson-primary">•</span> Nhà giáo dục
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;

