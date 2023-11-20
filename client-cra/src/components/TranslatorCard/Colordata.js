import React from "react";

const ColoredSentence = ({ wordData }) => {
  // Create a function to render the sentence with colored words
  console.log(wordData)
  const result = wordData.map(item => {
    const key = Object.keys(item)[0]; // Get the key (e.g., '1')
    const text = item[key]; // Get the text (e.g., 'コンピュータ')
  
    return { key, text };
  });
  const renderSentence = () => {
    return result.map((wordObj, index) => {
      // Extract text and key from the word object


      const { text, key } = wordObj;
console.log(text,key)
      // Define a color mapping for keys
      const colorMap = {
        1: "red",
        2: "blue",
        green: "green",
        // Add more key-color mappings as needed
      };

      // Determine the color based on the key or use a default color
      const color = colorMap[key] || "black";

      // Apply the color as an inline style
      const style = { color };

      // Use a unique key for each word
      return (
        <span key={index} style={style}>
          {text}{" "}
        </span>
      );
    });
  };

  return <div>{renderSentence()}</div>;
};

export default ColoredSentence;
