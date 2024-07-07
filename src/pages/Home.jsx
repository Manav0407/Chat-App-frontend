import React, { useCallback, useEffect } from "react";
import Chat from "../component/Chat";
import { Box, Stack, useTheme } from "@mui/material";
import Conversation from "../component/Conversation";
import Content from "../component/Content";
import { useDispatch, useSelector } from "react-redux";
import Media from "../component/Media";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useMyChatQuery } from "../Redux/Api/api.js";
import { getSocket } from "../utils/Socket.jsx";
import NoChat from "../assets/NoChat.jsx";
import { NEW_MESSAGE_ALERT, NEW_REQUEST } from "../constants/event.js";
import { incrementNotifications } from "../Redux/Reducer/chatSlice.js";
import { useSocketEvents } from "../hooks/hooks.jsx";

// import { googleLogin } from "../Redux/Action/auth";
const Home = () => {
  const { isLoading, isError, refetch, data } = useMyChatQuery("");

  const { sidebar } = useSelector((state) => {
    return state.ui;
  });

  const dispatch = useDispatch();

  const { isAuthenticated, message, error, user } = useSelector((state) => {
    return state.auth;
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated]);

  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:4000/login/success", {
        withCredentials: true,
      });

      console.log(res);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const theme = useTheme();

  const parmas = useParams();

  return (
    <>
      <Stack direction={"row"}>
        {/* <DashBoard /> */}
        <Chat />
        <Box
          sx={{
            height: "100%",
            width: sidebar.open ? "calc(100vw - 740px)" : "calc(100vw - 420px)",
            backgroundColor: "#fff",
          }}
        >
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
        </Box>
        {sidebar.open && (sidebar.type === "Content" ? <Content /> : <Media />)}
      </Stack>
      <Toaster position="bottom-center" />
    </>
  );
};

export default Home;
