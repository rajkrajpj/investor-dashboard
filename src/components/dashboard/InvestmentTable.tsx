"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Investment {
  id: string;
  offeringName: string;
  amount: number;
  investmentDate: string;
  paymentStatus: "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED" | "VOIDED";
  tradeStatus: "PENDING" | "SUBMITTED" | "CLEARED" | "REJECTED" | "CANCELLED";
  kycStatus: "PENDING" | "APPROVED" | "REJECTED" | "REVIEW";
  isFundsReceived: boolean;
  isTradeCleared: boolean;
}

interface InvestmentTableProps {
  investments?: Investment[];
}

const InvestmentTable: React.FC<InvestmentTableProps> = ({
  investments = [
    {
      id: "1",
      offeringName: "Tech Growth Fund III",
      amount: 25000,
      investmentDate: "2023-10-15",
      paymentStatus: "SUCCESS" as const,
      tradeStatus: "CLEARED" as const,
      kycStatus: "APPROVED" as const,
      isFundsReceived: true,
      isTradeCleared: true,
    },
    {
      id: "2",
      offeringName: "Real Estate Opportunity Fund",
      amount: 50000,
      investmentDate: "2023-11-20",
      paymentStatus: "SUCCESS" as const,
      tradeStatus: "PENDING" as const,
      kycStatus: "APPROVED" as const,
      isFundsReceived: true,
      isTradeCleared: false,
    },
    {
      id: "3",
      offeringName: "Healthcare Innovation Fund",
      amount: 15000,
      investmentDate: "2024-01-05",
      paymentStatus: "PENDING" as const,
      tradeStatus: "PENDING" as const,
      kycStatus: "PENDING" as const,
      isFundsReceived: false,
      isTradeCleared: false,
    },
    {
      id: "4",
      offeringName: "Sustainable Energy Project",
      amount: 35000,
      investmentDate: "2024-02-12",
      paymentStatus: "FAILED" as const,
      tradeStatus: "CANCELLED" as const,
      kycStatus: "REJECTED" as const,
      isFundsReceived: false,
      isTradeCleared: false,
    },
  ],
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] =
    useState<keyof Investment>("investmentDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState<{
    payment: string[];
    trade: string[];
    kyc: string[];
  }>({
    payment: [],
    trade: [],
    kyc: [],
  });

  const handleSort = (field: keyof Investment) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const toggleStatusFilter = (
    type: "payment" | "trade" | "kyc",
    value: string,
  ) => {
    setStatusFilter((prev) => {
      const currentFilters = [...prev[type]];
      const index = currentFilters.indexOf(value);

      if (index >= 0) {
        currentFilters.splice(index, 1);
      } else {
        currentFilters.push(value);
      }

      return {
        ...prev,
        [type]: currentFilters,
      };
    });
  };

  const filteredInvestments = investments
    .filter((investment) => {
      // Search filter
      const matchesSearch = investment.offeringName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Status filters
      const matchesPaymentStatus =
        statusFilter.payment.length === 0 ||
        statusFilter.payment.includes(investment.paymentStatus);

      const matchesTradeStatus =
        statusFilter.trade.length === 0 ||
        statusFilter.trade.includes(investment.tradeStatus);

      const matchesKycStatus =
        statusFilter.kyc.length === 0 ||
        statusFilter.kyc.includes(investment.kycStatus);

      return (
        matchesSearch &&
        matchesPaymentStatus &&
        matchesTradeStatus &&
        matchesKycStatus
      );
    })
    .sort((a, b) => {
      if (sortField === "amount") {
        return sortDirection === "asc"
          ? a.amount - b.amount
          : b.amount - a.amount;
      } else if (sortField === "investmentDate") {
        return sortDirection === "asc"
          ? new Date(a.investmentDate).getTime() -
              new Date(b.investmentDate).getTime()
          : new Date(b.investmentDate).getTime() -
              new Date(a.investmentDate).getTime();
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (
    status: string,
    type: "payment" | "trade" | "kyc",
  ) => {
    let variant: "default" | "secondary" | "destructive" | "outline" =
      "default";

    if (status === "SUCCESS" || status === "CLEARED" || status === "APPROVED") {
      variant = "default";
    } else if (
      status === "PENDING" ||
      status === "SUBMITTED" ||
      status === "REVIEW"
    ) {
      variant = "secondary";
    } else {
      variant = "destructive";
    }

    return (
      <Badge variant={variant} className="whitespace-nowrap">
        {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
      </Badge>
    );
  };

  return (
    <Card className="w-full bg-white">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold">My Investments</h2>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search investments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="p-2">
                    <h4 className="font-medium mb-1">Payment Status</h4>
                    {["PENDING", "SUCCESS", "FAILED", "REFUNDED", "VOIDED"].map(
                      (status) => (
                        <div
                          key={`payment-${status}`}
                          className="flex items-center space-x-2"
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="justify-start w-full"
                            onClick={() =>
                              toggleStatusFilter("payment", status)
                            }
                          >
                            <div className="flex items-center w-full">
                              <div className="w-4 h-4 border rounded-sm mr-2 flex items-center justify-center">
                                {statusFilter.payment.includes(status) && (
                                  <Check className="h-3 w-3" />
                                )}
                              </div>
                              <span>
                                {status.charAt(0).toUpperCase() +
                                  status.slice(1).toLowerCase()}
                              </span>
                            </div>
                          </Button>
                        </div>
                      ),
                    )}

                    <h4 className="font-medium mb-1 mt-3">Trade Status</h4>
                    {[
                      "PENDING",
                      "SUBMITTED",
                      "CLEARED",
                      "REJECTED",
                      "CANCELLED",
                    ].map((status) => (
                      <div
                        key={`trade-${status}`}
                        className="flex items-center space-x-2"
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="justify-start w-full"
                          onClick={() => toggleStatusFilter("trade", status)}
                        >
                          <div className="flex items-center w-full">
                            <div className="w-4 h-4 border rounded-sm mr-2 flex items-center justify-center">
                              {statusFilter.trade.includes(status) && (
                                <Check className="h-3 w-3" />
                              )}
                            </div>
                            <span>
                              {status.charAt(0).toUpperCase() +
                                status.slice(1).toLowerCase()}
                            </span>
                          </div>
                        </Button>
                      </div>
                    ))}

                    <h4 className="font-medium mb-1 mt-3">KYC Status</h4>
                    {["PENDING", "APPROVED", "REJECTED", "REVIEW"].map(
                      (status) => (
                        <div
                          key={`kyc-${status}`}
                          className="flex items-center space-x-2"
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="justify-start w-full"
                            onClick={() => toggleStatusFilter("kyc", status)}
                          >
                            <div className="flex items-center w-full">
                              <div className="w-4 h-4 border rounded-sm mr-2 flex items-center justify-center">
                                {statusFilter.kyc.includes(status) && (
                                  <Check className="h-3 w-3" />
                                )}
                              </div>
                              <span>
                                {status.charAt(0).toUpperCase() +
                                  status.slice(1).toLowerCase()}
                              </span>
                            </div>
                          </Button>
                        </div>
                      ),
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {filteredInvestments.length > 0 ? (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("offeringName")}
                    >
                      <div className="flex items-center">
                        Offering
                        {sortField === "offeringName" &&
                          (sortDirection === "asc" ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                          ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                          ))}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer text-right"
                      onClick={() => handleSort("amount")}
                    >
                      <div className="flex items-center justify-end">
                        Amount
                        {sortField === "amount" &&
                          (sortDirection === "asc" ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                          ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                          ))}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("investmentDate")}
                    >
                      <div className="flex items-center">
                        Date
                        {sortField === "investmentDate" &&
                          (sortDirection === "asc" ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                          ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                          ))}
                      </div>
                    </TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Trade Status</TableHead>
                    <TableHead>KYC Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvestments.map((investment) => (
                    <TableRow
                      key={investment.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() =>
                        console.log(
                          `View investment details for ID: ${investment.id}`,
                        )
                      }
                    >
                      <TableCell className="font-medium">
                        {investment.offeringName}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(investment.amount)}
                      </TableCell>
                      <TableCell>
                        {formatDate(investment.investmentDate)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(investment.paymentStatus, "payment")}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(investment.tradeStatus, "trade")}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(investment.kycStatus, "kyc")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center border rounded-md bg-muted/10">
              <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="font-medium text-lg">No investments found</h3>
              <p className="text-muted-foreground mt-1">
                {searchTerm ||
                Object.values(statusFilter).some((arr) => arr.length > 0)
                  ? "Try adjusting your search or filters"
                  : "You don't have any investments yet"}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentTable;
