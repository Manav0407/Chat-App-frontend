import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Box,
  Stack,
  IconButton,
  TextField,
  InputAdornment,
  Fab,
  styled,
} from "@mui/material";
import { useTheme } from "@emotion/react";

import { TbSend } from "react-icons/tb";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { ChatInput } from "./ChatInput.jsx";
import { BsEmojiSmile } from "react-icons/bs";
import { getSocket } from "../../utils/Socket";
import {
  ALERT,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../../constants/event.js";
import { useGetChatDetailsQuery } from "../../Redux/Api/api.js";
import { useSocketEvents } from "../../hooks/hooks.jsx";
import TypingLoader from "../TypingLoader.jsx";
import { useSelector } from "react-redux";

const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px !important",
    paddingBottom: "12px !important",
  },
}));

// Making context for messages

const MessagesContext = createContext();

const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [userTyping, setUserTyping] = useState(false);

  return (
    <MessagesContext.Provider
      value={{ messages, setMessages, userTyping, setUserTyping }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

const ConvoFooter = ({ chatId }) => {
  // console.log(chatId)

  const [message, setMessage] = useState("");
  const { messages, setMessages, userTyping, setUserTyping } =
    useContext(MessagesContext);

  const {user} = useSelector((state)=> state.auth);

  const [IamTypeing, setIamTypeing] = useState(false);
  const typingTimeout = useRef();

  const socket = getSocket();

  const chatDetails = useGetChatDetailsQuery({ chatId, skip: !chatId });

  const members = chatDetails?.data?.chat?.members;

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  const newMessagesListener = useCallback(
    (data) => {
      if (data?.chatId === chatId) {
        setMessages((prev) => [...prev, data?.message]);
      }
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      if (data?.chatId !== chatId) return;
      setUserTyping(true);
    },
    [chatId] 
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data?.chatId !== chatId) return;
      setUserTyping(false);
    },
    [chatId]
  );

  const alertListener = useCallback(
    (data) => {
      if(data?.chatId !== chatId) return;
      const messageForAlert ={
        content: data.message,
        sender:{
          _id:"asdjhasjkdhasdasd",
          username: "Admin",
        },
        chat:chatId,
        createdAt: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, messageForAlert]);
    },[chatId]);

  const onchangeHandler = (e) => {
    setMessage(e.target.value);
    if (!IamTypeing) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTypeing(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    // Emit stop typing after 2 seconds of no typing

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTypeing(false);
    }, [1000]);
  };

  const eventHandler = {
    [ALERT] : alertListener,
    [NEW_MESSAGE]: newMessagesListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };

  useSocketEvents(socket, eventHandler);

  const [isOpen, setIsOpen] = React.useState(false);
  const theme = useTheme();

  return (
    <Box
      p={2}
      sx={{
        width: "100%",
        backgroundColor: theme.palette.mode == "dark" ? "#000" : "#F8FAFF",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0px 0px 2px rgba(255,255,255, 0.3)"
            : "0px 0px 2px rgba(0, 0, 0, 0.35)",
      }}
    >
      <form onSubmit={submitHandler}>
        <Stack direction={"row"} alignItems={"center"} spacing={3}>
          <Stack sx={{ width: "100%" }}>
            <Box
              sx={{
                zIndex: 10,
                position: "fixed",
                bottom: 81,
                right: 100,
                display: isOpen ? "inline" : "none",
              }}
            >
              <Picker
                data={data}
                title="Pick your emoji…"
                emoji="point_up"
                theme={theme.palette.mode}
              />
            </Box>
            {/* <ChatInput setIsOpen={setIsOpen} isOpen={isOpen} /> */}
            <StyledInput
              value={message}
              onChange={onchangeHandler}
              placeholder="Type Here..."
              variant="filled"
              InputProps={{
                disableUnderline: true,
                startAdornment: <ChatInput chatId={chatId} />,
                endAdornment: (
                  <InputAdornment>
                    <IconButton
                      onClick={() => {
                        setIsOpen(!isOpen);
                      }}
                    >
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Box
            sx={{
              height: 48,
              width: 48,
              backgroundColor: theme.palette.primary.main,
              borderRadius: 1.5,
            }}
          >
            <Stack
              sx={{ height: "100%", width: "100%" }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <IconButton type="submit">
                <TbSend size={25} />
              </IconButton>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export { ConvoFooter, MessagesProvider, MessagesContext };
