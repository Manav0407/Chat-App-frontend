import { Box, Stack } from "@mui/material";
import React from "react";
import { DNA } from "react-loader-spinner";

const Loader = () => {
  return (
    <>
      <Stack
        sx={{ height: "100vh", width: "100vw" }}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <DNA
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </Stack>
    </>
  );
};

export default Loader;


