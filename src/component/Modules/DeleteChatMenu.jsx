import { Button, Menu, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { setIsDeleteMenu } from "../../Redux/Reducer/miscSlice";
import { MdDelete } from "react-icons/md";
import { useAsyncMutation } from "../../hooks/hooks";
import {
  useDeleteGroupMutation,
  useLeaveGroupMutation,
} from "../../Redux/Api/api";

const DeleteChatMenu = ({ dispatch, deleteMenuAnchor }) => {
  const { isDeleteMenu } = useSelector((state) => state.misc);

  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
  };

  const { selectedDeleteChat } = useSelector((state) => state.misc);
  const [deleteChat, isLoadingDeleteChat] = useAsyncMutation(
    useDeleteGroupMutation
  );

  const [leaveGroup, isLoadingLeaveGroup] = useAsyncMutation(
    useLeaveGroupMutation
  );

  const deleteChatHandler = () => {
    closeHandler();
    deleteChat("Deleting chat...", selectedDeleteChat.chatId);
  };

  const leaveGroupHandler = () => {
    closeHandler();
    leaveGroup("Leaving group...", selectedDeleteChat.chatId);
  };

  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={deleteMenuAnchor.current}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
    >
      <Stack
        sx={{ cursor: "pointer" }}
        direction={"row"}
        alignItems={"center"}
        spacing={"0.5rem"}
      >
        {selectedDeleteChat?.isGroup ? (
          <Button onClick={leaveGroupHandler}>Leave Group</Button>
        ) : (
          <Button onClick={deleteChatHandler}>Delete Chat</Button>
        )}
      </Stack>
    </Menu>
  );
};

export default DeleteChatMenu;
