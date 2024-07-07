import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Autocomplete, Avatar, Chip, TextField } from "@mui/material";
import { createContext, useContext, useState } from "react";

// ----------------------------------------------------------------------

RHFAutocomplete.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.node,
};

export const AutofillContext= createContext();

export const AutofillProvider = ({children})=>{
  const fixedOptions = [];
  const [value, setValue] = useState([...fixedOptions]);
  return(
    <AutofillContext.Provider value={{value,setValue}}>
      {children}
    </AutofillContext.Provider>
  )
}



export default function RHFAutocomplete({
  name,
  label,
  helperText,
  options,
  ...other
}) {

  const fixedOptions = [];
  const {value,setValue}= useContext(AutofillContext);

  // console.log(value)


  return (
    <Autocomplete
      multiple
      id="fixed-tags-demo"
      value={value}
      onChange={(event, newValue) => {
        setValue([
          ...fixedOptions,
          ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
        ]);
      }}
      options={options}
      getOptionLabel={(option) => option?.username}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <>
            <Chip
              avatar={<Avatar alt={option?.username} src={option?.avatar} />}
              variant="outlined"
              label={option?.username}
              {...getTagProps({ index })}
              disabled={fixedOptions.indexOf(option) !== -1}
            />
          </>
        ))
      }
      // style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Members" placeholder="Add" />
      )}
    />
  );
}

