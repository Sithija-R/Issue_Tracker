import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Calendar, Edit, Eye, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Issue } from "@/store/Issuestore";

type IssueCardProps = {
  issue: Issue;
};

export function IssueCard({ issue }: IssueCardProps) {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="group bg-gradient-to-r from-gradientcard1 to-gradientcard2 border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-glass hover:scale-[1.02]">
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
    
    {/* Badges Container */}
    <div className="flex flex-wrap gap-2 shrink-0">
      <div
        className={`px-2 py-0.5 flex items-center justify-center rounded-xl text-xs whitespace-nowrap
          ${issue.status === "Open" ? "bg-amber-500/10 text-amber-500 border border-amber-500/50" : ""}
          ${issue.status === "Resolved" ? "bg-green-500/10 text-green-500 border border-green-500/50" : ""}
          ${issue.status === "Closed" ? "bg-rose-500/10 text-rose-500 border border-rose-500/50" : ""}
        `}
      >
        {issue.status}
      </div>

      <div
        className={`px-2 py-0.5 flex items-center justify-center rounded-xl text-xs whitespace-nowrap
          ${issue.priority === "Medium" ? "bg-amber-500/10 text-amber-500 border border-amber-500/50" : ""}
          ${issue.priority === "Low" ? "bg-green-500/10 text-green-500 border border-green-500/50" : ""}
          ${issue.priority === "High" ? "bg-rose-500/10 text-rose-500 border border-rose-500/50" : ""}
        `}
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
              <span>Updated {formatDate(issue.updatedAt)}</span>
            </div>
            {issue.assignee && (
              <div className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>{issue.assignee}</span>
              </div>
            )}
          </div>

          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              onClick={() => navigate(`/issues/${issue.id}`)}
            >
              <Eye className="h-4 w-4" />
              <span className="sr-only">View issue</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              onClick={() => navigate(`/issues/${issue.id}/edit`)}
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit issue</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
