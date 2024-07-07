import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  sidebar : {
    open: false,
    type: "contact",
  }
};

const sideBarSlice = createSlice({
    name: "sideBar",
    initialState,
    reducers: {
      toggleSideBar(state,action){
            state.sidebar.open = !state.sidebar.open;
      },
      updateSideBar(state,action){
             state.sidebar.type = action.payload;
      }
    },
  });

export {sideBarSlice};

export const {toggleSideBar,updateSideBar} = sideBarSlice.actions;
