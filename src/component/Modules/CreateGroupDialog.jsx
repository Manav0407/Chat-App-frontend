import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormProvider from "../hook-form/FormProvider.jsx";
import RHFTextField from "../hook-form/RHFTextField.jsx";
import RHFAutocomplete, { AutofillContext } from "../hook-form/RHFAutocomplete.jsx";
import { Stack } from "@mui/material";
import { useAvailableFriendsQuery, useCreateGroupMutation } from "../../Redux/Api/api.js";
import { useAsyncMutation, useErrors } from "../../hooks/hooks.jsx";
import toast, { Toaster } from "react-hot-toast";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const CreateGroupForm = ({ handleClose,friends }) => {
  const NewGroupSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    members: Yup.array().min(2, "Must have at least two member"),
  });

  const defaultValues = {
    title: "",
    members: [],
  };

  const methods = useForm({
    resolvere: yupResolver(NewGroupSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const [newGroup,isLoading] = useAsyncMutation(useCreateGroupMutation)

  const {value} = useContext(AutofillContext);

  const members = [];

  for(let i = 0; i < value.length; i++) {
    members.push(value[i]._id);
  }

  const onSubmit = async (data) => {

    if(!data.title) return toast.error("Group title is required.")

    if(members.length < 2) return toast.error("Select atleast 2 members.")
    
    newGroup("Group is Created",{name: data.title,members})

  };

 
  return (
    <>
   
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <RHFTextField name="title" label="Title" />
          <RHFAutocomplete
            name="members"
            label="Members"
            multiple
            freeSolo
            options={friends}
            ChipProps={{ size: "medium" }}
          />
          <Stack
            spacing={2}
            direction={"row"}
            alignItems="center"
            justifyContent={"end"}
          >
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Create
            </Button>
          </Stack>
        </Stack>
        <Toaster position="bottom-center"/>
      </FormProvider>
    </>
  );
};

const CreateGroupDialog = ({ open, handleClose,friends }) => {
  // console.log(friends)
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Create New Group</DialogTitle>
        <DialogContent>
          <CreateGroupForm handleClose={handleClose} friends={friends}/>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateGroupDialog;
