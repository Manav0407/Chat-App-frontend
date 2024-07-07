import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";

import {
  Box,
  IconButton,
  Input,
  InputBase,
  Stack,
  Typography,
  alpha,
  styled,
  useTheme,
} from "@mui/material";
import { PiMagnifyingGlass } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import UserElement from "./UserElement";
import {
    useAddMemberMutation,
  useAvailableFriendsQuery,
  useLazySearchUserQuery,
} from "../../Redux/Api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hooks";

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

const AddMemberDialog = (props) => {
  const theme = useTheme();
  const { onClose, selectedValue, open, chatId } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const dispatch = useDispatch();

  const {
    isError: friendIsError,
    error: friendError,
    isLoading: friendIsLoading,
    data: friends,
  } = useAvailableFriendsQuery(chatId);
  const errorsFriends = [
    {
      friendIsError,
      friendError,
    },
  ];
  useErrors(errorsFriends);
  const [addMembers,isLoadingAddMembers] = useAsyncMutation(useAddMemberMutation) 

  const addFriendHandler = (userId)=>{
    const members = []
    members.push(userId);
    addMembers("Adding Members...",{chatId,members});
  }


  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <Stack
          direction={"column"}
          sx={{ maxHeight: "25rem", height: "15rem", width: "20rem" }}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Stack alignItems={"center"} justifyContent={"center"}>
            <Typography variant="h5">Add Members</Typography>
          </Stack>
          <Stack
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={2}
            overflow={"scroll"}
            className="w-full overflow-y-scroll no-scrollbar"
          >
            {friendIsLoading ? (
              <Typography>Loading...</Typography>
            ) : friends?.friends?.length === 0 ? (
              <Typography>No friends available</Typography>
            ) : (
              friends?.friends?.map((user, index) => {
                return (
                  <Box p={3}>
                    <UserElement
                      key={user?._id}
                      id={user?._id}
                      username={user?.username}
                      avatar={user?.avatar}
                      isGroup={true}
                      handler={addFriendHandler}
                    />
                  </Box>
                );
              })
            )}
          </Stack>
        </Stack>
      </Dialog>
    </>
  );
};

AddMemberDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
export default AddMemberDialog;
