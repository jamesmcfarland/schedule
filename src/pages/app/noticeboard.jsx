import { DashboardCustomize, Dashboard } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Drawer,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import Menu from "../../components/menu";
import MenuButton from "../../components/menuButton";
import VerticallyCentered from "../../components/verticallyCentered";
import { useUser } from "../../contexts/UserContext";

const Noticeboard = () => {
  const { getUserInfo, logout } = useUser();
  const [udata, setudata] = useState({ data: "wating" });
  const [error, seterror] = useState();

  useEffect(() => {
    getUserInfo()
      .then((data) => setudata(data))
      .catch((err) => setError(err.code));
  }, []);

  return (
    <Box>
      <Typography>noticeboard</Typography>
    </Box>
  );
};

export default Noticeboard;
