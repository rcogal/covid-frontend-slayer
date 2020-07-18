import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './MenuAppBar.scss';
import {logout} from '../../api/authenticate';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const MenuAppBar = () => {
  const classes = useStyles();
  
  const history = useHistory();

  const signout = (event) => {
    logout().then( () => {
      history.push("/");
    });
  };

  return (
    <div className={`${classes.root} MenuAppBar`} >
      <AppBar position="static">
        <Toolbar>
            <img alt="logo" src={require('../../../../assets/logo/covid-logo.png')} width="30" />
          <Typography variant="h6" className={classes.title}>
            <span className="title">Covid Game Slayer</span>
          </Typography>
          {(
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={signout}
              >
                <ExitToAppIcon />
              </IconButton>
              {/* Logout */}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MenuAppBar;
