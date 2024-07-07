import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Icon,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {emailVarification} from "../Redux/Action/auth.js"
import toast, { Toaster } from "react-hot-toast";

const EmailVarification = () => {

  const [verify, setVerify] = useState(false);

  const params = useParams();

  const dispatch = useDispatch();

  // console.log(params.id);
  // console.log(params.token);

  const handleVerify = async()=>{
    await dispatch(emailVarification(params.id,params.token));
    setVerify(true);

  }

  const {message,error} = useSelector((state)=>{
    return state.auth;
  })

  useEffect(()=>{
    if(message){
      toast.success(message);
    }
    if(error){
      toast.error(error);
    }
  })
  


  return (
    <>
      <Stack
        sx={{ height: "100vh", width: "100%" }}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Stack
          sx={{
            height: "50%",
            width: "50%",
            borderColor: "black",
            borderRadius: 4,
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.35)",
          }}
          direction={"column"}
          alignItems={"center"}
          justifyContent={"space-between"}
          p={10}
        >
          {!verify ? (
            <>
              <Typography
                variant="h4"
                fontFamily={"monospace"}
                fontWeight={900}
              >
                Verify your email
              </Typography>

              <Typography
                variant="h6"
                fontFamily={"monospace"}
                fontWeight={500}
              >
                Click on verify to verify your email...
              </Typography>

              <Button
                color="primary"
                fullWidth
                onClick={handleVerify}
                className="w-full rounded-md bg-gradient-to-r from-[#ff6b6b] to-[#ffa500] px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-gradient-to-l from-[#ff6b6b] to-[#ffa500] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <Typography variant="body1" fontWeight={600}>
                  Verify
                </Typography>
              </Button>
            </>
          ) : (
            <>
              <Typography
                variant="h4"
                fontFamily={"monospace"}
                fontWeight={900}
              >
                Your email is Verified.
              </Typography>
              <IoCheckmarkDoneCircleSharp size={120} color="green" />
              <Link to={"/signin"}>
                <Box sx={{ width: "600px" }}>
                  <Button
                    color="primary"
                    fullWidth
                    className="w-full rounded-md bg-gradient-to-r from-[#ff6b6b] to-[#ffa500] px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-gradient-to-l from-[#ff6b6b] to-[#ffa500] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    <Typography variant="body1" fontWeight={600}>
                      Go to signin page
                    </Typography>
                  </Button>
                </Box>
              </Link>
            </>
          )}
        </Stack>
      </Stack>
    <Toaster position="bottom-center"/>
    </>
  );
};

export default EmailVarification;
