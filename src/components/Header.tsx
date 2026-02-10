
import { Button } from "@/components/ui/button";
import { Moon, Sun, LogOut, User } from "lucide-react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useTheme } from "@/lib/ThemeProvider";
import { mockCourses, mockStudent } from "@/lib/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const { theme, toggleTheme, isThemeLocked } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId } = useParams();

  const handleLogoClick = () => {
    const enrolledCourses = mockCourses.filter(course => course.status === 'enrolled');
    
    if (enrolledCourses.length === 1) {
      navigate(`/course/${enrolledCourses[0].id}`);
    } else {
      navigate('/dashboard');
    }
  };

  const handleDashboardClick = () => {
    const enrolledCourses = mockCourses.filter(course => course.status === 'enrolled');
    
    if (enrolledCourses.length === 1) {
      navigate(`/course/${enrolledCourses[0].id}`);
    } else {
      navigate('/dashboard');
    }
  };

  const handleSyllabusClick = () => {
    if (courseId) {
      navigate(`/course/${courseId}/syllabus`);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  // Check if we're on a course-related page
  const isOnCoursePage = location.pathname.includes('/course/');

  return (
    <header className="w-full h-16 px-6 flex items-center justify-between bg-background/80 backdrop-blur-md border-b border-border/50 shadow-4dp sticky top-0 z-50">
      {/* Left - Logo and Navigation */}
      <div className="flex items-center gap-4">
        <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
          <img
            src={theme === 'dark'
              ? "/zuvy-logo-horizontal-dark.png"
              : "/zuvy-logo-horizontal.png"
            }
            alt="Zuvy"
            className="h-10"
          />
        </div>

        {/* Course Navigation Buttons */}
        {isOnCoursePage && (
          <div className="flex items-center gap-2">
            <Button
              variant="link"
              size="sm"
              onClick={handleDashboardClick}
              className="text-foreground hover:text-primary"
            >
              Dashboard
            </Button>
            <Button
              variant="link"
              size="sm"
              onClick={handleSyllabusClick}
              className="text-foreground hover:text-primary"
            >
              Course Syllabus
            </Button>
          </div>
        )}
      </div>

      {/* Right - Theme Switch and Avatar */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="w-9 h-9 p-0"
          disabled={isThemeLocked}
          title={isThemeLocked ? "Theme is locked during assessment" : "Toggle theme"}
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>

        {/* User Menu Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 h-9 p-0 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                  {mockStudent.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5 text-sm">
              <p className="font-semibold text-foreground">{mockStudent.name}</p>
              <p className="text-xs text-muted-foreground truncate">{mockStudent.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigate('/profile')}
              className="cursor-pointer"
            >
              <User className="w-4 h-4 mr-2" />
              View/Edit Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
