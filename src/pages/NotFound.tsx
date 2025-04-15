
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 fade-in">
      <BookOpen className="h-16 w-16 text-lesson-primary mb-4 scale-in" />
      <h1 className="text-5xl font-bold mb-4 text-lesson-primary slide-in">404</h1>
      <p className="text-xl text-gray-600 mb-6 slide-in">Rất tiếc! Không tìm thấy trang</p>
      <p className="text-gray-500 max-w-md text-center mb-8 fade-in">
        Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không khả dụng.
      </p>
      <Link to="/">
        <Button size="lg" className="scale-in">Trở Về Trang Chủ</Button>
      </Link>
    </div>
  );
};

export default NotFound;
