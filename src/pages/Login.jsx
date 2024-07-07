import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { useFormik } from 'formik';
import { LoginSchema } from '../authSchema';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../Redux/Action/auth';
import toast, { Toaster } from "react-hot-toast";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {

  const dispatch = useDispatch();
  

const defaultTheme = createTheme();

const loginwithgoogle = ()=>{
  window.open("http://localhost:4000/auth/google/callback");
}


const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
  initialValues,
  validationSchema:LoginSchema,
  onSubmit: async(values) => {
    const {email, password} = values;
    dispatch(signin(email, password));
  },
})

const {error,message,isAuthenticated,user} = useSelector((state)=>{
  return state.auth;
})

const navigate = useNavigate();



React.useEffect(()=>{
  if(error){
    toast.error(error);
  }
  if(message){
    toast.success(message);
  }
  if(isAuthenticated) {
    navigate("/");
  }
},[error,message,isAuthenticated,dispatch])

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url('../../bg2.jpg')",
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <LoadingButton
                sx={{ mt: 3, mb: 2 }}
                type="submit"
                fullWidth
                variant="contained"
                // loading={loading}
              >
                <span>Sign In</span>
              </LoadingButton>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2}}
                onClick={loginwithgoogle}
                startIcon={<FcGoogle/>}
              >
                 Google
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to={"/#"} className='text-blue-500'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to={"/signup"} className='text-blue-500'>Don't have an account? Sign Up</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Toaster/>
    </ThemeProvider>
  )
}

export default Login