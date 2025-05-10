import InvestmentTable from "@/components/dashboard/InvestmentTable";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function InvestmentsPage() {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">My Investments</h1>
        <InvestmentTable />
      </div>
    </DashboardLayout>
  );
} 