import { createSlice } from "@reduxjs/toolkit";
import { localStorageHandler } from "../../helper/feature";

const initialState = {
  notification:localStorageHandler({key:"NOTIFICATION",get:true})|| 0,
  newMessageAlert: localStorageHandler({key:"NEW_MESSAGE_ALERT",get:true}) || [
    {
      chatId: "",
      count: 0,
    },
  ],
  lastMessage: "",
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    incrementNotifications: (state, action) => {
      state.notification = state.notification + 1;
    },
    resetNotifications: (state, action) => {
      state.notification = 0;
    },
    setNewMessageAlert: (state, action) => {
      const index = state.newMessageAlert.findIndex(
        (item) => item.chatId === action.payload.chatId
      );
      if (index !== -1) {
        state.newMessageAlert[index].count += 1;
      } else {
        state.newMessageAlert.push({
          chatId: action.payload.chatId,
          count: 1,
        });
      }
    },
    removeNewMessageAlert: (state, action) => {
      state.newMessageAlert = state.newMessageAlert?.filter(
        (item) => item.chatId !== action.payload
      );
    },
  },
});

export const {
  incrementNotifications,
  resetNotifications,
  setNewMessageAlert,
  removeNewMessageAlert,
} = chatSlice.actions;
