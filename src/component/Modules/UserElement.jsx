import { Avatar, IconButton, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import { faker } from "@faker-js/faker";
import { useSendRequestMutation } from "../../Redux/Api/api";
import toast, { Toaster } from "react-hot-toast";
import { useAsyncMutation } from "../../hooks/hooks";
import { IoMdRemoveCircle } from "react-icons/io";
import AddMemberDialog from "./AddMemberDialog";

const UserElement = ({ username, avatar, id, isAdded, handler,isGroup }) => {
  const [sendRequest, isLoading] = useAsyncMutation(useSendRequestMutation);

  const sendRequestHandler = async () => {
    await sendRequest("Sending Request...", { userId: id });
  };
  const theme = useTheme();
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        alignItems={"center"}
        justifyContent={"space-between"}
        p={1}
        sx={{
          width: "18rem",
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
      >
        <Avatar alt={"name"} src={avatar} />

        <Stack
          spacing={0.3}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography variant="subtitle2">{username}</Typography>
        </Stack>
        {isAdded && (
          <IconButton onClick={() => handler(id)}>
            <IoMdRemoveCircle />
          </IconButton>
        ) 
      }
        {!isAdded && !isGroup &&(
          <IconButton onClick={sendRequestHandler}>
            <IoMdAddCircle />
          </IconButton>
        )}
        {
          isGroup && (
            <IconButton onClick={()=>handler(id)}>
              <IoMdAddCircle />
            </IconButton>
          )
        }
      </Stack>
     
      <Toaster position="bottom-center" />
    </>
  );
};

export default UserElement;
