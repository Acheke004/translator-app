// // const vosk = require("vosk");
// var mic = require("mic");
// const fs = require("fs");
// const { Readable } = require("stream");
// const path = require("path");
// const SAMPLE_RATE = 16000;
// // const modelName = "vosk-model-en-in-0.5";
// exports.speechToText = function () {
//   // const MODEL_PATH = path.resolve("models/vosk-model-en-in-0.5");
//   // if (!fs.existsSync(MODEL_PATH)) {
//   //   console.log(
//   //     "Please download the model from https://alphacephei.com/vosk/models and unpack as " +
//   //       MODEL_PATH +
//   //       " in the current folder."
//   //   );
//   //   process.exit();
//   // }
//   // vosk.setLogLevel(0);
//   // const model = new vosk.Model(MODEL_PATH);
//   // const rec = new vosk.Recognizer({ model: model, sampleRate: SAMPLE_RATE });
//   const micInstance = mic({
//     rate: String(SAMPLE_RATE),
//     channels: "1",
//     debug: false,
//     device: "default",
//   });

//   const micInputStream = micInstance.getAudioStream();
//   const outputFileStream = fs.WriteStream("output.raw");
//   micInputStream.pipe(outputFileStream);
//   micInputStream.on("data", (data) => {
//     if (rec.acceptWaveform(data)) {
//       console.log(rec.result());
//     } else console.log(rec.partialResult());
//   });

//   micInputStream.on("audioProcessExitComplete", function () {
//     console.log("Cleaning up");
//     fs.writeFileSync(
//       "_audio_to_text.json",
//       JSON.stringify(rec.finalResult(rec), null, 4)
//     );
//     rec.free();
//     model.free();
//   });

//   process.on("SIGINT", function () {
//     console.log("\nStopping");
//     micInstance.stop();
//   });

//   micInstance.start();
// };
