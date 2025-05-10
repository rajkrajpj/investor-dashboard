"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PaymentScreen from "@/components/dashboard/PaymentScreen";

export default function PaymentsPage() {
  // The PaymentScreen component has its own header and layout structure internally.
  // We might want to refactor PaymentScreen to not include its own full-page nav
  // if it's meant to be consistently within DashboardLayout.
  // For now, we'll render it as is.
  return (
    <DashboardLayout>
      {/* The DashboardLayout will provide the main sidebar and potentially a top bar. */}
      {/* PaymentScreen might duplicate some of this, or it might be designed to replace it. */}
      <div className="w-full">
         {/* Render PaymentScreen. If PaymentScreen is a full page with its own nav, 
             it might look a bit off inside another layout. 
             Consider passing a prop to PaymentScreen to hide its internal nav if needed. */}
        <PaymentScreen />
      </div>
    </DashboardLayout>
  );
} 