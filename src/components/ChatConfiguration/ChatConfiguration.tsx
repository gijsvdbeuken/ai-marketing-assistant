import React, { useState } from 'react';
import './ChatConfiguration.css';
import { useTemperature } from '../../utilities/useTemperature';
import { useCorpus } from '../../utilities/useCorpus';

interface ChatConfigurationProps {
  onQuestionSubmit: (question: string, model: string, originality: number, corpus: string) => void;
}

const ChatConfiguration: React.FC<ChatConfigurationProps> = ({ onQuestionSubmit }) => {
  const [showSettings, setShowSettings] = useState<boolean>(true);
  const [question, setQuestion] = useState<string>('');
  const [model, setModel] = useState<string>('gpt-4o-mini');
  const [originality, setOriginality] = useState<string>('genuanceerd');
  const [corpusTitle, setCorpusTitle] = useState<string>('geen');

  const { corpus } = useCorpus(corpusTitle);
  const { temperature } = useTemperature(originality);

  const toggleSettings = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowSettings(!showSettings);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onQuestionSubmit(question, model, temperature, corpus);
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
                <select className="corpusOptions" onChange={(e) => setCorpusTitle(e.target.value)}>
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
