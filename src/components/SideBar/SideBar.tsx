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
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </button>
        {isOpen ? (
          <>
            <button className="toggleButton" onClick={toggleSidebar}>
              <i className="fa-solid fa-gear"></i>
            </button>
            <button className="newChatButton">+ Nieuwe chat</button>
          </>
        ) : null}
      </div>
      {isOpen ? '' : null}
    </div>
  );
};

export default SideBar;
