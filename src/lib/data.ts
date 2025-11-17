import { Calculator, BookOpen, PiggyBank, Landmark, Briefcase, TrendingUp, Binary, Type, Pipette, Minimize2, RefreshCw, Crop, Hash, Braces, FileText, QrCode, Link, DollarSign, Heart, GraduationCap, Repeat, Percent, Divide, Sigma, Wrench, Clock, CalendarDays, WalletCards, ListOrdered, Square, Car, Flame, PersonStanding, Wallet, Dumbbell, Circle, Dices, MoveHorizontal, FileCheck, Ruler, Home, Scale, BrainCircuit } from "lucide-react";
import { Calculator as CalculatorType } from "@/types/calculator";


export const financialCalculatorsData: Omit<CalculatorType, 'icon'>[] = [
  { id: "mortgage", name: "Mortgage Calculator", description: "Calculate monthly mortgage payments", category: "financial", path: "/financial-calculators/mortgage-calculator", implemented: true },
  { id: "auto-loan", name: "Auto Loan Calculator", description: "Calculate car loan payments", category: "financial", path: "/financial-calculators/auto-loan-calculator", implemented: true },
  { id: "loan", name: "Loan Calculator", description: "Calculate loan EMI and interest", category: "financial", path: "/financial-calculators/loan-calculator", implemented: true },
  { id: "currency", name: "Currency Converter", description: "Convert between currencies", category: "financial", path: "/financial-calculators/currency-converter", implemented: true },
  { id: "compound-interest", name: "Compound Interest Calculator", description: "Calculate compound interest growth", category: "financial", path: "/financial-calculators/compound-interest-calculator", implemented: true },
  { id: "roi", name: "ROI Calculator", description: "Calculate return on investment", category: "financial", path: "/financial-calculators/roi-calculator", implemented: true },
  { id: "sip", name: "SIP Calculator", description: "Systematic Investment Plan calculator", category: "financial", path: "/financial-calculators/sip-calculator", implemented: true },
  { id: "payment", name: "Payment Calculator", description: "Calculate payment schedules", category: "financial", path: "/financial-calculators/payment-calculator", implemented: true },
  { id: "amortization", name: "Amortization Calculator", description: "Calculate loan amortization", category: "financial", path: "/financial-calculators/amortization-calculator", implemented: true },
  { id: "finance", name: "Finance Calculator", description: "General finance calculations", category: "financial", path: "/financial-calculators/finance-calculator", implemented: true },
  { id: "income-tax", name: "Income Tax Calculator", description: "Calculate income tax", category: "financial", path: "/financial-calculators/income-tax-calculator", implemented: true },
  { id: "salary", name: "Salary Calculator", description: "Calculate salary components", category: "financial", path: "/financial-calculators/salary-calculator", implemented: true },
  { id: "interest", name: "Interest Calculator", description: "Calculate simple/compound interest", category: "financial", path: "/financial-calculators/interest-calculator", implemented: true },
  { id: "simple-interest", name: "Simple Interest Calculator", description: "Calculate simple interest", category: "financial", path: "/financial-calculators/simple-interest-calculator", implemented: true },
  { id: "house-affordability", name: "House Affordability Calculator", description: "Calculate affordable house price", category: "financial", path: "/financial-calculators/house-affordability-calculator", implemented: true },
  { id: "rent", name: "Rent Calculator", description: "Calculate rental costs", category: "financial", path: "/financial-calculators/rent-calculator", implemented: true },
  { id: "discount", name: "Discount Calculator", description: "Calculate discounts and savings", category: "financial", path: "/financial-calculators/discount-calculator", implemented: true },
  { id: "retirement", name: "Retirement Calculator", description: "Plan for retirement", category: "financial", path: "/financial-calculators/retirement-calculator", implemented: true },
  { id: "investment", name: "Investment Calculator", description: "Calculate investment returns", category: "financial", path: "/financial-calculators/investment-calculator", implemented: true },
  { id: "inflation", name: "Inflation Calculator", description: "Calculate inflation impact", category: "financial", path: "/financial-calculators/inflation-calculator", implemented: true },
  { id: "401k", name: "401K Calculator", description: "Calculate 401K growth", category: "financial", path: "/financial-calculators/401k-calculator", implemented: true },
  { id: "sales-tax", name: "Sales Tax Calculator", description: "Calculate sales tax", category: "financial", path: "/financial-calculators/sales-tax-calculator", implemented: true },
  { id: "savings", name: "Savings Calculator", description: "Calculate savings growth", category: "financial", path: "/financial-calculators/savings-calculator", implemented: true },
  { id: "budget", name: "Budget Calculator", description: "Plan your budget", category: "financial", path: "/financial-calculators/budget-calculator", implemented: true },
  { id: "apr", name: "APR Calculator", description: "Calculate annual percentage rate", category: "financial", path: "/financial-calculators/apr-calculator", implemented: true },
];

export const healthCalculatorsData: Omit<CalculatorType, 'icon'>[] = [
  { id: "bmi", name: "BMI Calculator", description: "Calculate Body Mass Index", category: "health", path: "/health-calculators/bmi-calculator", implemented: true },
  { id: "body-fat", name: "Body Fat Calculator", description: "Calculate body fat percentage", category: "health", path: "/health-calculators/body-fat-calculator", implemented: true },
  { id: "bmr", name: "BMR Calculator", description: "Calculate Basal Metabolic Rate", category: "health", path: "/health-calculators/bmr-calculator", implemented: true },
  { id: "calorie", name: "Calorie Calculator", description: "Calculate daily calorie needs", category: "health", path: "/health-calculators/calorie-calculator", implemented: true },
  { id: "tdee", name: "TDEE Calculator", description: "Total Daily Energy Expenditure", category: "health", path: "/health-calculators/tdee-calculator", implemented: true },
  { id: "macro", name: "Macro Calculator", description: "Calculate macronutrient needs", category: "health", path: "/health-calculators/macro-calculator", implemented: true },
  { id: "protein", name: "Protein Calculator", description: "Calculate protein needs", category: "health", path: "/health-calculators/protein-calculator", implemented: true },
  { id: "ideal-weight", name: "Ideal Weight Calculator", description: "Calculate ideal body weight", category: "health", path: "/health-calculators/ideal-weight-calculator", implemented: true },
  { id: "pregnancy", name: "Pregnancy Calculator", description: "Track pregnancy timeline", category: "health", path: "/health-calculators/pregnancy-calculator", implemented: true },
  { id: "pace", name: "Pace Calculator", description: "Calculate running pace", category: "health", path: "/health-calculators/pace-calculator", implemented: true },
  { id: "carbohydrate", name: "Carbohydrate Calculator", description: "Calculate carb intake", category: "health", path: "/health-calculators/carbohydrate-calculator", implemented: true },
  { id: "healthy-weight", name: "Healthy Weight Calculator", description: "Find healthy weight range", category: "health", path: "/health-calculators/healthy-weight-calculator", implemented: true },
];

export const mathCalculatorsData: Omit<CalculatorType, 'icon'>[] = [
  { id: "percentage", name: "Percentage Calculator", description: "Calculate percentages", category: "math", path: "/math-calculators/percentage-calculator", implemented: true },
  { id: "scientific", name: "Scientific Calculator", description: "Advanced scientific calculations", category: "math", path: "/math-calculators/scientific-calculator", implemented: true },
  { id: "area", name: "Area Calculator", description: "Calculate area of shapes", category: "math", path: "/math-calculators/area-calculator", implemented: true },
  { id: "volume", name: "Volume Calculator", description: "Calculate volume of shapes", category: "math", path: "/math-calculators/volume-calculator", implemented: true },
  { id: "slope", name: "Slope Calculator", description: "Calculate line slope", category: "math", path: "/math-calculators/slope-calculator", implemented: true },
  { id: "fraction", name: "Fraction Calculator", description: "Calculate with fractions", category: "math", path: "/math-calculators/fraction-calculator", implemented: true },
  { id: "basic", name: "Basic Calculator", description: "Basic arithmetic operations", category: "math", path: "/math-calculators/basic-calculator", implemented: true },
  { id: "average", name: "Average Calculator", description: "Calculate mean, median, mode", category: "math", path: "/math-calculators/average-calculator", implemented: true },
  { id: "random-number", name: "Random Number Generator", description: "Generate random numbers", category: "math", path: "/math-calculators/random-number-generator", implemented: true },
  { id: "ratio", name: "Ratio Calculator", description: "Simplify ratios", category: "math", path: "/math-calculators/ratio-calculator", implemented: true },
  { id: "circle", name: "Circle Calculator", description: "Calculate circle properties", category: "math", path: "/math-calculators/circle-calculator", implemented: true },
  { id: "triangle", name: "Triangle Calculator", description: "Calculate triangle properties", category: "math", path: "/math-calculators/triangle-calculator", implemented: true },
  { id: "pythagorean", name: "Pythagorean Calculator", description: "Pythagorean theorem", category: "math", path: "/math-calculators/pythagorean-theorem-calculator", implemented: true },
  { id: "quadratic", name: "Quadratic Calculator", description: "Solve quadratic equations", category: "math", path: "/math-calculators/quadratic-formula-calculator", implemented: true },
  { id: "standard-deviation", name: "Standard Deviation Calculator", description: "Calculate standard deviation", category: "math", path: "/math-calculators/standard-deviation-calculator", implemented: true },
  { id: "distance", name: "Distance Calculator", description: "Calculate distance between points", category: "math", path: "/math-calculators/distance-calculator", implemented: true },
  { id: "percent-error", name: "Percent Error Calculator", description: "Calculate percent error", category: "math", path: "/math-calculators/percent-error-calculator", implemented: true },
  { id: "binary", name: "Binary Calculator", description: "Binary calculations", category: "math", path: "/math-calculators/binary-calculator", implemented: true },
];

export const otherCalculatorsData: Omit<CalculatorType, 'icon'>[] = [
  { id: "age", name: "Age Calculator", description: "Calculate age precisely", category: "other", path: "/other-calculators/age-calculator", implemented: true },
  { id: "time", name: "Time Calculator", description: "Calculate time differences", category: "other", path: "/other-calculators/time-calculator", implemented: true },
  { id: "gpa", name: "GPA Calculator", description: "Calculate Grade Point Average", category: "other", path: "/other-calculators/gpa-calculator", implemented: true },
  { id: "grade", name: "Grade Calculator", description: "Calculate grades and scores", category: "other", path: "/other-calculators/grade-calculator", implemented: true },
  { id: "tip", name: "Tip Calculator", description: "Calculate tips and splits", category: "other", path: "/other-calculators/tip-calculator", implemented: true },
  { id: "date", name: "Date Calculator", description: "Calculate between dates", category: "other", path: "/other-calculators/date-calculator", implemented: true },
  { id: "password", name: "Password Generator", description: "Generate secure passwords", category: "other", path: "/other-calculators/password-generator", implemented: true },
  { id: "time-zone", name: "Time Zone Calculator", description: "Convert time zones", category: "other", path: "/other-calculators/time-zone-converter", implemented: true },
  { id: "height", name: "Height Calculator", description: "Convert height units", category: "other", path: "/other-calculators/height-calculator", implemented: true },
  { id: "conversion", name: "Conversion Calculator", description: "Unit conversions", category: "other", path: "/other-calculators/conversion-calculator", implemented: true },
  { id: "speed", name: "Speed Calculator", description: "Calculate speed", category: "other", path: "/other-calculators/speed-calculator", implemented: true },
  { id: "dice", name: "Dice Roller", description: "Roll virtual dice", category: "other", path: "/other-calculators/dice-roller", implemented: true },
  { id: "mileage", name: "Mileage Calculator", description: "Calculate mileage", category: "other", path: "/other-calculators/mileage-calculator", implemented: true },
  { id: "fuel-cost", name: "Fuel Cost Calculator", description: "Calculate fuel costs", category: "other", path: "/other-calculators/fuel-cost-calculator", implemented: true },
];

export const imageToolsData: Omit<CalculatorType, 'icon'>[] = [
  { id: "crop-image", name: "Crop Image", description: "Crop images online", category: "tools", path: "/tool/crop-image", implemented: true },
  { id: "resize-image", name: "Image Resizer", description: "Resize images", category: "tools", path: "/tool/resize-image", implemented: true },
  { id: "compress-image", name: "Image Compressor", description: "Compress images", category: "tools", path: "/tool/compress-image", implemented: true },
  { id: "convert-image", name: "Image Converter", description: "Convert image formats", category: "tools", path: "/tool/convert-image", implemented: true },
  { id: "color-picker", name: "Color Picker", description: "Pick colors from images", category: "tools", path: "/tool/color-picker", implemented: true },
];

export const textToolsData: Omit<CalculatorType, 'icon'>[] = [
  { id: "word-counter", name: "Word Counter", description: "Count words, characters, and sentences", category: "tools", path: "/tool/word-counter", implemented: true },
  { id: "case-converter", name: "Case Converter", description: "Convert text case (upper, lower, title)", category: "tools", path: "/tool/case-converter", implemented: true },
  { id: "lorem-ipsum", name: "Lorem Ipsum Generator", description: "Generate placeholder text", category: "tools", path: "/tool/lorem-ipsum", implemented: true },
  { id: "url-encoder", name: "URL Encoder/Decoder", description: "Encode and decode URLs", category: "tools", path: "/tool/url-encoder", implemented: true },
  { id: "base64", name: "Base64 Encoder/Decoder", description: "Encode and decode Base64", category: "tools", path: "/tool/base64", implemented: true },
  { id: "json-formatter", name: "JSON Formatter", description: "Format and validate JSON", category: "tools", path: "/tool/json-formatter", implemented: true },
  { id: "qr-code", name: "QR Code Generator", description: "Generate QR codes", category: "tools", path: "/tool/qr-code", implemented: true },
  { id: "hash-generator", name: "Hash Generator", description: "Generate MD5, SHA-1, SHA-256 hashes", category: "tools", path: "/tool/hash-generator", implemented: true },
  { id: "invoice-generator", name: "Invoice Generator", description: "Create professional business invoices", category: "tools", path: "/tool/invoice-generator", implemented: true },
];

const iconMap: { [key: string]: CalculatorType['icon'] } = {
  "mortgage": Landmark,
  "auto-loan": Car,
  "loan": PiggyBank,
  "currency": Repeat,
  "compound-interest": TrendingUp,
  "roi": TrendingUp,
  "sip": TrendingUp,
  "swp": TrendingUp,
  "payment": WalletCards,
  "amortization": ListOrdered,
  "finance": Briefcase,
  "income-tax": Landmark,
  "salary": Wallet,
  "interest": Percent,
  "simple-interest": Percent,
  "house-affordability": Home,
  "rent": Home,
  "discount": Percent,
  "retirement": Calculator,
  "investment": TrendingUp,
  "inflation": TrendingUp,
  "401k": Landmark,
  "sales-tax": Percent,
  "savings": PiggyBank,
  "budget": Wallet,
  "apr": WalletCards,
  "bmi": Heart,
  "body-fat": PersonStanding,
  "bmr": Flame,
  "calorie": Flame,
  "tdee": Flame,
  "macro": Dumbbell,
  "protein": Dumbbell,
  "ideal-weight": Scale,
  "pregnancy": Heart,
  "pace": Car,
  "carbohydrate": Dumbbell,
  "healthy-weight": PersonStanding,
  "percentage": Percent,
  "scientific": BrainCircuit,
  "area": Square,
  "volume": Square,
  "slope": MoveHorizontal,
  "fraction": Divide,
  "basic": Calculator,
  "average": Sigma,
  "random-number": Dices,
  "ratio": Divide,
  "circle": Circle,
  "triangle": Square,
  "pythagorean": Square,
  "quadratic": Sigma,
  "standard-deviation": Sigma,
  "distance": MoveHorizontal,
  "percent-error": Percent,
  "binary": Binary,
  "age": Clock,
  "time": Clock,
  "gpa": GraduationCap,
  "grade": FileCheck,
  "tip": DollarSign,
  "date": CalendarDays,
  "password": Wrench,
  "time-zone": Clock,
  "height": Ruler,
  "conversion": Repeat,
  "speed": Car,
  "dice": Dices,
  "mileage": Car,
  "fuel-cost": Car,
  "crop-image": Crop,
  "resize-image": Minimize2,
  "compress-image": Minimize2,
  "convert-image": RefreshCw,
  "color-picker": Pipette,
  "word-counter": FileText,
  "case-converter": Type,
  "lorem-ipsum": FileText,
  "url-encoder": Link,
  "base64": Binary,
  "json-formatter": Braces,
  "qr-code": QrCode,
  "hash-generator": Hash,
  "invoice-generator": FileText,
};

const addIcons = (calculators: Omit<CalculatorType, 'icon'>[]): CalculatorType[] => {
  return calculators.map(calc => ({
    ...calc,
    icon: iconMap[calc.id] || Wrench,
  }));
};

export const financialCalculators: CalculatorType[] = addIcons(financialCalculatorsData);
export const healthCalculators: CalculatorType[] = addIcons(healthCalculatorsData);
export const mathCalculators: CalculatorType[] = addIcons(mathCalculatorsData);
export const otherCalculators: CalculatorType[] = addIcons(otherCalculatorsData);
export const imageTools: CalculatorType[] = addIcons(imageToolsData);
export const textTools: CalculatorType[] = addIcons(textToolsData);

export const calculatorTools: CalculatorType[] = [
  ...financialCalculators,
  ...healthCalculators,
  ...mathCalculators,
  ...otherCalculators,
];

export const allCalculators: CalculatorType[] = [
  ...financialCalculators,
  ...healthCalculators,
  ...mathCalculators,
  ...otherCalculators,
  ...imageTools,
  ...textTools,
];

export const educationalTools: CalculatorType[] = [
  {
    id: "savings-guide",
    name: "Beginner's Guide to Saving",
    description: "Learn the fundamentals of building your savings.",
    icon: BookOpen,
    path: "#",
    imageId: "savings-guide",
    category: "education",
    implemented: false,
  },
  {
    id: "stock-market-basics",
    name: "Stock Market Basics",
    description: "Understand the basics of the stock market.",
    icon: Briefcase,
    path: "#",
    imageId: "stock-market-basics",
    category: "education",
    implemented: false,
  },
  {
    id: "retirement-planning",
    name: "Retirement Planning",
    description: "Start planning for a comfortable retirement.",
    icon: Calculator,
    path: "#",
    imageId: "retirement-planning",
    category: "education",
    implemented: false,
  },
].map(tool => ({
  ...tool,
  href: tool.path
}));

export const categories = [
    {
      title: "Financial Calculators",
      icon: DollarSign,
      description: "Loans, EMI, Investment, Tax & More",
      gradient: "from-blue-500 to-purple-600",
      calculators: ["Loan Calculator", "APR Calculator", "EMI Calculator", "Currency Converter"],
      path: "/financial-calculators"
    },
    {
      title: "Health & Fitness",
      icon: Heart,
      description: "BMI, BMR, Calories & Body Metrics",
      gradient: "from-pink-500 to-rose-600",
      calculators: ["BMI Calculator", "BMR Calculator", "Calorie Calculator", "Body Fat %"],
      path: "/health-calculators"
    },
    {
      title: "Math Calculators",
      icon: BrainCircuit,
      description: "Algebra, Geometry, Statistics & More",
      gradient: "from-emerald-500 to-teal-600",
      calculators: ["Scientific Calculator", "Percentage", "Fraction", "Pythagorean"],
      path: "/math-calculators"
    },
    {
      title: "Other Calculators",
      icon: Wrench,
      description: "Converters, Utilities & Daily Tools",
      gradient: "from-cyan-500 to-blue-600",
      calculators: ["Date Calculator", "Age Calculator", "Time Zone", "Dice Roller"],
      path: "/other-calculators"
    },
    {
      title: "Image Tools",
      icon: Type,
      description: "Crop, Resize, Compress & Convert Images",
      gradient: "from-cyan-500 to-blue-600",
      calculators: ["Crop Image", "Resize Image", "Compress Image", "Convert Image"],
      path: "/tool/crop-image"
    },
    {
      title: "Text & Developer Tools",
      icon: FileText,
      description: "Text Formatting, Encoding & Generation",
      gradient: "from-indigo-500 to-blue-600",
      calculators: ["Word Counter", "Case Converter", "JSON Formatter", "QR Code"],
      path: "/tool/word-counter"
    },
    {
      title: "All Calculators",
      icon: TrendingUp,
      description: "Browse Complete Collection",
      gradient: "from-violet-500 to-purple-600",
      calculators: ["100+ Calculators", "Financial", "Health", "Math & More"],
      path: "/all-calculators"
    }
  ];

export const faqData = [
  {
    question: "What is Prime Metric?",
    answer: "Prime Metric is a premium website offering over 100+ calculators and educational tools to help you make informed financial decisions. Our tools are designed to be accurate, easy-to-use, and accessible to everyone.",
  },
  {
    question: "Are the calculators and tools free to use?",
    answer: "Yes, all our calculators and educational tools are completely free to use. We are committed to providing high-quality resources to help you improve your financial literacy.",
  },
  {
    question: "How accurate are the calculators?",
    answer: "Our calculators are designed to provide accurate estimates based on the information you provide. However, they should be used for informational purposes only and are not a substitute for professional financial advice.",
  },
  {
    question: "Do you store any of my personal data?",
    answer: "No, we do not store any personal data you enter into our calculators. Your privacy is our top priority. All calculations are performed on your device and are not saved on our servers.",
  },
];
