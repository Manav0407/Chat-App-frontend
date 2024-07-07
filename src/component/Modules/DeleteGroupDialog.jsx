import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useAsyncMutation } from "../../hooks/hooks";
import { useDeleteGroupMutation } from "../../Redux/Api/api";
import { useNavigate } from "react-router-dom";

const DeleteGroupDialog = ({ open, onClose,chatId }) => {
  const theme = useTheme();

  const [deleteGroup,isLoadingDeleteGroup] = useAsyncMutation(useDeleteGroupMutation);

  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
  };
  const handleClick = async () => {
    await deleteGroup("Deleting Group...",chatId);
    navigate("/group");
    onClose();
  };
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Delete Group"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this group ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            NO
          </Button>
          <Button onClick={handleClick} autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteGroupDialog;
