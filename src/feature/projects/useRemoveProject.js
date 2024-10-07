import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeProjectAPI } from "../../services/projectService";
import toast from "react-hot-toast";

export default function useRemoveProject() {
  const queryClient = useQueryClient();

  const { mutate: removeProject, isPending: isDeleting } = useMutation({
    mutationFn: removeProjectAPI,
    onSuccess: (data) => {
      toast.success("پروژه با موفقیت حذف شد.");
      queryClient.invalidateQueries({
        queryKey: ["owner-projects"],
      });
    },
    onError: (err) => {
      toast.error(err?.Response?.data?.message);
    },
  });
  return { removeProject, isDeleting };
}
