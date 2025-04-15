
import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-lesson-primary" />
              <span className="text-2xl font-bold text-lesson-primary">
                LessonFlow
              </span>
            </div>
            <p className="text-gray-500 text-base">
              Mang giáo dục đến với mọi người, mọi nơi.
              Nâng cao trải nghiệm học tập của bạn với nền tảng tương tác của chúng tôi.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Nền Tảng
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/courses" className="text-base text-gray-500 hover:text-gray-900">
                      Tất Cả Khóa Học
                    </Link>
                  </li>
                  <li>
                    <Link to="/pricing" className="text-base text-gray-500 hover:text-gray-900">
                      Bảng Giá
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard" className="text-base text-gray-500 hover:text-gray-900">
                      Bảng Điều Khiển
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="text-base text-gray-500 hover:text-gray-900">
                      Câu Hỏi Thường Gặp
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Hỗ Trợ
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/contact" className="text-base text-gray-500 hover:text-gray-900">
                      Liên Hệ
                    </Link>
                  </li>
                  <li>
                    <Link to="/help" className="text-base text-gray-500 hover:text-gray-900">
                      Trung Tâm Trợ Giúp
                    </Link>
                  </li>
                  <li>
                    <Link to="/community" className="text-base text-gray-500 hover:text-gray-900">
                      Cộng Đồng
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Công Ty
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/about" className="text-base text-gray-500 hover:text-gray-900">
                      Về Chúng Tôi
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-base text-gray-500 hover:text-gray-900">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/careers" className="text-base text-gray-500 hover:text-gray-900">
                      Tuyển Dụng
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Pháp Lý
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/privacy" className="text-base text-gray-500 hover:text-gray-900">
                      Quyền Riêng Tư
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-base text-gray-500 hover:text-gray-900">
                      Điều Khoản
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {currentYear} LessonFlow. Đã đăng ký bản quyền.
          </p>
        </div>
      </div>
    </footer>
  );
}
