
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BookOpen, 
  LogOut, 
  Menu, 
  X, 
  Settings 
} from "lucide-react";

export default function NavBar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleNavigateToProfile = () => {
    navigate('/profile');
    // Close dropdown if open
    setIsOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-lesson-primary" />
                <span className="text-2xl font-bold text-lesson-primary">
                  EPUlearn
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Trang chủ
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Khóa học
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Giới thiệu
              </Link>
              {user && user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Quản lý
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt={user.full_name} />
                      <AvatarFallback>
                        {getInitials(user.full_name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem onClick={handleNavigateToProfile}>
                    <Settings className="h-4 w-4 mr-2" />
                    Hồ sơ
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login">
                  <Button variant="outline">Đăng nhập</Button>
                </Link>
                <Link to="/register">
                  <Button>Đăng ký</Button>
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? "block" : "hidden"} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Trang chủ
          </Link>
          <Link
            to="/courses"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Khóa học
          </Link>
          <Link
            to="/about"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Giới thiệu
          </Link>
          {user && user.role === 'admin' && (
            <Link
              to="/admin"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Quản lý
            </Link>
          )}
        </div>
        {user ? (
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-4 flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="" alt={user.full_name} />
                <AvatarFallback>
                  {getInitials(user.full_name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-base text-gray-800">{user.full_name}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/profile');
                }}
                className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              >
                Hồ sơ
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="space-y-1">
              <Link
                to="/login"
                className="block px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                onClick={() => setIsOpen(false)}
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                onClick={() => setIsOpen(false)}
              >
                Đăng ký
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
