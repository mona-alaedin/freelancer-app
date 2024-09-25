import CheckOTPForm from "../feature/Authentication/CheckOTPForm";
// import SendOTPForm from "../feature/Authentication/SendOTPForm";
import SendOTPForm from "./../feature/Authentication/SendOTPForm";

function Auth() {
  return (
    <div className="flex justify-center pt-10">
      <div className="w-full sm:max-w-sm">
        <SendOTPForm />
        {/* <CheckOTPForm /> */}
      </div>
    </div>
  );
}

export default Auth;
