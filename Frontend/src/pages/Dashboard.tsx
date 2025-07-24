import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { IssueCard } from "@/components/Issuecard";
import { useIssueStore } from "@/store/Issuestore";

// Mock data for initial load
const mockIssues = [
  {
    id: "1",
    title: "Login page not responsive on mobile devices",
    description:
      "The login form elements are overlapping and buttons are not properly sized on mobile screens smaller than 768px.",
    status: "Open" as const,
    priority: "High" as const,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T14:20:00Z",
    assignee: "Alex Johnson",
  },
  {
    id: "2",
    title: "Database connection timeout in production",
    description:
      "Users experiencing intermittent 500 errors due to database connection timeouts during peak hours.",
    status: "In Progress" as const,
    priority: "Critical" as const,
    createdAt: "2024-01-14T09:15:00Z",
    updatedAt: "2024-01-15T11:45:00Z",
    assignee: "Sarah Chen",
  },
  {
    id: "3",
    title: "Add dark mode toggle to user preferences",
    description:
      "Implement a dark/light mode toggle in the user settings panel with persistence across sessions.",
    status: "Testing" as const,
    priority: "Medium" as const,
    createdAt: "2024-01-13T16:20:00Z",
    updatedAt: "2024-01-15T09:30:00Z",
    assignee: "Mike Rodriguez",
  },
  {
    id: "4",
    title: "Email notification system not working",
    description:
      "Users report not receiving email notifications for issue updates and status changes.",
    status: "Resolved" as const,
    priority: "High" as const,
    createdAt: "2024-01-12T11:00:00Z",
    updatedAt: "2024-01-14T17:15:00Z",
    assignee: "Emma Davis",
  },
  {
    id: "5",
    title: "Improve search performance for large datasets",
    description:
      "Search functionality becomes slow when dealing with more than 10,000 records. Need to implement pagination and indexing.",
    status: "Open" as const,
    priority: "Low" as const,
    createdAt: "2024-01-11T14:45:00Z",
    updatedAt: "2024-01-13T10:20:00Z",
    assignee: "David Kim",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    issues,
    setIssues,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    getFilteredIssues,
  } = useIssueStore();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate API call
    const loadIssues = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIssues(mockIssues);
      setIsLoading(false);
    };

    if (issues.length === 0) {
      loadIssues();
    } else {
      setIsLoading(false);
    }
  }, [issues.length, setIssues]);

  const filteredIssues = getFilteredIssues();

  const statusCounts = {
    total: issues.length,
    open: issues.filter((i) => i.status === "Open").length,
    inProgress: issues.filter((i) => i.status === "In Progress").length,
    resolved: issues.filter((i) => i.status === "Resolved").length,
  };

  const cardStat = [
    {
      icon: <TrendingUp className="h-6 w-6 text-violet-500" />,
      label: "Total Issues",
      value: statusCounts.total,
      colorClass: "violet-500",
      bgClass: "bg-violet-500/20",
      hoverBorderClass: "hover:border-violet-500/30",
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-amber-500" />,
      label: "Open",
      value: statusCounts.open,
      colorClass: "amber-500",
      bgClass: "bg-amber-500/20",
      hoverBorderClass: "hover:border-amber-500/30",
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-lime-500" />,
      label: "Resolved",
      value: statusCounts.resolved,
      colorClass: "lime-500",
      bgClass: "bg-lime-500/20",
      hoverBorderClass: "hover:border-lime-500/30",
    },
    {
      icon: <Clock className="h-6 w-6 text-rose-500" />,
      label: "In Progress",
      value: statusCounts.inProgress,
      colorClass: "rose-500",
      bgClass: "bg-rose-500/20",
      hoverBorderClass: "hover:border-rose-500/30",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="bg-gradient-card border-border/50">
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-8 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-gradient-card border-border/50">
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-muted rounded mb-4"></div>
                    <div className="h-3 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded mb-4 w-3/4"></div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-muted rounded w-16"></div>
                      <div className="h-6 bg-muted rounded w-16"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8 h-80">
     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cardStat.map((item) => (
            <Card
              key={item.label}
              className={`bg-gradient-to-r from-gradientcard1 to-gradientcard2 border-border/50 ${item.hoverBorderClass} transition-all duration-300`}
            >
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className={`p-2 ${item.bgClass} rounded-lg`}>
                    {item.icon}
                  </div>
                  <div className="ml-4">
                    <p className="text-md font-semibold text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="text-2xl font-bold">{item.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Actions */}
        <Card className="mb-6 bg-gradient-to-r from-gradientcard1 to-gradientcard2  border-border/50">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl ">Issues</CardTitle>
                <CardDescription className="text-lg">
                  Manage and track all issues in your project
                </CardDescription>
              </div>
              <Button
                onClick={() => navigate("/issues/new")}
                className=" bg-gradient-to-r from-gradient1 to-gradient2 hover:opacity-90 transition-all duration-200 cursor-pointer p-5 text-lg font-semibold "
              >
                <Plus className="h-4 w-4 mr-2" />
                New Issue
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search issues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input/50 border-border/50 focus:border-primary/50"
                />
              </div>
              <Select
                value={statusFilter}
                onValueChange={(value: any) => setStatusFilter(value)}
              >
                <SelectTrigger className="w-full sm:w-[180px] bg-input/50 border-border/50">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={priorityFilter}
                onValueChange={(value: any) => setPriorityFilter(value)}
              >
                <SelectTrigger className="w-full sm:w-[180px] bg-input/50 border-border/50">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Priorities</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Issues Grid */}
            
        {filteredIssues.length === 0 ? (
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-12 text-center">
              <div className="flex flex-col items-center">
                <div className="p-4 bg-muted/20 rounded-full mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No issues found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ||
                  statusFilter !== "All" ||
                  priorityFilter !== "All"
                    ? "Try adjusting your filters to see more results."
                    : "Get started by creating your first issue."}
                </p>
                <Button
                  onClick={() => navigate("/issues/new")}
                  variant="outline"
                  className="bg-card/50 border-border/50 hover:bg-accent/50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Issue
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
