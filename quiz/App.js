import React, { useState } from 'react';
import Question from './components/Question/Question';
import Summary from './components/Summary/Summary';

const sampleData = [
  {
    prompt: "What city is the Masters held at?",
    type: "multiple-choice",
    choices: ["Detroit", "Atlanta", "Augusta", "Scottsdale"],
    correct: 2,
  },
  {
    prompt: "Select characters in Apple TV+'s Severance.",
    type: "multiple-answer",
    choices: ["Mark", "Milchick", "Adam", "Helly", "Ivan"],
    correct: [0, 1, 3], 
  },
  {
    prompt: "Cheese rolling is a sport.",
    type: "true-false",
    choices: ["True", "False"],
    correct: 0,
  },
];


export default function App() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showSummary, setShowSummary] = useState(false);

  const question = sampleData[index];

  const handleAnswer = (selectedIndexes) => {
    setAnswers(prevAnswers => [...prevAnswers, selectedIndexes]);

    if (index + 1 < sampleData.length) {
      setIndex(index + 1);
    } else {
      setShowSummary(true);
    }
  };

  if (showSummary) {
    return <Summary data={sampleData} answers={answers} />;
  }

  return <Question data={sampleData} index={index} handleAnswer={handleAnswer} />;
}

export { Question, Summary };
