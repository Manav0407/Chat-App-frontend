import { useTheme } from "@emotion/react";
import { Box, Stack } from "@mui/material";
import { Chat_History } from "../../data/Data";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import {
  DocMsg,
  ImageMsg,
  TextMsg,
  Video,
  Audio,
} from "./MessageType";
import { MessagesContext } from "./ConvoFooter";
import { useDispatch, useSelector } from "react-redux";
import { useGetChatDetailsQuery, useGetMessagesQuery } from "../../Redux/Api/api";
import { useInfiniteScrollTop } from "6pp";
import { removeNewMessageAlert } from "../../Redux/Reducer/chatSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getSocket } from "../../utils/Socket";
import { CHAT_JOINED, CHAT_LEFT } from "../../constants/event";
import { useErrors } from "../../hooks/hooks";

const ConvoMain = ({ chatId }) => {
  const { messages, setMessages } = useContext(MessagesContext);
  const { user } = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk?.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk?.data?.messages
  );

  const chatDeatils = useGetChatDetailsQuery({chatId});

  const members = chatDeatils?.data?.chat?.members;

  const userId = user?._id
  const theme = useTheme();

  const errors = [
    {
      isError: oldMessagesChunk.isError,
      error: oldMessagesChunk.error,
    },
  ];
  useErrors(errors);

  const bottomRef = useRef(null);

  const dispatch = useDispatch();

  const socket = getSocket();

  useEffect(() => {

    socket.emit(CHAT_JOINED,{userId,members})
    
    dispatch(removeNewMessageAlert(chatId));
    return () => {
      setMessages([]);
      setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_LEFT,{userId,members});
    };
  }, [chatId]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const allMessages = [...oldMessages, ...messages];

  // console.log(allMessages);

  return (
    <Box
      width={"100%"}
      sx={{
        flexGrow: 1,
        backgroundColor:
          theme.palette.mode == "dark" ? "#101010" : theme.palette.paper,
        height: "100%",
        overflowY: "scroll",
      }}
      height={"100vh"}
      // className="w-full h-42 overflow-y-scroll no-scrollbar"
      ref={containerRef}
    >
      <Box p={3}>
        <Stack spacing={3}>
          {allMessages.map((message) => {
            // console.log(message?.sender?._id)
            switch (message?.attachment_type) {
              // case "divider":
              //   //divider
              //   return <Divide text={e.text} />;
              // case "msg":
              //   switch (e.subtype) {
              case "Images":
                //img
                return (
                  <ImageMsg
                    message={message}
                    userId={userId}
                    senderId={message?.sender?._id?.toString()}
                    time={message?.createdAt}
                  />
                );
              case "Files":
                return (
                  <DocMsg
                    message={message}
                    userId={userId}
                    senderId={message?.sender?._id?.toString()}
                    time={message?.createdAt}
                  />
                );

              case "Videos":
                return (
                  <Video
                    message={message}
                    userId={userId}
                    senderId={message?.sender?._id?.toString()}
                    time={message?.createdAt}
                  />
                );
              case "Audios":
                //reply
                return (
                  <Audio
                    message={message}
                    userId={userId}
                    senderId={message?.sender?._id?.toString()}
                    time={message?.createdAt}
                  />
                );
              default:
                return (
                  <TextMsg
                    message={message}
                    userId={userId}
                    senderId={message?.sender?._id?.toString()}
                    time={message?.createdAt}
                  />
                );
            }
          })}
        </Stack>
      </Box>
      <div ref={bottomRef} />
    </Box>
  );
};

export default memo(ConvoMain);
