import React, { useRef, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Divider,
  InputBase,
} from "@mui/material";
import { MagnifyingGlass, Plus } from "phosphor-react";
import { alpha, styled, useTheme } from "@mui/material/styles";
// import { SimpleBarStyle } from "../../components/Scrollbar";
import CreateGroupDialog from "./Modules/CreateGroupDialog.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useAvailableFriendsQuery, useMyGroupQuery } from "../Redux/Api/api.js";
import { useErrors, useSocketEvents } from "../hooks/hooks.jsx";
import { AutofillProvider } from "./hook-form/RHFAutocomplete.jsx";
import { GroupChatElement } from "./Modules/GroupChatElement.jsx";
import { Link, useNavigate } from "react-router-dom";
import { getSocket } from "../utils/Socket.jsx";
import { REFETCH_CHATS } from "../constants/event.js";
import DeleteChatMenu from "./Modules/DeleteChatMenu.jsx";

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

const GroupSection = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const dispatch = useDispatch();
  const deleteMenuAnchor = useRef(null);

  const socket = getSocket();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


  const getMyGroups = useMyGroupQuery();

  const { isLoading, isError, refetch, error, data } = getMyGroups;

  // console.log(data);

  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);

  const {
    isError: friendIsError,
    error: friendError,
    isLoading: friendIsLoading,
    data: friends,
  } = useAvailableFriendsQuery();
  const errorsFriends = [
    {
      friendIsError,
      friendError,
    },
  ];
  useErrors(errorsFriends);

  const refetchListener = () => {
    refetch();
    // navigate("/groups")
  };

  const eventHandler = {
    [REFETCH_CHATS]: refetchListener,
  };

  useSocketEvents(socket, eventHandler);

  const theme = useTheme();
  return (
    <>
      <AutofillProvider>
        <Box
          sx={{
            position: "relative",
            //   height: "100vh",
            //   width: isDesktop ? 320 : "100vw",
            width: 320,
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,

            boxShadow:
              theme.palette.mode === "dark"
                ? "0px 0px 2px rgba(255,255,255, 0.3)"
                : "0px 0px 2px rgba(0, 0, 0, 0.35)",
          }}
          className="w-full h-42 overflow-y-scroll no-scrollbar"
        >
          <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
            <Stack
              alignItems={"center"}
              justifyContent="space-between"
              direction="row"
            >
              <Typography variant="h5">Groups</Typography>
            </Stack>
            <Stack sx={{ width: "100%" }}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#709CE6" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Stack>
            <Stack
              justifyContent={"space-between"}
              alignItems={"center"}
              direction={"row"}
            >
              <Typography variant="subtitle2" component={Link}>
                Create New Group
              </Typography>
              <IconButton onClick={handleOpenDialog}>
                <Plus style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />
            <Stack
              sx={{ flexGrow: 1, overflow: "scroll", height: "100%" }}
              className="w-full h-42 overflow-y-scroll no-scrollbar"
            >
              <Stack spacing={2.4}>
                <Typography variant="subtitle2" sx={{ color: "#676667" }}>
                  All Groups
                </Typography>
                {isLoading
                  ? "Loading..."
                  : data?.groups?.map((chat) => {
                    return (
                        // <Link to={`/group/${chat?._id}`} >
                          <GroupChatElement
                            key={chat?._id}
                            chatId={chat?._id}
                            name={chat?.name}
                            avatar={chat?.avatar}
                          />
                        // </Link>
                      );
                    })}
              </Stack>
            </Stack>
          </Stack>
        </Box>
        {openDialog && (
          <CreateGroupDialog
            open={openDialog}
            handleClose={handleCloseDialog}
            friends={friends?.friends}
          />
        )}
      
      </AutofillProvider>
    </>
  );
};

export default GroupSection;
