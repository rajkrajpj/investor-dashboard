"use client";

import ProfileUpdateModal from "@/components/dashboard/ProfileUpdateModal";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
        <ProfileUpdateModal />
      </div>
    </DashboardLayout>
  );
} 