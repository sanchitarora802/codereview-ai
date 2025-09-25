import "./globals.css";

export const metadata = {
  title: "CodeReview AI",
  description: "code review",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
