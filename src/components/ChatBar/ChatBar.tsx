import React, { useState } from 'react';
import './ChatBar.css';
import jsonData from '../../data/geen-gedoe.json';

interface ChatBarProps {
  onQuestionSubmit: (question: string, time: string, model: string, character: number, knowledge: string) => void;
  showSettings: boolean;
  toggleSettings: () => void;
}

const ChatBar: React.FC<ChatBarProps> = ({ onQuestionSubmit, showSettings, toggleSettings }) => {
  const [questionInput, setQuestionInput] = useState<string>('');
  const [model, setModel] = useState<string>('gpt-4o-mini');
  const [character, setCharacter] = useState<string>('nuanced');
  const [knowledge, setKnowledge] = useState<string>('geen');

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

    let x = '';
    if (knowledge !== 'geen') {
      if (knowledge === 'geen-gedoe') {
        x = JSON.stringify(jsonData);
        //console.log(x);
      }
    }

    onQuestionSubmit(questionInput, time, model, temperature, x);
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
              if (showSettings == true) {
                toggleSettings();
              }
            }}
          ></input>
          <button className="submitButton" type={'submit'} disabled={questionInput.trim() === ''}>
            <i className="fa-solid fa-arrow-up"></i>
          </button>
        </div>
      </form>
      <button className="toggleSettingsButton" onClick={toggleSettings}>
        <h1>
          <i className="fa-solid fa-bars-progress"></i> Instellingen
        </h1>
      </button>

      <div className={showSettings ? 'options' : 'optionsCollapsed'}>
        {showSettings ? (
          <>
            <div className="lineBreak"></div>
            <h1>Intelligentie en gedrag</h1>

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
            <div className="lineBreak"></div>
            <h1>Geheugen</h1>
            <div className="knowledgeTypes">
              <div className="companyKnowledge">
                <label>Bedrijfskennis</label>
                <select className="knowledgeOptions" onChange={(e) => setKnowledge(e.target.value)}>
                  <option value="geen">Geen</option>
                  <option value="geen-gedoe">Geen Gedoe</option>
                  <option value="eleven-travel">Eleven Travel</option>
                  <option value="loo-mare">Loo Mare</option>
                  <option value="jade-styling">Jade Styling</option>
                  <option value="aiki-sports">Aiki Sports</option>
                </select>
              </div>
              <div className="otherKnowledge">
                <label>Overige kennis</label>
                <select className="knowledgeOptions">
                  <option value="geen">Geen</option>
                  <option value="geen-gedoe">Geen Gedoe</option>
                  <option value="eleven-travel">Eleven Travel</option>
                  <option value="loo-mare">Loo Mare</option>
                  <option value="jade-styling">Jade Styling</option>
                  <option value="aiki-sports">Aiki Sports</option>
                </select>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default ChatBar;
