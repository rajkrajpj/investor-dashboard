"use client";

import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Investment {
  id: string;
  offeringName: string;
  amount: number;
  shares: number;
  investmentDate: string;
  paymentMethod: string;
  transactionId: string;
  status: "Funds Received" | "Invested" | "Voided / Refunded";
}

interface InvestmentTableProps {
  investments?: Investment[];
}

const InvestmentTable: React.FC<InvestmentTableProps> = ({
  investments = [
    {
      id: "1",
      offeringName: "Armed Forces Brewing Company",
      amount: 2300,
      shares: 201,
      investmentDate: "mm/dd/yyyy",
      paymentMethod: "ACH",
      transactionId: "06292332qwmbyse",
      status: "Funds Received" as const,
    },
    {
      id: "2",
      offeringName: "Armed Forces Brewing Company",
      amount: 5000,
      shares: 425,
      investmentDate: "mm/dd/yyyy",
      paymentMethod: "Wire",
      transactionId: "06294412aldkajdl",
      status: "Invested" as const,
    },
    {
      id: "3",
      offeringName: "Offering Company Name",
      amount: 234,
      shares: 20,
      investmentDate: "mm/dd/yyyy",
      paymentMethod: "Card",
      transactionId: "06295692qoweies",
      status: "Voided / Refunded" as const,
    },
    {
      id: "4",
      offeringName: "Offering Company Name",
      amount: 5000,
      shares: 425,
      investmentDate: "mm/dd/yyyy",
      paymentMethod: "Wire",
      transactionId: "06294412aldkajdl",
      status: "Invested" as const,
    },
    {
      id: "5",
      offeringName: "Offering Company Name",
      amount: 234,
      shares: 20,
      investmentDate: "mm/dd/yyyy",
      paymentMethod: "Card",
      transactionId: "06295692qoweies",
      status: "Funds Received" as const,
    },
  ],
}) => {
  const [sortField, setSortField] =
    React.useState<keyof Investment>("investmentDate");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "desc",
  );

  const handleSort = (field: keyof Investment) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedInvestments = [...investments].sort((a, b) => {
    if (sortField === "amount" || sortField === "shares") {
      return sortDirection === "asc"
        ? a[sortField] - b[sortField]
        : b[sortField] - a[sortField];
    } else {
      const aValue = String(a[sortField]).toLowerCase();
      const bValue = String(b[sortField]).toLowerCase();
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Funds Received":
        return (
          <Badge className="bg-[#def7ec] text-[#03543e] hover:bg-[#def7ec] font-normal">
            Funds Received
          </Badge>
        );
      case "Invested":
        return (
          <Badge className="bg-[#edebfe] text-[#5521b5] hover:bg-[#edebfe] font-normal">
            Invested
          </Badge>
        );
      case "Voided / Refunded":
        return (
          <Badge className="bg-[#edebfe] text-[#5521b5] hover:bg-[#edebfe] font-normal">
            Voided / Refunded
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 font-normal">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="w-full">
      <div className="w-full mb-6">
        <h1 className="text-3xl font-bold text-[#0f2644] font-inter">
          All Investments
        </h1>
      </div>

      <Card className="w-full bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.08)] rounded-lg">
        <CardContent className="p-4 pb-5">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-xs text-gray-500 font-inter">
                    OFFERING
                  </TableHead>
                  <TableHead
                    className="font-semibold text-xs text-gray-500 font-inter cursor-pointer"
                    onClick={() => handleSort("investmentDate")}
                  >
                    <div className="flex items-center gap-2">
                      DATE
                      {sortField === "investmentDate" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead
                    className="font-semibold text-xs text-gray-500 font-inter cursor-pointer"
                    onClick={() => handleSort("paymentMethod")}
                  >
                    <div className="flex items-center gap-2">
                      PAYMENT
                      {sortField === "paymentMethod" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead
                    className="font-semibold text-xs text-gray-500 font-inter cursor-pointer"
                    onClick={() => handleSort("transactionId")}
                  >
                    <div className="flex items-center gap-2">
                      TRANS. ID
                      {sortField === "transactionId" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-xs text-gray-500 font-inter">
                    SHARES
                  </TableHead>
                  <TableHead className="font-semibold text-xs text-gray-500 font-inter">
                    AMOUNT
                  </TableHead>
                  <TableHead className="font-semibold text-xs text-gray-500 font-inter">
                    STATUS
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedInvestments.map((investment, index) => (
                  <TableRow
                    key={investment.id}
                    className={index % 2 === 1 ? "bg-gray-50" : ""}
                  >
                    <TableCell className="text-sm text-gray-500 font-normal font-inter">
                      {investment.offeringName}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500 font-normal font-inter">
                      {investment.investmentDate}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500 font-normal font-inter">
                      {investment.paymentMethod}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500 font-normal font-inter">
                      {investment.transactionId}
                    </TableCell>
                    <TableCell className="text-sm text-black font-semibold font-inter">
                      {investment.shares}
                    </TableCell>
                    <TableCell className="text-sm text-black font-semibold font-inter">
                      {formatCurrency(investment.amount)}
                    </TableCell>
                    <TableCell>{getStatusBadge(investment.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentTable;
