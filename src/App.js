import React from 'react';
import './App.scss';
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline, createMuiTheme } from "@material-ui/core";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Registration from './app/scenes/Registration/Registration';
import Login from './app/scenes/Login/Login';
import Dashboard from './app/scenes/Dashboard/Dashboard';
import PrivateRoute from './app/core/components/PrivateRoute/PrivateRoute';

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <Route exact path="/" component={Login}></Route>
        
        
            <Route exact path="/register" component={Registration}></Route>
            {/* <Route exact path="/dashboard" component={Dashboard}></Route> */}
            <PrivateRoute path="/dashboard" component={Dashboard} />
            {/* <Route path="*" component={Login} /> */}



      </Router>
    </ThemeProvider>
  );
}

export default App;
