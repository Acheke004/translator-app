const axios = require("axios");

const myMemoryApi = axios.create({
  baseURL: "https://translated-mymemory---translation-memory.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": "899eaa1706msh436d7778f550c8dp1f0dc4jsn42140e1cfab5",
    "X-RapidAPI-Host":
      "translated-mymemory---translation-memory.p.rapidapi.com",
  },
});

module.exports = myMemoryApi;
