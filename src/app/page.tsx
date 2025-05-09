import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import InvestmentTable from "@/components/dashboard/InvestmentTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bell, FileText, PlusCircle } from "lucide-react";

// Create a local PortfolioSummary component since the import is causing issues
const PortfolioSummary = ({
  totalInvested = 0,
  currentValue = 0,
  activeInvestments = 0,
  percentageChange = 0,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-background">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground">Total Invested</p>
            <h3 className="text-2xl font-bold">
              ${totalInvested.toLocaleString()}
            </h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground">Current Value</p>
            <h3 className="text-2xl font-bold">
              ${currentValue.toLocaleString()}
            </h3>
            <p
              className={`text-xs ${percentageChange >= 0 ? "text-green-500" : "text-red-500"}`}
            >
              {percentageChange >= 0 ? "+" : ""}
              {percentageChange}% from initial investment
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground">Active Investments</p>
            <h3 className="text-2xl font-bold">{activeInvestments}</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function InvestorDashboard() {
  // Mock data for the dashboard
  const portfolioData = {
    totalInvested: 250000,
    currentValue: 275000,
    activeInvestments: 5,
    percentageChange: 10,
  };

  const recentActivities = [
    {
      id: 1,
      type: "Investment",
      description: "New investment in Tech Growth Fund",
      date: "2023-05-15",
      amount: 50000,
    },
    {
      id: 2,
      type: "Status Change",
      description: "KYC verification completed",
      date: "2023-05-10",
      amount: null,
    },
    {
      id: 3,
      type: "Disbursement",
      description: "Quarterly dividend received",
      date: "2023-05-01",
      amount: 2500,
    },
    {
      id: 4,
      type: "Document",
      description: "New subscription agreement available",
      date: "2023-04-28",
      amount: null,
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6 bg-background">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, John. Here's an overview of your investments.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Export Data</Button>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> New Investment
            </Button>
          </div>
        </div>

        {/* Portfolio Summary Section */}
        <PortfolioSummary
          totalInvested={portfolioData.totalInvested}
          currentValue={portfolioData.currentValue}
          activeInvestments={portfolioData.activeInvestments}
          percentageChange={portfolioData.percentageChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Investments Table Section */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Your Investments</CardTitle>
                  <CardDescription>
                    Manage and track your active investments
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  View All <ArrowRight className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <InvestmentTable />
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity Section */}
          <div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest updates on your investments
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 border-b pb-4 last:border-0"
                    >
                      <div className="rounded-full p-2 bg-muted">
                        {activity.type === "Investment" && (
                          <PlusCircle className="h-4 w-4" />
                        )}
                        {activity.type === "Status Change" && (
                          <Bell className="h-4 w-4" />
                        )}
                        {activity.type === "Disbursement" && (
                          <ArrowRight className="h-4 w-4" />
                        )}
                        {activity.type === "Document" && (
                          <FileText className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.description}</p>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-sm text-muted-foreground">
                            {activity.date}
                          </p>
                          {activity.amount && (
                            <p className="text-sm font-medium">
                              ${activity.amount.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Activity
                </Button>
              </CardContent>
            </Card>

            {/* Quick Links Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
                <CardDescription>Frequently used actions</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Button variant="outline" className="justify-start">
                  <FileText className="mr-2 h-4 w-4" /> Document Center
                </Button>
                <Button variant="outline" className="justify-start">
                  <PlusCircle className="mr-2 h-4 w-4" /> Browse Offerings
                </Button>
                <Button variant="outline" className="justify-start">
                  <Bell className="mr-2 h-4 w-4" /> Notification Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
