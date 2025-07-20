import { useState } from "react";
import chapter1_FirstAid from "./data/chapter1_FirstAid";

const chapters = {
  "Trade Theory": {
    "Chapter 1 – First Aid": chapter1_FirstAid,
    // आगे के चैप्टर भी ऐसे जोड़ सकते हैं
  },
};

export default function App() {
  const [subject, setSubject] = useState("Trade Theory");
  const [chapter, setChapter] = useState("Chapter 1 – First Aid");
  const [selectedOption, setSelectedOption] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = chapters[subject][chapter];

  const handleSubmit = () => setSubmitted(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-blue-200 p-4">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">
        Fitter Mock Test – {subject}
      </h1>

      {/* Subject & Chapter Dropdown */}
      <div className="flex flex-col items-center space-y-4 mb-4">
        <select
          className="p-2 rounded-lg shadow bg-white text-lg font-bold"
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
            const firstChap = Object.keys(chapters[e.target.value])[0];
            setChapter(firstChap);
            setSelectedOption({});
            setSubmitted(false);
          }}
        >
          {Object.keys(chapters).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select
          className="p-2 rounded-lg shadow bg-white text-lg font-bold"
          value={chapter}
          onChange={(e) => {
            setChapter(e.target.value);
            setSelectedOption({});
            setSubmitted(false);
          }}
        >
          {Object.keys(chapters[subject]).map((chap) => (
            <option key={chap} value={chap}>{chap}</option>
          ))}
        </select>
      </div>

      {/* Questions */}
      <div className="space-y-6 max-w-3xl mx-auto">
        {questions.map((q, index) => (
          <div key={index} className="p-4 rounded-xl shadow bg-white border">
            <h2 className="text-xl font-bold mb-2">
              {index + 1}. {q.question}
            </h2>
            <div className="space-y-2">
              {q.options.map((opt, i) => {
                const isCorrect = submitted && q.answer === i;
                const isWrong = submitted && selectedOption[index] === i && q.answer !== i;
                return (
                  <div
                    key={i}
                    onClick={() =>
                      !submitted && setSelectedOption({ ...selectedOption, [index]: i })
                    }
                    className={`p-2 rounded-lg font-bold cursor-pointer border ${
                      isCorrect
                        ? "bg-green-600 text-white"
                        : isWrong
                        ? "bg-red-600 text-white"
                        : !submitted && selectedOption[index] === i
                        ? "bg-blue-100 border-blue-500"
                        : "bg-gray-100 hover:bg-blue-200"
                    }`}
                  >
                    {opt}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      {!submitted && (
        <div className="text-center mt-6">
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-6 py-2 rounded-full font-bold shadow"
          >
            Submit Answers
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center mt-10 text-red-600 font-bold text-lg">
        Developer By "RoHiiT Dw'n"
      </footer>
    </div>
  );
}
