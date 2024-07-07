import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  Slide,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
  AvatarGroup,
  Grid,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import {
  Bell,
  CaretRight,
  Phone,
  Prohibit,
  Trash,
  VideoCamera,
  X,
} from "phosphor-react";
import React, { useEffect, useState } from "react";
import AntSwitch from "./Modules/AntSwitch";
import { toggleSideBarAction, updateSideBarAction } from "../Redux/Action/ui";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetChatDetailsQuery, useGetMessagesQuery } from "../Redux/Api/api";
import { useErrors } from "../hooks/hooks";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteChatDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Delete this chat</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete this chat?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

const Content = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [openBlock, setOpenBlock] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleCloseBlock = () => {
    setOpenBlock(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const params = useParams();

  // console.log("chat",params.chatId);

  const { user } = useSelector((state) => state.auth);

  const chatId = params.chatId;

  const { data, isError, error, isLoading } = useGetChatDetailsQuery({
    chatId,
    populate: true,
  });

  const others = data?.chat.members?.filter(
    (member) => member?._id !== user?._id
  )[0];

  const temp = data?.chat?.members;
  const avatararr = [];
  for (let i = 0; i < temp?.length; i++) {
    avatararr.push(temp[i].avatar);
  }

  console.log(data);

  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);

  const { data: messages } = useGetMessagesQuery({ chatId });

  // console.log(messages);

  const Images = messages?.messages?.filter(
    (msg) => msg?.attachment_type === "Images"
  );

  const onlyPhtos = [];

  // console.log(Images.length);

  for (let i = 0; i < Images?.length; i++) {
    if (i > 9) return;
    onlyPhtos.push(Images[i]?.attachments[0]);
  }

  // console.log(onlyPhtos);

  // console.log(data);

  return (
    <Box sx={{ width: 320, maxHeight: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        <Box
          sx={{
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            width: "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
          }}
        >
          <Stack
            sx={{ height: 77, p: 2 }}
            direction="row"
            alignItems={"center"}
            justifyContent="space-between"
            spacing={3}
          >
            <Typography variant="subtitle2">Info</Typography>
            <IconButton
              onClick={() => {
                dispatch(toggleSideBarAction());
              }}
            >
              <X />
            </IconButton>
          </Stack>
        </Box>
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflow: "scroll",
          }}
          p={3}
          spacing={3}
          className="w-full h-42 overflow-y-scroll no-scrollbar"
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            {data?.chat?.groupChat ? (
              <AvatarGroup>
                {avatararr.map((e, index) => {
                  return <Avatar key={index} src={e} />;
                })}
              </AvatarGroup>
            ) : (
              <Avatar
                sx={{ height: "50px", width: "50px" }}
                src={others?.avatar}
              />
            )}
            <Stack spacing={0.5}>
              <Typography variant="article" fontWeight={600}>
                {data?.chat?.groupChat ? data?.chat?.name : others?.username}
              </Typography>
            </Stack>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Typography variant="subtitle2">Media, Videos & Audios</Typography>
            <Button
              onClick={() => {
                dispatch(updateSideBarAction("Shared"));
              }}
              endIcon={<CaretRight />}
            >
              {Images?.length}
            </Button>
          </Stack>
          {/* <Stack direction={"row"} alignItems="center" spacing={2}> */}
          <Stack
            sx={{
              height: "100%",
              position: "relative",
              flexGrow: 1,
              overflow: "scroll",
            }}
            spacing={3}
            // padding={1}
            className="w-full h-42 overflow-y-scroll no-scrollbar"
          >
            <Grid container>
              {onlyPhtos?.map((el) => {
                return (
                  <Grid item xs={4}>
                    <Box sx={{ height: "5rem", width: "5rem" }}>
                      <a href={el?.url} target="_blank">
                        <img src={el?.url} alt={faker.internet.userName()} />
                      </a>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Stack>

          <Divider />
          <Stack direction="row" alignItems={"center"} spacing={2}>
            <Button
              onClick={() => {
                setOpenDelete(true);
              }}
              fullWidth
              startIcon={<Trash />}
              variant="outlined"
            >
              Delete chat
            </Button>
          </Stack>
        </Stack>
      </Stack>

      {openBlock && (
        <BlockDialog open={openBlock} handleClose={handleCloseBlock} />
      )}
      {openDelete && (
        <DeleteChatDialog open={openDelete} handleClose={handleCloseDelete} />
      )}
    </Box>
  );
};

export default Content;
