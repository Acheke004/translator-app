import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React from "react";

// interface Props extends PropsWithChildren {
//   countryCodeList: CountryCode;
//   countryCode: keyof CountryCode;
//   handleSelectChange: (e: SelectChangeEvent) => void;
//   helperText: string;
//   boxShadow?: number;
//   inputText: string;
//   handleInputText?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   disabled?: boolean;
// }
const TranslatorCard = ({
  countryCodeList,
  countryCode,
  handleSelectChange,
  children,
  boxShadow,
  inputText,
  handleInputText,
  helperText,
  disabled = false,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        gap: "8px",
        position: "relative",
        marginTop:"20px"
      }}
    >
      <Select value={countryCode} onChange={handleSelectChange}>
        {Object.entries(countryCodeList).map(([key, value]) => {
          return (
            <MenuItem value={key} key={key}>
              {value}
            </MenuItem>
          );
        })}
      </Select>
      <TextField
        variant="standard"
        minRows={12}
        maxRows={12}
        multiline={true}
        InputProps={{
          readOnly: disabled,
        }}
        placeholder={helperText}
        value={inputText}
        onChange={handleInputText}
        spellCheck={true}
      ></TextField>
      {children}
    </Box>
  );
};

export default TranslatorCard;
