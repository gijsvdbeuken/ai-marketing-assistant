import React from 'react';
import './SettingsArea.css';

const SettingsArea = () => {
  return (
    <div className="settingsArea">
      <div className="settingsAreaContainer">
        <h1>Corpora beheren</h1>
        <h2>Algemene informatie</h2>
        <div className="mainInfoContainer">
          <div className="mainInfoSummary">
            <label className="label">Naam</label>
            <input className="input" placeholder="Geen Gedoe"></input>
            <label className="label">Locatie</label>
            <input className="input" placeholder="Maasheseweg 85e, 5804 AB Venray"></input>
            <label className="label">Website</label>
            <input className="input" placeholder="https://www.geen-gedoe.nl"></input>
          </div>
          <div className="mainInfoAbout">
            <label className="label">Over het bedrijf</label>
            <textarea className="textArea" placeholder="Geen Gedoe is een marketingbureau dat zich ..."></textarea>
          </div>
        </div>
        <div className="btnContainer">
          <button className="createCorpusBtn">Corpus aanmaken</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsArea;
