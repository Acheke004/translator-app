require("dotenv/config");
const path = require("path");
const http = require('http');
const cors = require("cors");
const express = require("express");
const fs = require("fs");
const FormData = require("form-data");
const translationApi = require("./src/translatorApi");
const axios = require("axios");
const multer = require("multer");
const upload = multer({ dest: "temo/" });

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.static(path.join(__dirname, "public")));


app.get('/', (req, res) => {
  res.send('Hello from your Node.js server!');
});

// app.get("/textTotext", async (req, res) => {
//   try {

//     const { langpair, q } = req.query;
//     console.log({ langpair, q });
//     const resp = await translationApi.get("/translation", {
//       params: { input_text: q, lang_pair: langpair },
//     });
  
//     console.log(resp?.data,"respose")
//     res.send(resp?.data);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error?.response?.data);
//   }
// });

//change to post 
app.post("/textTotext", async (req, res) => {
  try {

    const { langpair, q } = req.body;
    console.log({ langpair, q });
    const resp = await translationApi.get("/translation", {
      params: { input_text: q, lang_pair: langpair },
    });
  
    console.log(resp?.data,"respose")
    res.send(resp?.data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error?.response?.data);
  }
});

app.post("/textTotext", async (req, res) => {
  try {

    const { langpair, q } = req.body;
    console.log({ langpair, q });
    const resp = await translationApi.get("/translation", {
      params: { input_text: q, lang_pair: langpair },
    });
  
    console.log(resp?.data,"respose")
    res.send(resp?.data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error?.response?.data);
  }
});

app.post("/textTotextspecific", async (req, res) => {
  try {

    const { langpair, q,p } = req.body;
    console.log({ langpair, q,p });
    const resp = await translationApi.get("/translation", {
      params: { input_text: q, lang_pair: langpair },
    });
  
    console.log(resp?.data,"respose")
    res.send(resp?.data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error?.response?.data);
  }
});

app.get("/interpretaion", async (req, res) => {
  try {
    const { inputText } = req.query;
    const resp = await translationApi.get("/interpretaion", {
      params: {
        inputText,
      },
    });
    res.send(resp?.data?.interpretations);
  } catch (error) {
    res.status(500).send(error?.response?.data);
  }
});

app.post("/upload-excel", upload.single("myfile"), async (req, res) => {
  try {
    const filePath = req?.file?.path;
    if (!filePath) return res.sendStatus(400);
    const fileStream = fs.createReadStream(filePath);
    const form = new FormData();
    form.append("file", fileStream, req?.file?.originalname);
    const axiosInstance = axios.create({
      headers: form.getHeaders(),
    });
    const resp = await axiosInstance.post(
      "http://10.1.2.3:8000/translation",
      form
    );
    res.status(200).json(resp.data);
    console.log("done");
  } catch (error) {
    console.log("error");
    res.sendStatus(500);
  }
});

const localIP = '10.1.2.3'; // Replace with your actual local IP address
const port = 8000; // Specify the port you want to use

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });
const server = http.createServer(app);

server.listen(port, localIP, () => {
  console.log(`Server is running at http://${localIP}:${port}/`);
});

// const PORT1=3003
// app.listen(PORT1, () => {
//   console.log(`listening on port ${PORT1}`);
// });
