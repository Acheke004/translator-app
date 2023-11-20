import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useRef, useState } from "react";
import TranslatorCard from "../components/TranslatorCard";
import Result from "../components/TranslatorCard/Result";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { countries } from "../components/TranslatorCard/constants";
import { FaExchangeAlt } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";
import Button from "@mui/material/Button";
import IconButtons from "../components/IconButtons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import TranslationServices from "../srevices/translation.service";
import useDebounce from "../hooks/useDebounce";
import { toast, Toaster } from "react-hot-toast";
const HomePage = () => {
  const [fromCode, setFromCode] = useState("en-GB");
  const [toCode, setToCode] = useState("ja-JP");
  const[methode,setMethode]=useState("");
  const [fromText, setFromText] = useState("");
  const[datakey,setdatakey]=useState([]);
  const [toText, setToText] = useState("");
  const [translating, setTranslating] = useState(false);
  const [loadText, setLoadText] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  // const debouncedValue = useDebounce(transcript, 300);
  const textToSpeech = (id, data = "") => {
    let utterance;
    if (id === "toText") {
      if (Boolean(toText)) {
        utterance = new SpeechSynthesisUtterance(toText);
      }
      if (!Boolean(toText) && data) {
        utterance = new SpeechSynthesisUtterance(data);
      }
      utterance.lang = toCode;
    }
    if (id === "fromText" && Boolean(fromText)) {
      utterance = new SpeechSynthesisUtterance(fromText);
      utterance.lang = fromCode;
    }
    console.log("data changed speak");

    speechSynthesis.speak(utterance);
  };

  const copyToClipboard = (id) => {
    if (id === "toText" && Boolean(toText)) {
      navigator.clipboard.writeText(toText);
    }
    if (id === "fromText" && Boolean(fromText)) {
      navigator.clipboard.writeText(fromText);
    }
  };

  const handleExchangeClick = () => {
    if (fromCode === "en-GB") {
      setToCode("de-DE");
      return;
    }
    setFromCode(toCode);
    setToCode(fromCode);
    setFromText(toText);
    setToText(fromText);
  };

  const handleFromChange = (e) => {
    if (e.target.value === toCode) {
      handleExchangeClick();
      return;
    }
    setFromCode(e.target.value);
  };

  const handleToChange = (e) => {
    console.log(e.target.value);
    if (e.target.value === fromCode) {
      handleExchangeClick();
      return;
    }
    setToCode(e.target.value);
  };

  const handleMicClick = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      resetTranscript();
      console.log(fromText,"audio to text");
      TranslationServices.translateTexttoText(`${fromCode}|${toCode}`, fromText)
        .then((reponse) => {
          setToText(reponse.data);
          // TranslationServices.saveTranslation({
          //   fromText,
          //   toText: reponse.data,
          // });
          // textToSpeech("toText", reponse.data);
        })
        .catch((e) => {
          toast.error("Opps unable to translate please try again");
          setTranslating(false);
        });
      setTranslating(false);
      return;
    }
    console.log(transcript);
    SpeechRecognition.startListening({ continuous: true, language: fromCode });
  };

  const handleTranslateText = async () => {
    try {
      if (listening) return;
      setTranslating(true);
      //added methode parameter
      const reponse = await TranslationServices.translateTexttoText(
        `${fromCode}|${toCode}`,
        fromText,
      );
      console.log(reponse?.data,"data")
      setToText(reponse.data[0]);
      setdatakey(reponse.data[1]);
      // TranslationServices.saveTranslation({ fromText, toText: reponse.data });
      setTranslating(false);
      // textToSpeech("toText", reponse.data);
    } catch (error) {
      toast.error("Opps unable to translate please try again");
      setTranslating(false);
    }
  };

  const handleFileUpload = async (file) => {
    try {
      const formdata = new FormData();
      formdata.append("myfile", file);
      await TranslationServices.uploadExcelFile(formdata);
      toast.success("File uploaded successfully");
    } catch (error) {
      toast.error("Unable upload file");
    }
  };
  const handleUplaodAudio = async (file) => {
    try {
      if (listening) return;
      setLoadText(true);
      const formdata = new FormData();
      formdata.append("myfile", file);
      const response = await TranslationServices.translateAudioToText(formdata);
      // const response = await axios.post(
      //   "http://localhost:5000/upload",
      //   formdata
      // );
      if (response.data.alternatives?.[0]?.text) {
        setFromText(response.data.alternatives?.[0]?.text);
      }
      setLoadText(false);
    } catch (error) {
      setLoadText(false);
    }
  };

  // useEffect(() => {
  //   if (!debouncedValue) return;
  //   setTranslating(true);
  //   TranslationServices.translateTexttoText(
  //     `${fromCode}|${toCode}`,
  //     debouncedValue
  //   ).then((reponse) => {
  //     setToText(reponse.data);
  //     setTranslating(false);
  //   });
  // }, [debouncedValue]);

  //specific translation deeplearning and fuzzy base 
  const handlevent=async(e)=>{
    setMethode(e)
    const reponse = await TranslationServices.translateTexttoText(
      `${fromCode}|${toCode}`,
      fromText,
      methode
    );

    console.log(e,"ok home");
  }
  useEffect(() => {
    if (listening) {
      setFromText(transcript);
      return;
    }
  }, [transcript]);

  const countryCodeListR={
    "ja-JP": "Japanese",
    // "de-DE": "German",
    // "en-GB": "English",
  }
  const countryCodeList={
    "en-GB": "English",
    // "de-DE": "German",
    // "en-GB": "English",
  }


  return (
    <Container
      maxWidth="md"
      sx={{
        height: "480px",
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

      {/* <Box sx={{
          width: "100%",
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "auto",
          gap:"400px"
        }}>
          <Box>
      <Select value={fromCode} onChange={handleFromChange}>
        {Object.entries(countryCodeList).map(([key, value]) => {
          return (
            <MenuItem value={key} key={key}>
              {value}
            </MenuItem>
          );
        })}
      </Select>
      </Box>
      <Box>
      <Select value={toCode} onChange={handleFromChange}>
        {Object.entries(countryCodeListR).map(([key, value]) => {
          return (
            <MenuItem value={key} key={key}>
              {value}
            </MenuItem>
          );
        })}
      </Select>
      </Box>
      </Box> */}
      <Box
        sx={{
          width: "100%",
          flex: 1,
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",  
          overflow: "auto",
          gap:"100px"
        }}
      >
     <Box sx={{width:"300px"}}>
        <TranslatorCard
          // countryCodeList={countries}
          countryCodeList={{
            // "ja-JP": "Japanese",
            // "de-DE": "German",
            "en-GB": "English",
          }}
          countryCode={fromCode}
          handleSelectChange={handleFromChange}
          helperText={loadText ? "Loading transcript..." : "Enter Text"}
          inputText={fromText}
          handleInputText={(e) => setFromText(e.target.value)}
          disabled={loadText}
        >
          {Boolean(fromText?.length) && (
            <IconButton
              onClick={() => {
                setFromText("");
                setToText("");
                setdatakey([]);
                if (transcript) resetTranscript();
              }}
              sx={{ position: "absolute", top: "56px", right: "-16px" }}
            >
              <VscChromeClose />
            </IconButton>
          )}
          <IconButtons
            visible={Boolean(fromText.length)}
            showmic={true}
            micProps={{
              listening: listening,
              onMicClick: handleMicClick,
            }}
            textToSpeech={() => {
              textToSpeech("fromText");
            }}
            copyToClipboard={() => {
              copyToClipboard("fromText");
            }}
            handleUplaod={handleFileUpload}
          />
        </TranslatorCard>
        </Box>
        {/* <Box
          sx={{
            width: "48px",
            height: "48px",
          }}
        >
          <IconButton sx={{ boxShadow: 1 }} onClick={handleExchangeClick}>
            <FaExchangeAlt />
          </IconButton>
        </Box> */}
        <Box sx={{width:"300px"}}>
        <Result
          // countryCodeList={countries}
          //
          countryCodeList={{
            "ja-JP": "Japanese",
            // "de-DE": "German",
            // "en-GB": "English",
          }}
          countryCode={toCode}
          handleSelectChange={handleToChange}
          helperText={translating ? "Translating Text..." : "Translation"}
          boxShadow={1}
          handleEvent1={handlevent}
          detaildata={datakey}
          inputText={toText}
          disabled={true}
        >
          <IconButtons
            textToSpeech={() => {
              textToSpeech("toText");
            }}
            visible={Boolean(toText.length)}
            showmic={false}
            copyToClipboard={() => {
              copyToClipboard("toText");
            }}
          />
        </Result>
        </Box>
      </Box>
      <Box sx={{ p: 1 }}>
        <Button onClick={handleTranslateText} variant="outlined">
          Translate
        </Button>
      </Box>
      <Toaster position="top-center" reverseOrder={false} />
    </Container>
  );
};

export default HomePage;
