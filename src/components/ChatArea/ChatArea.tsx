import React, { useState, useEffect, useRef } from 'react';
import ChatBar from '../ChatBar/ChatBar';
import { ChatInteraction } from '../ChatInteraction/ChatInteraction';
import './ChatArea.css';

interface ChatAreaProps {
  onQuestionSubmit: (question: string, time: string, model: string, character: number) => void;
  answer: string;
  question: string;
  showSettings: boolean;
  toggleSettings: () => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({ onQuestionSubmit, answer, question, showSettings, toggleSettings }) => {
  const [interactions, setInteractions] = useState<{ question: string; answer: string | null; time: string; model: string; character: number }[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth', // Enable smooth scrolling
      });
    }
  };

  const handleQuestionSubmit = (newQuestion: string, newTime: string, newModel: string, newCharacter: number) => {
    setInteractions((prevInteractions) => [...prevInteractions, { question: newQuestion, answer: null, time: newTime, model: newModel, character: newCharacter }]);
    onQuestionSubmit(newQuestion, newTime, newModel, newCharacter);
    scrollToBottom();
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
      <ChatBar onQuestionSubmit={handleQuestionSubmit} showSettings={showSettings} toggleSettings={toggleSettings} />
    </div>
  );
};

export default ChatArea;
