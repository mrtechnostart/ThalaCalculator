"use client";
import { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
export default function Home() {
  const [inputText, setInputText] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [sum, setSum] = useState(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sum = getSumBreakdown(inputText);
    setIsValid(sum === 7);
    setSum(sum);
  };

  const getSumBreakdown = (str) => {
    const lowerCaseStr = str.toLowerCase();
    let sum = 0;

    for (let char of lowerCaseStr) {
      if (lowerCaseStr.length == 7) {
        return 7;
      } else if (!isNaN(parseInt(char))) {
        const value = parseInt(char) - "0";
        sum += value;
      } else if (char >= "a" && char <= "z") {
        const value = char.charCodeAt(0) - "a".charCodeAt(0) + 1;
        sum += value;
      }
    }

    return sum;
  };
  const backgroundStyle =
    sum === 7
      ? {
          backgroundImage: `url("/image.gif")`, // Make sure the path to your image is correct
          backgroundRepeat: "repeat",
          backgroundSize: "cover", // You can adjust this as per your requirement
        }
      : {};

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white"
      style={backgroundStyle}
    >
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Thala Calculator 😎</h1>
        <p className="text-lg">Checks if it's thala enough</p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded shadow-lg w-full max-w-md mb-4"
      >
        <div className="mb-6">
          <label
            htmlFor="inputText"
            className="block text-sm font-semibold mb-2"
          >
            Enter Text:
          </label>
          <input
            type="text"
            id="inputText"
            value={inputText}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-blue-500"
            placeholder="Type something..."
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
        >
          Submit
        </button>
      </form>

      {sum !== null && (
        <div className="mt-2">
          {isValid ? (
            <>
              <ReactAudioPlayer src="/success.mp3" autoPlay />

              <div className="mt-4 bg-black-500 p-4 rounded-md shadow-md">
                <p className="text-lg font-semibold mb-2">Thala For A Reason</p>
                <p className="text-sm">
                  {inputText.split("").map((char, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-800 rounded-full px-3 py-1 mx-1"
                    >
                      {char}
                    </span>
                  ))}
                  <span className="mx-2">=</span>
                  <span className="font-bold text-xl">{sum}</span>
                </p>
              </div>
              <img src="/image.gif" />
            </>
          ) : (
            <p className="text-red-400 text-sm">Naahh!</p>
          )}

          {/* Display breakdown if the sum is not 7 */}
        </div>
      )}
    </div>
  );
}
