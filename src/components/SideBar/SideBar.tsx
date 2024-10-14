import React from 'react';
import './SideBar.css';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SideBar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={isOpen ? 'sideBar' : 'sideBarCollapsed'}>
      <div className="buttons">
        <button className="toggleButton" onClick={toggleSidebar}>
          <i className="far fa-comment-alt"></i>
        </button>
        {isOpen ? <button className="newChatButton">+ Nieuwe chat</button> : null}
      </div>
      {isOpen ? (
        <>
          <h1>Huidige chat</h1>
          <div className="currentChat">SEO teksten voor Geen Gedoe</div>
          <h1>Chatgeschiedenis</h1>
          <div className="chatHistory">
            <div className="currentChat">Advies over linkbuilding</div>
            <div className="currentChat">SEO teksten voor Loo Mare</div>
            <div className="currentChat">Training Google Ads</div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default SideBar;
