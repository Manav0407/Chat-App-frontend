import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Link,
  Divider,
  InputBase,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import GroupSection from "../component/GroupSection";
import Conversation from "../component/Conversation";
import { useParams } from "react-router-dom";
import GroupDetails from "../component/GroupDetails";

const GroupMain = () => {
  const { sidebar } = useSelector((state) => {
    return state.ui;
  });

  const theme = useTheme();

  const parmas  =  useParams();
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
          <GroupDetails/>
        </Box>
      </Stack>
    </>
  );
};

export default GroupMain;
