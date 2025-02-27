import SignUpForm from "@/components/User/SignUpForm";
import logo from "../assets/logo.png";


function SignUp() {
  return (
    <div className="grid h-screen lg:grid-cols-2 ">
    <div className="flex flex-col gap-4 p-6 md:p-10 bg-[#a0c878]">
      <div className="flex justify-center gap-2 md:justify-start">
        <a href="#" className="flex items-center gap-2 font-medium">
        </a>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md ">
          <SignUpForm route="/api/register/"/>
        </div>
      </div>
    </div>
    <div className="relative hidden bg-muted lg:block overflow-hidden ">
      <img
        src={logo}
        alt="Image"
        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale bg-black "
      />
    </div>
  </div>
)
}

export default SignUp