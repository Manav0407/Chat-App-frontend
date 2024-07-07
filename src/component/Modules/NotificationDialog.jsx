import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import {
  Avatar,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import {
  useAcceptRequestMutation,
  useGetNotificationQuery,
} from "../../Redux/Api/api";
import { useErrors } from "../../hooks/hooks";
import toast, { Toaster } from "react-hot-toast";
import NotificationElement from "./NotificationElement";
import { useDispatch } from "react-redux";

const NotificationDialog = (props) => {
  const { onNotiClose, noti, openNoti } = props;

  const handleClose = () => {
    onNotiClose();
  };

  const { isError, data, isLoading, error } = useGetNotificationQuery();

  // console.log(data);

  useErrors([{ isError, error }]);

  const [acceptRequest] = useAcceptRequestMutation();

  const requestHandler = async ({ id, accept }) => {
    // console.log("id",id,accept);
    try {
      const res = await acceptRequest({ requestId: id, accept });

      if (res.data) {
        console.log("use socket");
        toast.success(res.data.message);
      } else {
        toast.error(res?.data?.error || "something went wrong ");
      }
    } catch (error) {
      toast.error(error?.message || "something went wrong");
      console.log(error);
    }
  };




  return (
    <>
      <Dialog onClose={handleClose} open={openNoti}>
        <DialogTitle>All Requests</DialogTitle>
        <Stack
          direction={"column"}
          sx={{ maxHeight: "1000rem", minHeight: "10rem" }}
          p={2}
        >
          <Stack
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={2}
            overflow={"scroll"}
            className="w-full overflow-y-scroll no-scrollbar"
          >
            {isLoading ? (
              <Typography>Loading...</Typography>
            ) : data?.allRequests.length > 0 ? (
              data?.allRequests.map((req) => {
                return (
                  <NotificationElement
                    key={req?._id}
                    id={req?._id}
                    username={req?.sender?.username}
                    avatar={req?.sender?.avatar}
                    handler={requestHandler}
                  />
                );
              })
            ) : (
              <Typography>No Requests.</Typography>
            )}
          </Stack>
        </Stack>
      </Dialog>
      <Toaster position="botton-center" />
    </>
  );
};

NotificationDialog.propTypes = {
  onClose: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default NotificationDialog;
