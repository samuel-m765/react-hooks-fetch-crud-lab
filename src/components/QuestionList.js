import React, { useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {
  useEffect(() => {
    const abortController = new AbortController();

    fetch("http://localhost:4000/questions", {
      signal: abortController.signal,
    })
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error fetching questions:", error);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [setQuestions]);

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            setQuestions={setQuestions}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;