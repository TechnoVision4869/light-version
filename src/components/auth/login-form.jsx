import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../components/hooks/use-auth";

export const LoginForm = (props) => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().max(255).email("Enter a valid email").required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await login(values);
        toast.success("Login successful");
      } catch (err) {
        toast.error(err.message || "Login failed");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div
      className="w-full max-w-[420px] rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
      {...props}
    >
      <form noValidate onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
        {/* Email */}
        <div>
          <label
            htmlFor="login-email"
            className="block text-sm text-[#f9fafbcc] mb-1.5"
          >
            Email
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            aria-invalid={Boolean(formik.touched.email && formik.errors.email)}
            aria-describedby={
              formik.touched.email && formik.errors.email
                ? "login-email-error"
                : undefined
            }
            className={`w-full rounded-xl bg-transparent px-3.5 py-3 text-[#f9fafb] outline-none transition-colors
              border ${
                formik.touched.email && formik.errors.email
                  ? "border-red-400/60 focus:border-red-400"
                  : "border-white/15 focus:border-[#4F6F4F]"
              } focus:ring-2 focus:ring-[#4F6F4F]/30`}
          />
          {formik.touched.email && formik.errors.email && (
            <div id="login-email-error" className="mt-1.5 text-xs text-red-400">
              {formik.errors.email}
            </div>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="login-password" className="block text-sm text-[#f9fafbcc]">
              Password
            </label>
          </div>
          <div className="relative">
            <input
              id="login-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              aria-invalid={Boolean(
                formik.touched.password && formik.errors.password
              )}
              aria-describedby={
                formik.touched.password && formik.errors.password
                  ? "login-password-error"
                  : undefined
              }
              className={`w-full rounded-xl bg-transparent pl-3.5 pr-11 py-3 text-[#f9fafb] outline-none transition-colors
                border ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-400/60 focus:border-red-400"
                    : "border-white/15 focus:border-[#4F6F4F]"
                } focus:ring-2 focus:ring-[#4F6F4F]/30`}
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((s) => !s)}
              onMouseDown={(e) => e.preventDefault()}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#f9fafb99] hover:text-[#f9fafb] transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <div id="login-password-error" className="mt-1.5 text-xs text-red-400">
              {formik.errors.password}
            </div>
          )}
        </div>

        {formik.errors.submit && (
          <div className="text-xs text-red-400">{formik.errors.submit}</div>
        )}

        <button
          type="submit"
          disabled={loading || formik.isSubmitting}
          className="mt-1 w-full rounded-xl bg-[#4F6F4F] hover:bg-[#5c805c] active:bg-[#455f45]
            disabled:cursor-not-allowed disabled:opacity-70
            text-[#f9fafb] text-base font-medium py-3 transition-colors
            flex items-center justify-center gap-2"
        >
          {loading && <Loader2 size={18} className="animate-spin" />}
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};
