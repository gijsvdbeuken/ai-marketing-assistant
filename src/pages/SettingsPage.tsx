import { useState } from 'react';
import '../App.css';
import './SettingsPage.css';
import SettingsArea from '../components/SettingsArea/SettingsArea';
import SideBar from '../components/SideBar/SideBar';

const Home = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <div className="settingsPage">
      <SideBar isOpen={showSidebar} toggleSidebar={toggleSidebar}></SideBar>
    </div>
  );
};

export default Home;
