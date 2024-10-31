import { useEffect, useState } from 'react';
import '../../App.css';
import ChatArea from '../../components/ChatArea/ChatArea';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useAPI } from '../../utilities/useAPI';

const Home = () => {
  const { question, answer, model, apiRequest, updateRequest } = useAPI();

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
        <Sidebar />
        <div className="chatAreaContainer">
          <ChatArea handleNewRequest={handleNewRequest} answer={answer} question={question} />
        </div>
      </div>
    </div>
  );
};

export default Home;
