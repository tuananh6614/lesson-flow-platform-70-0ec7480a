
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Course } from "@/types";
import { BookOpen, Users } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link to={`/courses/${course.id}`}>
      <Card className="overflow-hidden h-full course-card">
        <div className="relative h-48 w-full">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          {course.status !== "active" && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="capitalize">
                {course.status}
              </Badge>
            </div>
          )}
        </div>
        <CardHeader className="p-4">
          <h3 className="text-xl font-bold">{course.title}</h3>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-gray-600 line-clamp-3">{course.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center border-t mt-2">
          <div className="flex items-center text-gray-500 text-sm">
            <BookOpen className="h-4 w-4 mr-1" />
            <span>{course.lessonsCount} bài học</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Users className="h-4 w-4 mr-1" />
            <span>{course.enrollmentCount} học viên</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
