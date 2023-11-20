

// const fs = require("fs");
// const { Readable } = require("stream");
// const path = require("path");
// const wav = require("wav");
// exports.audioToText = function (filepath) {
//   return new Promise((resolve, reject) => {
//     // const MODEL_PATH = path.resolve("models/vosk-model-en-us-0.22-lgraph");

//     const FILE_NAME = filepath; //path.resolve("audio/audio_EN_CSQU3054383.wav");

//     // if (!fs.existsSync(MODEL_PATH)) {
//     //   console.log(
//     //     "Please download the model from https://alphacephei.com/vosk/models and unpack as " +
//     //       MODEL_PATH +
//     //       " in the current folder."
//     //   );
//     //   process.exit();
//     // }

//     // if (process.argv.length > 2) FILE_NAME = process.argv[2];

//     // vosk.setLogLevel(0);
//     // const model = new vosk.Model(MODEL_PATH);

//     const wfReader = new wav.Reader();
//     const wfReadable = new Readable().wrap(wfReader);

//     wfReader.on("format", async ({ audioFormat, sampleRate, channels }) => {
//       if (audioFormat != 1 || channels != 1) {
//         console.error("Audio file must be WAV format mono PCM.");
//         process.exit(1);
//       }
//       // const rec = new vosk.Recognizer({ model: model, sampleRate: sampleRate });
//       // rec.setMaxAlternatives(10);
//       // rec.setWords(true);
//       // rec.setPartialWords(true);
//       // for await (const data of wfReadable) {
//       //   const end_of_speech = rec.acceptWaveform(data);
//       //   // if (end_of_speech) {
//       //   //   console.log(JSON.stringify(rec.result(), null, 4));
//       //   // } else {
//       //   //   console.log(JSON.stringify(rec.partialResult(), null, 4));
//       //   // }
//       // }
//       resolve(JSON.stringify(rec.finalResult(rec), null, 4));
//       // fs.writeFileSync(
//       //   "audio_2830-3980-0043.json",
//       //   JSON.stringify(rec.finalResult(rec), null, 4)
//       // );
//       // console.log(JSON.stringify(rec.finalResult(rec), null, 4));
//       rec.free();
//       console.log("done");
//     });

//     fs.createReadStream(FILE_NAME, { highWaterMark: 4096 })
//       .pipe(wfReader)
//       .on("finish", function (err) {
//         model.free();
//       });
//   });
// };
