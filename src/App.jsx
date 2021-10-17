import "./App.css";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
  CssBaseline,
} from "@mui/material";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SplashScreen from "./pages/splash";
import Login from "./pages/login";
import Register from "./pages/register";
import { UserProvider } from "./contexts/UserContext";
import Dashboard from "./pages/app/dashboard";
import PrivateRoute from "./components/privateRoute";
import AuthenticationRoute from "./components/authenticationRoute";
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
    mode: "dark",
    // background: {
    //   default: "#3a3a3a",
    // },
  },
});

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <div className="App">
              <Switch>
                <Route exact path="/" component={SplashScreen} />
                <AuthenticationRoute path="/register">
                  <Register />
                </AuthenticationRoute>
                <AuthenticationRoute path="/login">
                  <Login />
                </AuthenticationRoute>
                <PrivateRoute path="/app">
                  <Dashboard />
                </PrivateRoute>
              </Switch>
            </div>
          </Router>
        </ThemeProvider>
      </UserProvider>
    </StyledEngineProvider>
  );
}

export default App;
