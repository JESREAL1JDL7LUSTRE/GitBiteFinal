import SignInForm from "@/components/User/SignInForm";

function SignIn() {
  return (
    <div>
      <SignInForm route="/api/token/" />
    </div>
  );
}

export default SignIn;
