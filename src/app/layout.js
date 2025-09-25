import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import ClientLayout from "@/components/layout/ClientLayout";

export default function RootLayout({ children }) {
  return <ClientLayout>{children}</ClientLayout>;
}
