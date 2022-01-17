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

import PrivateRoute from "./components/routes/privateRoute";
import AuthenticationRoute from "./components/routes/authenticationRoute";

import MainAppContainer from "./pages/app/mainAppContainer";
import OnboardingFlow from "./pages/app/onboarding/onboarding";
import { OrgProvider } from "./contexts/OrgContext";
import AcceptedInvite from "./pages/app/invite/acceptedInv";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

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
      <LocalizationProvider dateAdapter={DateAdapter}>
        <UserProvider>
          <OrgProvider>
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
                      <MainAppContainer />
                    </PrivateRoute>
                    <PrivateRoute path="/onboarding">
                      <OnboardingFlow />
                    </PrivateRoute>
                    <Route path="/invite/:id">
                      <AcceptedInvite />
                    </Route>
                  </Switch>
                </div>
              </Router>
            </ThemeProvider>
          </OrgProvider>
        </UserProvider>
      </LocalizationProvider>
    </StyledEngineProvider>
  );
}

export default App;
