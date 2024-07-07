import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isNewGroup : false,
    isAddMembers : false,
    isNotification:false,
    isMobileMenuFriend : false,
    isSearch:false,
    isFileMenu: false,
    isDeleteMenu: false,
    uploadingLoader:false,
    selectedDeleteChat:{
        chatId : "",
        groupChat : false,
    }
};

export const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {

    setIsNewGroup: (state, action) => {
      state.isNewGroup = action.payload;
    },
    setIsAddMembers: (state, action) => {
      state.isAddMembers = action.payload;
    },
    setIsNotification: (state, action) => {
      state.isNotification = action.payload;
    },
    setIsMobileMenuFriend: (state, action) => {
      state.isMobileMenuFriend = action.payload;
    },
    setIsSearch: (state, action) => {
      state.isSearch = action.payload;
    },
    setIsFileMenu: (state, action) => {
      state.isFileMenu = action.payload;
    },
    setIsDeleteMenu: (state, action) => {
      state.isDeleteMenu = action.payload;
    },
    setUploadingLoader: (state, action) => {
      state.uploadingLoader = action.payload;
    },
    setSelectedDeleteChat:(state,action) => {
        state.selectedDeleteChat = action.payload;
    }
    
  },
});

export const {
    setIsNewGroup,
    setIsAddMembers,
    setIsNotification,
    setIsMobileMenuFriend,
    setIsSearch,
    setIsFileMenu,
    setIsDeleteMenu,
    setUploadingLoader,
    setSelectedDeleteChat
} = miscSlice.actions;
