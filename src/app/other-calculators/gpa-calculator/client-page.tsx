'use client';

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Copy, RotateCcw } from "lucide-react";

interface Course {
  grade: string;
  credits: string;
}

type GpaResult = {
  gpa: number;
  totalCredits: number;
  totalPoints: number;
  courseCount: number;
};

const GRADE_POINTS: { [key: string]: number } = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "F": 0.0
};

function computeGPA(courses: Course[]): GpaResult | null {
  let totalPoints = 0;
  let totalCredits = 0;
  let count = 0;
  for (const course of courses) {
    const points = GRADE_POINTS[course.grade];
    const credits = parseFloat(course.credits);
    if (points === undefined || isNaN(credits) || credits <= 0) return null;
    totalPoints += points * credits;
    totalCredits += credits;
    count++;
  }
  if (totalCredits === 0 || count === 0) return null;
  return { gpa: totalPoints / totalCredits, totalCredits, totalPoints, courseCount: count };
}

const GPACalculatorClient = () => {
  const [courses, setCourses] = useState<Course[]>([
    { grade: "A", credits: "3" },
    { grade: "B+", credits: "4" },
    { grade: "A-", credits: "3" },
  ]);
  // Auto-calculates on mount with default courses so result renders instantly
  const [gpa, setGpa] = useState<GpaResult | null>(null);
  const { toast } = useToast();

  const gradePoints = GRADE_POINTS;

  useEffect(() => {
    const computed = computeGPA([
      { grade: "A", credits: "3" },
      { grade: "B+", credits: "4" },
      { grade: "A-", credits: "3" },
    ]);
    if (computed) setGpa(computed);
  }, []);

  const addCourse = () => {
    if (courses.length < 20) {
        setCourses([...courses, { grade: "", credits: "" }]);
    } else {
        toast({
            variant: "destructive",
            title: "Limit Reached",
            description: "You can add a maximum of 20 courses.",
        });
    }
  };
  
  const removeCourse = (index: number) => {
    if (courses.length > 1) {
        const updated = courses.filter((_, i) => i !== index);
        setCourses(updated);
    } else {
         toast({
            variant: "destructive",
            title: "Action Not Allowed",
            description: "You must have at least one course.",
        });
    }
  };


  const updateCourse = (index: number, field: keyof Course, value: string) => {
    const updated = [...courses];
    updated[index] = { ...updated[index], [field]: value };
    setCourses(updated);
  };

  const calculate = () => {
    for (let i = 0; i < courses.length; i++) {
      const course = courses[i];
      if (!course.grade || gradePoints[course.grade] === undefined) {
        toast({
          variant: "destructive",
          title: "Invalid Input",
          description: `Please select a grade (A+ to F, 0–4 scale) for course ${i + 1}.`,
        });
        return;
      }
      const credits = parseFloat(course.credits);
      if (isNaN(credits) || credits <= 0) {
        toast({
          variant: "destructive",
          title: "Invalid Input",
          description: `Credits for course ${i + 1} must be a positive number.`,
        });
        return;
      }
    }

    const computed = computeGPA(courses);
    if (!computed) {
        toast({
            variant: "destructive",
            title: "Invalid Input",
            description: "Please enter valid grades and positive credits for at least one course.",
        });
        setGpa(null);
        return;
    }

    setGpa(computed);
    toast({
        title: "GPA Calculated",
        description: `Your GPA is ${computed.gpa.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.`,
    });
  };

  const reset = () => setGpa(null);

  const copyResult = async () => {
    if (!gpa) return;
    const text = `My GPA is ${gpa.gpa.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} across ${gpa.courseCount.toLocaleString()} courses (${gpa.totalCredits.toLocaleString()} credits total). — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="GPA Calculator"
      description="Calculate your Grade Point Average based on grades and credit hours"
      keywords="gpa calculator, grade point average, college gpa, high school gpa, weighted gpa"
      canonicalUrl="/other-calculators/gpa-calculator"
      explanation="Enter your course grades and credit hours to calculate your GPA on a 4.0 scale."
    >
      <Card className="p-6 max-w-2xl mx-auto">
        <div className="space-y-4">
          <div className="space-y-4">
            {courses.map((course, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-[1fr,1fr,auto] gap-4 p-4 bg-muted/50 rounded-lg items-end">
                <div>
                  <Label className="text-sm font-medium" htmlFor={`grade-${index}`}>Grade</Label>
                  <Select value={course.grade} onValueChange={(value) => updateCourse(index, "grade", value)}>
                    <SelectTrigger id={`grade-${index}`}>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(gradePoints).map(grade => (
                        <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium" htmlFor={`credits-${index}`}>Credits</Label>
                  <Input
                    id={`credits-${index}`}
                    type="number"
                    value={course.credits}
                    onChange={(e) => updateCourse(index, "credits", e.target.value)}
                    placeholder="e.g., 3"
                    min="0.5"
                    step="0.5"
                  />
                </div>
                <Button onClick={() => removeCourse(index)} variant="ghost" size="icon" aria-label="Remove course">
                    <Trash2 className="w-5 h-5 text-destructive" />
                </Button>
              </div>
            ))}
          </div>

          <Button onClick={addCourse} variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </Button>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">
              Calculate GPA
            </Button>
            <Button onClick={reset} variant="outline" size="icon" className="shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {gpa !== null && (
            <div className="mt-6 p-4 bg-[#FFF5F2] rounded-lg text-center">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-neutral-600">Your Grade Point Average</p>
                  <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                    <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                  </Button>
                </div>
                <p className="text-2xl font-bold text-primary">{gpa.gpa.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p className="text-xs text-neutral-500 mt-1">{gpa.courseCount.toLocaleString()} courses · {gpa.totalCredits.toLocaleString()} credits</p>
            </div>
          )}
        </div>
      </Card>
      
       <CalculatorContentSection
        aboutContent="The GPA Calculator helps students calculate their Grade Point Average (GPA) based on grades and credit hours for each course. GPA is a standard way of measuring academic achievement. This tool makes it easy to track your performance, see how new grades affect your overall average, and set academic goals. It uses a standard 4.0 scale but supports common variations like A- and B+."
        useCases={[
          { title: "Semester Planning", description: "Calculate your current semester's GPA to track your progress and make adjustments to study habits as needed." },
          { title: "Overall GPA Tracking", description: "Combine grades from all semesters to find your cumulative GPA, which is crucial for scholarships, admissions, and job applications." },
          { title: "Goal Setting", description: "See what grades you need in future courses to raise your GPA to a target level for honors, scholarships, or graduate school applications." },
          { title: "Impact Analysis", description: "Determine how a specific course grade will impact your overall GPA before final grades are released." }
        ]}
        tips={[
          { title: "Credit Hours Matter", description: "A grade in a high-credit course (like 4 or 5 credits) has a much larger impact on your GPA than a grade in a low-credit course (like 1 or 2 credits)." },
          { title: "Check Your School's Scale", description: "This calculator uses a standard 4.0 scale. Some schools use different scales (e.g., some don't use +/- grades, or use a 5.0 scale for AP/honors courses). Always check your school's official policy." },
          { title: "Pass/Fail Courses", description: "Pass/Fail courses typically don't affect your GPA. If you passed, you get the credits but no grade points. Exclude them from this calculator." },
          { title: "Regularly Update", description: "Update your GPA calculation each semester to stay on top of your academic standing and make informed decisions about your coursework." }
        ]}
        faqs={[
          { question: "What is the difference between weighted and unweighted GPA?", answer: "Unweighted GPA is on a 4.0 scale where an A is always 4.0, regardless of course difficulty. Weighted GPA gives extra points for honors, AP, or IB classes (e.g., an A might be 5.0), reflecting course rigor. This calculator computes unweighted GPA." },
          { question: "How do I calculate my cumulative GPA?", answer: "Enter all courses and credits from all semesters you've completed. Alternatively, you can average your semester GPAs, but you must weight them by the number of credits taken each semester." },
          { question: "What if my school uses a different grading scale?", answer: "This calculator uses a standard 4.0 scale. If your school uses letter grades without +/- or a different point system, you'll need to use their specific grade point values for an accurate calculation." },
          { question: "Does withdrawing from a class affect my GPA?", answer: "Usually, a 'W' (withdraw) on your transcript does not affect your GPA, but it's important to check your school's policy. A 'WF' (withdraw fail) typically counts as an F and will impact your GPA." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default GPACalculatorClient;
