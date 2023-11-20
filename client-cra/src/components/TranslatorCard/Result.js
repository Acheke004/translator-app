import React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import ColoredSentence from "./Colordata"; // Import the ColoredSentence component

const Result = ({
  countryCodeList,
  countryCode,
  handleSelectChange,
  children,
  boxShadow,
  detaildata,
  handleEvent1,
  inputText,
  handleInputText,
  helperText,
  disabled = false,
}) => {
  const text = [
    { key:"red",text:"grid" },{ key:"blue",text:"modelhsfdcjgvsdjciweyfg" }, { key:"red",text:"mac" }
    // Add more data objects as needed
  ];


  const handleEvent=(e)=>{
    console.log(e.target.value,"ok working");
    handleEvent1(e.target.value)
  }

//   const coloredSentenceHtml = ReactDOMServer.renderToStaticMarkup(
//     <ColoredSentence wordData={text} />
//   );


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        
        flexGrow: 1,
        gap: "8px",
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
      <Box>
      <Box sx={{display:"flex",
      justifyContent:"auto",
     width:"300px",gap:"10px",marginTop:"5px"}}>
         <input
        type="text"
        value="Deep Learning"
        readOnly={true}
        style={{ width:"140px",color: "red" }} // Set text color to blue
        placeholder="Blue: fuzzy base"
      />
       <input
        type="text"
        value="Fuzzy Base"
        readOnly={true}
        style={{ width:"140px",color: "blue" }} // Set text color to blue
        placeholder="Blue: fuzzy base"
      />
      </Box>
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'auto',
        width: '300px',
        gap: '10px',
        marginTop: '5px',
      }}
    >
      <Button
        variant="contained"
        style={{ backgroundColor: 'red', color: 'white',width:"150px" }}
        value="deep"
        onClick={(e)=>handleEvent(e)}
      >
        Deep Learning
      </Button>
      <Button
        variant="contained"
        style={{ backgroundColor: 'blue', color: 'white',width:"150px" }}
        value="fuzzy"
        onClick={(e)=>handleEvent(e)}
      >
        Fuzzy
      </Button>
    </Box>
      </Box>
      <Box>
          <ColoredSentence wordData={detaildata} />
        </Box>
      <TextField
        variant="standard"
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

export default Result;
