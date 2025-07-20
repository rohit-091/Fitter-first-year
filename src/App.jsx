
import { useState } from "react";

const chapters = {
  "Trade Theory": [
    {
      question: "पाइप रिंच किस काम में आता है?",
      options: ["पेंच कसने", "जोड़ने", "पाइप खोलने", "नापने"],
      answer: 2,
    },
    {
      question: "फिटर वर्क में किस फाइल का उपयोग किया जाता है?",
      options: ["फ्लैट फाइल", "राउंड फाइल", "हाफ राउंड फाइल", "सभी"],
      answer: 3,
    },
  ],
  "Employability Skills": [
    {
      question: "Resume का क्या उपयोग है?",
      options: ["पढ़ने के लिए", "नौकरी के लिए", "बातचीत के लिए", "शौक के लिए"],
      answer: 1,
    },
  ],
};

export default function App() {
  const [selectedSubject, setSelectedSubject] = useState("Trade Theory");
  const [selectedOption, setSelectedOption] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = chapters[selectedSubject];

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-blue-200 p-4">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">
        Fitter Mock Test – {selectedSubject}
      </h1>

      <div className="flex justify-center mb-4">
        <select
          className="p-2 rounded-lg shadow bg-white text-lg font-bold"
          value={selectedSubject}
          onChange={(e) => {
            setSelectedSubject(e.target.value);
            setSelectedOption({});
            setSubmitted(false);
          }}
        >
          {Object.keys(chapters).map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-6 max-w-3xl mx-auto">
        {questions.map((q, index) => (
          <div
            key={index}
            className="p-4 rounded-xl shadow bg-white border border-gray-200"
          >
            <h2 className="text-xl font-bold mb-2">
              {index + 1}. {q.question}
            </h2>
            <div className="space-y-2">
              {q.options.map((opt, i) => {
                const isCorrect = submitted && q.answer === i;
                const isWrong =
                  submitted &&
                  selectedOption[index] === i &&
                  q.answer !== i;
                return (
                  <div
                    key={i}
                    onClick={() =>
                      !submitted &&
                      setSelectedOption({ ...selectedOption, [index]: i })
                    }
                    className={\`p-2 rounded-lg font-bold cursor-pointer border \${isCorrect ? "bg-green-600 text-white" : ""} \${isWrong ? "bg-red-600 text-white" : ""} \${!submitted && selectedOption[index] === i ? "bg-blue-100 border-blue-500" : "bg-gray-100 hover:bg-blue-200"}\`}
                  >
                    {opt}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

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

      <footer className="text-center mt-10 text-red-600 font-bold text-lg">
        Developer By "RoHiiT Dw'n"
      </footer>
    </div>
  );
                }
  
