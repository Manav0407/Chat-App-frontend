import {
  Stack,
  Divider,
  Typography,
  useTheme,
  Box,
  Link,
  IconButton,
} from "@mui/material";
import React from "react";
import { IoDocumentText } from "react-icons/io5";
import { GoDownload } from "react-icons/go";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Message_options } from "../../data/Data";
import { useSelector } from "react-redux";
import moment from "moment";
import { MdOutlineAudioFile } from "react-icons/md";
import { IoPlayCircle } from "react-icons/io5";

const MessageOption = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  return (
    <>
      <PiDotsThreeVerticalBold
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      />
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Stack>
          {Message_options.map((e) => {
            return (
              <MenuItem onClick={handleClose}>
                <Typography variant="body2">{e.title}</Typography>
              </MenuItem>
            );
          })}
        </Stack>
        {/* <MenuItem onClick={handleClose}>asdjd</MenuItem>
          <MenuItem onClick={handleClose}>asdjkas</MenuItem> */}
      </Menu>
    </>
  );
};

export const Divide = ({ text }) => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Divider width="46%" />
      <Typography variant="caption" sx={{ color: theme.palette.text }}>
        {text}
      </Typography>
      <Divider width="46%" />
    </Stack>
  );
};

export const TextMsg = ({ message, userId, senderId, time }) => {
  const timeAgo = moment(time).fromNow();

  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      justifyContent={!(senderId === userId) ? "start" : "end"}
    >
      <Box
        p={1}
        sx={{
          backgroundColor: !(senderId === userId)
            ? theme.palette.mode === "light"
              ? "	#E5E4E2"
              : "#36454F"
            : theme.palette.primary.main,

          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Typography
          variant="inherit"
          fontWeight={700}
          color={!(senderId === userId) ? theme.palette.text : "#fff"}
        >
          {message?.content}
        </Typography>
        <Stack
          direction={"column"}
          alignItems={"baseline"}
          sx={{
            // background: "blue",
            borderRadius: 1.5,
          }}
        >
          <Typography fontSize={"8.5px"} color={"black"}>
            {timeAgo}
          </Typography>
        </Stack>
      </Box>
      {/* <MessageOption /> */}
    </Stack>
  );
};

export const ImageMsg = ({ message, userId, senderId, time }) => {
  const timeAgo = moment(time).fromNow();
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      justifyContent={!(senderId === userId) ? "start" : "end"}
    >
      <Box
        p={1.5}
        sx={{
          backgroundColor: !(senderId === userId)
            ? theme.palette.mode === "light"
              ? "#E5E4E2"
              : "#36454F"
            : theme.palette.primary.main,
          borderRadius: 1.5,
        }}
      >
        <Stack spacing={1}>
          {message?.attachments?.map((e) => {
            return (
              <a href={e?.url} target="_blank" download={true}>
                <img
                  src={e?.url}
                  alt={message?.attachment_type}
                  style={{ maxHeight: 210, borderRadius: "10px" }}
                />
              </a>
            );
          })}
          <Typography fontSize={"8.5px"} color={"black"}>
            {timeAgo}
          </Typography>
        </Stack>
      </Box>
      {/* <MessageOption /> */}
    </Stack>
  );
};

export const Video = ({ message, userId, senderId, time }) => {
  const timeAgo = moment(time).fromNow();
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      justifyContent={!(senderId === userId) ? "start" : "end"}
    >
      <Box
        p={1.5}
        sx={{
          backgroundColor: !(senderId === userId)
            ? theme.palette.mode === "light"
              ? "#E5E4E2"
              : "#36454F"
            : theme.palette.primary.main,
          borderRadius: 1.5,
        }}
      >
        <Stack spacing={1}>
          {message?.attachments?.map((e) => {
            return (
              <>
                <Stack alignItems={"center"} justifyContent={"center"}>
                  <a download={true}>
                    <video
                      src={e?.url}
                      alt={message?.attachment_type}
                      preload="none"
                      controls
                      style={{
                        maxHeight: 210,
                        borderRadius: "10px",
                      }}
                    />
                  </a>
                  {/* <Stack sx={{ position: "relative" }} top={"-135px"}>
                    <IconButton href={e?.url} target="_blank">
                      <IoPlayCircle size={50} color="white" />
                    </IconButton>
                  </Stack> */}
                </Stack>
              </>
            );
          })}
          <Typography fontSize={"8.5px"} color={"black"}>
            {timeAgo}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export const DocMsg = ({ message, userId, senderId, time }) => {
  const theme = useTheme();

  const timeAgo = moment(time).fromNow();

  return (
    <Stack
      direction={"row"}
      justifyContent={!(senderId === userId) ? "start" : "end"}
    >
      <Box
        p={1.5}
        sx={{
          backgroundColor: !(senderId === userId)
            ? theme.palette.mode === "light"
              ? "#E5E4E2"
              : "#36454F"
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={1}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={2}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
            p={1.5}
          >
            {message?.attachments?.map((e) => {
              return (
                <a href={e?.url} download={true}>
                  <IconButton>
                    <IoDocumentText size={25} />
                  </IconButton>
                </a>
              );
            })}
            {/* <Link href={message?.attachments?.url} target="_blank">
            <IconButton>
              <IoDocumentText size={25} />
            </IconButton>
            </Link> */}
            <Typography
              variant="caption"
              color={!(senderId === userId) ? theme.palette.text : "#fff"}
            >
              File
            </Typography>
            <IconButton>
              <GoDownload size={25} />
            </IconButton>
          </Stack>
          <Typography fontSize={"8.5px"} color={"black"}>
            {timeAgo}
          </Typography>
        </Stack>
      </Box>
      {/* <MessageOption /> */}
    </Stack>
  );
};

export const Audio = ({ message, userId, senderId, time }) => {
  const theme = useTheme();

  const timeAgo = moment(time).fromNow();

  return (
    <Stack
      direction={"row"}
      justifyContent={!(senderId === userId) ? "start" : "end"}
    >
      <Box
        p={1.5}
        sx={{
          backgroundColor: !(senderId === userId)
            ? theme.palette.mode === "light"
              ? "#E5E4E2"
              : "#36454F"
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        {message?.attachments?.map((e) => {
          return (
            <Stack spacing={1}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                spacing={2}
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 1,
                }}
                p={1.5}
              >
                <audio
                  src={e?.url}
                  preload="none"
                  controls
                  style={{
                    maxHeight: 210,
                    borderRadius: "10px",
                  }}
                />
              </Stack>
              <Typography fontSize={"8.5px"} color={"black"}>
                {timeAgo}
              </Typography>
            </Stack>
          );
        })}
      </Box>
      {/* <MessageOption /> */}
    </Stack>
  );
};
