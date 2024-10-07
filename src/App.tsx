import React, { useState } from 'react';
import './App.css';
import ChatArea from './components/ChatArea';

function App() {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('Geen verbinding kunnen maken met server.');

  const handleQuestionChange = (newQuestion: string) => {
    setQuestion(newQuestion);
  };

  return (
    <div className="App">
      <ChatArea onQuestionChange={handleQuestionChange} answer={answer} />
    </div>
  );
}

export default App;
