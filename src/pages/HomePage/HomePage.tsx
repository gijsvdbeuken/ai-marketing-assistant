import { useEffect } from 'react';
import ChatArea from '../../components/ChatArea/ChatArea';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useAPI } from '../../utilities/useAPI';
import '../../App.css';

const Home = () => {
  const { question, answer, apiRequest, updateRequest } = useAPI();

  useEffect(() => {
    if (question) {
      if (question.trim() !== '') {
        apiRequest();
      }
    }
  }, [question]);

  const handleNewRequest = (question: string, model: string, originality: number, corpus: string) => {
    updateRequest(question, model, originality, corpus);
  };

  return (
    <div className="App">
      <div className="appContent">
        <Sidebar />
        <div className="chatAreaContainer">
          <ChatArea handleNewRequest={handleNewRequest} answer={answer} question={question} />
        </div>
      </div>
    </div>
  );
};

export default Home;
