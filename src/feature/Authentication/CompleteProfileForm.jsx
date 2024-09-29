import { useState } from "react";
import TextField from "../../UI/TextField";
import RadioInput from "../../UI/RadioInput";
import { completeProfile } from "../../services/authService";
import { useMutation } from "@tanstack/react-query";
import Loading from "../../UI/Loading";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CompleteProfileForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const { isPending, mutateAsync, data } = useMutation({
    mutationFn: completeProfile,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, message } = await mutateAsync({ name, email, role });

      toast.success(message);
      console.log(user);
      if (user.status !== 2) {
        navigate("/");
        toast("پروفایل شما در انتظار تایید می باشد.", { icon: "⏳" });
        return;
      }

      if (user.role === "OWNER") return navigate("/owner");
      if (user.role === "FREELANCER") return navigate("/freelancer");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center pt-10">
      <div className="w-full sm:max-w-sm">
        <form className="space-y-8" onSubmit={handleSubmit}>
          <TextField
            label="نام و نام خانوادگی"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <TextField
            label="ایمیل"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <div className="flex items-center justify-center gap-x-8">
            <RadioInput
              lable="کارفرما"
              value="OWNER"
              id="OWNER"
              name="role"
              checked={role === "OWNER"}
              onChange={(e) => setRole(e.target.value)}
            />
            <RadioInput
              lable="فریلنسر"
              value="FREELANCER"
              id="FREELANCER"
              name="role"
              checked={role === "FREELANCER"}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          {isPending ? (
            <Loading />
          ) : (
            <button type="submit" className="btn btn--primary w-full">
              تایید
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default CompleteProfileForm;
