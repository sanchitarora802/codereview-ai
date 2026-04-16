import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

export const metadata = {
  title: "CodeReviewAI - AI-Powered Code Analysis",
  description: "Get instant AI-powered feedback on your code. Find bugs, security issues, and performance problems in seconds.",
  keywords: "code review, AI code analysis, bug detection, security vulnerabilities, code quality",
  authors: [{ name: "CodeReviewAI" }],
  robots: "index, follow",
  themeColor: "#2563eb",
  openGraph: {
    type: "website",
    siteName: "CodeReviewAI",
    title: "CodeReviewAI - AI-Powered Code Analysis",
    description: "Get instant AI-powered feedback on your code. Find bugs, security issues, and performance problems in seconds.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeReviewAI - AI-Powered Code Analysis",
    description: "Get instant AI-powered feedback on your code. Find bugs, security issues, and performance problems in seconds.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
