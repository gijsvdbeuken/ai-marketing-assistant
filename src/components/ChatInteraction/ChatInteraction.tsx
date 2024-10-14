import React from 'react';
import './ChatInteraction.css';

interface ChatInteractionProps {
  question: string;
  answer: string;
  time: string;
}

export const ChatInteraction: React.FC<ChatInteractionProps> = ({ question, answer, time }) => {
  return (
    <div className="chatInteraction">
      <small className="interactionTime">Om {time}</small>
      <div className="userRequest">
        {question ? (
          <div className="userMessage">
            <p>{question}</p>
          </div>
        ) : null}
      </div>
      <div className="chatbotResponse">
        {answer ? (
          <div className="chatbotMessage">
            <p>{answer}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
