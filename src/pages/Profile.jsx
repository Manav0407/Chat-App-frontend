import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { CaretLeft } from "phosphor-react";
import ProfileForm from "../component/Modules/ProfileForm";
import { useDispatch, useSelector } from "react-redux";
import { faker } from "@faker-js/faker";
import About from "../component/Modules/About";
import NoChat from "../assets/NoChat";
// import { FetchUserProfile } from "../../../redux/slices/app";

const Profile = () => {
  const dispatch = useDispatch();

  const theme = useTheme();

  const {user} = useSelector((state)=>state.auth);

  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        {/* Left Pane */}
        <Box
          sx={{
            overflowY: "scroll",

            height: "100vh",
            width: 500,
            backgroundColor:
              theme.palette.mode === "light"
                ? "smoke"
                : theme.palette.background,

            boxShadow:
              theme.palette.mode === "dark"
                ? "0px 0px 2px rgba(255,255,255, 0.3)"
                : "0px 0px 2px rgba(0, 0, 0, 0.35)",
          }}
          className="w-full h-42 overflow-y-scroll no-scrollbar"
        >
          <Stack p={4} spacing={5}>
            {/* Header */}
            <Stack direction="row" alignItems={"center"} spacing={3}>
              {/* <IconButton>
                <CaretLeft size={24} color={"#4B4B4B"} />
              </IconButton> */}
              <Typography variant="h5">Profile</Typography>
            </Stack>

            <Stack alignItems={"center"} justifyContent={"center"} spacing={7}>
              <Avatar
                sx={{ width: 150, height: 150 }}
                src={user?.avatar?.url}
              />
                  <Typography
                    variant="h4"
                    fontFamily={"initial"}
                    sx={{ backgroundColor: "lightseagreen" ,pl:"5rem",pr:"5rem" ,borderRadius: "10px" }}
                   
                  >
                    {user?.username}
                  </Typography>
           
                  <Typography
                    variant="body1"
                    fontFamily={"initial"}
                    sx={{ backgroundColor: "lightseagreen",borderRadius: "10px" }}
                  >
                    {user?.email}
                  </Typography>
               
            </Stack>
    
          </Stack>
        </Box>

        <Stack
            sx={{
              height: "100%",
              width: "100%",
              background:
                theme.palette.mode === "light" ? "#F8FAFF" : "#292a2b",
            }}
            spacing={2}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <NoChat />
          </Stack>
      </Stack>
    </>
  );
};

export default Profile;
