import React from "react";
// mui
import { Box, InputAdornment, SvgIcon, TextField } from "@material-ui/core";
// icons
import { Search as SearchIcon } from "react-feather";

const SearchBar = ({ title, onSearch }) => {
  return (
    <Box minWidth={400}>
      <TextField
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SvgIcon fontSize="small" color="action">
                <SearchIcon />
              </SvgIcon>
            </InputAdornment>
          ),
        }}
        placeholder={`Search ${title}`}
        variant="outlined"
        onChange={onSearch}
      />
    </Box>
  );
};

export default SearchBar;
