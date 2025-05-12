import InvestorDashboardUI from "@/components/dashboard/InvestorDashboardUI";
// import Link from "next/link"; // Link component no longer needed if buttons are removed

export default function Home() {
  return (
    <main className="container mx-auto py-12 px-4">
      {/* The div containing the Link buttons has been removed */}
      <InvestorDashboardUI />
    </main>
  );
}
