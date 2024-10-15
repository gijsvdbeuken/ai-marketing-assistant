import { useEffect, useState } from 'react';
import './App.css';
import ChatArea from './components/ChatArea/ChatArea';
import SideBar from './components/SideBar/SideBar';

function App() {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [character, setCharacter] = useState<number>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(true);
  const [knowledge, setKnowledge] = useState<string>('');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const apiRequest = async () => {
    const message = question;
    const max_tokens = 250;
    console.log('Message: ' + message);
    console.log('Temperature: ' + character);
    console.log('Max Tokens: ' + max_tokens);
    console.log('Model: ' + model);
    try {
      const response = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          model,
          character,
          max_tokens,
          knowledge,
        }),
      });
      const answerResponse = await response.json();
      setAnswer(answerResponse.content);
    } catch (error) {
      setAnswer('Server niet bereikbaar: ' + error);
      console.error(error);
    }
  };

  useEffect(() => {
    if (question && model) {
      if (question.trim() !== '') {
        apiRequest();
      }
    }
  }, [question, model]);

  const handleQuestionChange = (newQuestion: string, _newTime: string, newModel: string, newCharacter: number, newKnowledge: string) => {
    setQuestion(newQuestion);
    setModel(newModel);
    setCharacter(newCharacter);
    setKnowledge(newKnowledge);
    setAnswer('');
  };

  return (
    <div className="App">
      <div className="appContent">
        <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar}></SideBar>
        <div className="chatAreaContainer">
          <ChatArea onQuestionSubmit={handleQuestionChange} answer={answer} question={question} showSettings={showSettings} toggleSettings={toggleSettings} />
        </div>
      </div>
    </div>
  );
}

export default App;
