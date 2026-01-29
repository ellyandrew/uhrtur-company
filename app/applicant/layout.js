export const metadata = {
  title: "Applicant | Uhrtur",
};

import DashboardLayout from "@/components/layouts/PortalLayout";

export default function PortalLayoutWrapper({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
