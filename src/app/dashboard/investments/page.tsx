import InvestmentTable from "@/components/dashboard/InvestmentTable";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function InvestmentsPage() {
  return (
    // DashboardLayout is already applied by the (dashboard) group layout
    // No need to wrap it here again if src/app/dashboard/layout.tsx exists and applies it.
    // Assuming direct page content for now. If DashboardLayout needs to be here, means no group layout.
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">My Investments</h1>
        <InvestmentTable />
      </div>
  );
} 