import { faArrowRightArrowLeft, faEarthAsia, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

// languages
const languages = [
  { code: "en", label: "English" },
  { code: "uz", label: "Uzbek" },
  { code: "ru", label: "Russian" },
  { code: "fr", label: "French" },
  { code: "es", label: "Spanish" },
  { code: "de", label: "German" },
  { code: "it", label: "Italian" },
  { code: "tr", label: "Turkish" },
  { code: "zh-CN", label: "Chinese (Simplified)" },
  { code: "ja", label: "Japanese" },
  { code: "ko", label: "Korean" },
  { code: "ar", label: "Arabic" },
  { code: "hi", label: "Hindi" },
  { code: "pt", label: "Portuguese" },
  { code: "id", label: "Indonesian" },
  { code: "fa", label: "Persian" },
  { code: "pl", label: "Polish" },
  { code: "uk", label: "Ukrainian" },
  { code: "kk", label: "Kazakh" },
];


export default function Transly() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");

  // change language state 
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("uz");

  // context theme
  const {theme, toggleTheme} = useContext(ThemeContext);

  // translate API function
  const translateText = async () => {
    if (!text.trim()) return;

    try {
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(
          text
        )}`
      );

      const data = await res.json();
      setTranslated(data[0][0][0]);
    } catch (err) {
      setTranslated("Error: " + err.message);
      console.error(err);
    }
  };

  // real time translate
  useEffect(() => {
    const timeout = setTimeout(() => {
      if(text.trim()) translateText();
      else setTranslated();
    }, 0.1);

    return () => clearTimeout(timeout); 
  }, [text, sourceLang, targetLang])

  // swap language function
  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);

    setText(translated);
    setTranslated(text);
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start py-[40px] transition-colors duration-500 ${theme === "dark" ? 'bg-gray-800' : 'bg-gray-200 transition-colors duration-500'}`}>
      {/* dark mode button */}
      <button className={`flex items-center justify-center py-1 px-3 rounded-md gap-2 ${theme === "dark" ? 'bg-gray-500 text-white' : 'bg-gray-50'}`} onClick={toggleTheme}>
        <FontAwesomeIcon icon={faMoon} />
        {theme === "dark" ? "Light" : "Dark"} Mode
      </button>

      {/* translate */}
      <div className="p-6 space-y-6 w-full max-w-4xl my-auto">
        {/* title */}
        <h1 className={`text-4xl font-extrabold text-center text-blue-500`}>
          <FontAwesomeIcon icon={faEarthAsia} className="me-2" />
          Transly
        </h1>

        {/* select lang */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* source select lang */}
          <select
            className="flex-1 border-0 p-2 rounded-lg bg-gray-50 focus:outline-none w-full"
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>

          {/* reverse button */}
          <button
            onClick={swapLanguages}
            className="px-4 py-2 text-xl bg-gray-100 rounded-[15px] hover:bg-gray-200 transition sm:rounded-full"
            title="Switch languages"
          >
            <FontAwesomeIcon icon={faArrowRightArrowLeft} />
          </button>

          {/* target select lang */}
          <select
            className="flex-1 border-0 p-2 rounded-lg bg-gray-50 focus:outline-none w-full"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        {/* input area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* source input */}
          <textarea
            className="w-full border-0 p-3 rounded-xl focus:outline-none bg-gray-50 resize-none h-32"
            placeholder="Enter text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          {/* translated output */}
          <textarea
            className="w-full border-0 p-3 rounded-xl focus:outline-none bg-gray-100 text-gray-800 resize-none h-32"
            readOnly
            value={translated}
            placeholder="Translation result..."
          ></textarea>
        </div>

        {/* translate button */}
        <button
          onClick={translateText}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-lg font-medium transition"
        >
          Translate
        </button>
      </div>
    </div>

  );
}
