import Navbar from "@/components/layouts/MainHeader.jsx";
import Footer from "@/components/layouts/MainFooter";
import { ToastProvider } from "@/components/ui/ToastContext";

export default function SiteLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
