import { useQuery } from "@tanstack/react-query";
import { getOwnerProjectsAPI } from "../../services/projectService";

export default function useOwnerProjects() {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getOwnerProjectsAPI,
    retry: false,
  });
  const { projects } = data || {};
  return { projects, isLoading };
}
