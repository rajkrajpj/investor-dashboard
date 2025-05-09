import InvestorDashboardUI from "@/components/dashboard/InvestorDashboardUI";
import RequestsSection from '@/components/RequestsSection';

export default function Home() {
  return (
    <main className="container mx-auto py-12 px-4">
      <InvestorDashboardUI />
      <RequestsSection />
    </main>
  );
}
