import {
  Divider,
  Link,
  List,
  ListItem,
  ListItemIcon,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { FaReact } from "react-icons/fa6";
import { FaNode } from "react-icons/fa6";
import { SiExpress } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { SiSocketdotio } from "react-icons/si";
import { SiLeaflet } from "react-icons/si";
import { SiMui } from "react-icons/si";
import { SiOpenstreetmap } from "react-icons/si";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

const About = () => {
  return (
    <Stack sx={{ width: "100%", alignItems: "center" }}>
      <Typography variant="h5">
        <u>About</u>
      </Typography>
      <List sx={{ textAlign: "justify" }}>
        Developed a real-time chat web application with friend location tracking
        features using the MERN stack (MongoDB, Express.js, React.js, Node.js).
      </List>
      <List sx={{ textAlign: "justify" }}>
        Integrated live map functionalities with Leaflet.js and OpenStreetMaps
        for precise location rendering.
      </List>
      <List sx={{ textAlign: "justify" }}>
        Utilized Material UI and React Icons for an intuitive and visually
        appealing user interface.
      </List>
      <List sx={{ textAlign: "justify" }}>
        Implemented real-time communication using Socket.io for seamless user
        interaction.
      </List>
      <Divider sx={{ width: "100%" }} />
      <Typography variant="h5" marginTop={3}>
        Tech Stack
      </Typography>

      <Stack direction={"row"}>
        <Stack>
          <List>
            <ListItem>
              <ListItemIcon>
                <FaReact color="blue" size={20} />
              </ListItemIcon>
              React.js
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FaNode color="lightgreen" size={20} />
              </ListItemIcon>
              Node.js
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SiExpress size={20} />
              </ListItemIcon>
              Express.js
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <SiMui color="blue" size={20} />
              </ListItemIcon>
              Material-UI
            </ListItem>
          </List>
        </Stack>
        <Stack>
          <List>
            <ListItem>
              <ListItemIcon>
                <SiMongodb color="green" size={20} />
              </ListItemIcon>
              Mongodb
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SiSocketdotio size={20} />
              </ListItemIcon>
              Socket.IO
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SiLeaflet color="lightgreen" size={20} />
              </ListItemIcon>
              Leaflet.js
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <SiOpenstreetmap color="lightblue" size={20} />
              </ListItemIcon>
              Open Street Map
              <br /> (open source website)
            </ListItem>
          </List>
        </Stack>
      </Stack>
      <Divider sx={{ width: "100%" }} />

      <Stack>
        <List>
          <ListItem>
            <ListItemIcon>
              <FaGithub size={20} />
            </ListItemIcon>
            <Link href="https://github.com/Manav0407" target="_blank">
              My Github
            </Link>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FaLinkedin color="lightblue" size={20} />
            </ListItemIcon>
            <Link
              href="https://www.linkedin.com/in/manav-kantharia/"
              target="_blank"
            >
              My Linked-In
            </Link>
          </ListItem>
        </List>
      </Stack>
    </Stack>
  );
};

export default About;
