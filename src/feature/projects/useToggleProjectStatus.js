import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleProjectStatusAPI } from "../../services/projectService";
import toast from "react-hot-toast";

export default function useToggleProjectStatus() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: toggleProjectStatus } = useMutation({
    mutationFn: toggleProjectStatusAPI,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["owner-projects"],
      });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
  return { isUpdating, toggleProjectStatus };
}
