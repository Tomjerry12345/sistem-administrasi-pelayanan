import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";
import AppBarComponent from "../../component/appbar/user/AppBarUserComponent";
import DrawerComponent from "../../component/drawer/user/DrawerUserComponent";

const MainUserPage = () => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBarComponent open={open} toggleDrawer={toggleDrawer} />
      <DrawerComponent open={open} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) => theme.palette.grey[100],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Box sx={{ m: 2 }}>
          <Outlet />
        </Box>

        {/* <FooterComponent /> */}
      </Box>
    </Box>
  );
};

export default MainUserPage;
