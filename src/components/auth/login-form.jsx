import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Eye, EyeOff } from "lucide-react";
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
      email: Yup.string().max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await login(values);
        toast.success("Login successful");
      } catch (err) {
        toast.error(err.message || "Login failed");
        setLoading(false);
      }
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 480,
        backgroundColor: "rgba(255,255,255,0.03)",
        padding: 32,
        borderRadius: 12,
      }}
    >
      <form noValidate onSubmit={formik.handleSubmit} {...props}>
        <div style={{ marginTop: 8 }}>
          <label
            htmlFor="login-email"
            style={{
              display: "block",
              color: "rgba(249,250,251,0.8)",
              marginBottom: 6,
              fontFamily: "sans-serif",
            }}
          >
            Email
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            aria-invalid={Boolean(formik.touched.email && formik.errors.email)}
            aria-describedby={
              formik.touched.email && formik.errors.email
                ? "login-email-error"
                : undefined
            }
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 12,
              border: "1px solid rgba(249,250,251,0.12)",
              backgroundColor: "transparent",
              color: "#f9fafb",
              fontFamily: "sans-serif",
              outline: "none",
            }}
          />
          {formik.touched.email && formik.errors.email && (
            <div
              id="login-email-error"
              style={{ color: "#f87171", marginTop: 6, fontSize: 12 }}
            >
              {formik.errors.email}
            </div>
          )}
        </div>

        <div style={{ marginTop: 12 }}>
          <label
            htmlFor="login-password"
            style={{
              display: "block",
              color: "rgba(249,250,251,0.8)",
              marginBottom: 6,
              fontFamily: "sans-serif",
            }}
          >
            Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              id="login-password"
              name="password"
              type={showPassword ? "text" : "password"}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              aria-invalid={Boolean(
                formik.touched.password && formik.errors.password,
              )}
              aria-describedby={
                formik.touched.password && formik.errors.password
                  ? "login-password-error"
                  : undefined
              }
              style={{
                width: "100%",
                padding: "12px 44px 12px 14px",
                borderRadius: 12,
                border: "1px solid rgba(249,250,251,0.12)",
                backgroundColor: "transparent",
                color: "#f9fafb",
                fontFamily: "sans-serif",
                outline: "none",
              }}
            />
            <button
              type="button"
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "transparent",
                color: "#eff0f1",
                padding: 4,
                cursor: "pointer",
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <div
              id="login-password-error"
              style={{ color: "#f87171", marginTop: 6, fontSize: 12 }}
            >
              {formik.errors.password}
            </div>
          )}
        </div>

        {formik.errors.submit && (
          <div style={{ marginTop: 12, color: "#f87171", fontSize: 12 }}>
            {formik.errors.submit}
          </div>
        )}

        <div style={{ marginTop: 16 }}>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            style={{
              width: "100%",
              borderRadius: 12,
              backgroundColor: loading ? "#465345" : "#4F6F4F",
              color: "#f9fafb",
              border: "none",
              padding: "12px 16px",
              fontSize: 16,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};
