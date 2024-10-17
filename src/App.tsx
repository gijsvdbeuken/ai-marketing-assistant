import { useEffect, useState } from 'react';
import './App.css';
import ChatArea from './components/ChatArea/ChatArea';
import SideBar from './components/SideBar/SideBar';
import { useAPI } from './utilities/useAPI';

function App() {
  const { question, answer, model, apiRequest, updateRequest } = useAPI();

  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(true);

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const toggleSettings = () => setShowSettings(!showSettings);

  useEffect(() => {
    if (question && model) {
      if (question.trim() !== '') {
        apiRequest();
      }
    }
  }, [question, model]);

  const handleNewRequest = (question: string, time: string, model: string, originality: number, corpus: string) => {
    updateRequest(question, model, originality, corpus);
  };

  return (
    <div className="App">
      <div className="appContent">
        <SideBar isOpen={showSidebar} toggleSidebar={toggleSidebar}></SideBar>
        <div className="chatAreaContainer">
          <ChatArea handleNewRequest={handleNewRequest} answer={answer} question={question} showSettings={showSettings} toggleSettings={toggleSettings} />
        </div>
      </div>
    </div>
  );
}

export default App;
