
import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Play, RotateCcw, CheckCircle, Video, FileText, BookOpen, X, Plus, ChevronRight, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { mockStudent, mockCourses, Course } from "@/lib/mockData";
import Header from "@/components/Header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useOnboardingStatus } from "@/hooks/use-onboarding";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { isCompleted, hasSkipped, progress } = useOnboardingStatus();
  const [dismissedBanner, setDismissedBanner] = useState(false);
  const [filter, setFilter] = useState<'enrolled' | 'completed'>('enrolled');
  const [simulationProgress, setSimulationProgress] = useState<string>('65');

  // Get simulated progress
  const displayProgress = parseInt(simulationProgress);
  
  // Calculate profile status based on progress
  const getProfileStatus = (prog: number) => {
    if (prog >= 100) return { label: 'Complete', color: 'text-success' };
    if (prog >= 80) return { label: 'Job Ready', color: 'text-primary' };
    if (prog >= 50) return { label: 'Intermediate', color: 'text-foreground' };
    return { label: 'Beginner', color: 'text-muted-foreground' };
  };
  
  const profileStatus = getProfileStatus(displayProgress);
  
  // Get motivational subtext based on progress
  const getSubtext = (prog: number) => {
    if (prog >= 100) return 'Your profile is ready! Start applying for jobs.';
    if (prog >= 95) return 'Almost there! One step away from being job ready.';
    if (prog >= 90) return 'You\'re so close! Complete your profile to unlock opportunities.';
    if (prog >= 80) return 'You can now apply for jobs! Add more details to stand out.';
    if (prog >= 60) return 'Great progress! A few more clicks to become job ready.';
    if (prog >= 40) return 'You\'re halfway there! Keep going to unlock job opportunities.';
    if (prog >= 20) return 'Good start! Just a few quick additions to boost your profile.';
    return 'Let\'s get started! Your dream job is just a few clicks away.';
  };
  
  // Determine next action based on profile progress
  const getNextAction = (prog: number) => {
    // Define sections and their contribution to profile
    // Mandatory: Basic (20%), Skills (20%), 1 Project (20%), Career Goals (20%), LinkedIn (20%)
    // Bonus sections fill up to 100% max
    
    if (prog < 20) return { text: 'Add Basic Info', score: '+20%', path: 'basic-info' };
    if (prog < 40) return { text: 'Add Skills', score: '+20%', path: 'skills-projects' };
    if (prog < 60) return { text: 'Add Project', score: '+20%', path: 'skills-projects' };
    if (prog < 80) return { text: 'Add Career Goals', score: '+20%', path: 'career-goals' };
    if (prog < 90) return { text: 'Add LinkedIn', score: '+10%', path: 'education' };
    if (prog < 95) return { text: 'Add Experience', score: '+5%', path: 'basic-info' };
    if (prog < 100) return { text: 'Add Competitive Profile', score: '+5%', path: 'education' };
    return { text: 'Profile Complete', score: '100%', path: 'basic-info' };
  };
  
  const nextAction = getNextAction(displayProgress);

  const filteredCourses = mockCourses.filter(course => course.status === filter);

  // Drag to scroll functionality
  const handleDragScroll = (e: React.MouseEvent<HTMLDivElement>) => {
    const ele = e.currentTarget;
    let pos = { left: 0, x: 0 };
    
    const mouseDownHandler = (e: MouseEvent) => {
      ele.style.cursor = 'grabbing';
      ele.style.userSelect = 'none';
      pos = {
        left: ele.scrollLeft,
        x: e.clientX,
      };
      
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };
    
    const mouseMoveHandler = (e: MouseEvent) => {
      const dx = e.clientX - pos.x;
      ele.scrollLeft = pos.left - dx;
    };
    
    const mouseUpHandler = () => {
      ele.style.cursor = 'grab';
      ele.style.removeProperty('user-select');
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    
    ele.addEventListener('mousedown', mouseDownHandler);
  };

  const getActionButton = (course: Course) => {
    if (course.status === 'completed') {
      return (
        <div className="flex items-center gap-3 w-full">
          <div className="hidden md:flex items-center gap-3 w-full">
            <Button variant="outline" className="flex-1 bg-transparent border-success text-success hover:bg-success hover:text-success-foreground" asChild>
              <Link to={`/course/${course.id}`}>
                <CheckCircle className="w-4 h-4 mr-2" />
                View Course
              </Link>
            </Button>
          </div>
          <div className="md:hidden flex flex-col gap-3 w-full">
            <Button variant="outline" className="w-full bg-transparent border-success text-success hover:bg-success hover:text-success-foreground" asChild>
              <Link to={`/course/${course.id}`}>
                <CheckCircle className="w-4 h-4 mr-2" />
                View Course
              </Link>
            </Button>
          </div>
        </div>
      );
    }
    
    if (course.progress === 0) {
      return (
        <Button className="w-full md:w-auto" asChild>
          <Link to={`/course/${course.id}`}>
            <Play className="w-4 h-4 mr-2" />
            Start Learning
          </Link>
        </Button>
      );
    }
    
    return (
      <Button className="w-full md:w-auto" asChild>
        <Link to={`/course/${course.id}`}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Resume Learning
        </Link>
      </Button>
    );
  };

  const formatUpcomingItem = (item: any) => {
    const now = new Date();
    const itemDate = new Date(item.dateTime);
    const diffTime = itemDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));

    if (diffHours < 24) {
      return `${diffHours} hours`;
    } else {
      return `${diffDays} days`;
    }
  };

  return (
    <div className="min-h-screen bg-background mb-12">
      <Header />
      <div className="container mx-auto px-4 md:px-6 py-8 max-w-7xl">
        {/* 2-Column Layout: 3/4 Main Content + 1/4 Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content - 3/4 width */}
          <div className="lg:col-span-3 space-y-6">
            {/* Onboarding Completion Banner */}
            {!isCompleted && hasSkipped && !dismissedBanner && (
              <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
                <AlertDescription className="flex items-center justify-between text-blue-700 dark:text-blue-400">
                  <span>
                    Complete your profile to unlock opportunities! You've completed {Math.round(progress)}% of your profile setup.
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => navigate('/onboarding')}
                      className="text-blue-700 dark:text-blue-400 hover:text-blue-900"
                    >
                      Continue Profile
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDismissedBanner(true)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Welcome Message */}
            <div className="mb-8">
              <h1 className="text-3xl font-heading font-bold mb-2">
                Welcome {mockStudent.name}!
              </h1>
              <p className="text-lg text-muted-foreground">
                What will you be learning today?
              </p>
            </div>

            {/* Zoe AI Assistant Banner */}
            <Card className="mb-8 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-3xl flex-shrink-0">
                      🤖
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-semibold">I am Zoe, your learning assistant</h3>
                        <Badge className="bg-green-600 hover:bg-green-600 text-white text-xs px-2 py-0">New</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        I will help you get job ready by practicing interviews and learning activities
                      </p>
                    </div>
                  </div>
                  <Button className="bg-green-700 hover:bg-green-800 text-white flex-shrink-0">
                    Learn with zoe
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* My Courses Section */}
            <div className="mb-6">
              <h2 className="text-2xl font-heading font-semibold mb-6">My Courses</h2>
              
              {/* Filter Tabs */}
              <div className="flex gap-3 mb-6">
                <Button
                  variant={filter === 'enrolled' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter('enrolled')}
                  className={`rounded-full ${filter === 'enrolled' ? 'bg-green-700 hover:bg-green-800 text-white' : 'hover:bg-muted'}`}
                >
                  Enrolled
                </Button>
                <Button
                  variant={filter === 'completed' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter('completed')}
                  className={`rounded-full ${filter === 'completed' ? 'bg-green-700 hover:bg-green-800 text-white' : 'hover:bg-muted'}`}
                >
                  Completed
                </Button>
              </div>
            </div>

            {/* Course Cards */}
            <div className="space-y-6">
              {filteredCourses.map((course) => (
            <Card key={course.id} className="w-full shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-6">
                  {/* Left: Course Image and Info */}
                  <div className="flex items-start gap-4 flex-1">
                    {/* Course Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={course.image}
                        alt={course.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    </div>
                    
                    {/* Course Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">
                        {course.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        description
                      </p>
                      <div className="mb-3">
                        <span className="text-sm text-muted-foreground">
                          Instructor: {course.instructor.name}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="flex items-center gap-3">
                        <div className="relative bg-muted rounded-full h-2 flex-1">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{course.progress}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Action Button */}
                  <div className="flex-shrink-0">
                    <Button className="bg-green-700 hover:bg-green-800 text-white">
                      <Play className="w-4 h-4 mr-2" />
                      Start Learning
                    </Button>
                  </div>
                </div>

                {/* Chapter Cards - Only for enrolled courses */}
                {course.status === 'enrolled' && course.upcomingItems.length > 0 && (
                  <>
                    {/* Separator */}
                    <div className="border-t border-border my-6"></div>

                    {/* Chapter Cards with Drag Scroll */}
                    <div 
                      className="overflow-x-auto -mx-6 px-6 cursor-grab active:cursor-grabbing" 
                      style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
                      onMouseEnter={handleDragScroll}
                    >
                      <style dangerouslySetInnerHTML={{__html: `
                        .overflow-x-auto::-webkit-scrollbar {
                          display: none;
                        }
                      `}} />
                      <div className="flex gap-4 min-w-max">
                        {course.upcomingItems.slice(0, 3).map((item, index) => (
                          <Card key={item.id} className="w-80 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900 hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded bg-amber-100 dark:bg-amber-900 flex items-center justify-center flex-shrink-0">
                                  <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-start justify-between gap-2 mb-2">
                                    <h4 className="text-sm font-medium">Chapter {index + 1}</h4>
                                    <Badge className="bg-amber-100 hover:bg-amber-100 text-amber-800 dark:text-amber-200 border-amber-300 text-xs px-2 py-0">
                                      Assessment
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-muted-foreground">
                                    Due Date: {new Date(item.dateTime).toLocaleDateString('en-US', { 
                                      month: 'short', 
                                      day: 'numeric', 
                                      year: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <Card className="text-center py-12 shadow-sm">
                <CardContent>
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No {filter} courses found
                  </h3>
                  <p className="text-muted-foreground">
                    {filter === 'enrolled' 
                      ? "You haven't enrolled in any courses yet." 
                      : "You haven't completed any courses yet."
                    }
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Profile Strength Sidebar - 1/4 width */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="sticky top-6 shadow-sm">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-heading font-bold">Profile Strength</h3>
                  <span className="text-xl font-semibold text-primary bg-primary-light dark:bg-primary dark:text-primary-foreground px-3 py-1 rounded-lg">
                    {Math.round(displayProgress)}%
                  </span>
                </div>

                {/* Circular Progress */}
                <div className="flex justify-center mb-8">
                  <div className="relative w-32 h-32">
                    <svg className="transform -rotate-90 w-32 h-32">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        className="text-muted dark:text-muted"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${2 * Math.PI * 56 * (1 - displayProgress / 100)}`}
                        className="text-primary transition-all duration-500"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-accent" />
                    </div>
                  </div>
                </div>

                {/* Status Text */}
                <div className="text-center mb-8">
                  <p className="text-base mb-1">
                    Your profile is <span className={`font-semibold ${profileStatus.color}`}>{profileStatus.label}</span>.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {getSubtext(displayProgress)}
                  </p>
                </div>

                {/* Action Card */}
                <button
                  onClick={() => navigate(`/profile?tab=${nextAction.path}`)}
                  className="w-full flex items-center gap-3 p-4 rounded-xl bg-primary-light dark:bg-primary dark:bg-opacity-20 hover:bg-primary-light/80 dark:hover:bg-primary/30 transition-all group border border-transparent hover:border-primary dark:hover:border-primary"
                >
                  <div className="w-12 h-12 rounded-full bg-card dark:bg-primary flex items-center justify-center shadow-sm flex-shrink-0">
                    <Plus className="w-5 h-5 text-primary dark:text-primary-foreground" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{nextAction.text}</p>
                    <p className="text-xs text-primary dark:text-secondary font-medium">{nextAction.score} Score</p>
                  </div>
                </button>
              </CardContent>
            </Card>

            {/* Simulation Controls - Outside Card */}
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <p className="text-xs font-semibold text-muted-foreground mb-3">SIMULATION MODE</p>
                <RadioGroup value={simulationProgress} onValueChange={setSimulationProgress}>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="20" id="20" />
                      <Label htmlFor="20" className="text-sm cursor-pointer">Beginner (20%)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="40" id="40" />
                      <Label htmlFor="40" className="text-sm cursor-pointer">Basic (40%)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="60" id="60" />
                      <Label htmlFor="60" className="text-sm cursor-pointer">Intermediate (60%)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="80" id="80" />
                      <Label htmlFor="80" className="text-sm cursor-pointer">Job Ready (80%)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="90" id="90" />
                      <Label htmlFor="90" className="text-sm cursor-pointer">Almost Complete (90%)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="95" id="95" />
                      <Label htmlFor="95" className="text-sm cursor-pointer">Nearly Done (95%)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="100" id="100" />
                      <Label htmlFor="100" className="text-sm cursor-pointer">Complete (100%)</Label>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
