import { useEffect, useRef, useState } from "react";
import { AnimatedHeader } from "../../components/ui/AnimatedHeader.jsx";
import { LoginForm } from "./login-form.jsx";
import { LoginFooter } from "../../components/ui/LoginFooter.jsx";

export default function LoginPage() {
  const [showForm, setShowForm] = useState(false);
  const formWrapperRef = useRef(null);
  const loginButtonRef = useRef(null);

  // move focus into the form the moment it's revealed (a11y: disclosure pattern)
  useEffect(() => {
    if (showForm) {
      formWrapperRef.current?.querySelector("input")?.focus();
    }
  }, [showForm]);

  const openForm = () => setShowForm(true);

  const closeForm = () => {
    setShowForm(false);
    // return focus to the trigger, since its content is about to become inert
    loginButtonRef.current?.focus();
  };

  return (
    <div className="w-full min-h-screen bg-[#2f2f2f] flex flex-col px-4 sm:px-6 xl:px-8">
      <main className="flex-1 flex flex-col items-center justify-center gap-6 py-6">
        <AnimatedHeader />

        <div className="grid place-items-center">
          {/* Intro + CTA */}
          <div
            inert={showForm}
            className={`col-start-1 row-start-1 flex flex-col items-center gap-6 transition duration-300 ${
              showForm ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-[#f9fafbcc] max-w-2xl text-center">
              We design and build communities where life truly flourishes—blending
              thoughtful design, premium quality, and lasting value into places
              people are proud to call home.
            </p>

            <button
              ref={loginButtonRef}
              onClick={openForm}
              aria-expanded={showForm}
              className="flex flex-row gap-3 px-6 py-2 rounded-lg bg-[#4f6f4f] hover:bg-[#5c805c]
                text-white font-medium items-center transition-colors
                focus:outline-none focus:ring-2 focus:ring-[#4f6f4f]/50 focus:ring-offset-2 focus:ring-offset-[#2f2f2f]"
            >
              Login
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path d="M18 8L22 12L18 16"></path>
                <path d="M2 12H22"></path>
              </svg>
            </button>
          </div>

          {/* Login form */}
          <div
            ref={formWrapperRef}
            inert={!showForm}
            className={`col-start-1 row-start-1 w-full max-w-sm flex flex-col items-center gap-4 transition duration-300 ${
              showForm ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <LoginForm />

            <button type="button" onClick={closeForm}
              className="flex flex-row gap-3 items-center text-sm text-[#f9fafb99] hover:text-[#f9fafb] transition-colors
                focus:outline-none focus:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path d="M6 8L2 12L6 16"></path>
                <path d="M22 12H2"></path>
              </svg>
              Back
            </button>
          </div>
        </div>
      </main>

      <LoginFooter />
    </div>
  );
}
