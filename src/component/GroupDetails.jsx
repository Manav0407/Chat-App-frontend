import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useAvailableFriendsQuery,
  useGetChatDetailsQuery,
  useRemoveMemberMutation,
} from "../Redux/Api/api";
import ChatElement from "./Modules/ChatElement";
import { MdDelete } from "react-icons/md";
import { useAsyncMutation, useErrors } from "../hooks/hooks";
import { Toaster } from "react-hot-toast";
import UserElement from "./Modules/UserElement";
import AddMemberDialog from "./Modules/AddMemberDialog";
import DeleteGroupDialog from "./Modules/DeleteGroupDialog";
const GroupDetails = () => {
  const params = useParams();
  const chatId = params.chatId;
  const { isError, isLoading, error, data } = useGetChatDetailsQuery({
    chatId,
    populate: true,
  });

  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);

  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(
    useRemoveMemberMutation
  );

  const handleRemoveMember = (userId) => {
    removeMember("Member removed successfully", { chatId, userId });
  };

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = React.useState();

  const [openDelete,setOpenDelete] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleDeleteDialogOpen = () =>{
    setOpenDelete(true);
  }
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const theme = useTheme();
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
      alignItems={"center"}
      justifyContent={"center"}
      className="no"
    >
      <Stack
        direction={"row"}
        sx={{ height: "4rem", width: "100%" }}
        alignItems={"center"}
        justifyContent={"center"}
        marginTop={"3rem"}
        marginBottom={"3rem"}
      >
        <Typography variant="h4" fontFamily={"monospace"}>
          {data?.chat?.name}
        </Typography>
      </Stack>

      <Stack width={"100%"} alignItems={"center"} justifyContent={"center"}>
        <Stack
          sx={{
            width: "25rem",
            height: "25rem",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0px 0px 5px rgba(255,255,255, 0.15)"
                : "0px 0px 5px rgba(0, 0, 0, 0.15)",
            overflowY: "auto",
          }}
          spacing={2}
          alignItems={"center"}
          justifyContent={"center"}
          //   className="w-full h-full no-scrollbar"
        >
          <Typography variant="subtitle1">Remove Member</Typography>
          {isLoadingRemoveMember ? (
            <Typography variant="subtitle">Loading...</Typography>
          ) : (
            data?.chat?.members?.map((member) => {
              return (
                <>
                  <Stack
                    direction={"row"}
                    sx={{ width: "100%" }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <UserElement
                      key={member._id}
                      id={member._id}
                      username={member?.username}
                      avatar={member?.avatar}
                      isAdded={true}
                      handler={handleRemoveMember}
                    />
                  </Stack>
                </>
              );
            })
          )}
        </Stack>
      </Stack>
      <Stack
        direction={"row"}
        sx={{
          width: "100%",
          height: "5rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          <Button onClick={handleClickOpen}>
            <Typography variant="body2">Add Member</Typography>
          </Button>
        </Box>
        <Box>
          <Button sx={{ backgroundColor: "red" }} onClick={handleDeleteDialogOpen}>
            <Typography variant="body2">Delete Group</Typography>
          </Button>
        </Box>
      </Stack>

      <AddMemberDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        chatId={chatId}
      />
      <DeleteGroupDialog
        open={openDelete}
        onClose={handleCloseDelete}
        chatId={chatId}
      />
      <Toaster position="bottom-center" />
    </Box>
  );
};

export default GroupDetails;
