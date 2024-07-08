import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
// import io from "socket.io-client";
// import axios from "axios";
import { useSelector } from "react-redux";
import { useFriendsLocationQuery } from "../Redux/Api/api";
import { getSocket } from "../utils/Socket";
import { FRIEND_LOCATION, UPDATE_LOCATION } from "../constants/event";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
// import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";

// Define custom icons
const userIcon = L.icon({
  iconUrl: "../../public/you.png",
  iconSize: [70, 70],
  iconAnchor: [22, 38],
  popupAnchor: [-3, -38],
});

const friendIcon = L.icon({
  iconUrl: "../../public/user.png",
  iconSize: [50, 50],
  iconAnchor: [22, 38],
  popupAnchor: [-3, -38],
});

// Fix for default marker icon not showing up in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Location = () => {
  const { user } = useSelector((state) => state.auth);

  const [userLocation, setUserLocation] = useState([0, 0]);
  const [friendsLocations, setFriendsLocations] = useState([]);

  const userId = user?._id;
  const socket = getSocket();
  const { data: friendsLoc } = useFriendsLocationQuery();

  // console.log("frd", friendsLoc);

  const friendsId = friendsLoc?.friendsWithLocation?.map(
    (friend) => friend?._id
  );

  // console.log("ids", friendsId);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      // console.log(coords)
      const { latitude, longitude } = coords;
      setUserLocation([latitude, longitude]);
      socket.emit(UPDATE_LOCATION, {
        userId: user?._id,
        lat: latitude,
        lng: longitude,
      });
    });

    // socket.on(FRIEND_LOCATION, (data) => {
    //   console.log(data);
    // });

    socket.on(FRIEND_LOCATION, (data) => {
      // console.log('Friend location updated:', data);
      setFriendsLocations((prevLocations) => {
        const index = prevLocations.findIndex(
          (loc) => loc.userId === data.userId
        );
        if (index !== -1) {
          // Update existing friend's location
          const updatedLocations = [...prevLocations];
          updatedLocations[index] = data;
          return updatedLocations;
        } else {
          // Add new friend's location
          return [...prevLocations, data];
        }
      });
    });
  }, [userId]);

  // console.log("hasa", friendsLocations);

  const friendsLocs = friendsLocations.filter((friend) =>
    friendsId.includes(friend.userId)
  );

  // console.log("jugad", friendsLocs);
  // console.log(userLocation);

  const loc = [
    { lat: 20.397373, lng: 72.832802 },
    { lat: 20.397373, lng: 72.83285 },
  ];

  return (
    <Stack sx={{ height: "100vh", width: "100vw" }}>
      <MapContainer center={[21.1546709, 72.7631489]} zoom={13}>
        <TileLayer
          attribution='<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>'
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=zlF7DTrK04o2qpVHAWqN"
        />
        <Marker position={userLocation} icon={userIcon}>
          <Popup>
            {/* <img src={friend?.avatar} /> */}
            <Typography>You are here.</Typography>
          </Popup>
        </Marker>
        {/* <MarkerClusterGroup> */}
          {friendsLocs?.map((friend) => {
            return (
              <Marker
                position={[friend?.location?.lat, friend?.location?.lng]}
                icon={friendIcon}
              >
                <Popup>
                  <img src={friend?.avatar} />
                  <Typography>{friend?.username}</Typography>
                </Popup>
              </Marker>
            );
          })}
        {/* </MarkerClusterGroup> */}
      </MapContainer>
    </Stack>
  );
};

export default Location;
