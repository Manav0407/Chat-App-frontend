import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Group from "./component/Group";
import DashBoard from "./component/DhashBoard";
import { Stack } from "@mui/material";
import Location from "./pages/Location";
import Profile from "./pages/Profile"; 
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./Redux/Action/auth";
import EmailVarification from "./pages/EmailVarification";
import { SocketProvider } from "./utils/Socket";
import ChatMain from "./pages/ChatMain";
import GroupMain from "./pages/GroupMain";
import About from "./component/Modules/About";
import dotenv from "dotenv";
import ChatBotMain from "./pages/ChatBotMain";
function App() {

  

  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(loadUser());
  },[]);

  const {pathname} = useLocation();
  return (
    <>
      <Stack direction={"row"}>
        {pathname !== "/signin"&& 
          pathname !== "/signup"&&
          !pathname.includes("verify")
          ?
          <DashBoard />
          : null
        } 
        <Routes>
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<SocketProvider><Home /></SocketProvider>} />
          <Route path="/chat-bot" element={<ChatBotMain/>}/>
          <Route path="/:chatId" element={<SocketProvider><ChatMain/></SocketProvider>}/>
          <Route path="/group" element={<SocketProvider><Group /></SocketProvider>} />
          <Route path="/group/:chatId" element={<SocketProvider><GroupMain/></SocketProvider>}/>
          <Route path ="/profile" element={<Profile/>}/>
          <Route path="/location" element={<SocketProvider><Location/></SocketProvider>}/>
          <Route path="/user/:id/verify/:token" element={<EmailVarification/>}/>
        </Routes>
      </Stack>
    </>
  );
}

export default App;
