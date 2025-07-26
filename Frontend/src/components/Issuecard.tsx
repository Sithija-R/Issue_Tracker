import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Eye, User } from "lucide-react";
import type { Issue } from "@/store/Issuestore";
import Createissue from "./Createissue";

type IssueCardProps = {
  issue: Issue;
};

export function IssueCard({ issue }: IssueCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown date";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="group bg-gradient-to-r from-gradientcard1 to-gradientcard2 border-border/50 hover:border-gradient1/60 transition-all duration-300 hover:shadow-glass hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-card-foreground truncate group-hover:text-primary transition-colors duration-200">
              {issue.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {issue.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <div
              className={`px-2 py-0.5 flex items-center justify-center rounded-xl text-xs whitespace-nowrap
          ${
            issue.status === "Open"
              ? "bg-amber-500/10 text-yellow-500 border border-yellow-500/50"
              : issue.status === "Resolved"
              ? "bg-green-500/10 text-green-500 border border-green-500/50"
              : "bg-rose-500/10 text-rose-500 border border-rose-500/50"
          }`}
            >
              {issue.status}
            </div>

            <div
              className={`px-2 py-0.5 flex items-center justify-center rounded-xl text-xs whitespace-nowrap
          ${
            issue.priority === "Low"
              ? "bg-green-500/10 text-green-500 border border-green-500/50"
              : issue.priority === "Medium"
              ? "bg-amber-500/10 text-yellow-500 border border-yellow-500/50"
              : "bg-rose-500/10 text-rose-500 border border-rose-500/50"
          }`}
            >
              {issue.priority}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>
                {issue.updatedAt && issue.createdAt
                  ? new Date(issue.updatedAt) > new Date(issue.createdAt)
                    ? `Updated ${formatDate(issue.updatedAt)}`
                    : `Created ${formatDate(issue.createdAt)}`
                  : "Date unavailable"}
              </span>
            </div>

            {issue.assignee && (
              <div className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>{issue.assignee}</span>
              </div>
            )}
          </div>

          <div className="flex space-x-1">
            {/* View Modal */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                >
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View issue</span>
                </Button>
              </DialogTrigger>

              <DialogContent className=" p-6 rounded-2xl shadow-md  border border-violet-500/60 shadow-violet-400/10   min-h-[30%] max-h-[90%] overflow-y-scroll">
                <div>
                  <h2 className="text-xl font-semibold mb-4">{issue.title}</h2>
                  <p className="text-md text-muted-foreground mb-4 ">
                    {issue.description}
                  </p>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    <div
                      className={`px-2 py-0.5 flex items-center justify-center rounded-xl text-sm whitespace-nowrap
                              ${
                                issue.status === "Open"
                                  ? "bg-amber-500/10 text-yellow-500 border border-yellow-500/50"
                                  : issue.status === "Resolved"
                                  ? "bg-green-500/10 text-green-500 border border-green-500/50"
                                  : "bg-rose-500/10 text-rose-500 border border-rose-500/50"
                              }`}
                    >
                      {issue.status}
                    </div>

                    <div
                      className={`px-2 py-0.5 flex items-center justify-center rounded-xl text-sm whitespace-nowrap
                              ${
                                issue.priority === "Low"
                                  ? "bg-green-500/10 text-green-500 border border-green-500/50"
                                  : issue.priority === "Medium"
                                  ? "bg-amber-500/10 text-yellow-500 border border-yellow-500/50"
                                  : "bg-rose-500/10 text-rose-500 border border-rose-500/50"
                              }`}
                    >
                      {issue.priority}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground w-[70%] mt-7">
                    <span>
                      {issue.updatedAt && issue.createdAt
                        ? new Date(issue.updatedAt) > new Date(issue.createdAt)
                          ? `Updated ${formatDate(issue.updatedAt)}`
                          : `Created ${formatDate(issue.createdAt)}`
                        : "Date unavailable"}
                    </span>

                    {issue.assignee && (
                      <span className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{issue.assignee}</span>
                      </span>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit issue</span>
                </Button>
              </DialogTrigger>

              <DialogContent className="min-w-[60%] p-6 rounded-2xl shadow-xl   border max-h-[90%] overflow-y-scroll">
                <Createissue mode="edit" initialData={issue} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
