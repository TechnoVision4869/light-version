import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  FormHelperText,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
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
        console.log(values);

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
    <Box
      sx={{
        width: "100%",
        maxWidth: 480,
        bgcolor: "rgba(255,255,255,0.03)",
        p: 4,
        borderRadius: 3,
      }}
    >
      <form noValidate onSubmit={formik.handleSubmit} {...props}>
        <TextField
          error={Boolean(formik.touched.email && formik.errors.email)}
          fullWidth
          label="Email"
          margin="normal"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="email"
          value={formik.values.email}
          helperText={formik.touched.email && formik.errors.email}
          sx={{
            input: { color: "#f9fafb", fontFamily: "sans-serif" },
            "& .MuiInputLabel-root": { color: "rgba(249,250,251,0.8)" },
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              "& fieldset": { borderColor: "rgba(249,250,251,0.12)" },
              "&:hover fieldset": { borderColor: "rgba(249,250,251,0.24)" },
            },
            mt: 1,
          }}
        />

        <FormControl
          sx={{ width: "100%", marginTop: "10px" }}
          variant="outlined"
        >
          <InputLabel
            htmlFor="outlined-adornment-password"
            sx={{ color: "rgba(249,250,251,0.8)" }}
          >
            Password
          </InputLabel>
          <OutlinedInput
            error={Boolean(formik.touched.password && formik.errors.password)}
            fullWidth
            label="Password"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            type={showPassword ? "text" : "password"}
            sx={{
              borderRadius: 3,
              fontFamily: "sans-serif",
              color: "#f9fafb",
              "& input": { color: "#f9fafb" },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(249,250,251,0.12)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(249,250,251,0.24)",
              },
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  sx={{ color: "#eff0f1" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {formik.touched.password && formik.errors.password && (
            <FormHelperText error>{formik.errors.password}</FormHelperText>
          )}
        </FormControl>

        {formik.errors.submit && (
          <Box sx={{ mt: 3 }}>
            <FormHelperText error>{formik.errors.submit}</FormHelperText>
          </Box>
        )}

        <Box sx={{ mt: 2 }}>
          <LoadingButton
            sx={{
              borderRadius: 3,
              backgroundColor: "#5E6D59",
              color: "#f9fafb",
              "&:hover": { backgroundColor: "#465345" },
            }}
            disabled={formik.isSubmitting}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={loading}
          >
            Login
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
};
