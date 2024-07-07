import React, { useCallback, useContext, useEffect } from "react";
import { faker } from "@faker-js/faker";
import {
  Avatar,
  Box,
  Stack,
  Badge,
  Typography,
  IconButton,
  Divider,
  TextField,
  InputAdornment,
  AvatarGroup,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { LuVideo } from "react-icons/lu";
import { IoCallOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useTheme } from "@emotion/react";
import { toggleSideBarAction } from "../../Redux/Action/ui";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetChatDetailsQuery } from "../../Redux/Api/api";
import { MessagesContext } from "./ConvoFooter";
import TypingLoader from "../TypingLoader";
import { ONLINE_USER } from "../../constants/event";
import { useSocketEvents } from "../../hooks/hooks";
import { getSocket } from "../../utils/Socket";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const ConvoHeader = ({ chatId }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [onlineUser, setOnlineUser] = React.useState([]);

  const { user } = useSelector((state) => state.auth);

  const chatDetails = useGetChatDetailsQuery({ chatId, populate: true });

  const { isLoading, isError, error, data } = chatDetails;

  const members = data?.chat?.members.map((member) => member?._id);

  const other = chatDetails?.data?.chat.members?.filter(
    (member) => member?._id !== user?._id
  )[0];

  const temp = data?.chat?.members;
  const avatararr = [];
  for (let i = 0; i < temp?.length; i++) {
    avatararr.push(temp[i].avatar);
  }

  const { userTyping } = useContext(MessagesContext);

  useEffect(() => {
    if (!chatDetails?.data?.chat) {
      return navigate("/");
    }
  }, [chatDetails?.data?.chat]);

  const socket = getSocket();

  const onlineUserListener = useCallback((data) => {
    setOnlineUser(data);
  }, []);

  const eventHandler = {
    [ONLINE_USER]: onlineUserListener,
  };

  useSocketEvents(socket, eventHandler);

  // console.log(onlineUser)

  const isOnline = members?.some((member) => onlineUser.includes(member));

  return (
    <Box
      sx={{
        height: 100,
        width: "100%",
        backgroundColor: theme.palette.mode == "dark" ? "#000" : "#F8FAFF",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0px 2px 2px rgba(255,255,255, 0.3)"
            : "0px 0px 2px rgba(0, 0, 0, 0.35)",
      }}
      p={2}
    >
      <Stack
        alignItems={"center"}
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ width: "100%", height: "100%" }}
      >
        <Stack direction={"row"} spacing={2}>
          <Box>
            {isLoading ? (
              <Typography>Loading...</Typography>
            ) : data?.chat?.groupChat ? (
              <AvatarGroup max={3} spacing="small">
                {avatararr.map((e) => {
                  return <Avatar key={e} src={e} />;
                })}
              </AvatarGroup>
            ) : false ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  src={other?.avatar}
                  onClick={() => {
                    dispatch(toggleSideBarAction());
                  }}
                />
              </StyledBadge>
            ) : (
              <Avatar
                src={other?.avatar}
                onClick={() => {
                  dispatch(toggleSideBarAction());
                }}
              />
            )}
          </Box>
          <Stack spacing={0.2} justifyContent={"center"}>
            <Typography variant="subtitle1">
              {data?.chat?.groupChat ? data?.chat?.name : other?.username}
            </Typography>
            <Typography fontSize={"13px"}>
              {userTyping && <TypingLoader />}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    
          <Divider orientation="vertical" flexItem />
          <IconButton
            onClick={() => {
              dispatch(toggleSideBarAction());
            }}
          >
            <IoIosArrowDown />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ConvoHeader;
