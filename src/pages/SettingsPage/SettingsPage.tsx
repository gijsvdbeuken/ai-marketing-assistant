import '../../App.css';
import './SettingsPage.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import SettingsArea from '../../components/SettingsArea/SettingsArea';

const Home = () => {
  return (
    <div className="settingsPage">
      <Sidebar />
      <SettingsArea />
    </div>
  );
};

export default Home;
