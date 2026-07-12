import { useState } from "react";
import { AnimatedHeader } from "../../components/ui/AnimatedHeader.jsx";
import { LoginForm } from "./login-form.jsx";
import TECHNO_LOGO from "../../assets/techno.png";

import LMD_LOGO from "../../assets/logos/lmd.jpg";
import TBK_LOGO from "../../assets/logos/tbk.png";
import SOMABAY_LOGO from "../../assets/logos/somabay.png";

const logos = [
  { src: LMD_LOGO, scale: "scale-100" },
  { src: TBK_LOGO, scale: "scale-100" },
  { src: SOMABAY_LOGO, scale: "scale-100" }, // bump up the small one
];

export default function LoginPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="w-full min-h-screen bg-[#2f2f2f] py-6 px-3 xl:p-4 pb-20 overflow-y-auto flex flex-col items-center justify-center gap-4">
      <AnimatedHeader />

      <div className="grid place-items-center">
<div className={`col-start-1 row-start-1 flex flex-col items-center gap-6 transition-all duration-300 ${showForm ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"}`}>
          {/* introduction  paragraph */}
          <p className={`text-lg md:text-xl leading-relaxed tracking-tight text-[#f9fafbcc] max-w-2xl text-center
            ${!showForm ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none absolute"}`}>
            We design and build communities where life truly flourishes—blending thoughtful design, 
            premium quality, and lasting value into places people are proud to call home.
          </p>
          {/* Separate login button */}
          <button
                onClick={() => setShowForm(true)}
                className="flex flex-row gap-6 px-6 py-2 rounded-lg bg-[#4f6f4f] text-white font-medium items-center"
              >
                Login
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                    strokeLinejoin="round" class="lucide lucide-move-right w-4 h-4" aria-hidden="true">
                <path d="M18 8L22 12L18 16"></path>
                <path d="M2 12H22"></path>
                </svg>
              </button>
        </div>
        {/* Login form */}
        <div className={`col-start-1 row-start-1 w-full max-w-sm transition-all duration-300 ${showForm ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
          <LoginForm />
        </div>
      </div>

      {/* Logo - stays in its original spot */}
      <footer className="absolute right-6 bottom-4 w-22 h-auto">
        <img src={TECHNO_LOGO} className="w-full h-auto" />
      </footer>

      {/* Join developers - centered */}
      <div className="absolute bottom-4 left-6 flex items-center gap-3">
        <p className="text-gray-400">
          Join <span className="font-semibold text-white">top</span> developers
        </p>
        <div className="flex items-center gap-4">
          {logos.map(({ src, scale }, i) => (
            <div key={i} className="w-auto h-6 flex items-center justify-center overflow-visible">
              <img src={src} className={`max-w-full max-h-full object-contain ${scale}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}