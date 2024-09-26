import TextField from "../../UI/TextField";
import { useMutation } from "@tanstack/react-query";
import { getOtp } from "./../../services/authService";
import toast from "react-hot-toast";
import Loading from "../../UI/Loading";

function SendOTPForm({ phoneNumber, onChange, onSubmit, isSendingOtp }) {
  return (
    <div>
      <form className="space-y-8" onSubmit={onSubmit}>
        <TextField
          label="شماره موبایل"
          name="phoneNumber"
          value={phoneNumber}
          onChange={onChange}
          autoComplete="off"
        />
        {isSendingOtp ? (
          <Loading />
        ) : (
          <button type="submit" className="btn btn--primary w-full">
            ارسال کد تایید
          </button>
        )}
      </form>
    </div>
  );
}

export default SendOTPForm;
