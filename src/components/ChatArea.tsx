import React, { useState, useEffect } from 'react';
import ChatBar from './ChatBar';
import { ChatInteraction } from './ChatInteraction';

interface ChatAreaProps {
  onQuestionChange: (question: string) => void;
  answer: string;
  question: string;
}

const ChatArea: React.FC<ChatAreaProps> = ({ onQuestionChange, answer, question }) => {
  const [interactions, setInteractions] = useState<{ question: string; answer: string }[]>([]);

  // Add new interaction when the answer is updated
  useEffect(() => {
    if (answer && question) {
      const newInteraction = { question, answer };
      setInteractions((prevInteractions) => [...prevInteractions, newInteraction]);
    }
  }, [answer, question]);

  return (
    <div className="chatArea">
      <div className="chatAreaScroller">
        {interactions.map((interaction, index) => (
          <ChatInteraction key={index} question={interaction.question} answer={interaction.answer} />
        ))}
      </div>
      <ChatBar onQuestionChange={onQuestionChange} />
    </div>
  );
};

export default ChatArea;
