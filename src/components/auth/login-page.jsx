import { LoginForm } from "./login-form.jsx";
import TECHNO_LOGO from "../../assets/techno.png";

export default function LoginPage() {
  return (
    <div className="w-full h-screen bg-[#2f2f2f] py-2 px-3 xl:p-4 overflow-hidden flex flex-col items-center justify-center">
      <LoginForm />
      <footer className="absolute right-6 bottom-4 w-22 h-auto">
        <img src={TECHNO_LOGO} alt="Techno Vision Logo" />
      </footer>
    </div>
  );
}
