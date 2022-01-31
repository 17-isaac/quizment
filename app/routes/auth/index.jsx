import { useActionData, redirect, Form, Link as Linker } from "remix";
import { getSession, commitSession } from "~/sessions.server";
import { db } from "~/utils/db.server";
import { auth } from '~/utils/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
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
  return { title: "Sign In" };
}

// our action function will be launched when the submit button is clicked
// this will sign in our firebase user and create our session and cookie using user.getIDToken()
export let action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password")
  const { user, error } = await signInWithEmailAndPassword(auth, email, password)
  // if signin was successful then we have a user
  if (user) {
    // let's setup the session and cookie wth users idToken
    let session = await getSession(request.headers.get("Cookie"))
    session.set("access_token", await user.getIdToken())
    // check user type
    const data = {
      userType: await db.user.findUnique({
        where: {
          uid: user.uid,
        },
        select: {
          type: true
        }
      })
    };
    // let's send the user to the main page after login based on user type
    if (data.userType.type === 1) {
      return redirect("/studentDashboard", {
        headers: {
          "Set-Cookie": await commitSession(session),
        }
      })
    } else if (data.userType.type === 2) {
      return redirect("/teacherDashboard", {
        headers: {
          "Set-Cookie": await commitSession(session),
        }
      })
    }
  } else {
    return error;
  }
}

export default function AuthContent() {
  const theme = createTheme();
  const actionData = useActionData();

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
              Sign in
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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', mt: 3, mb: 2 }}
                >
                  Sign In
              </Button>
              </Form>
              <Grid container>
                <Grid item xs>
                  <Linker to="forgetPassword" variant="body2">
                    Forgot password?
                  </Linker>
                </Grid>
                <Grid item>
                  <Linker to="signup" variant="body2">
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

export function ErrorBoundary({ error }) {
  return (
    <div>
      <p>Error</p>
      <p>{error.message}</p>
      <p>Reload to get out of error.</p>
    </div>
  )
}