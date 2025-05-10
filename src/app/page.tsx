import InvestorDashboardUI from "@/components/dashboard/InvestorDashboardUI";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link 
          href="/dashboard/investments" 
          className="block p-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center"
        >
          View Investments
        </Link>
        <Link 
          href="/dashboard/profile" 
          className="block p-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-center"
        >
          Edit Profile
        </Link>
        <Link 
          href="/dashboard/documents" 
          className="block p-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-center"
        >
          Upload Document
        </Link>
        <Link 
          href="/dashboard/payments" 
          className="block p-4 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors text-center"
        >
          Create Payment
        </Link>
      </div>
      <InvestorDashboardUI />
    </main>
  );
}
