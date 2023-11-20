import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { async } from "regenerator-runtime";
import TranslationServices from "../srevices/translation.service";

const Interpretation = () => {
  const [intputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const interpreteText = async () => {
    try {
      const resp = await TranslationServices.interpretText(intputText);
      setOutputText(`${resp.data.join("   |   ")}`);
    } catch (error) {}
  };
  return (
    <Container
      maxWidth="md"
      sx={{
        height: "600px",
        boxShadow: 2,
        borderRadius: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "auto",
        flexDirection: "column",
        // mt: 64,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          flex: 1,
          display: "flex",
          // justifyContent: "center",
          alignItems: "center",
          overflow: "auto",
          gap: 4,
        }}
      >
        <TextField
          sx={{
            flex: 1,
          }}
          variant="standard"
          minRows={12}
          maxRows={12}
          multiline={true}
          InputProps={{
            readOnly: false,
          }}
          placeholder={"Type japanese text"}
          value={intputText}
          onChange={(e) => setInputText(e.target.value)}
          spellCheck={true}
        ></TextField>
        <TextField
          sx={{
            flex: 1,
          }}
          variant="standard"
          minRows={12}
          maxRows={12}
          multiline={true}
          InputProps={{
            readOnly: true,
          }}
          placeholder={"Interpreted japanese text"}
          value={outputText}
          // onChange={(e) => setInputText(e.target.value)}
          spellCheck={true}
        ></TextField>
      </Box>
      <Box sx={{ p: 2 }}>
        <Button variant="outlined" onClick={interpreteText}>
          Interpret
        </Button>
      </Box>
    </Container>
  );
};

export default Interpretation;
