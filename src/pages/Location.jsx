import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import io from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";
import { useFriendsLocationQuery } from "../Redux/Api/api";
import { getSocket } from "../utils/Socket";
import { UPDATE_LOCATION } from "../../../server/constants/event";
import { FRIEND_LOCATION } from "../constants/event";

const Location = () => {
  const { user } = useSelector((state) => state.auth);

  const userId = user?._id;
  const socket = getSocket();
  const { data } = useFriendsLocationQuery();

  console.log(data);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      // console.log(coords)
      const { latitude, longitude } = coords;

      socket.emit(UPDATE_LOCATION, {
        userId: user?._id,
        lat: latitude,
        lng: longitude,
      });
    });

    socket.on(FRIEND_LOCATION, (data) => {
      console.log(data);
    });
  }, [userId]);

  const loc = [
    { lat: 20.397373, lng: 72.832802 },
    { lat: 20.397373, lng: 72.832850 },

    
  ];

  return (
    <Stack sx={{ height: "100vh", width: "100vw" }}>
      <MapContainer center={[21.1546709, 72.7631489]} zoom={13}>
        <TileLayer
          attribution='<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>'
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=zlF7DTrK04o2qpVHAWqN"
        />
        {data?.friendsWithLocation?.map((friend) => {
          return (
            <Marker position={[friend?.lat, friend.lng]}>
              <Popup>
                <img src={friend?.avatar} />
                <Typography>{friend?.username}</Typography>
              </Popup>
            </Marker>
          );
        })}
        {/* <Marker position={[	23.033863,72.585022]} >
          <Popup>{"random"}</Popup>
        </Marker>
        <Marker position={[	31.5204,74.3587]}>
          <Popup>{"random"}</Popup>
        </Marker> */}
      </MapContainer>
    </Stack>
  );
};

export default Location;
