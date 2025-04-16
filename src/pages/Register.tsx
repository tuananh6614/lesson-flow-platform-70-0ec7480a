
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { BookOpen } from "lucide-react";

const registerSchema = z.object({
  fullName: z.string().min(2, { message: "Họ tên phải có ít nhất 2 ký tự" }),
  email: z.string().email({ message: "Vui lòng nhập địa chỉ email hợp lệ" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Mật khẩu không khớp",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      // Error is handled in the auth context
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <BookOpen className="h-12 w-12 text-lesson-primary" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Tạo tài khoản mới
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Hoặc{" "}
            <Link
              to="/login"
              className="font-medium text-lesson-primary hover:text-indigo-500"
            >
              đăng nhập vào tài khoản hiện có
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ và tên</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Nguyễn Văn A"
                          autoComplete="name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Địa chỉ email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="bạn@example.com"
                          autoComplete="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="********"
                          autoComplete="new-password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Xác nhận mật khẩu</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="********"
                          autoComplete="new-password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
                </Button>
              </form>
            </Form>

            <div className="mt-6">
              <p className="text-center text-sm text-gray-600">
                Bằng cách đăng ký, bạn đồng ý với{" "}
                <Link
                  to="/terms"
                  className="font-medium text-lesson-primary hover:text-indigo-500"
                >
                  Điều khoản dịch vụ
                </Link>{" "}
                và{" "}
                <Link
                  to="/privacy"
                  className="font-medium text-lesson-primary hover:text-indigo-500"
                >
                  Chính sách bảo mật
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
