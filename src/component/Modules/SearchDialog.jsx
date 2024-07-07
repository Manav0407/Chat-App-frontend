import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";

import {
  IconButton,
  Input,
  InputBase,
  Stack,
  Typography,
  alpha,
  styled,
  useTheme,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import { PiMagnifyingGlass } from "react-icons/pi";
import UserElement from "./UserElement";
import { useDispatch, useSelector } from "react-redux";
import { useLazySearchUserQuery } from "../../Redux/Api/api";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.background.paper, 1),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0px 0px 2px rgba(255,255,255, 0.3)"
      : "0px 0px 2px rgba(0, 0, 0, 0.35)",
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

const SearchDialog = (props) => {
  const theme = useTheme();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const dispatch = useDispatch();

  const [searchUser] = useLazySearchUserQuery();

  const [search, setSearch] = useState();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  // console.log(search);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // const timeOut = setTimeout(() => {
    searchUser(search)
      .then(({ data }) => setUsers(data.allUsersExceptMyChats))
      .catch((e) => console.log(e));
    // }, 1000);
  }, [search]);

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <Stack
          direction={"column"}
          sx={{ maxHeight: "1000rem", minHeight: "10rem" }}
        >
          <Stack sx={{ width: "100%" }} pl={5} pr={5} pt={1}>
            <Search sx={{ marginBottom: 5 }}>
              <SearchIconWrapper>
                <PiMagnifyingGlass color="#709CE6" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={search}
                onChange={handleChange}
              />
            </Search>
          </Stack>
          <Stack
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={2}
            overflow={"scroll"}
            className="w-full overflow-y-scroll no-scrollbar"
          >
            {users?.length === 0 ? (
              <Typography>No users.</Typography>
            ) : (
              users?.map((user, index) => {
                return (
                  <UserElement
                    key={user?._id}
                    id={user?._id}
                    username={user?.username}
                    avatar={user?.avatar?.url}
                  />
                );
              })
            )}
          </Stack>
        </Stack>
      </Dialog>
    </>
  );
};

SearchDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default SearchDialog;
