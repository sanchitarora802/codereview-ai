
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import ClientLayout from "@/components/layout/ClientLayout";

export const metadata = {
  title: "CodeReviewAI - AI-Powered Code Analysis",
  description:
    "Get instant AI-powered feedback on your code. Find bugs, security issues, and performance problems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
