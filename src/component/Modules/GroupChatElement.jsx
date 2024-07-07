import React, { useState } from "react";
import { Box, Badge, Stack, Avatar, Typography, AvatarGroup } from "@mui/material";
import { styled, useTheme, alpha } from "@mui/material/styles";
import { Link, useSearchParams } from "react-router-dom";
import { faker } from "@faker-js/faker";
// import { useDispatch, useSelector } from "react-redux";

const truncateText = (string, n) => {
  return string?.length > n ? `${string?.slice(0, n)}...` : string;
};

const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));

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

export const GroupChatElement = ({ avatar, name, unread, chatId ,handleDeleteChat,isGroup}) => {
  const theme = useTheme();
  return (
  <Link to={chatId && `/group/${chatId}`}
    onContextMenu={(e)=>{handleDeleteChat(e,chatId,isGroup)}}
  >
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
          {" "}
          <AvatarGroup max={3} spacing="small">
            {
                avatar?.map((e)=>{
                    return <Avatar key={e} src={e} />
                })
            }
          </AvatarGroup>
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
            <Typography variant="caption">{truncateText("msg", 20)}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems={"center"}>
          <Typography sx={{ fontWeight: 600 }} variant="caption">
            {"12:00"}
          </Typography>
          {unread &&
            unread.length > 1 &&
            unread.map((e) => {
              return e.chatId === chatId ? (
                <Badge
                  className="unread-count"
                  color={theme.palette.mode === "dark" ? "error" : "primary"}
                  badgeContent={e.count > 9 ? "9+" : e.count}
                />
              ) : null;
            })}
        </Stack>
      </Stack>
    </StyledChatBox>
    </Link>
  );
};

