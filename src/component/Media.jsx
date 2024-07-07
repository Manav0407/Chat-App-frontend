import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  Tabs,
  Tab,
  Grid,
} from "@mui/material";
import { ArrowLeft } from "phosphor-react";
// import useResponsive from "../../hooks/useResponsive";
import { useDispatch, useSelector } from "react-redux";
import { updateSideBarAction } from "../Redux/Action/ui.js";
import { faker } from "@faker-js/faker";
import { Video, DocMsg } from "./Modules/MessageType.jsx";
import { useParams } from "react-router-dom";
import { useGetMessagesQuery } from "../Redux/Api/api.js";

const Media = () => {
  const dispatch = useDispatch();

  const theme = useTheme();

  //   const isDesktop = useResponsive("up", "md");

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const params = useParams();

  const { user } = useSelector((state) => state.auth);

  const chatId = params.chatId;

  const { data: messages } = useGetMessagesQuery({ chatId });

  const Images = messages?.messages?.filter(
    (msg) => msg?.attachment_type === "Images"
  );

  const onlyPhtos = [];

  for (let i = 0; i < Images?.length; i++) {
    onlyPhtos.push(Images[i]?.attachments[0]);
  }

  const videos = messages?.messages?.filter(
    (msg) => msg?.attachment_type === "Videos"
  );

  const onlyVideos = [];

  for (let i = 0; i < videos?.length; i++) {
    onlyVideos.push(videos[i]?.attachments[0]);
  }

  const Audios = messages?.messages?.filter(
    (msg) => msg?.attachment_type === "Audios"
  );

  const onlyAudios = [];

  for (let i = 0; i < Audios?.length; i++) {
    onlyAudios.push(Audios[i]?.attachments[0]);
  }

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
            sx={{ height: "100%", p: 2 }}
            direction="row"
            alignItems={"center"}
            spacing={3}
          >
            <IconButton
              onClick={() => {
                dispatch(updateSideBarAction("Content"));
              }}
            >
              <ArrowLeft />
            </IconButton>
            <Typography variant="subtitle2">Shared</Typography>
          </Stack>
        </Box>

        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Photos" />
          <Tab label="Videos" />
          <Tab label="Audios" />
        </Tabs>
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflow: "scroll",
          }}
          spacing={3}
          padding={value === 1 ? 1 : 3}
          className="w-full h-42 overflow-y-scroll no-scrollbar"
        >
          {/* <Conversation starred={true} /> */}
          {(() => {
            switch (value) {
              case 0:
                return (
                  <Grid container spacing={2}>
                    {onlyPhtos.length > 0 ? (
                      onlyPhtos.map((el) => (
                        <Grid item xs={4}>
                          <a href={el?.url} target="_blank">
                            <img
                              src={el?.url}
                              alt={faker.internet.userName()}
                              height={"100rem"}
                              width={"100rem"}
                            />
                          </a>
                        </Grid>
                      ))
                    ) : (
                      <Stack
                        sx={{ width: "100%", height: "20rem" }}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <Typography>Photos are not available.</Typography>
                      </Stack>
                    )}
                  </Grid>
                );
              case 1:
                return (
                  <Grid container spacing={2}>
                    {onlyVideos.length > 0 ? (
                      onlyVideos.map((el) => (
                        <Grid item xs={4}>
                          <a href={el?.url} target="_blank">
                            <Box sx={{ height: "5rem", width: "5rem" }}>
                              <video
                                src={el?.url}
                                height={"100rem"}
                                width={"100rem"}
                              />
                            </Box>
                          </a>
                        </Grid>
                      ))
                    ) : (
                      <Stack
                        sx={{ width: "100%", height: "20rem" }}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <Typography>Videos are not available.</Typography>
                      </Stack>
                    )}
                  </Grid>
                );

              case 2:
                return (
                  <Stack spacing={2}>
                    {onlyAudios.length > 0 ? (
                      onlyAudios.map((el) => (
                        <a href={el?.url} target="_blank">
                          <Box sx={{ width: "100%" }}>
                            <audio src={el?.url} controls />
                          </Box>
                        </a>
                      ))
                    ) : (
                      <Stack
                        sx={{ width: "100%", height: "20rem" }}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <Typography>Audios are not available.</Typography>
                      </Stack>
                    )}
                  </Stack>
                );

              default:
                break;
            }
          })()}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Media;
