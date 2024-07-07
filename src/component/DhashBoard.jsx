import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AiFillMessage } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import { PiLinuxLogo } from "react-icons/pi";
import { MaterialUISwitch } from "../component/DarkModeSwitch";
import { useMode, useThemeToggle } from "../ThemeContext.jsx";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logout } from "../Redux/Action/auth.js";

const Option = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const dispatch = useDispatch();
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    setAnchorEl(null);
  };

  const { user } = useSelector((state) => {
    return state.auth;
  });

  useEffect(() => {
    dispatch(loadUser());
  }, []);
  const theme = useTheme();
  return (
    <>
      <Avatar
        src={user?.avatar?.url}
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      />
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Link to={"/profile"}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <Link to={"/about"}>
          <MenuItem onClick={handleClose}>About</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

const DashBoard = () => {
  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:4000/login/success", {
        withCredentials: true,
      });
      // console.log(res);
    } catch (error) {
      // console.log(error);
    }
  };

  const logout = async () => {
    try {
      await axios.get("http://localhost:4000/logout", {
        withCredentials: true,
      });
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const [select, setSelect] = useState();
  const theme = useTheme();

  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === "/") {
      setSelect(1);
    } else if (pathname.includes("group")) {
      setSelect(2);
    } else if (pathname === "/location") {
      setSelect(4);
    }
  }, [pathname, select]);

  // console.log(theme);

  const themeToggle = useThemeToggle();
  const mode = useMode();

  // console.log(mode);
  return (
    <>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0px 0px 2px rgba(255,255,255, 0.3)"
              : "0px 0px 2px rgba(0, 0, 0, 0.35)",
          height: "100vh",
          width: 100,
        }}
        p={2}
      >
        <Stack
          sx={{ height: "100%" }}
          direction={"column"}
          alignItems={"center"}
          spacing={3}
          justifyContent={"space-between"}
        >
          <Stack alignItems={"center"} spacing={3}>
            <Link to={"/"}>
              <Box
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  height: 64,
                  width: 64,
                  borderRadius: 1.5,
                }}
                marginTop={"10px"}
                p={1.5}
              >
                <PiLinuxLogo size={40} />
              </Box>
            </Link>

            <Stack
              spacing={4}
              sx={{ width: "max-content" }}
              direction={"column"}
              alignItems={"center"}
            >
              {select == 1 ? (
                <Box
                  p={1}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                >
                  <Tooltip title={"Chats"} placement="right">
                    <Link to={"/"}>
                      <IconButton>
                        <AiFillMessage size={25} />
                      </IconButton>
                    </Link>
                  </Tooltip>
                </Box>
              ) : (
                <Tooltip title={"Chats"} placement="right">
                  <Link to={"/"}>
                    <IconButton>
                      <AiFillMessage size={25} onClick={() => setSelect(1)} />
                    </IconButton>
                  </Link>
                </Tooltip>
              )}
              {select == 2 ? (
                <Box
                  p={1}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                >
                  <Tooltip title={"Groups"} placement="right">
                    <Link to={"/group"}>
                      <IconButton>
                        <FaUserFriends size={25} />
                      </IconButton>
                    </Link>
                  </Tooltip>
                </Box>
              ) : (
                <Tooltip title={"Groups"} placement="right">
                  <Link to={"/group"}>
                    <IconButton>
                      <FaUserFriends size={25} onClick={() => setSelect(2)} />
                    </IconButton>
                  </Link>
                </Tooltip>
              )}

              <Divider sx={{ width: "50px" }} />
              {select == 4 ? (
                <Box
                  p={1}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                >
                  <Tooltip title="Location" placement="right">
                    <Link to={"/location"}>
                      <IconButton>
                        <GrMapLocation size={25} />
                      </IconButton>
                    </Link>
                  </Tooltip>
                </Box>
              ) : (
                <Tooltip title="Location">
                  <Link to={"/location"}>
                    <IconButton>
                      <GrMapLocation size={25} onClick={() => setSelect(4)} />
                    </IconButton>
                  </Link>
                </Tooltip>
              )}
            </Stack>
          </Stack>
          <Stack direction={"column"} alignItems={"center"} spacing={4}>
            <MaterialUISwitch onClick={themeToggle} theme={theme} />
            <Option />
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default DashBoard;
