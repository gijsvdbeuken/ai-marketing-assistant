import React, { useState } from 'react';
import './ChatConfiguration.css';
import jsonData from '../../data/geen-gedoe.json';

interface ChatBarProps {
  onQuestionSubmit: (question: string, time: string, model: string, originality: number, corpus: string) => void;
  showSettings: boolean;
  toggleSettings: () => void;
}

const ChatConfiguration: React.FC<ChatBarProps> = ({ onQuestionSubmit, showSettings, toggleSettings }) => {
  const [question, setQuestion] = useState<string>('');

  const [model, setModel] = useState<string>('gpt-4o-mini');
  const [originality, setOriginality] = useState<string>('genuanceerd');
  const [corpus, setCorpus] = useState<string>('geen');

  const getTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    let time = `${hours}:${minutes}`;
    return time;
  };

  const getTemperature = () => {
    let temperature = 0.5;
    if (originality === 'voorspelbaar') {
      temperature = 0.2;
    } else if (originality === 'genuanceerd') {
      temperature = 0.5;
    } else if (originality === 'creatief') {
      temperature = 0.8;
    }
    return temperature;
  };

  const getCorpus = () => {
    let stringifiedCorpus = '';
    if (corpus !== 'geen') {
      if (corpus === 'geen-gedoe') {
        stringifiedCorpus = JSON.stringify(jsonData);
        return stringifiedCorpus;
      }
    }
    return stringifiedCorpus;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const time = getTime();
    const temperature = getTemperature();
    const corpus = getCorpus();

    onQuestionSubmit(question, time, model, temperature, corpus);
    setQuestion('');
  };

  return (
    <div className="chatConfiguration">
      <form onSubmit={handleSubmit} className="chatBar">
        <div className="prompt">
          <button className="settingsButton" onClick={toggleSettings}>
            <i className="fa-solid fa-bars"></i>
          </button>
          <input
            className="searchBar"
            placeholder="Vraag iets aan Mark..."
            type="text"
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
          ></input>
          <button className="submitButton" type={'submit'} disabled={question.trim() === ''}>
            <i className="fa-solid fa-arrow-up"></i>
          </button>
        </div>
      </form>
      <div className="options">
        {showSettings ? (
          <>
            <label className="title">Parameters</label>
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
            <label>Originaliteit</label>
            <div className="modelOptions">
              <label className={`custom-button ${originality === 'voorspelbaar' ? 'active' : ''}`}>
                <input type="radio" value="voorspelbaar" checked={originality === 'voorspelbaar'} onChange={(e) => setOriginality(e.target.value)} />
                Voorspelbaar
              </label>
              <label className={`custom-button ${originality === 'genuanceerd' ? 'active' : ''}`}>
                <input type="radio" value="genuanceerd" checked={originality === 'genuanceerd'} onChange={(e) => setOriginality(e.target.value)} />
                Genuanceerd
              </label>
              <label className={`custom-button ${originality === 'creatief' ? 'active' : ''}`}>
                <input type="radio" value="creatief" checked={originality === 'creatief'} onChange={(e) => setOriginality(e.target.value)} />
                Creatief
              </label>
            </div>
            <div className="lineBreak"></div>
            <label className="title">Corpus</label>
            <div className="corpusTypes">
              <div className="companyCorpus">
                <label>Presets</label>
                <select className="corpusOptions" onChange={(e) => setCorpus(e.target.value)}>
                  <option value="geen">Geen</option>
                  <option value="geen-gedoe">Geen Gedoe</option>
                  <option value="eleven-travel">Eleven Travel</option>
                  <option value="loo-mare">Loo Mare</option>
                  <option value="jade-styling">Jade Styling</option>
                  <option value="aiki-sports">Aiki Sports</option>
                </select>
              </div>
              <div className="otherCorpus">
                <label>Overig</label>
                <select className="corpusOptions">
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
    </div>
  );
};

export default ChatConfiguration;
