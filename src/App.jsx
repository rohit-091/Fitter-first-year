import { useState } from "react";
import chapter1_FirstAid from "./data/chapter1_FirstAid";

const chapters = {
  "Trade Theory": {
    "Chapter 1 – First Aid": chapter1_FirstAid,
  },
};

export default function App() {
  const [subject, setSubject] = useState("Trade Theory");
  const [chapter, setChapter] = useState("Chapter 1 – First Aid");
  const [selectedOption, setSelectedOption] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = chapters[subject][chapter];
  const totalQuestions = questions.length;

  const correctCount = questions.filter(
    (q, i) => selectedOption[i] === q.answer
  ).length;
  const attemptedCount = Object.keys(selectedOption).length;
  const wrongCount = attemptedCount - correctCount;
  const unattemptedCount = totalQuestions - attemptedCount;
  const percentage = ((correctCount / totalQuestions) * 100).toFixed(2);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-yellow-300 to-blue-300 p-4 overflow-hidden">
      
      {/* Watermark Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 text-7xl font-extrabold text-blue-800">
        ITI BANSI
      </div>

      <h1 className="text-3xl font-bold text-center text-blue-700 mb-4 z-10 relative">
        Fitter Mock Test – {subject}
      </h1>

      {/* Dropdowns */}
      <div className="flex flex-col items-center space-y-4 mb-4 z-10 relative">
        <select
          className="p-2 rounded-lg shadow bg-skyblue text-lg font-bold"
          value={subject}
          onChange={(e) => {
            const subj = e.target.value;
            const firstChap = Object.keys(chapters[subj])[0];
            setSubject(subj);
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
          className="p-2 rounded-lg shadow bg-yellow text-lg font-bold"
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
      <div className="space-y-6 max-w-3xl mx-auto z-10 relative">
        {questions.map((q, index) => {
          const userAnswer = selectedOption[index];
          const isCorrect = submitted && userAnswer === q.answer;
          const isWrong = submitted && userAnswer !== q.answer;

          return (
            <div key={index} className="p-4 rounded-xl shadow bg-white border">
              <h2 className="text-xl font-bold mb-2">
                {index + 1}. {q.question}
              </h2>
              <div className="space-y-2">
                {q.options.map((opt, i) => {
                  const optionClass = submitted
                    ? i === q.answer
                      ? "bg-green-600 text-white"
                      : i === userAnswer
                      ? "bg-red-600 text-white"
                      : "bg-gray-100"
                    : userAnswer === i
                    ? "bg-blue-100 border-blue-500"
                    : "bg-gray-100 hover:bg-blue-200";

                  return (
                    <div
                      key={i}
                      onClick={() =>
                        !submitted &&
                        setSelectedOption({ ...selectedOption, [index]: i })
                      }
                      className={`p-2 rounded-lg font-bold cursor-pointer border ${optionClass}`}
                    >
                      {opt}
                    </div>
                  );
                })}
              </div>

              {/* Feedback */}
              {submitted && (
                <p className={`mt-2 font-bold ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                  {isCorrect
                    ? "✅ सही उत्तर!"
                    : `❌ गलत उत्तर! सही उत्तर है: ${q.options[q.answer]}`}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!submitted && (
        <div className="text-center mt-6 z-10 relative">
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-6 py-2 rounded-full font-bold shadow"
          >
            Submit Answers
          </button>
        </div>
      )}

      {/* Final Summary */}
      {submitted && (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg border z-10 relative">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
            📊 आपकी परीक्षा का परिणाम
          </h2>
          <ul className="text-lg font-semibold space-y-2">
            <li>✅ सही उत्तर: {correctCount}</li>
            <li>❌ गलत उत्तर: {wrongCount}</li>
            <li>🧠 प्रयास किए गए प्रश्न: {attemptedCount}</li>
            <li>⛔ नहीं किए गए प्रश्न: {unattemptedCount}</li>
            <li>🎯 प्रतिशत: {percentage}%</li>
          </ul>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center mt-10 text-red-600 font-bold text-lg z-10 relative">
        Developer By "RoHiiT Dw'n"
      </footer>
    </div>
  );
    }
