// Navigation Links
export const NAV_LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it Works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/dashboard", label: "Dashboard" },
];

// Footer Links
export const FOOTER_LINKS = {
  product: [
    { href: "/#features", label: "Features" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/api", label: "API" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/careers", label: "Careers" },
  ],
  support: [
    { href: "/docs", label: "Documentation" },
    { href: "/contact", label: "Contact" },
    { href: "/status", label: "Status" },
  ],
};

// Stats Data
export const STATS_DATA = [
  { value: "500K+", label: "Code Reviews" },
  { value: "10K+", label: "Active Developers" },
  { value: "99.9%", label: "Uptime" },
  { value: "2.3s", label: "Avg Analysis Time" },
];

// Features Data
export const FEATURES = [
  {
    icon: "lightning",
    title: "Lightning Fast Analysis",
    description:
      "Get comprehensive code review results in seconds, not hours or days",
  },
  {
    icon: "shield",
    title: "Security Vulnerability Detection",
    description:
      "Identify potential security issues before they become problems",
  },
  {
    icon: "code",
    title: "Multi-Language Support",
    description: "Support for JavaScript, Python, Java, Go, Ruby, and more",
  },
  {
    icon: "chart",
    title: "Performance Optimization",
    description: "Get suggestions to improve code performance and efficiency",
  },
  {
    icon: "settings",
    title: "Best Practices Enforcement",
    description: "Ensure your code follows industry standards and conventions",
  },
  {
    icon: "team",
    title: "Team Collaboration",
    description: "Share reviews and track team code quality metrics",
  },
];

// How It Works Steps
export const PROCESS_STEPS = [
  {
    number: "1",
    title: "Upload Code",
    description: "Paste your code or upload files directly from your IDE",
  },
  {
    number: "2",
    title: "AI Analysis",
    description:
      "Our AI instantly analyzes your code for issues and improvements",
  },
  {
    number: "3",
    title: "Get Results",
    description: "Receive detailed feedback with actionable suggestions",
  },
];

// Supported File Types
export const SUPPORTED_FILE_TYPES = {
  "text/javascript": [".js", ".jsx"],
  "text/typescript": [".ts", ".tsx"],
  "text/python": [".py"],
  "text/java": [".java"],
  "text/html": [".html"],
  "text/css": [".css"],
  "text/x-go": [".go"],
  "text/x-ruby": [".rb"],
};

// Demo Code Samples
export const DEMO_CODE_SAMPLES = {
  javascript: `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  return total;
}`,
  python: `def calculate_average(numbers):
    sum = 0
    for num in numbers:
        sum = sum + num
    average = sum / len(numbers)
    return average`,
  java: `public class Calculator {
    public static int add(int a, int b) {
        return a + b;
    }
}`,
};

// Button Variants
export const BUTTON_VARIANTS = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg disabled:bg-gray-400",
  secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:bg-gray-100",
  outline:
    "border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:border-gray-200",
  danger: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400",
  success: "bg-green-600 text-white hover:bg-green-700 disabled:bg-green-400",
};

// Button Sizes
export const BUTTON_SIZES = {
  small: "px-3 py-1.5 text-sm",
  medium: "px-4 py-2",
  large: "px-6 py-3 text-lg",
};

// Badge Colors
export const BADGE_COLORS = {
  success: "bg-green-100 text-green-800",
  error: "bg-red-100 text-red-800",
  warning: "bg-yellow-100 text-yellow-800",
  info: "bg-blue-100 text-blue-800",
  neutral: "bg-gray-100 text-gray-800",
  purple: "bg-purple-100 text-purple-800",
};

// Issue Types
export const ISSUE_TYPES = {
  error: {
    label: "Error",
    color: "bg-red-100 text-red-700",
    priority: 3,
  },
  warning: {
    label: "Warning",
    color: "bg-yellow-100 text-yellow-700",
    priority: 2,
  },
  info: {
    label: "Info",
    color: "bg-blue-100 text-blue-700",
    priority: 1,
  },
};

// API Endpoints
export const API_ENDPOINTS = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  ANALYZE: "/api/analyze",
  REVIEWS: "/api/reviews",
  AUTH: "/api/auth",
  USER: "/api/user",
};

// App Config
export const APP_CONFIG = {
  name: "CodeReviewAI",
  tagline: "AI-Powered Code Analysis",
  description:
    "Get instant AI-powered feedback on your code. Find bugs, security issues, and performance problems.",
  copyright: "© 2024 CodeReviewAI. All rights reserved.",
  social: {
    twitter: "https://twitter.com/codereviewai",
    github: "https://github.com/codereviewai",
    linkedin: "https://linkedin.com/company/codereviewai",
  },
};
