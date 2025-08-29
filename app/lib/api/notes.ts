import api from "@/app/lib/axios";
import qs from "qs";

export const fetchNotes = async ({
  search,
  sortBy,
  filters,
  page,
  pageSize,
  currentTab,
}: {
  search: string;
  sortBy: string;
  filters: Record<string, any>;
  page: number;
  pageSize: number;
  currentTab: string;
}) => {
  const getOrderingParam = (order: string) => {
    switch (order) {
      case "latest": return "-created_at";
      case "oldest": return "created_at";
      case "az": return "title";
      case "za": return "-title";
      default: return "-created_at";
    }
  };

  const response = await api.get("/notes", {
    params: {
      search: search || undefined,
      ordering: getOrderingParam(sortBy),
      limit: pageSize,
      offset: (page - 1) * pageSize,
      is_favorite: currentTab === "favorite",
      is_pinned: currentTab === "pinned",
      tags: filters.tags,
    },
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
  });

  return {
    notes: response.data.results || response.data,
    totalCount: response.data.count || response.data.length || 0,
  };
};
