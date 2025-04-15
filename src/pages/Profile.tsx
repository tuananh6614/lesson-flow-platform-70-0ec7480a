
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Calendar } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Hồ sơ người dùng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" alt={user?.full_name} />
                <AvatarFallback>
                  {user?.full_name ? getInitials(user.full_name) : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-4 w-full">
                <div className="flex items-center space-x-2 border-b pb-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Họ và tên</p>
                    <p className="font-medium">{user?.full_name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 border-b pb-2">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Ngày tham gia</p>
                    <p className="font-medium">
                      {new Date().toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
