import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import { useIssueStore, type Issue } from "@/store/Issuestore";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type IssueFormProps = {
  mode: "create" | "edit";
  initialData?: Issue;
  onSubmit?: (data: Issue) => void;
};

const Createissue = ({ mode, initialData, onSubmit }: IssueFormProps) => {
  const addIssue = useIssueStore((state) => state.addIssue);
  const updateIssue = useIssueStore((state) => state.updateIssue);
  const deleteIssue = useIssueStore((state) => state.deleteIssue);

  const [formData, setFormData] = useState<Issue>({
    title: "",
    description: "",
    priority: "Low",
    status: "Open",
    assignee: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...initialData,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleInputChange = (field: keyof Issue, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const now = new Date().toISOString();

      if (mode === "create") {
        const newIssue: Issue = {
          ...formData,
          id: Date.now().toString(),
          createdAt: now,
          updatedAt: now,
        };
        addIssue(newIssue);
      } else {
        if (!formData.id) throw new Error("ID is missing");
        const updates: Partial<Issue> = {
          ...formData,
          updatedAt: now,
        };
        updateIssue(formData.id, updates);
      }

      toast.success(mode === "create" ? "Issue created!" : "Issue updated!", {
        description:
          mode === "create"
            ? "Your issue was successfully created."
            : "Your changes were saved.",
      });
    } catch (err) {
      toast.error("Error", {
        description: "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    setIsDeleteLoading(true);
    try {
      if (!formData.id) throw new Error("ID is missing");
      deleteIssue(formData.id);
      toast.success("Issue deleted successfully!");
    } catch (err) {
      toast.error("Error", {
        description: "Something went wrong.",
      });
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <div className="min-w-[50%] px-4 py-8">
      <Card className="bg-gradient-card border-border/50 shadow-glass">
        <CardHeader>
          <CardTitle>
            {mode === "create" ? "Create Issue" : "Update Issue"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between gap-2">
              <div className="space-y-2 w-[80%]">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter a clear, concise title"
                  className="!bg-input/80 border-border/50"
                  disabled={isLoading}
                />
                {errors.title && (
                  <p className="text-xs text-destructive">{errors.title}</p>
                )}
              </div>

              <div className="flex gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(val) => handleInputChange("priority", val)}
                  >
                    <SelectTrigger className="!bg-input/80 border-border/50">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(val) => handleInputChange("status", val)}
                  >
                    <SelectTrigger className="!bg-input/80 border-border/50">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Describe the issue in detail"
                className="!bg-input/80 min-h-[120px] border-border/50 resize-none"
                disabled={isLoading}
              />
              {errors.description && (
                <p className="text-xs text-destructive">{errors.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignee">Assignee</Label>
              <Input
                id="assignee"
                value={formData.assignee}
                onChange={(e) => handleInputChange("assignee", e.target.value)}
                placeholder="Enter assignee name"
                className="!bg-input/80 border-border/50"
                disabled={isLoading}
              />
            </div>

            <div className="flex gap-3 pt-4">
              {mode === "edit" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      variant="destructive"
                      className="flex-1"
                      disabled={isDeleteLoading}
                    >
                      {isDeleteLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin h-4 w-4 border-b-2 border-white rounded-full" />
                          <span>Deleting...</span>
                        </div>
                      ) : (
                        <>
                          <Trash className="h-4 w-4 mr-2" />
                          Delete Issue
                        </>
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                      <DialogTitle>Confirm Delete</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="ghost">Cancel</Button>
                      </DialogClose>

                      <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleteLoading}
                      >
                        {isDeleteLoading ? "Deleting..." : "Confirm Delete"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}

              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-gradient1 to-gradient2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin h-4 w-4 border-b-2 border-white rounded-full" />
                    <span>
                      {mode === "create" ? "Creating..." : "Updating..."}
                    </span>
                  </div>
                ) : (
                  <>
                    {mode === "create" ? (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Create Issue
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-2" />
                        Update Issue
                      </>
                    )}
                  </>
                )}
              </Button>
              <DialogClose>
                <Button
                  type="button"
                  variant="outline"
                  className="bg-card/50 border-border/50 hover:bg-accent/50"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Createissue;
