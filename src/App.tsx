import React, { useEffect, useState } from 'react';
import './App.css';
import ChatArea from './components/ChatArea';

function App() {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');

  const apiRequest = async () => {
    const message = question;
    const model = 'gpt-4o-mini';
    const temperature = 0.5;
    const max_tokens = 250;
    try {
      const response = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          model,
          temperature,
          max_tokens,
        }),
      });
      const answerResponse = await response.json();
      setAnswer(answerResponse.content); // Set the answer after the API response
    } catch (error) {
      setAnswer('Server niet bereikbaar: ' + error);
      console.error(error);
    }
  };

  useEffect(() => {
    if (question.trim() !== '') {
      apiRequest(); // Trigger API call when question is set
    }
  }, [question]);

  const handleQuestionChange = (newQuestion: string) => {
    setQuestion(newQuestion); // Set the new question on question change
    setAnswer(''); // Clear the previous answer
  };

  return (
    <div className="App">
      <ChatArea onQuestionChange={handleQuestionChange} answer={answer} question={question} />
    </div>
  );
}

export default App;
