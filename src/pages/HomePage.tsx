import { useEffect, useState } from 'react';
import '../App.css';
import ChatArea from '../components/ChatArea/ChatArea';
import SideBar from '../components/SideBar/SideBar';
import { useAPI } from '../utilities/useAPI';

const Home = () => {
  const { question, answer, model, apiRequest, updateRequest } = useAPI();

  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  useEffect(() => {
    if (question && model) {
      if (question.trim() !== '') {
        apiRequest();
      }
    }
  }, [question, model]);

  const handleNewRequest = (question: string, model: string, originality: number, corpus: string) => {
    updateRequest(question, model, originality, corpus);
  };

  return (
    <div className="App">
      <div className="appContent">
        <SideBar isOpen={showSidebar} toggleSidebar={toggleSidebar}></SideBar>
        <div className="chatAreaContainer">
          <ChatArea handleNewRequest={handleNewRequest} answer={answer} question={question} />
        </div>
      </div>
    </div>
  );
};

export default Home;
