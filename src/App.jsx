import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  createTheme, CssBaseline, StyledEngineProvider, ThemeProvider
} from "@mui/material";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./App.css";
import AuthenticationRoute from "./components/routes/authenticationRoute";
import PrivateRoute from "./components/routes/privateRoute";
import { OrgProvider } from "./contexts/OrgContext";
import { UserProvider } from "./contexts/UserContext";
import AppContainer from "./pages/app/AppContainer";
import AcceptedInvite from "./pages/app/invite/acceptedInv";
import OnboardingFlow from "./pages/app/onboarding/onboarding";
import Login from "./pages/login";
import Register from "./pages/register";
import SplashScreen from "./pages/splash";



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
    <RecoilRoot>
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
                        <AppContainer />
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
    </RecoilRoot>
  );
}

export default App;
