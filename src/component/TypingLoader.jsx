
import { Skeleton, Stack, Typography, keyframes, styled, useTheme } from "@mui/material";
import React from "react";

const bounceAnimation = keyframes`
    0% {transform:scale(1);}
    50% {transform:scale(2);}
    100% {transform:scale(1);}

`;
const BouncingSkeleton = styled(Skeleton)(() => ({
  animation: `${bounceAnimation} 1s infinite`,
}));

const TypingLoader = () => {
  const theme = useTheme();
  return (
    <Stack
      spacing={"0.3rem"}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Typography fontSize={"12px"}>Typing</Typography>
      <BouncingSkeleton
        variant="circular"
        width={2}
        height={2}
        style={{
          animationDelay: "0.1s",
          backgroundColor: theme.palette.mode == "dark" ? "white" : "blue",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={2}
        height={2}
        style={{
          animationDelay: "0.3s",
          backgroundColor: theme.palette.mode == "dark" ? "white" : "blue",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={2}
        height={2}
        style={{
          animationDelay: "0.5s",
          backgroundColor: theme.palette.mode == "dark" ? "white" : "blue",
        }}
      />
    </Stack>
  );
};

export default TypingLoader;
