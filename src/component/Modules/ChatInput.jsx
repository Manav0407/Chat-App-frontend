import { MdOutlineAudioFile } from "react-icons/md";
import { TbPhoto } from "react-icons/tb";
import { FaRegFileLines } from "react-icons/fa6";
import { HiLink } from "react-icons/hi2";
import { FaRegFileVideo } from "react-icons/fa";

import { styled } from "@mui/material/styles";
import {
  Stack,
  IconButton,
  TextField,
  InputAdornment,
  Fab,
  Tooltip,
} from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { setUploadingLoader } from "../../Redux/Reducer/miscSlice";
import { useSendAttachmentsMutation } from "../../Redux/Api/api";

export const ChatInput = ({chatId}) => {
  const dispatch = useDispatch();

  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const fileRef = useRef(null);

  const selectRef = (ref) => {
    ref.current.click();
  };

  const selectImage = () => {
    imageRef.current?.click();
    setActionOpen(false);
  };
  const selectVideo = () => {
    videoRef.current?.click();
    setActionOpen(false);
  };
  const selectAudio = () => {
    audioRef.current?.click();
    setActionOpen(false);
  };
  const selectFile = () => {
    fileRef.current?.click();
    setActionOpen(false);
  };

  const {} = useSelector((state) => state.misc);
  const [actionOpen, setActionOpen] = useState();
  const [anchor,setAnhor] = useState(null);

  const openHandler = (e)=>{
      setActionOpen((prev)=>!prev);
      setAnhor(e.currentTarget);
  }

  const [sendAttachments] = useSendAttachmentsMutation();

  const fileChangeHandler = async (e, key) => {
    const files = Array.from(e.target.files);

    if (files.length <= 0) {
      return;
    }

    if (files.length > 5) {
      return toast.error(`You can only send 5 ${key} at a time.`);
    }

    dispatch(setUploadingLoader(true));

    const toastId = toast.loading(`sending ${key}`);

    try {
      const myFrom = new FormData();

      myFrom.append("chatId",chatId);
      myFrom.append("type",key);
      files.forEach((file) => myFrom.append("files", file));

      const res = await sendAttachments(myFrom);


      if (res.data) {
        toast.success(`${key} Sent successfully`, { id: toastId });
        dispatch(setUploadingLoader(false));
      }
      else{
        toast.error(`${key} failed to send`, { id: toastId });
        dispatch(setUploadingLoader(false));
        // console.log(error.message);
      }
    } catch (error) {
      toast.error(error, { id: toastId });
      // console.log(error)
    } finally {
      setUploadingLoader(false);
    }
  };

  return (
    <>
      <Stack sx={{ width: "max-content" }}>
        <Stack
          sx={{ position: "relative", display: actionOpen ? "inline" : "none" }}
        >
          <Tooltip title="Photos" placement="right">
            <Fab
              sx={{
                position: "absolute",
                top: -92,
                backgroundColor: "#1b8cfe",
              }}
              onClick={selectImage}
            >
              <TbPhoto size={25} />
              <input
                type="file"
                multiple
                accept="image/jpeg , image/png, image/gif"
                style={{ display: "none" }}
                onChange={(e) => fileChangeHandler(e, "Images")}
                ref={imageRef}
              />
            </Fab>
          </Tooltip>

          <Tooltip title="Audio" placement="right">
            <Fab
              sx={{
                position: "absolute",
                top: -152,
                backgroundColor: "#0172e4",
              }}
              onClick={selectAudio}
            >
              <MdOutlineAudioFile size={25} />
              <input
                type="file"
                multiple
                accept="audio/mpeg, audio/wav"
                style={{ display: "none" }}
                onChange={(e) => fileChangeHandler(e, "Audios")}
                ref={audioRef}
              />
            </Fab>
          </Tooltip>

          <Tooltip title="Videos" placement="right">
            <Fab
              sx={{
                position: "absolute",
                top: -212,
                backgroundColor: "#0159b2",
              }}
              onClick={selectVideo}
            >
              <FaRegFileVideo size={25} />
              <input
                type="file"
                multiple
                accept="video/mp4, video/webm, video/ogg"
                style={{ display: "none" }}
                onChange={(e) => fileChangeHandler(e, "Videos")}
                ref={videoRef}
              />
            </Fab>
          </Tooltip>

          <Tooltip title="Files" placement="right">
            <Fab
              sx={{
                position: "absolute",
                top: -272,
                backgroundColor: "#013f7f",
              }}
              onClick={selectFile}
            >
              <FaRegFileLines size={25} />
              <input
                type="file"
                multiple
                accept="*"
                style={{ display: "none" }}
                onChange={(e) => fileChangeHandler(e, "Files")}
                ref={fileRef}
              />
            </Fab>
          </Tooltip>
        </Stack>
        <InputAdornment>
          <IconButton
            onClick={openHandler}
          >
            <HiLink size={25} />
          </IconButton>
        </InputAdornment>
      </Stack>
      <Toaster position="bottom-center" />
    </>
  );
};
