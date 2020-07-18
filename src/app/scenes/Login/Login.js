import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from '../../../assets/logo/covid-logo.png'
import { authenticate } from '../../core/api/authenticate';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();

  const history = useHistory();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const onChangeInputValue = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  };

  const onLogin = (event) => {
    event.preventDefault();

    const {email, password} = formData;

    authenticate(email, password)
      .then( res => {
        history.push("/dashboard");
      })
      .catch( () => {
        window.alert('Invalid Credentials');
      });
  }


  const { email, password } = formData;

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <img alt="logo" src={logo} width="150" />
        <Typography component="h1" variant="h5">
          {/* Covid Slayer */}
        </Typography>
        <form className={classes.form} noValidate onSubmit={e => onLogin(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={onChangeInputValue}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={onChangeInputValue}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            size="large"
          >
            Sign In
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="#/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;
