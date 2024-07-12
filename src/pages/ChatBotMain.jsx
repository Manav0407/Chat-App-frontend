import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Stack,
  useTheme,
  Avatar,
  Typography,
  IconButton,
  styled,
  TextField,
} from "@mui/material";
import { BsRobot } from "react-icons/bs";
import { TbSend } from "react-icons/tb";
import { ChatInput } from "../component/Modules/ChatInput";
import run from "../component/ChatBot";
import TypingLoader from "../component/TypingLoader";
const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px !important",
    paddingBottom: "12px !important",
  },
}));

const ChatBotMain = () => {
  const bottomRef = useRef(null);
  const theme = useTheme();
  const containerRef = useRef(null);
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [allMessage, setAllMessage] = useState([]);
  const [convo, setConvo] = useState([]);

  const onchangeHandler = (e) => {
    setMessage(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    setConvo((convo) => [...convo, { role: "user", content: message }]);
    const response = await run(message);
    setAllMessage([...allMessage, message]);
    setConvo((convo) => [...convo, { role: "bot", content: response }]);
    setLoading(false);
  };
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [convo]);
  return (
    <>
      <Stack height={"100vh"} width={"100%"}>
        <Box
          sx={{
            //   height: 100,
            width: "100%",
            backgroundColor: theme.palette.mode == "dark" ? "#000" : "#F8FAFF",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0px 2px 2px rgba(255,255,255, 0.3)"
                : "0px 0px 2px rgba(0, 0, 0, 0.35)",
          }}
          p={2}
        >
          <Stack direction={"row"} spacing={2}>
            <Box>
              <Avatar>
                <BsRobot />
              </Avatar>
            </Box>
            <Stack spacing={0.2} justifyContent={"center"}>
              <Typography variant="subtitle1">Chat-Bot</Typography>
              <Typography variant="subtitle1">
                {
                  loading && <TypingLoader/>
                }
              </Typography>
            </Stack>
          </Stack>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <IconButton>{/* <IoIosArrowDown /> */}</IconButton>
          </Stack>
        </Box>
        <Box
          width={"100%"}
          sx={{
            flexGrow: 1,
            backgroundColor:
              theme.palette.mode == "dark" ? "#101010" : theme.palette.paper,
            // height: "100%",
            overflowY: "scroll",
          }}
          height={"100%"}
          // className="w-full h-42 overflow-y-scroll no-scrollbar"
          // ref={containerRef}
        >
          <Box p={3} height={"100"} width={"100%"}>
            <Stack spacing={3} height={"100%"} width={"100%"}>
              {convo?.length > 0 &&
                convo?.map((msg, index) => {
                  return (
                    <Stack
                      direction={"row"}
                      justifyContent={!(msg?.role === "user") ? "start" : "end"}
                    >
                      <Box
                        p={1}
                        sx={{
                          backgroundColor: !(msg?.role === "user")
                            ? theme.palette.mode === "light"
                              ? "	#E5E4E2"
                              : "#36454F"
                            : theme.palette.primary.main,

                          borderRadius: 1.5,
                          maxWidth: "50%",
                        }}
                      >
                        <Typography
                          variant="inherit"
                          fontWeight={700}
                          color={
                            !(msg?.role === "user")
                              ? theme.palette.text
                              : "#fff"
                          }
                        >
                          {msg?.content}
                        </Typography>
                        <Stack
                          direction={"column"}
                          alignItems={"baseline"}
                          sx={{
                            // background: "blue",
                            borderRadius: 1.5,
                          }}
                        ></Stack>
                      </Box>
                    </Stack>
                  );
                })}
            </Stack>
          </Box>
          <div ref={bottomRef} />
        </Box>

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
                    display: true ? "inline" : "none",
                  }}
                ></Box>
                <StyledInput
                  value={message}
                  onChange={onchangeHandler}
                  placeholder="Type Here..."
                  variant="filled"
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
      </Stack>
    </>
  );
};

export default ChatBotMain;
