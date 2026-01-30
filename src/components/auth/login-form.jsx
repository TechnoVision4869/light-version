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
  const { login, user } = useAuth();
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
        console.log(user);
        
        // fetch("https://b3f5daa40892.ngrok-free.app/auth/login", {
        //   method: "POST",
        //   headers: {
        //     "accept": "*/*",
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(values),
        // }).then((response) => {
        //   if (response.ok) {
        //     toast.success("Login successful");
        //     window.location.href = "/home";
        //   } else {
        //     toast.error("Login failed");
        //   }
        // });
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
        InputProps={{
          style: {
            fontFamily: "sans-serif",
          },
        }}
      />

      <FormControl sx={{ width: "100%", marginTop: "10px" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
            fontFamily: "sans-serif",
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
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
          color="primary"
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
  );
};
