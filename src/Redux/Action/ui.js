import { toggleSideBar, updateSideBar } from "../Reducer/uiSlice";

export const toggleSideBarAction = () => async (dispatch) => {
  dispatch(toggleSideBar());
};

export const updateSideBarAction = (type) => async (dispatch) => {
    // console.log(type)
  dispatch(updateSideBar(type));
};
