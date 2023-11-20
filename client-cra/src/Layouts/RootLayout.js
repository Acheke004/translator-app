import Box from "@mui/material/Box";
import React from "react";
import Navbar from "../components/Navbar";

const RootLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",

        flexDirection: "column",

        boxSizing: "border-box",
      }}
    >
      <Navbar />
      {children}
    </Box>
  );
};

export default RootLayout;
