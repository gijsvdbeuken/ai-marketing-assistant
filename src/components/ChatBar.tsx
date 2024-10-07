import React, { useState } from "react";

interface ChatBarProps {
  onQuestionChange: (question: string) => void;
}

const ChatBar: React.FC<ChatBarProps> = ({ onQuestionChange }) => {
  const [questionInput, setQuestionInput] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onQuestionChange(questionInput);
    setQuestionInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="chatBar">
      <div className="prompt">
        <input
          type="text"
          value={questionInput}
          onChange={handleInputChange}
        ></input>
        <button className="submitButton" type={"submit"}>
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      </div>
      <div className="chatBarOptions">
        <div className="chatBarOption">
          <label>Focus</label>
          <select className="chatBarSelector">
            <option>Allround</option>
            <option>SEO</option>
            <option>Marketing</option>
          </select>
        </div>
        <div className="chatBarOption">
          <label>Modus</label>
          <select className="chatBarSelector">
            <option>Genuanceerd</option>
            <option>Creatief</option>
            <option>Voorspelbaar</option>
          </select>
        </div>
        <div className="chatBarOption">
          <label>Chatbot</label>
          <select className="chatBarSelector">
            <option>OpenAI GPT-4o</option>n<option>OpenAI GPT-4o-Mini</option>
            <option>OpenAI GPT-3.5-Turbo</option>
          </select>
        </div>
        <div className="chatBarOption">
          <label>Bijlagen</label>
          <select className="chatBarSelector">
            <option>Optie A</option>
            <option>Optie B</option>
          </select>
        </div>
      </div>
    </form>
  );
};

export default ChatBar;
