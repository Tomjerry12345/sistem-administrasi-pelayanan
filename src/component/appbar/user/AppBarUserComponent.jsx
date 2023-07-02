import * as React from "react";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import "../AppBarComponent.scss";
import { Stack } from "@mui/system";
import AppBarLogic from "./AppBarUserLogic";
import { Button } from "@mui/material";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const styleSubMenu = {
  color: "white",
};

const AppBarComponent = ({ open, toggleDrawer }) => {
  const { onClickNav } = AppBarLogic();

  return (
    <AppBar position="absolute" open={open} color="primary">
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="white"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography className="title" variant="h6" noWrap>
          Dashboard
        </Typography>
        <Stack spacing={2} direction="row">
          <Button variant="text" style={styleSubMenu} onClick={() => onClickNav("logout")}>
            Keluar
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
