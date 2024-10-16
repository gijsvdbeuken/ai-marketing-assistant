import { useEffect, useState } from 'react';
import './App.css';
import ChatArea from './components/ChatArea/ChatArea';
import SideBar from './components/SideBar/SideBar';

function App() {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');

  const [model, setModel] = useState<string>('');
  const [originality, setOriginality] = useState<number>();
  const [corpus, setCorpus] = useState<string>('');

  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const apiRequest = async () => {
    const message = question;
    const max_tokens = 10000;

    console.log('Message: ' + message);
    console.log('Temperature: ' + originality);
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
          originality,
          max_tokens,
          corpus,
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

  const handleQuestionChange = (question: string, _newTime: string, model: string, originality: number, corpus: string) => {
    setQuestion(question);
    setModel(model);
    setOriginality(originality);
    setCorpus(corpus);
    setAnswer('');
  };

  return (
    <div className="App">
      <div className="appContent">
        <SideBar isOpen={showSidebar} toggleSidebar={toggleSidebar}></SideBar>
        <div className="chatAreaContainer">
          <ChatArea onQuestionSubmit={handleQuestionChange} answer={answer} question={question} showSettings={showSettings} toggleSettings={toggleSettings} />
        </div>
      </div>
    </div>
  );
}

export default App;
