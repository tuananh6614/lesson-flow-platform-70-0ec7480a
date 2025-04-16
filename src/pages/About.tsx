import React from "react";
import Layout from "@/components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center fade-in">
            Giới thiệu về EPUlearn
          </h1>
          
          <div className="bg-white p-8 rounded-lg shadow-md space-y-6 slide-in">
            {/* Nội dung sẽ được lấy từ cơ sở dữ liệu */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
