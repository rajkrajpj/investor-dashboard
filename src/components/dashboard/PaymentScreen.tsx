"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bell, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PaymentScreenProps {
  userEmail?: string;
  userAvatarUrl?: string;
  onClose?: () => void;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({
  userEmail = "johndoe@gmail.com",
  userAvatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=investor",
  onClose,
}) => {
  return (
    <div className="w-full min-h-screen bg-[#f5f8ff] font-inter">
      {/* Header/Navigation */}
      <header className="w-full h-[72px] px-12 py-4 bg-white flex items-center">
        <img
          className="w-[117.5px] h-10"
          src="/assets/cultivate-logo.png"
          alt="Cultivate Capital"
        />
        <nav className="ml-8 flex items-center gap-8">
          <div className="text-[#728094] text-base font-normal">Dashboard</div>
          <div className="text-[#728094] text-base font-normal">
            Investments
          </div>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Bell className="w-5 h-5 text-gray-500" />
          <div className="w-[1px] h-8 bg-gray-200"></div>
          <div className="flex items-center gap-1.5">
            <img
              className="w-8 h-8 rounded-full"
              src={userAvatarUrl}
              alt="User avatar"
            />
            <span className="text-gray-500 text-base font-medium">
              {userEmail}
            </span>
            <ChevronDown className="w-5 h-5 text-gray-500" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        {/* Back Button */}
        <div className="absolute left-12 top-[152px]">
          <Button
            variant="outline"
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200"
            onClick={onClose}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to all investments</span>
          </Button>
        </div>

        {/* Left Side Content */}
        <div className="absolute left-12 top-[216px] w-[400px]">
          <h1 className="text-[#0f2644] text-3xl font-bold mb-4">
            Create a payment
          </h1>
          <p className="text-gray-500 text-sm leading-[21px]">
            Platea rutrum in amet mi viverra cursus. Velit pretium justo
            tincidunt interdum tincidunt velit fringilla a platea. Quam sit
            cursus metus adipiscing sit libero volutpat feugiat. Duis eu ac
            ipsum dui leo etiam ornare iaculis etiam.
          </p>
        </div>

        {/* Payment Form */}
        <div className="absolute right-0 top-[72px] h-[828px] w-[50%] bg-[#f9f8f4] pt-16 pb-16 px-16 flex flex-col gap-6">
          {/* Payment Method Tabs */}
          <div className="flex w-full rounded-lg shadow-md overflow-hidden">
            <div className="flex-1 h-[45px] px-4 py-3 bg-white flex justify-center items-center">
              <span className="text-gray-500 text-lg font-medium">Wire</span>
            </div>
            <div className="flex-1 h-[45px] px-4 py-3 bg-white flex justify-center items-center">
              <span className="text-gray-500 text-lg font-medium">ACH</span>
            </div>
            <div className="flex-1 h-[45px] px-4 py-3 bg-[#dfcd87] flex justify-center items-center">
              <span className="text-[#111928] text-lg font-bold">Card</span>
            </div>
          </div>

          {/* Card Form */}
          <div className="w-full p-8 bg-white rounded-lg shadow-md">
            <div className="flex flex-col gap-6">
              {/* Card Holder Name */}
              <div className="w-full">
                <label className="block text-gray-500 text-xs font-semibold mb-2">
                  CARD HOLDER NAME
                </label>
                <Input
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200"
                  placeholder=""
                />
              </div>

              {/* Card Number */}
              <div className="w-full">
                <label className="block text-gray-500 text-xs font-semibold mb-2">
                  CARD NUMBER
                </label>
                <Input
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200"
                  placeholder=""
                />
              </div>

              {/* Expiry and CVV */}
              <div className="flex gap-4">
                {/* Expiry Month */}
                <div className="flex-1">
                  <label className="block text-gray-500 text-xs font-semibold mb-2">
                    EXPIRY
                  </label>
                  <Input
                    className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200"
                    placeholder="MM"
                  />
                </div>

                {/* Expiry Year */}
                <div className="flex-1 self-end">
                  <Input
                    className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200"
                    placeholder="YY"
                  />
                </div>

                {/* CVV */}
                <div className="flex-1">
                  <label className="block text-gray-500 text-xs font-semibold mb-2">
                    CVV
                  </label>
                  <Input
                    className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200"
                    placeholder="XXX"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  className="px-5 py-2 rounded-lg border border-gray-200"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button className="px-5 py-2 bg-[#6b8afd] text-white rounded-lg hover:bg-[#5a79ec]">
                  Make payment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentScreen;
