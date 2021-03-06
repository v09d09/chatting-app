import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";
function Login() {
  return (
    <div className="bg-customBlue flex h-screen w-screen flex-col items-center">
      <Navbar />
      <div className=" flex h-full w-screen items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
