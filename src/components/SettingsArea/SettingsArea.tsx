import React, { useState, useEffect } from 'react';
import './SettingsArea.css';
import '../../App.css';

const SettingsArea = () => {
  interface Template {
    bedrijf: {
      algemene_informatie: {
        naam: string;
        omschrijving: string;
        locatie: string;
        website: string;
      };
    };
  }

  const [formData, setFormData] = useState({ naam: '', locatie: '', website: '', omschrijving: '' });
  const [template, setTemplate] = useState<Template | null>(null);

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        const response = await fetch('/template.json');
        const temp: Template = await response.json();
        setTemplate(temp);
      } catch (error) {
        console.error('Error loading template: ', error);
      }
    };

    loadTemplate();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (template) {
      const updatedTemplate: Template = {
        ...template,
        bedrijf: {
          ...template.bedrijf,
          algemene_informatie: {
            ...template.bedrijf.algemene_informatie,
            naam: formData.naam,
            omschrijving: formData.omschrijving,
            locatie: formData.locatie,
            website: formData.website,
          },
        },
      };

      await saveDataToFile(updatedTemplate);
    } else {
      console.error("Template hasn't loaded yet.");
    }
  };

  const saveDataToFile = async (data: Template) => {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.bedrijf.algemene_informatie.naam || 'data'}.json`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="settingsArea">
      <div className="settingsAreaContainer">
        <h1>Corpus toevoegen</h1>
        <form onSubmit={handleSubmit} className="mainInfoContainer">
          <div className="mainInfoSummary">
            <label className="label">Naam</label>
            <input className="input" name="naam" value={formData.naam} onChange={handleChange} placeholder="Geen Gedoe" />
            <label className="label">Locatie</label>
            <input className="input" name="locatie" value={formData.locatie} onChange={handleChange} placeholder="Maasheseweg 85e, 5804 AB Venray" />
            <label className="label">Website</label>
            <input className="input" name="website" value={formData.website} onChange={handleChange} placeholder="https://www.geen-gedoe.nl" />
            <label className="label">Bedrijfsomschrijving</label>
            <textarea className="textArea" name="omschrijving" value={formData.omschrijving} onChange={handleChange} placeholder="Geen Gedoe is een marketingbureau gesp"></textarea>
            <label className="label">Producten en/of diensten</label>
            <textarea className="textArea" onChange={handleChange}></textarea>
            <label className="label">Sociale media</label>
            <textarea className="textArea" onChange={handleChange}></textarea>
            <label className="label">Overige informatie</label>
            <textarea className="textArea" onChange={handleChange}></textarea>
          </div>
          <div className="btnContainer">
            <button type="submit" className="createCorpusBtn">
              Corpus aanmaken
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsArea;
