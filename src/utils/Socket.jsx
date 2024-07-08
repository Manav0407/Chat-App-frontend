import { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";


const socketContext = createContext();

const getSocket =()=> useContext(socketContext);



const SocketProvider = ({children})=>{

    const socket = useMemo(()=>io('http://localhost:4000',{
        withCredentials: true,
    }),[])
    return(
        <socketContext.Provider value={socket}>
            {children}
        </socketContext.Provider>
    )
}

export {SocketProvider, getSocket};