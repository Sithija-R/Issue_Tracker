import { useIssueStore } from "@/store/Issuestore";
import axios from "axios";
import { API_BASE_URL } from "../api";
import { useAuthStore } from "@/store/Authstore";
import { toast } from "sonner";

export const useIssue = () => {
  const iss = useIssueStore();
  const { token } = useAuthStore();

  const createIssue = async (
    title: string,
    description: string,
    priority?: string,
    status?: string,
    assignee?: string
  ) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/issue/create`,
        {
          title,
          description,
          priority,
          status,
          assignee,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { issue } = res.data;
      iss.addIssue(issue);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Issue create failed";

      toast.error("Issue create failed", {
        description: errorMessage,
      });
      throw error.response?.data?.error || "Issue create failed";
    }
  };

  const updateIssue = async (
    id: string,
    title: string,
    description: string,
    priority?: string,
    status?: string,
    assignee?: string
  ) => {
   
    try {
      const res = await axios.put(
        `${API_BASE_URL}/issue/update`,
        { id, title, description, priority, status, assignee },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { issue } = res.data;
      const { _id, ...updates } = issue;
      iss.updateIssue(_id, updates);

    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Issue update failed";

      toast.error("Issue update failed", {
        description: errorMessage,
      });
      throw error.response?.data?.error || "Issue update failed";
    }
  };

  const getIssues = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/issue/all`);
        const { issue } = res.data;
        iss.setIssues(issue);
    } catch (error: any) {
        const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Issue fetch failed";

      toast.error("Issue fetch failed", {
        description: errorMessage,
      });
      throw error.response?.data?.error || "Issue fetch failed";
    }
  };

  const deleteIssue = async (id: string) => {
    try {
         await axios.delete(`${API_BASE_URL}/issue/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
        iss.deleteIssue(id);
    } catch (error: any) {
        const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Issue delete failed";

      toast.error("Issue delete failed", {
        description: errorMessage,
      });
      throw error.response?.data?.error || "Issue delete failed";
    }
  };

  return {
    createIssue,
    updateIssue,
    deleteIssue,
    getIssues,

  }
};
