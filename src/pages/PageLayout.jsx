import React, { Children } from "react";
import { useLocation } from "react-router-dom";
import DashBoard from "../component/DhashBoard";
import { Stack } from "@mui/material";

const PageLayout = ({Children}) => {
  const { pathname } = useLocation();
  return (
    <Stack>
      {pathname !== "/signin" && pathname !== "/signup" ? <DashBoard /> : null}
      {Children}
    </Stack>
  );
};

export default PageLayout;
