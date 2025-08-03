import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  Users, 
  CheckCircle, 
  Play,
  BookOpen
} from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  type: 'Part 46' | 'Part 48';
  duration: number; // in hours
  enrolledStudents?: number;
  progress?: number; // 0-100 for enrolled users
  status: 'available' | 'in-progress' | 'completed';
  userRole: 'admin' | 'instructor' | 'miner';
  isEnrolled?: boolean; // Add this to distinguish between available for enrollment vs enrolled but not started
  onEnroll?: () => void;
  onContinue?: () => void;
  onManage?: () => void;
}

export const CourseCard = ({
  id,
  title,
  description,
  type,
  duration,
  enrolledStudents,
  progress,
  status,
  userRole,
  isEnrolled = false,
  onEnroll,
  onContinue,
  onManage
}: CourseCardProps) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary" className="bg-success text-success-foreground">Completed</Badge>;
      case 'in-progress':
        return <Badge variant="secondary" className="bg-warning text-warning-foreground">In Progress</Badge>;
      default:
        return <Badge variant="outline">Available</Badge>;
    }
  };

  const getTypeBadge = () => {
    return (
      <Badge 
        variant="secondary" 
        className={type === 'Part 46' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}
      >
        MSHA {type}
      </Badge>
    );
  };

  const getActionButton = () => {
    if (userRole === 'admin' || userRole === 'instructor') {
      return (
        <Button variant="industrial" onClick={onManage} className="w-full">
          <BookOpen className="mr-2 h-4 w-4" />
          Manage Course
        </Button>
      );
    }

    switch (status) {
      case 'completed':
        return (
          <Button variant="success" disabled className="w-full">
            <CheckCircle className="mr-2 h-4 w-4" />
            Completed
          </Button>
        );
      case 'in-progress':
        return (
          <Button variant="default" onClick={onContinue} className="w-full">
            <Play className="mr-2 h-4 w-4" />
            Continue Training
          </Button>
        );
      default:
        // If user is enrolled but hasn't started, show "Start Training" with onContinue
        // If user is not enrolled, show "Start Training" with onEnroll
        return (
          <Button 
            variant="safety" 
            onClick={isEnrolled ? onContinue : onEnroll} 
            className="w-full"
          >
            <Play className="mr-2 h-4 w-4" />
            Start Training
          </Button>
        );
    }
  };

  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          {getTypeBadge()}
          {getStatusBadge()}
        </div>
        <CardTitle className="text-lg font-semibold leading-tight">
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{duration} hours required</span>
          </div>

          {userRole === 'instructor' && enrolledStudents !== undefined && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{enrolledStudents} enrolled students</span>
            </div>
          )}

          {status === 'in-progress' && progress !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter>
        {getActionButton()}
      </CardFooter>
    </Card>
  );
};