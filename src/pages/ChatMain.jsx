import React, { useEffect } from "react";
import Chat from "../component/Chat";
import { Box, Stack, useTheme } from "@mui/material";
import Conversation from "../component/Conversation";
import Content from "../component/Content";
import { useDispatch, useSelector } from "react-redux";
import Media from "../component/Media";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useMyChatQuery } from "../Redux/Api/api.js";
import { getSocket } from "../utils/Socket.jsx";

const ChatMain = () => {
  const { sidebar } = useSelector((state) => {
    return state.ui;
  });

  const params = useParams();


  const socket = getSocket();


  const theme = useTheme();
  return (
    <>
      <Stack direction={"row"}>
        {/* <DashBoard /> */}
        <Chat chatId={params?.chatId}/>
        <Box
          sx={{
            height: "100%",
            width: sidebar.open ? "calc(100vw - 740px)" : "calc(100vw - 420px)",
            backgroundColor: "#fff",
          }}
        >
          <Conversation chatId={params?.chatId}/>
        </Box>
        {sidebar.open && (sidebar.type === "Content" ? <Content /> : <Media />)}
      </Stack>
      <Toaster position="bottom-center" />
    </>
  );
};

export default ChatMain;
