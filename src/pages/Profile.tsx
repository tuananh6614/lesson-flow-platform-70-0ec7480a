
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { enrollmentService } from "@/services";
import ProgressBar from "@/components/ProgressBar";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter, 
  CardDescription 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Calendar, 
  BookOpen, 
  Lock, 
  Edit, 
  CheckCircle2 
} from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: user?.full_name || '',
    email: user?.email || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Fetch user enrollments
  const { data: enrollments, isLoading: enrollmentsLoading } = useQuery({
    queryKey: ["user-enrollments"],
    queryFn: enrollmentService.getUserEnrollments,
    enabled: !!user,
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleProfileFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update logic here
    console.log("Profile update:", formData);
    setIsEditingProfile(false);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password change logic here
    console.log("Password change:", passwordData);
    setIsChangingPassword(false);
    // Reset password fields
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Vui lòng đăng nhập để xem hồ sơ</h2>
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
          <h1 className="text-3xl font-bold mb-2">Hồ sơ người dùng</h1>
          <p className="text-xl text-purple-100">Quản lý thông tin cá nhân và theo dõi tiến độ học tập</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
            <TabsTrigger value="courses">Khóa học của tôi</TabsTrigger>
            <TabsTrigger value="password">Đổi mật khẩu</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin cá nhân</CardTitle>
                <CardDescription>
                  Xem và chỉnh sửa thông tin cá nhân của bạn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src="" alt={user.full_name} />
                      <AvatarFallback className="text-3xl">
                        {user.full_name ? getInitials(user.full_name) : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" className="w-full">
                      Đổi ảnh đại diện
                    </Button>
                  </div>

                  <div className="flex-1">
                    {isEditingProfile ? (
                      <form onSubmit={handleProfileSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Họ và tên</Label>
                          <Input
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleProfileFormChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleProfileFormChange}
                            required
                          />
                        </div>
                        <div className="flex justify-end space-x-2 pt-4">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setIsEditingProfile(false)}
                          >
                            Hủy
                          </Button>
                          <Button type="submit">
                            Lưu thay đổi
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-6">
                        <div className="flex items-center space-x-4 border-b pb-4">
                          <User className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Họ và tên</p>
                            <p className="font-medium">{user.full_name}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 border-b pb-4">
                          <Mail className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Calendar className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Ngày tham gia</p>
                            <p className="font-medium">
                              {new Date().toLocaleDateString("vi-VN")}
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          className="mt-4"
                          onClick={() => setIsEditingProfile(true)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Chỉnh sửa thông tin
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Đổi mật khẩu</CardTitle>
                <CardDescription>
                  Cập nhật mật khẩu của tài khoản
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordFormChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Mật khẩu mới</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordFormChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordFormChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="mt-4">
                    <Lock className="h-4 w-4 mr-2" />
                    Đổi mật khẩu
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle>Khóa học của tôi</CardTitle>
                <CardDescription>
                  Theo dõi tiến độ các khóa học bạn đã đăng ký
                </CardDescription>
              </CardHeader>
              <CardContent>
                {enrollmentsLoading ? (
                  <div className="grid grid-cols-1 gap-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm h-32 animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : enrollments && enrollments.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {enrollments.map((enrollment) => (
                      <div key={enrollment.id} className="border rounded-lg overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <div 
                            className="w-full sm:w-1/4 bg-gray-100 bg-cover bg-center" 
                            style={{ 
                              backgroundImage: `url(${enrollment.course?.thumbnail})`,
                              minHeight: "120px" 
                            }}
                          />
                          <div className="w-full sm:w-3/4 p-4">
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
                                <span>Tiến độ</span>
                                <span>{enrollment.progress_percent.toFixed(1)}%</span>
                              </div>
                              <ProgressBar progress={enrollment.progress_percent} />
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-4">
                              <Link to={`/learn/${enrollment.course_id}/chapter/1/lesson/1`}>
                                <Button size="sm">
                                  {enrollment.status === "completed" ? 
                                    "Học lại" : "Tiếp tục học"}
                                </Button>
                              </Link>
                              <Link to={`/courses/${enrollment.course_id}`}>
                                <Button size="sm" variant="outline">
                                  Xem chi tiết
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Chưa có khóa học nào</h3>
                    <p className="text-gray-500 mb-6">
                      Bạn chưa đăng ký khóa học nào. Khám phá các khóa học của chúng tôi để bắt đầu.
                    </p>
                    <Link to="/courses">
                      <Button>Khám phá khóa học</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
