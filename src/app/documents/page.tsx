"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DocumentRequestModal from "@/components/dashboard/DocumentRequestModal";

export default function DocumentsPage() {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Document Center</h1>
        <p className="mb-4 text-gray-600">
          Manage your documents or upload new ones as requested.
        </p>
        <DocumentRequestModal companyName="General Investment Documents" />
      </div>
    </DashboardLayout>
  );
} 