import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import React, { useRef, useState } from "react";
import { HiSpeakerWave } from "react-icons/hi2";
import { MdContentCopy } from "react-icons/md";
import { BsFillMicFill } from "react-icons/bs";
import { FaRegFileAudio } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
const IconButtons = ({
  visible,
  showmic,
  copy,
  handleSpeakClick,
  micProps,
  textToSpeech,
  copyToClipboard,
  handleUplaod,
}) => {
  const inputRef = useRef();

  const handleInpuChange = (e) => {
    const file = e?.target?.files?.[0];
    handleUplaod(file);
  };
  return (
    <Box sx={{ display: "flex", minHeight: "40px", pl: 1 }}>
      {showmic && (
        <>
          <IconButton
            sx={{
              color: micProps?.listening
                ? (theme) => theme.palette.error.dark
                : "",
              boxShadow: micProps?.listening ? 2 : "none",
            }}
            onClick={() => {
              micProps?.onMicClick();
            }}
          >
            <BsFillMicFill />
          </IconButton>
          <Tooltip
            title="Upload Media"
            onClick={() => {
              if (!inputRef.current) return;
              inputRef.current.click();
            }}
          >
            <IconButton>
              <FaRegFileAudio />
            </IconButton>
          </Tooltip>
          <input
            style={{ display: "none" }}
            type={"file"}
            onChange={handleInpuChange}
            ref={inputRef}
          />
        </>
      )}
      <IconButton
        onClick={textToSpeech}
        sx={{ display: visible ? "" : "none" }}
      >
        <HiSpeakerWave />
      </IconButton>
      <IconButton
        onClick={copyToClipboard}
        sx={{ display: visible ? "" : "none" }}
      >
        <MdContentCopy />
      </IconButton>
    </Box>
  );
};
export default IconButtons;
