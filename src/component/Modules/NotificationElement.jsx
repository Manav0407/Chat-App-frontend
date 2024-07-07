import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import {
  Avatar,
  IconButton,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import {
  useAcceptRequestMutation,
  useGetNotificationQuery,
} from "../../Redux/Api/api";
import { useErrors } from "../../hooks/hooks";
import toast, { Toaster } from "react-hot-toast";

const NotificationElement = ({ username, avatar, id ,handler}) => {
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
          width: "20rem",
          borderRadius: 1,
          backgroundColor: true
            ? theme.palette.mode === "light"
              ? alpha(theme.palette.primary.main, 0.5)
              : theme.palette.primary.main
            : theme.palette.mode === "light"
            ? "#fff"
            : theme.palette.primary.main,

          boxShadow:
            theme.palette.mode === "dark"
              ? "0px 0px 2px rgba(255,255,255, 0.15)"
              : "0px 0px 2px rgba(255,255,255, 0.15)",
        }}
      >
        <Avatar
          alt={"name"}
          src={avatar}
          sx={{
            m: 1,
            width: "4rem",
            height: "4rem",
            objectFit: "contain",
          }}
        />

        <Typography variant="h6">
          <u>{username}</u>
        </Typography>
        <Stack>
          <IconButton onClick={() => handler({ id, accept: true })}>
            <Typography variant="body2" color={"green"}>
              Accept
            </Typography>
          </IconButton>
          <IconButton onClick={() => handler({ id, accept: false})}>
            <Typography variant="body2" color={"red"}>
              Reject
            </Typography>
          </IconButton>
        </Stack>
      </Stack>
    </>
  );
};

export default NotificationElement;
