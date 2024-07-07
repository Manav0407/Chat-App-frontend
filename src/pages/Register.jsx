import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { signup } from "../Redux/Action/auth";
import { RegisterSchema } from "../authSchema";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  IconButton,
  Stack,
  ThemeProvider,
  createTheme,
  styled,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { BsFillCameraFill } from "react-icons/bs";
import { useFileHandler } from "6pp";

const initialValues = {
  username: "",
  email: "",
  password: "",
};

const VisuallyHiddenInput = styled("input")({
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

const Register = () => {
  const loginwithgoogle = () => {
    window.open("http://localhost:4000/auth/google/callback");

    // dispatch(googleLogin());
  };

  const defaultTheme = createTheme();

  const dispatch = useDispatch();

  const avatar = useFileHandler("single");

  

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: RegisterSchema,

      onSubmit: async (values) => {
        // console.log(values);

        const { username, email, password } = values;
        const formData = new FormData();

        formData.append("avatar", avatar.file);
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password",password);


        // for (const [key, value] of formData.entries()) {
        //   console.log(`${key}: ${value}`);
        // }

        await dispatch(signup(formData));

      },
    });

  const { loading, error, message } = useSelector((state) => {
    return state.auth;
  });

  React.useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
  }, [message, error, dispatch]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url('../../bg.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            component="form"
            noValidate
            onSubmit={handleSubmit}
          >
            <Stack
              height={"7rem"}
              width={"100%"}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Avatar
                sx={{
                  m: 1,
                  width: "5rem",
                  height: "5rem",
                  objectFit: "contain",
                }}
                src={avatar.preview}
              ></Avatar>
              {avatar.error && !avatar.preview ? (
                <Typography variant="body2" color="error">
                  {avatar.error}
                </Typography>
              ) : (
                (avatar.error = "")
              )}
              <IconButton
                sx={{right:"30px" ,top:"20px",color:"black"}}
                component="label"
                color="black"
              
              >
                <BsFillCameraFill size={"20px"}/>
                <VisuallyHiddenInput
                  type="file"
                  onChange={avatar.changeHandler}
                />
              </IconButton>
            </Stack>
            <Typography component="h1" variant="h5"position={"relative"} right={"15px"}>
              Sign Up
            </Typography>
            {/* <Form onSubmit={handleSubmit}> */}
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />

              <LoadingButton
                sx={{ mt: 3, mb: 2 }}
                type="submit"
                fullWidth
                variant="contained"
                loading={loading}
              >
                <span>Sign Up</span>
              </LoadingButton>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                onClick={loginwithgoogle}
                startIcon={<FcGoogle />}
              >
                Google
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link to={"/signin"} className="text-blue-500">
                    {"Already have an account? Sign in"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Toaster position="bottom-center"/>
    </ThemeProvider>
  );
};

export default Register;
