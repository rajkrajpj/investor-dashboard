"use client";
import { useState } from "react";
// import DashboardLayout from "@/components/dashboard/DashboardLayout"; // Likely handled by group layout
import DocumentRequestModal from "@/components/dashboard/DocumentRequestModal";
import { Button } from "@/components/ui/button";

export default function DocumentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    // <DashboardLayout> // Likely handled by group layout
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Document Center</h1>
        <p className="mb-4 text-gray-600">
          Manage your documents or upload new ones as requested.
        </p>
        <Button onClick={() => setIsModalOpen(true)} variant="default" className="mb-4">
          Upload New Document
        </Button>
        <DocumentRequestModal 
          companyName="General Investment Documents" 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </div>
    // </DashboardLayout> // Likely handled by group layout
  );
} 