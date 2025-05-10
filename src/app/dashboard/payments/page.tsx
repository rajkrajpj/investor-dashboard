"use client";
import dynamic from 'next/dynamic';
// import DashboardLayout from "@/components/dashboard/DashboardLayout"; // Likely handled by group layout
// import PaymentScreen from "@/components/dashboard/PaymentScreen";

const PaymentScreen = dynamic(() => import('@/components/dashboard/PaymentScreen'), { ssr: false });

export default function PaymentsPage() {
  return (
    // <DashboardLayout> // Likely handled by group layout
      <div className="w-full">
        {/* You might need a key here if PaymentScreen is part of a list or if its props change often */}
        <PaymentScreen />
      </div>
    // </DashboardLayout> // Likely handled by group layout
  );
} 