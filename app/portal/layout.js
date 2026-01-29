export const metadata = {
  title: "Portal | Uhrtur",
};

import DashboardLayout from "@/components/layouts/PortalLayout";

export default function PortalLayoutWrapper({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
