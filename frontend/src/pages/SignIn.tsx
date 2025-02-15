import SignInForm from "@/components/Sign/SignInForm";

function SignIn() {
  return (
    <div>
      <SignInForm route="/api/token/" />
    </div>
  );
}

export default SignIn;
