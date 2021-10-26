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
import Rota from "./pages/app/rota";
import PrivateRoute from "./components/privateRoute";
import AuthenticationRoute from "./components/authenticationRoute";
import Noticeboard from "./pages/app/noticeboard";
import People from "./pages/app/people";
import SettingsPage from "./pages/app/settings";
import MainAppContainer from "./pages/app/mainAppContainer";
import OnboardingFlow from "./pages/app/onboarding/onboarding";
import { OrgProvider } from "./contexts/OrgContext";
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
                </Switch>
              </div>
            </Router>
          </ThemeProvider>
        </OrgProvider>
      </UserProvider>
    </StyledEngineProvider>
  );
}

export default App;
