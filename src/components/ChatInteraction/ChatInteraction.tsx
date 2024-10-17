import React, { useEffect } from 'react';
import './ChatInteraction.css';
import 'highlight.js/styles/github-dark.css';
import hljs from 'highlight.js';
import { useCurrentTime } from '../../utilities/useCurrentTime';

interface ChatInteractionProps {
  question: string;
  answer: string;
}

export const ChatInteraction: React.FC<ChatInteractionProps> = ({ question, answer }) => {
  const currentTime = useCurrentTime();

  useEffect(() => {
    const codeBlocks = document.querySelectorAll('.chatbotMessage code');
    codeBlocks.forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }, [answer]);

  return (
    <div className="chatInteraction">
      <small className="interactionTime">Om {currentTime}</small>
      <div className="userRequest">
        {question ? (
          <div className="userMessage">
            <p>{question}</p>
          </div>
        ) : null}
      </div>
      <div className="chatbotResponse">
        {answer == 'Aan het nadenken...' ? (
          <div className="chatbotMessageThinking">
            <p className="thinking">
              <i className="fa-solid fa-wand-magic-sparkles"></i>&nbsp;
              {answer}
            </p>
          </div>
        ) : (
          <div className="chatbotMessage">
            <p dangerouslySetInnerHTML={{ __html: answer }} />
          </div>
        )}
      </div>
    </div>
  );
};
