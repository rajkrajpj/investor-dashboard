"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpDown,
  Mail,
  Phone,
  Home,
  Calendar,
  CreditCard,
  Edit,
} from "lucide-react";
import PaymentScreen from "./PaymentScreen";

interface InvestmentItem {
  offering: string;
  date: string;
  shares: number;
  amount: number;
  status: "Funds Received" | "Invested" | "Voided / Refunded";
}

interface InvestorProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  ssn: string;
  avatarUrl: string;
}

interface InvestorDashboardUIProps {
  userName?: string;
  investments?: InvestmentItem[];
  profile?: InvestorProfile;
}

const InvestorDashboardUI: React.FC<InvestorDashboardUIProps> = ({
  userName = "John",
  investments = [
    {
      offering: "Armed Forces Brewing Company",
      date: "mm/dd/yyyy",
      shares: 201,
      amount: 2300,
      status: "Funds Received",
    },
    {
      offering: "Armed Forces Brewing Company",
      date: "mm/dd/yyyy",
      shares: 425,
      amount: 5000,
      status: "Invested",
    },
    {
      offering: "Offering Company Name",
      date: "mm/dd/yyyy",
      shares: 20,
      amount: 234,
      status: "Voided / Refunded",
    },
  ],
  profile = {
    name: "John Bean Doe",
    email: "johndoe@gmail.com",
    phone: "+00 123 456 789 / +12 345 678",
    address:
      "92 Miles Drive, Newark, NJ 07103, California, United States of America",
    dateOfBirth: "February 12, 1980",
    ssn: "*******6789",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=investor",
  },
}) => {
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Funds Received":
        return "bg-[#def7ec] text-[#03543f]";
      case "Invested":
        return "bg-[#e1effe] text-[#1e429f]";
      case "Voided / Refunded":
        return "bg-[#edebfe] text-[#5521b5]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (showPaymentScreen) {
    return <PaymentScreen onClose={() => setShowPaymentScreen(false)} />;
  }

  return (
    <div className="w-full min-h-screen bg-[#f5f8ff]">
      {/* Header/Navigation */}
      <header className="w-full h-[72px] px-12 py-4 bg-white flex items-center">
        <div className="flex items-center gap-8">
          <img
            className="w-[117.5px] h-10"
            src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=80"
            alt="Cultivate Capital"
          />
          <nav className="flex items-center gap-8">
            <div className="text-[#3170bf] text-base font-bold">Dashboard</div>
            <div className="text-[#728094] text-base">Transactions</div>
          </nav>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <img
              className="w-8 h-8 rounded-full"
              src={profile.avatarUrl}
              alt="User avatar"
            />
            <span className="text-gray-500 text-base font-medium">
              {profile.email}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-12 py-10">
        {/* Welcome Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-[#0f2644] text-3xl font-bold">
            Welcome, {userName}!
          </h1>
          <Button
            className="bg-[#1a56db] text-white px-5 py-3 rounded-lg"
            onClick={() => setShowPaymentScreen(true)}
          >
            Create a payment
          </Button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Investments & Requests */}
          <div className="lg:col-span-2 space-y-6">
            {/* Investments Table */}
            <Card className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4">
                <h2 className="text-[#1f2a37] text-xl font-bold mb-4">
                  Investments
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500">
                          <div className="flex items-center gap-2">
                            OFFERING
                            <ArrowUpDown className="h-4 w-4" />
                          </div>
                        </th>
                        <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500">
                          <div className="flex items-center gap-2">
                            DATE
                            <ArrowUpDown className="h-4 w-4" />
                          </div>
                        </th>
                        <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500">
                          <div className="flex items-center gap-2">
                            SHARES
                            <ArrowUpDown className="h-4 w-4" />
                          </div>
                        </th>
                        <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500">
                          <div className="flex items-center gap-2">
                            AMOUNT
                            <ArrowUpDown className="h-4 w-4" />
                          </div>
                        </th>
                        <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500">
                          <div className="flex items-center gap-2">
                            STATUS
                            <ArrowUpDown className="h-4 w-4" />
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {investments.map((investment, index) => (
                        <tr
                          key={index}
                          className={index % 2 === 1 ? "bg-gray-50" : ""}
                        >
                          <td className="px-4 py-3.5 text-sm text-gray-500">
                            {investment.offering}
                          </td>
                          <td className="px-4 py-3.5 text-sm text-gray-500">
                            {investment.date}
                          </td>
                          <td className="px-4 py-3.5 text-sm font-semibold text-black">
                            {investment.shares}
                          </td>
                          <td className="px-4 py-3.5 text-sm font-semibold text-black">
                            ${investment.amount}
                          </td>
                          <td className="px-4 py-3.5">
                            <Badge
                              className={`font-medium ${getStatusBadgeColor(
                                investment.status,
                              )}`}
                            >
                              {investment.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>

            {/* Requests Section */}
            <Card className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4">
                <h2 className="text-[#1f2a37] text-xl font-bold mb-4">
                  Requests
                </h2>
                <div className="px-[23px] py-5 bg-gray-50 rounded-lg text-center">
                  <p className="text-gray-500 text-base">
                    No active requests right now. We will let you know if we
                    need additional documents from you. Thank you!
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Profile */}
          <div className="lg:col-span-1">
            <Card className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-8 space-y-6">
                {/* Profile Header */}
                <div className="flex items-center gap-6">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={profile.avatarUrl}
                    alt="User avatar"
                  />
                  <div className="flex-1">
                    <h2 className="text-[#1f2a37] text-2xl font-bold">
                      {profile.name}
                    </h2>
                    <p className="text-gray-500 text-xs font-semibold">
                      INVESTOR
                    </p>
                  </div>
                  <Button className="bg-[#1a56db] text-white px-5 py-2.5 rounded-lg flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Edit profile
                  </Button>
                </div>

                {/* Profile Details */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#f7f4e6] rounded flex items-center justify-center">
                    <Mail className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-500 text-xs font-semibold">EMAIL</p>
                    <p className="text-[#111928] text-base font-medium">
                      {profile.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#f7f4e6] rounded flex items-center justify-center">
                    <Phone className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-500 text-xs font-semibold">PHONE</p>
                    <p className="text-[#111928] text-base font-medium">
                      {profile.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#f7f4e6] rounded flex items-center justify-center">
                    <Home className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-500 text-xs font-semibold">
                      ADDRESS
                    </p>
                    <p className="text-[#111928] text-base font-medium">
                      {profile.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#f7f4e6] rounded flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-500 text-xs font-semibold">
                      DATE OF BIRTH
                    </p>
                    <p className="text-[#111928] text-base font-medium">
                      {profile.dateOfBirth}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#f7f4e6] rounded flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-500 text-xs font-semibold">SSN</p>
                    <p className="text-[#111928] text-base font-medium">
                      {profile.ssn}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InvestorDashboardUI;
