import { create } from "zustand";

export type issuestatus = 'Resolved' | 'Closed' | 'Open' ;
export type issuepriority = 'Low' | 'Medium' | 'High' ;

export type Issue = {
  id?: string;
  title: string;
  description: string;
  priority?: string;
  status?: string;
  assignee?: string;
  createdAt?: string;
  updatedAt?: string;
}

type IssueStore ={
    issues: Issue[];
    selectedIssue: Issue | null;
    searchTerm: string;
    statusFilter: issuestatus | 'All';
    priorityFilter: issuepriority | 'All';
    setIssues: (issues: Issue[]) => void;
    addIssue: (issue: Issue) => void;
    updateIssue: (id: string, updates: Partial<Issue>) => void;
    deleteIssue: (id: string) => void;
    setSelectedIssue: (issue: Issue | null) => void;
    setSearchTerm: (term: string) => void;
    setStatusFilter: (status: issuestatus | 'All') => void;
    setPriorityFilter: (priority: issuepriority | 'All') => void;
    getFilteredIssues: () => Issue[];
}

export const useIssueStore = create<IssueStore>((set, get) => ({
    issues: [],
    selectedIssue: null,
    searchTerm: '',
    statusFilter: 'All',
    priorityFilter: 'All',
    setIssues: (issues) => set({ issues }),
    addIssue: (issue) => set((state) => ({ issues: [issue, ...state.issues] })),
    updateIssue: (id, updates) =>
      set((state) => ({
        issues: state.issues.map((issue) =>
          issue.id === id ? { ...issue, ...updates } : issue
        ),
      })),
    deleteIssue: (id) =>
      set((state) => ({
        issues: state.issues.filter((issue) => issue.id !== id),
      })),
    setSelectedIssue: (issue) => set({ selectedIssue: issue }),
    setSearchTerm: (term) => set({ searchTerm: term }),
    setStatusFilter: (status) => set({ statusFilter: status }),
    setPriorityFilter: (priority) => set({ priorityFilter: priority }),
    getFilteredIssues: () => {
      const { issues, searchTerm, statusFilter, priorityFilter } = get();
      return issues.filter((issue) => {
        const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             issue.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || issue.status === statusFilter;
        const matchesPriority = priorityFilter === 'All' || issue.priority === priorityFilter;
        return matchesSearch && matchesStatus && matchesPriority;
      });
    },
  }));