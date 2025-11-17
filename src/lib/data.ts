import { Calculator, BookOpen, PiggyBank, Landmark, Briefcase, TrendingUp, Binary, Type, Pipette, Minimize2, RefreshCw, Crop, Hash, Braces, FileText, QrCode, Link, DollarSign, Heart, GraduationCap, Repeat } from "lucide-react";

export const calculatorTools = [
  {
    title: "Mortgage Calculator",
    description: "Estimate your monthly mortgage payments.",
    icon: Landmark,
    href: "#",
    imageId: "mortgage-calculator",
    category: "financial",
    implemented: false,
  },
  {
    title: "Investment Return",
    description: "Calculate the potential return on your investments.",
    icon: TrendingUp,
    href: "#",
    imageId: "investment-return",
    category: "financial",
    implemented: false,
  },
  {
    title: "Loan Calculator",
    description: "See how much your loan will cost you over time.",
    icon: PiggyBank,
    href: "#",
    imageId: "loan-calculator",
    category: "financial",
    implemented: false,
  },
  {
    title: "Base64 Encoder/Decoder",
    description: "Encode text to Base64 or decode from it.",
    icon: Binary,
    href: "/tool/base64",
    imageId: "base64-tool",
    category: "tools",
    implemented: true,
  },
  {
    title: "Case Converter",
    description: "Convert text between different letter cases.",
    icon: Type,
    href: "/tool/case-converter",
    imageId: "case-converter",
    category: "tools",
    implemented: true,
  },
  {
    title: "Color Picker",
    description: "Pick colors from images and get their values.",
    icon: Pipette,
    href: "/tool/color-picker",
    imageId: "color-picker",
    category: "tools",
    implemented: true,
  },
  {
    title: "Image Compressor",
    description: "Reduce image file size without losing quality.",
    icon: Minimize2,
    href: "/tool/compress-image",
    imageId: "image-compressor",
    category: "tools",
    implemented: true,
  },
  {
    title: "Image Converter",
    description: "Convert images between formats like PNG, JPG, and WEBP.",
    icon: RefreshCw,
    href: "/tool/convert-image",
    imageId: "image-converter",
    category: "tools",
    implemented: true,
  },
  {
    title: "Image Cropper",
    description: "Crop images to the perfect dimensions.",
    icon: Crop,
    href: "/tool/crop-image",
    imageId: "image-cropper",
    category: "tools",
    implemented: true,
  },
  {
    title: "Hash Generator",
    description: "Generate MD5, SHA-1, and SHA-256 hashes.",
    icon: Hash,
    href: "/tool/hash-generator",
    imageId: "hash-generator",
    category: "tools",
    implemented: true,
  },
  {
    title: "JSON Formatter",
    description: "Format, validate, and minify JSON data.",
    icon: Braces,
    href: "/tool/json-formatter",
    imageId: "json-formatter",
    category: "tools",
    implemented: true,
  },
  {
    title: "Lorem Ipsum Generator",
    description: "Generate placeholder text for your projects.",
    icon: FileText,
    href: "/tool/lorem-ipsum",
    imageId: "lorem-ipsum-generator",
    category: "tools",
    implemented: true,
  },
  {
    title: "QR Code Generator",
    description: "Generate QR codes for URLs, text, and more.",
    icon: QrCode,
    href: "/tool/qr-code",
    imageId: "qr-code-generator",
    category: "tools",
    implemented: true,
  },
  {
    title: "URL Encoder/Decoder",
    description: "Encode and decode URLs and URI components.",
    icon: Link,
    href: "/tool/url-encoder",
    imageId: "url-encoder",
    category: "tools",
    implemented: true,
  },
  {
    title: "Word Counter",
    description: "Count words, characters, sentences, and reading time.",
    icon: FileText,
    href: "/tool/word-counter",
    imageId: "word-counter",
    category: "tools",
    implemented: true,
  }
];

export const educationalTools = [
  {
    title: "Beginner's Guide to Saving",
    description: "Learn the fundamentals of building your savings.",
    icon: BookOpen,
    href: "#",
    imageId: "savings-guide",
    category: "education",
    implemented: false,
  },
  {
    title: "Stock Market Basics",
    description: "Understand the basics of the stock market.",
    icon: Briefcase,
    href: "#",
    imageId: "stock-market-basics",
    category: "education",
    implemented: false,
  },
  {
    title: "Retirement Planning",
    description: "Start planning for a comfortable retirement.",
    icon: Calculator,
    href: "#",
    imageId: "retirement-planning",
    category: "education",
    implemented: false,
  },
];

export const allCalculators = [...calculatorTools, ...educationalTools].map(tool => ({
  id: tool.imageId,
  name: tool.title,
  description: tool.description,
  path: tool.href,
  category: tool.category,
  implemented: tool.implemented,
  icon: tool.icon,
}));

export const categories = [
    {
      title: "Financial Calculators",
      icon: DollarSign,
      description: "Loans, EMI, Investment, Tax & More",
      gradient: "from-blue-500 to-purple-600",
      calculators: ["Loan Calculator", "EMI Calculator", "Currency Converter", "ROI Calculator"],
      path: "#"
    },
    {
      title: "Health & Fitness",
      icon: Heart,
      description: "BMI, BMR, Calories & Body Metrics",
      gradient: "from-pink-500 to-rose-600",
      calculators: ["BMI Calculator", "BMR Calculator", "Calorie Calculator", "Body Fat %"],
      path: "#"
    },
    {
      title: "Math Calculators",
      icon: GraduationCap,
      description: "Algebra, Geometry, Statistics & More",
      gradient: "from-emerald-500 to-teal-600",
      calculators: ["Scientific Calculator", "Percentage", "Fraction", "Pythagorean"],
      path: "#"
    },
    {
      title: "Other Calculators",
      icon: Repeat,
      description: "Converters, Utilities & Daily Tools",
      gradient: "from-orange-500 to-amber-600",
      calculators: ["Date Calculator", "Age Calculator", "Time Zone", "Dice Roller"],
      path: "#"
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
