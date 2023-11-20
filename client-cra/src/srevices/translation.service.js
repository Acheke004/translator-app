import TransLatorApi from "../api/tarnslator.api";

const translateTexttoText = async (langpair, text) => {
  console.log(text)
  return  await TransLatorApi.post("/textTotext", {
    langpair: langpair,
    q: text,
  });


  
  // return await TransLatorApi.get("/textTotext", {
  //   params: {
  //     langpair: langpair,
  //     q: text,
  //   },
  // });
};

//transalation to the specific methode deep learning and fuzzzy base 
const translateTexttoTextspecific = async (langpair, text,methode) => {
  console.log(text)
  return  await TransLatorApi.post("/textTotextspecific", {
    langpair: langpair,
    q: text,
    p:methode
  });
}

const translateAudioToText = async (formdata) => {
  return await TransLatorApi.post("/upload", formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};



const saveTranslation = async (data) => {
  return TransLatorApi.post("/savetranscript", data);
};

const interpretText = async (inputText) => {
  return TransLatorApi.get("interpretaion", {
    params: {
      inputText,
    },
  });
};
const uploadExcelFile = async (formdata) => {
  return await TransLatorApi.post("/upload-excel", formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const TranslationServices = {
  translateTexttoText,
  translateTexttoTextspecific,
  translateAudioToText,
  saveTranslation,
  interpretText,
  uploadExcelFile,
};
export default TranslationServices;
