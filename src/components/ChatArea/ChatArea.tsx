import React, { useState, useEffect } from 'react';
import ChatBar from '../ChatBar/ChatBar';
import { ChatInteraction } from '../ChatInteraction/ChatInteraction';
import './ChatArea.css';

interface ChatAreaProps {
  onQuestionSubmit: (question: string, time: string, model: string, character: number) => void;
  answer: string;
  question: string;
}

const ChatArea: React.FC<ChatAreaProps> = ({ onQuestionSubmit, answer, question }) => {
  const [interactions, setInteractions] = useState<{ question: string; answer: string | null; time: string; model: string; character: number }[]>([]);

  const handleQuestionSubmit = (newQuestion: string, newTime: string, newModel: string, newCharacter: number) => {
    setInteractions((prevInteractions) => [...prevInteractions, { question: newQuestion, answer: null, time: newTime, model: newModel, character: newCharacter }]);
    onQuestionSubmit(newQuestion, newTime, newModel, newCharacter);
  };

  useEffect(() => {
    if (answer) {
      setInteractions((prevInteractions) => {
        const lastInteraction = prevInteractions[prevInteractions.length - 1];
        if (lastInteraction && lastInteraction.answer === null) {
          const updatedInteractions = [...prevInteractions];
          updatedInteractions[updatedInteractions.length - 1] = {
            ...lastInteraction,
            answer,
          };
          return updatedInteractions;
        }
        return prevInteractions;
      });
    }
  }, [answer]);

  return (
    <div className="chatArea">
      <div className="chatAreaScroller">
        {interactions.map((interaction, index) => (
          <ChatInteraction key={index} question={interaction.question} answer={interaction.answer || '...'} time={interaction.time} />
        ))}
      </div>
      <ChatBar onQuestionSubmit={handleQuestionSubmit} />
    </div>
  );
};

export default ChatArea;
