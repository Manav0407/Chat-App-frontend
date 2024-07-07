import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Link,
  Divider,
  InputBase,
} from "@mui/material";
import { MagnifyingGlass, Plus } from "phosphor-react";
import { alpha, styled, useTheme } from "@mui/material/styles";
// import { SimpleBarStyle } from "../../components/Scrollbar";
import { ChatList } from "../data/Data.js";
import ChatElement from "./Modules/ChatElement.jsx";
import { useLocation } from "react-router-dom";
import CreateGroupDialog from "./Modules/CreateGroupDialog.jsx";
import NoChat from "../assets/NoChat.jsx";
import GroupSection from "./GroupSection.jsx";
import { useSelector } from "react-redux";
// import CreateGroup from "../../sections/dashboard/CreateGroup";

const Group = () => {

  const { sidebar } = useSelector((state) => {
    return state.ui;
  });

  const theme = useTheme();
  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        {/* Left */}
        <GroupSection />
        <Box
          sx={{
            height: "100%",
            width: sidebar.open ? "calc(100vw - 740px)" : "calc(100vw - 420px)",
            backgroundColor: "#fff",
          }}
        >
          <Stack
            sx={{
              height: "100%",
              width: "100%",
              background:
                theme.palette.mode === "light" ? "#F8FAFF" : "#292a2b",
            }}
            spacing={2}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <NoChat />
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default Group;
