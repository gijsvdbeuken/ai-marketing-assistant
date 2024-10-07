import React from "react";

interface ChatInteractionProps {
  question: string;
  answer: string;
}

export const ChatInteraction: React.FC<ChatInteractionProps> = ({
  question,
  answer,
}) => {
  return (
    <div className="chatInteraction">
      <div className="userRequest">
        {question ? (
          <div className="userMessage">
            <p>{question}</p>
          </div>
        ) : null}
      </div>
      <div className="chatbotResponse">
        {question ? (
          <div className="chatbotMessage">
            <p>{answer}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
