import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";

import { ListMenuUser, mainListItems } from "./ListMenuUser";
import DrawerLogic from "./DrawerUserLogic";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const DrawerComponent = ({ open, toggleDrawer }) => {
  const { onClick, isSelectedPage } = DrawerLogic();
  return (
    <Drawer variant="permanent" open={true}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      ></Toolbar>
      <Divider />
      <List component="nav">
        <ListMenuUser onClick={onClick} isSelectedPage={isSelectedPage} />
      </List>
      <Divider />
    </Drawer>
  );
};

export default DrawerComponent;
