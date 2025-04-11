import { useTheme } from "@/hooks/useTheme";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { GraduationCap, Calendar, BookOpen, Code, Calculator } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

const EducationSection = () => {
  const { theme } = useTheme();
  const [isCSExpanded, setIsCSExpanded] = useState(true);
  const [isMathExpanded, setIsMathExpanded] = useState(true);
  
  // Education data with double major
  const education = {
    university: "University of Michigan",
    degree: "Double Major in Computer Science and Mathematics",
    duration: "2022 - 2026",
    gpa: "4.0/4.0",
    courses: {
      computerScience: [
        "Data Structures and Algorithms",
        "Discrete Mathematics",
        "Computer Organization",
        "Operating Systems",
        "Machine Learning",
        "Software Engineering"
      ],
      mathematics: [
        "Calculus I, II, & III",
        "Linear Algebra",
        "Honors Differential Equations",
        "Probability",
        "Mathematics of Finance",
        "Real Analysis"
      ]
    }
  };

  return (
    <section id="education" className="py-20 px-4 md:px-0">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Education
          </h2>
        </div>

        <div className="flex flex-col items-center">
          <Card className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <img src="Mlogo.png" className="h-12 w-auto object-contain" alt="University of Michigan logo" />
              <div className="space-y-1">
                <CardTitle className="text-xl">{education.university}</CardTitle>
                <CardDescription>{education.degree}</CardDescription>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Calendar className="h-4 w-4" />
                  <span>{education.duration}</span>
                  <span className="mx-2">•</span>
                  <span>GPA: {education.gpa}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Computer Science Coursework */}
                <Collapsible 
                  open={isCSExpanded} 
                  onOpenChange={setIsCSExpanded}
                  className="border rounded-md"
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 font-medium text-left bg-slate-100 dark:bg-gray-700/50 hover:bg-slate-200 dark:hover:bg-gray-700 rounded-md transition-colors">
                    <div className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      <span>Computer Science Coursework</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {isCSExpanded ? "Hide" : "Show"}
                    </span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {education.courses.computerScience.map((course, index) => (
                        <div 
                          key={`cs-${index}`} 
                          className="flex items-center p-2 rounded-md bg-slate-100 dark:bg-gray-700/50"
                        >
                          <span className="text-sm">{course}</span>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                
                {/* Mathematics Coursework */}
                <Collapsible 
                  open={isMathExpanded} 
                  onOpenChange={setIsMathExpanded}
                  className="border rounded-md"
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 font-medium text-left bg-slate-100 dark:bg-gray-700/50 hover:bg-slate-200 dark:hover:bg-gray-700 rounded-md transition-colors">
                    <div className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-primary" />
                      <span>Mathematics Coursework</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {isMathExpanded ? "Hide" : "Show"}
                    </span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {education.courses.mathematics.map((course, index) => (
                        <div 
                          key={`math-${index}`} 
                          className="flex items-center p-2 rounded-md bg-slate-100 dark:bg-gray-700/50"
                        >
                          <span className="text-sm">{course}</span>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;