import React, { useState } from 'react';
import ChatBar from './ChatBar';
import { ChatInteraction } from './ChatInteraction';

interface ChatAreaProps {
  onQuestionChange: (question: string) => void;
  answer: string;
}

const ChatArea: React.FC<ChatAreaProps> = ({ onQuestionChange, answer }) => {
  const [interactions, setInteractions] = useState<{ question: string; answer: string }[]>([]);

  const handleQuestionChange = (newQuestion: string) => {
    const newInteraction = { question: newQuestion, answer: answer };
    setInteractions((prevInteractions) => [...prevInteractions, newInteraction]);
    onQuestionChange(newQuestion);
  };

  return (
    <div className="chatArea">
      <div className="chatAreaScroller">
        {interactions.map((interaction, index) => (
          <ChatInteraction key={index} question={interaction.question} answer={interaction.answer} />
        ))}
      </div>
      <ChatBar onQuestionChange={handleQuestionChange} />
    </div>
  );
};

export default ChatArea;
