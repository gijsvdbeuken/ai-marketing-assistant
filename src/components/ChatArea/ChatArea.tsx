import React, { useState, useEffect, useRef } from 'react';
import ChatConfiguration from '../ChatConfiguration/ChatConfiguration';
import { ChatInteraction } from '../ChatInteraction/ChatInteraction';
import './ChatArea.css';

interface ChatAreaProps {
  handleNewRequest: (question: string, model: string, originality: number, corpus: string) => void;
  answer: string;
  question: string;
}

const ChatArea: React.FC<ChatAreaProps> = ({ handleNewRequest, answer, question }) => {
  const [interactions, setInteractions] = useState<{ question: string; answer: string | null; model: string; originality: number; corpus: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const handleQuestionSubmit = (question: string, model: string, originality: number, corpus: string) => {
    setInteractions((prevInteractions) => [...prevInteractions, { question: question, answer: 'Aan het nadenken...', model: model, originality: originality, corpus: corpus }]);
    handleNewRequest(question, model, originality, corpus);
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
          <ChatInteraction key={index} question={interaction.question} answer={interaction.answer || ''} />
        ))}
      </div>
      <ChatConfiguration onQuestionSubmit={handleQuestionSubmit} />
    </div>
  );
};

export default ChatArea;
