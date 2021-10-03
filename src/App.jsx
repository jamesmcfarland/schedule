import logo from "./logo.svg";
import "./App.css";
import {
  createTheme,
  Typography,
  ThemeProvider,
  CssBaseline,
} from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SplashScreen from "./pages/splash";
import Login from "./pages/login";

const theme = createTheme({
  //TODO: Implement full theme and colour pallette
  typography: {
    fontFamily: "Poppins",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
  palette: {
    background: {
      default: "#3a3a3a",
    },
  },
});

function App() {
  return (
    //TODO: Get firebase setup & connected.

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <SplashScreen />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
