"use client";

import { useState } from "react";
import dynamic from 'next/dynamic';
// import ProfileUpdateModal from "@/components/dashboard/ProfileUpdateModal";
import { Button } from "@/components/ui/button";
// import DashboardLayout from "@/components/dashboard/DashboardLayout"; // Likely handled by group layout

const ProfileUpdateModal = dynamic(() => import('@/components/dashboard/ProfileUpdateModal'), { ssr: false });

export default function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    // <DashboardLayout> // Likely handled by group layout
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
        <Button 
          onClick={() => setIsModalOpen(true)}
          variant="default"
          className="bg-blue-600 hover:bg-blue-700 mb-4"
        >
          Edit Profile
        </Button>
        {isModalOpen && (
          <ProfileUpdateModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    // </DashboardLayout> // Likely handled by group layout
  );
} 