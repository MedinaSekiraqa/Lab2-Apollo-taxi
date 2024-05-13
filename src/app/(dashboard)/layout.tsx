import { Breadcrumbs } from "@/components/breadcrumbs";
import "../globals.css";
import { Dashboard } from "@/components/dashboard";

export default function DashboardLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <Dashboard>
         <Breadcrumbs />
         {children}
      </Dashboard>
   );
}
