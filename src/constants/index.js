import { routeNames } from "@/utils/routes";

// Navigation Links
export const NAV_LINKS = [
  { href: "/#how-it-works", label: "How it Works" },
  { href: routeNames.pricing, label: "Pricing" },
];

// Footer Links
export const FOOTER_LINKS = {
  product: [
    { href: "/#features", label: "Features" },
    { href: routeNames.pricing, label: "Pricing" },
    { href: "/#how-it-works", label: "How-it-works" },
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

// Language Options
export const LANGUAGE_OPTIONS = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "go", label: "Go" },
  { value: "ruby", label: "Ruby" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "other", label: "Others" },
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

// Pricing Plans Duration
export const PRICING_PLAN_DURATION = {
  monthly: "monthly",
  annually: "yearly",
};

// Pricing Plans
export const PRICING_PLANS = [
  {
    id: process.env.NEXT_PUBLIC_STARTER_PLAN_NAME,
    name: "Starter",
    description: "Perfect for individual developers and small projects",
    monthlyPrice: 0,
    yearlyPrice: 0,
    originalPrice: 0,
    popular: false,
    cta: "Free",
    features: [
      "basic-analysis",
      "security-scan",
      "basic-support",
      "5-reviews-per-month",
    ],
  },
  {
    id: process.env.NEXT_PUBLIC_PROFFESIONAL_PLAN_NAME,
    name: "Professional",
    description: "Ideal for growing teams and serious developers",
    monthlyPrice: 19,
    yearlyPrice: 182.6,
    originalPrice: 228,
    popular: true,
    cta: "Start Free Trial",
    features: [
      "advanced-analysis",
      "security-scan",
      "code-suggestions",
      "priority-support",
      "unlimited-reviews",
      // "team-collaboration",
      // "api-access",
    ],
  },
];

// Pricing Features
export const PRICING_FEATURES = [
  {
    id: "basic-analysis",
    name: "Basic Code Analysis",
    icon: "code",
  },
  {
    id: "advanced-analysis",
    name: "Advanced Code Analysis",
    icon: "code",
  },
  {
    id: "security-scan",
    name: "Security Vulnerability Scan",
    icon: "shield",
  },
  {
    id: "code-suggestions",
    name: "AI Code Suggestions",
    icon: "lightning",
  },
  {
    id: "basic-support",
    name: "Basic Support",
    icon: "help",
  },
  {
    id: "priority-support",
    name: "Priority Support",
    icon: "help",
  },
  {
    id: "5-reviews-per-month",
    name: "5 Reviews per Month",
    icon: "checkCircle",
  },
  {
    id: "unlimited-reviews",
    name: "Unlimited Reviews",
    icon: "checkCircle",
  },
  {
    id: "team-collaboration",
    name: "Team Collaboration",
    icon: "team",
  },
  {
    id: "api-access",
    name: "API Access",
    icon: "code",
  },
];

// FAQ Data
export const FAQ_DATA = [
  {
    question: "Can I change my plan at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.",
  },
  {
    question: "What happens if I exceed my review limit?",
    answer:
      "If you exceed your monthly review limit, you'll be notified and can either upgrade your plan or wait until the next billing cycle. We never charge overage fees.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund.",
  },
  {
    question: "Can I use CodeReviewAI for open source projects?",
    answer:
      "Yes! We offer special pricing for open source projects. Contact our sales team to learn about our open source program.",
  },
  {
    question: "What programming languages do you support?",
    answer:
      "We support JavaScript, TypeScript, Python, Java, Go, Ruby, PHP, C++, C#, and many more. Our AI continuously learns new languages and frameworks.",
  },
  {
    question: "Is my code secure?",
    answer:
      "Absolutely. We use enterprise-grade security measures, encrypt all data in transit and at rest, and never store your code permanently. Your code is processed and then deleted.",
  },
];

// App Config
export const APP_CONFIG = {
  name: "CodeReviewAI",
  tagline: "AI-Powered Code Analysis",
  description:
    "Get instant AI-powered feedback on your code. Find bugs, security issues, and performance problems.",
  copyright: "© 2025 CodeReviewAI. All rights reserved.",
  social: {
    twitter: "#",
    github: "#",
    linkedin: "#",
    facebook: "#",
  },
};
