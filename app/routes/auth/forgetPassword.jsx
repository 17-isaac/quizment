import { Form, Link as Linker, redirect } from 'remix';
import { auth } from '~/utils/firebase';
import { sendPasswordResetEmail } from "firebase/auth";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://quizment.herokuapp.com">
                quizment
          </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export function meta() {
    return { title: "Forget Password" };
}

export let action = async ({ request }) => {
    let formData = await request.formData();
    let email = formData.get("email");
    const { error } = await sendPasswordResetEmail(auth, email);
    if (!error) {
        return redirect('/auth');
    } else {
        return null;
    }
}

export default function ForgetPassword() {
    const theme = createTheme();
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
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
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Reset Your Password
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                            <Form method="post">
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', mt: 3, mb: 2 }}
                                >
                                    Reset Password via Email.
              </Button>
                            </Form>
                            <Grid container>
                                <Grid item xs>
                                    <Linker to="/auth" variant="body2">
                                        Sign In
                  </Linker>
                                </Grid>
                                <Grid item>
                                    <Linker to="../signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Linker>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}