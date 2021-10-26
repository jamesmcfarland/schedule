import { Dashboard } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useHistory } from "react-router";

const MenuButton = ({ label, icon, selected, to,isEnabled, ...rest }) => {
  const history = useHistory();
  return (
    <Button
    disabled={!isEnabled}
      style={{
        textTransform: "none",
        minWidth: "240px",
        minHeight: "48px",
        color: "white",
        justifyContent: "flex-start",
        padding: ".5rem 2rem",
        borderRadius: "15px",
        background: selected
          ? "linear-gradient(135deg, rgba(50,142,174,1) 0%, rgba(42,194,181,1) 100%)"
          : "#2B2A2A",
      }}
      {...rest}
      onClick={() => history.push(to)}
    >
      {label}
    </Button>
  );
};

export default MenuButton;
