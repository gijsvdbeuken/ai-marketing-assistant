import React, { useState, useEffect, useRef } from 'react';
import ChatConfiguration from '../ChatConfiguration/ChatConfiguration';
import { ChatInteraction } from '../ChatInteraction/ChatInteraction';
import './ChatArea.css';

interface ChatAreaProps {
  onQuestionSubmit: (question: string, time: string, model: string, character: number, knowledge: string) => void;
  answer: string;
  question: string;
  showSettings: boolean;
  toggleSettings: () => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({ onQuestionSubmit, answer, question, showSettings, toggleSettings }) => {
  const [interactions, setInteractions] = useState<{ question: string; answer: string | null; time: string; model: string; originality: number; corpus: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const handleQuestionSubmit = (question: string, time: string, model: string, originality: number, corpus: string) => {
    setInteractions((prevInteractions) => [...prevInteractions, { question: question, answer: 'Aan het nadenken...', time: time, model: model, originality: originality, corpus: corpus }]);
    onQuestionSubmit(question, time, model, originality, corpus);
    scrollToBottom();
  };

  useEffect(() => {
    if (answer) {
      setInteractions((prevInteractions) => {
        const lastInteraction = prevInteractions[prevInteractions.length - 1];
        if (lastInteraction && lastInteraction.answer === 'Aan het nadenken...') {
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
          <ChatInteraction key={index} question={interaction.question} answer={interaction.answer || ''} time={interaction.time} showSettings={showSettings} />
        ))}
      </div>
      <ChatConfiguration onQuestionSubmit={handleQuestionSubmit} showSettings={showSettings} toggleSettings={toggleSettings} />
    </div>
  );
};

export default ChatArea;
