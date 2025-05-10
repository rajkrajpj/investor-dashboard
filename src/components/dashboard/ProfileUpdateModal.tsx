"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  ssn: string;
  profilePicture?: string;
}

export default function ProfileUpdateModal() {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "John Bean Doe",
    email: "johndoe@gmail.com",
    phone: "+12 345 678",
    address:
      "92 Miles Drive, Newark, NJ 07103, California, United States of America",
    dateOfBirth: "February 12, 1980",
    ssn: "123-45-6789",
    profilePicture:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=80",
  });

  const handleChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving profile data:", profileData);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Edit Profile
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="w-full p-4 flex flex-col gap-6">
          {/* Profile Picture and Name Section */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={profileData.profilePicture}
                alt="Profile picture"
                className="w-32 h-32 rounded-full object-cover"
              />
              <Button
                variant="default"
                className="absolute bottom-0 right-0 bg-[#1a56db] text-white p-1 rounded-full"
                size="icon"
              >
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-[#1f2a37] text-2xl font-bold font-inter leading-9">
                {profileData.name}
              </h2>
              <p className="text-gray-500 text-xs font-semibold font-inter leading-[18px]">
                INVESTOR
              </p>
              <Button
                variant="default"
                className="mt-2 bg-[#1a56db] text-white px-5 py-2.5 rounded-lg"
              >
                Change picture
              </Button>
            </div>
          </div>

          {/* Name Input */}
          <div className="flex flex-col gap-2">
            <Label className="text-gray-500 text-xs font-semibold font-inter leading-[18px]">
              NAME
            </Label>
            <Input
              value={profileData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-300 text-sm font-normal font-inter"
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <Label className="text-gray-500 text-xs font-semibold font-inter leading-[18px]">
              EMAIL
            </Label>
            <Input
              type="email"
              value={profileData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="px-4 py-3 bg-gray-50 rounded-lg border border-[#1c64f2] text-sm font-normal font-inter"
            />
          </div>

          {/* Phone Input */}
          <div className="flex flex-col gap-2">
            <Label className="text-gray-500 text-xs font-semibold font-inter leading-[18px]">
              PHONE
            </Label>
            <Input
              type="tel"
              value={profileData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-300 text-sm font-normal font-inter"
            />
          </div>

          {/* Address Input */}
          <div className="flex flex-col gap-2">
            <Label className="text-gray-500 text-xs font-semibold font-inter leading-[18px]">
              ADDRESS
            </Label>
            <Input
              value={profileData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-300 text-sm font-normal font-inter"
            />
          </div>

          {/* Date of Birth Input */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-gray-500 text-xs font-semibold font-inter leading-[18px]">
              DATE OF BIRTH
            </Label>
            <div className="relative">
              <Input
                value={profileData.dateOfBirth}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                className="px-4 py-3 bg-gray-50 rounded-lg border border-[#e5e8ee] text-gray-500 text-sm font-normal font-inter"
              />
              <CalendarIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>
          </div>

          {/* SSN Input */}
          <div className="flex flex-col gap-2">
            <Label className="text-gray-500 text-xs font-semibold font-inter leading-[18px]">
              SSN
            </Label>
            <Input
              type="password"
              value={profileData.ssn}
              onChange={(e) => handleChange("ssn", e.target.value)}
              className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-300 text-sm font-normal font-inter"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end items-center gap-6 mt-2">
            <Button
              variant="default"
              onClick={handleSave}
              className="px-5 py-3 bg-[#1a56db] rounded-lg text-white font-medium"
            >
              Save changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
