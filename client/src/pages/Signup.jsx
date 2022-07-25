import Navbar from "../components/Navbar";
import SignupForm from "../components/SignupForm";
function Signup() {
  return (
    <div className="bg-customBlue flex h-screen w-screen flex-col items-center">
      <Navbar />
      <div className=" flex h-full w-screen items-center justify-center">
        <SignupForm />
      </div>
    </div>
  );
}

export default Signup;
