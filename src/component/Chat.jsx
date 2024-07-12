import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { PiMagnifyingGlass } from "react-icons/pi";
import { styled, alpha } from "@mui/material/styles";
import { InputBase } from "@mui/material";
import { MdPersonAddAlt1 } from "react-icons/md";
import ChatElement from "./Modules/ChatElement";
import { useTheme } from "@emotion/react";
import { useMyChatQuery } from "../Redux/Api/api.js";
import { useErrors, useSocketEvents } from "../hooks/hooks.jsx";
import SearchDialog from "./Modules/SearchDialog.jsx";
import PropTypes from "prop-types";
import { IoNotificationsSharp } from "react-icons/io5";
import NotificationDialog from "./Modules/NotificationDialog";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSocket } from "../utils/Socket.jsx";
import {
  incrementNotifications,
  resetNotifications,
  setNewMessageAlert,
} from "../Redux/Reducer/chatSlice.js";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USER,
  REFETCH_CHATS,
} from "../constants/event.js";
import { localStorageHandler } from "../helper/feature.js";
import DeleteChatMenu from "./Modules/DeleteChatMenu.jsx";
import {
  setIsDeleteMenu,
  setSelectedDeleteChat,
} from "../Redux/Reducer/miscSlice.js";
import { BsRobot } from "react-icons/bs";
// ----------------------------------------------------------------
// styling

SearchDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.background.paper, 1),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0px 0px 2px rgba(255,255,255, 0.3)"
      : "0px 0px 2px rgba(0, 0, 0, 0.35)",
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));

// --------------------------------------------------------------

const Chat = ({ chatId }) => {
  const { isLoading, isError, refetch, error, data } = useMyChatQuery("");

  // console.log(data);
  // console.log(process.env.REACT_APP_GEMINI_API_KEY);

  useErrors([{ isError, error }]);

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = React.useState();
  const [openNoti, setOpenNoti] = useState(false);
  const [noti, setNoti] = useState();
  const [onlineUser, setOnlineUser] = useState([]);

  const socket = getSocket();

  const dispatch = useDispatch();

  const { notification, newMessageAlert } = useSelector((state) => state.chat);

  useEffect(() => {
    localStorageHandler({ key: "NEW_MESSAGE_ALERT", value: newMessageAlert });
    localStorageHandler({ key: "NOTIFICATION", value: notification });
  }, [newMessageAlert, notification]);

  const newMessageAlertHandler = useCallback(
    (data) => {
      // console.log("meg alert");
      if (chatId === data?.chatId) return;
      dispatch(setNewMessageAlert(data));
    },
    [chatId]
  );

  const newRequestListener = useCallback(() => {
    dispatch(incrementNotifications());
  }, [dispatch]);

  const navigate = useNavigate();
  const refetchListener = useCallback(() => {
    refetch();
    navigate("/");
  }, [refetch]);

  const onlineUserListener = useCallback((data) => {
    setOnlineUser(data);
  }, []);

  const eventHandler = {
    [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
    [NEW_REQUEST]: newRequestListener,
    [REFETCH_CHATS]: refetchListener,
    [ONLINE_USER]: onlineUserListener,
  };

  useSocketEvents(socket, eventHandler);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleNotiOpen = () => {
    setOpenNoti(true);
    dispatch(resetNotifications());
  };
  const handleNotiClose = () => {
    setOpenNoti(false);
    setNoti(null);
  };

  const theme = useTheme();
  const deleteMenuAnchor = useRef(null);

  const handleDeleteChat = (e, chatId, isGroup) => {
    e.preventDefault();
    dispatch(setIsDeleteMenu(true));
    dispatch(setSelectedDeleteChat({ chatId, isGroup }));
    deleteMenuAnchor.current = e.currentTarget;
  };

  return (
    <Box
      sx={{
        position: "relative",
        //   height: "100vh",
        //   width: isDesktop ? 320 : "100vw",
        width: 320,
        backgroundColor:
          theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background,

        boxShadow:
          theme.palette.mode === "dark"
            ? "0px 0px 2px rgba(255,255,255, 0.3)"
            : "0px 0px 2px rgba(0, 0, 0, 0.35)",
      }}
    >
      <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
        <Stack
          alignItems={"center"}
          justifyContent="space-between"
          direction="row"
        >
          <Typography variant="h5">Chats</Typography>
          <Stack direction={"row"} alignItems="center" spacing={1}>
            <IconButton onClick={handleClickOpen} sx={{ width: "max-content" }}>
              <MdPersonAddAlt1 />
            </IconButton>
            <IconButton sx={{ width: "max-content" }} onClick={handleNotiOpen}>
              {notification > 0 ? (
                <Badge badgeContent={notification} color="error">
                  <IoNotificationsSharp />
                </Badge>
              ) : (
                <IoNotificationsSharp />
              )}
            </IconButton>
          </Stack>
        </Stack>
        <Stack sx={{ width: "100%" }}>
          <Search>
            <SearchIconWrapper>
              <PiMagnifyingGlass color="#709CE6" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Stack>
        <Stack spacing={1}></Stack>
        <Stack
          sx={{ flexGrow: 1, overflow: "scroll", height: "100%" }}
          className="w-full h-42 overflow-y-scroll no-scrollbar"
        >
          <Stack spacing={2.4}>
            <Typography variant="subtitle2" sx={{ color: "#676667" }}>
              All Chats
            </Typography>
            <Link to={`/chat-bot`}>
              <StyledChatBox
                sx={{
                  width: "100%",
                  borderRadius: 1,
                  backgroundColor: false
                    ? theme.palette.mode === "light"
                      ? alpha(theme.palette.primary.main, 0.5)
                      : theme.palette.primary.main
                    : theme.palette.mode === "light"
                    ? "#fff"
                    : theme.palette.primary.main,

                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0px 0px 2px rgba(255,255,255, 0.15)"
                      : "0px 0px 2px rgba(0, 0, 0, 0.15)",
                }}
                p={2}
              >
                <Stack
                  direction="row"
                  alignItems={"center"}
                  justifyContent="space-between"
                >
                  <Stack direction="row" spacing={2}>
                    <Avatar alt={"faker"}>
                      <BsRobot/>
                    </Avatar>

                    <Stack
                      spacing={0.3}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Typography variant="subtitle2">Chat-bot</Typography>
                    </Stack>
                  </Stack>
                  <Stack spacing={2} alignItems={"center"}></Stack>
                </Stack>
              </StyledChatBox>
            </Link>
            {isLoading ? (
              <Typography>Loading...</Typography>
            ) : (
              data?.chats?.map((chat) => {
                // console.log()
                return (
                  <>
                    <Link to={`/${chat?._id}`}>
                      <ChatElement
                        chatId={chat?._id}
                        avatar={chat?.avatar}
                        name={chat?.name}
                        members={chat?.members}
                        unread={newMessageAlert}
                        isGroup={chat?.groupChat}
                        handleDeleteChat={handleDeleteChat}
                        onlineUsers={onlineUser}
                      />
                    </Link>
                  </>
                );
              })
            )}
          </Stack>
        </Stack>
      </Stack>
      <SearchDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
      <NotificationDialog
        noti={noti}
        openNoti={openNoti}
        onNotiClose={handleNotiClose}
      />
      <DeleteChatMenu dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor} />
    </Box>
  );
};

export default Chat;
