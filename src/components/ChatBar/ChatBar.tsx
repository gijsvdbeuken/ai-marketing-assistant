import React, { useState } from 'react';
import './ChatBar.css';

interface ChatBarProps {
  onQuestionSubmit: (question: string, time: string, model: string, character: number) => void;
}

const ChatBar: React.FC<ChatBarProps> = ({ onQuestionSubmit }) => {
  const [questionInput, setQuestionInput] = useState<string>('');
  const [model, setModel] = useState<string>('gpt-4o-mini');
  const [character, setCharacter] = useState<string>('nuanced');

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    let time = `${hours}:${minutes}`;
    return time;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const time = getCurrentTime();
    let temperature = 0.5;
    if (character === 'analytical') {
      temperature = 0.2;
    } else if (character === 'nuanced') {
      temperature = 0.5;
    } else if (character === 'creative') {
      temperature = 0.8;
    }
    onQuestionSubmit(questionInput, time, model, temperature);
    setQuestionInput('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="chatBar">
        <div className="prompt">
          <input
            className="searchBar"
            placeholder="Vraag iets aan Mark..."
            type="text"
            value={questionInput}
            onChange={(e) => {
              setQuestionInput(e.target.value);
            }}
          ></input>
          <button className="submitButton" type={'submit'} disabled={questionInput.trim() === ''}>
            <i className="fa-solid fa-arrow-up"></i>
          </button>
        </div>
      </form>
      <small className="interactionTime">
        Model: {model}, Karakter: {character}
      </small>
      <div className="options">
        <h1>Instellingen</h1>
        <div className="lineBreak"></div>
        <label>Model</label>
        <div className="modelOptions">
          <label className={`custom-button ${model === 'gpt-3.5-turbo' ? 'active' : ''}`}>
            <input type="radio" value="gpt-3.5-turbo" checked={model === 'gpt-3.5-turbo'} onChange={(e) => setModel(e.target.value)} />
            GPT-3.5 Turbo
          </label>
          <label className={`custom-button ${model === 'gpt-4o-mini' ? 'active' : ''}`}>
            <input type="radio" value="gpt-4o-mini" checked={model === 'gpt-4o-mini'} onChange={(e) => setModel(e.target.value)} />
            GPT-4o Mini
          </label>
          <label className={`custom-button ${model === 'gpt-4-turbo' ? 'active' : ''}`}>
            <input type="radio" value="gpt-4-turbo" checked={model === 'gpt-4-turbo'} onChange={(e) => setModel(e.target.value)} />
            GPT-4o Turbo
          </label>
          <label className={`custom-button ${model === 'gpt-4o' ? 'active' : ''}`}>
            <input type="radio" value="gpt-4o" checked={model === 'gpt-4o'} onChange={(e) => setModel(e.target.value)} />
            GPT-4o
          </label>
        </div>
        <div className="lineBreak"></div>
        <label>Karakter</label>
        <div className="modelOptions">
          <label className={`custom-button ${character === 'analytical' ? 'active' : ''}`}>
            <input type="radio" value="analytical" checked={character === 'analytical'} onChange={(e) => setCharacter(e.target.value)} />
            Analytisch
          </label>
          <label className={`custom-button ${character === 'nuanced' ? 'active' : ''}`}>
            <input type="radio" value="nuanced" checked={character === 'nuanced'} onChange={(e) => setCharacter(e.target.value)} />
            Genuanceerd
          </label>
          <label className={`custom-button ${character === 'creative' ? 'active' : ''}`}>
            <input type="radio" value="creative" checked={character === 'creative'} onChange={(e) => setCharacter(e.target.value)} />
            Creatief
          </label>
        </div>
      </div>
    </>
  );
};

export default ChatBar;
