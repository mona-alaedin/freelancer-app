import { useState } from "react";
import TextField from "../../UI/TextField";

function SendOTPForm() {
  const [phonenumber, setPhonenumber] = useState("");
  return (
    <div>
      <form className="space-y-8">
        <TextField
          label="شماره موبایل"
          name="phonenumber"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
          autoComplete="off"
        />
        <button className="btn btn--primary w-full">ارسال کد تایید</button>
      </form>
    </div>
  );
}

export default SendOTPForm;
