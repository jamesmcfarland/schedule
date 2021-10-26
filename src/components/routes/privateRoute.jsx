import { Redirect, Route } from "react-router";
import { useUser } from "../../contexts/UserContext";
//https://dev.to/nilanth/how-to-create-public-and-private-routes-using-react-router-72m
const PrivateRoute = ({ children, ...rest }) => {
  const { hasUser } = useUser();
  return (
    <Route
      {...rest}
      render={({ location }) => {
        console.log("render ran");
        if (hasUser()) {
          return children;
        } else
          return (
            <Redirect
              to={{ pathname: "/", state: { from: location } }}
            ></Redirect>
          );
      }}
    />
  );
};

export default PrivateRoute;
