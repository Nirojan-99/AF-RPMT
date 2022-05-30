import { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Tooltip,
  Button,
  Link,
  Divider,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { dark, light } from "../Store/theme";

import logo from "../Assets/logo.png";
import { logout } from "../Store/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AllChatModel from "../Pages/ChatModel/AllChatModel";

function Header(props) {
  //auth
  const { token, role } = useSelector((state) => state.loging);

  const [auth, setAuth] = useState(token);
  const [anchorEl, setAnchorEl] = useState(null);

  //mode
  const Tmode = useSelector((state) => state.mode.mode);
  const [mode, setMode] = useState(Tmode);

  let history = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    setAnchorEl(null);
  };

  props.handler(mode);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const profilehandler = () => {
    history("/profile");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color={"primary"} position="sticky">
          <Toolbar>
            <Button href="/">
              <img alt="dd" src={logo} width="100px" />
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}></Box>
            <Tooltip title={mode === "dark" ? "light theme" : "dark theme"}>
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                // onClick={handleMenu}
                color="inherit"
                onClick={() => {
                  setMode((prevMode) =>
                    prevMode === "light" ? "dark" : "light"
                  );
                  if (Tmode === "light") {
                    dispatch(dark());
                  } else {
                    dispatch(light());
                  }
                }}
              >
                {mode === "light" ? (
                  <DarkModeIcon fontSize="inherit" />
                ) : (
                  <LightModeIcon fontSize="inherit" />
                )}
              </IconButton>
            </Tooltip>

            {!auth && (
              <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "flex" } }}>
                <Link href="/auth/sign-in">
                  <Button key={"login"} color="info">
                    Log In
                  </Button>
                </Link>
                <Link href="/auth/sign-up">
                  <Button key={"signup"} color="info">
                    Sign up
                  </Button>
                </Link>
              </Box>
            )}

            {/*user profile*/}
            {auth && (
              <div>
                {role !== "Admin" && <AllChatModel />}
                <Tooltip title="profile">
                  <IconButton size="large" onClick={handleMenu} color="inherit">
                    <AccountCircle fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                <Menu
                  color="#e28743"
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={profilehandler}>Profile</MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAuth("");
                      dispatch(logout());
                      history("/login", { replace: true });
                    }}
                  >
                    Log Out
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Divider />
    </>
  );
}

export default Header;
