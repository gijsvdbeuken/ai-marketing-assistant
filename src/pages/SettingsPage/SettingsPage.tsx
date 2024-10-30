import '../../App.css';
import '../../components/Sidebar2/Sidebar2.css';
import './SettingsPage.css';
import Sidebar2 from '../../components/Sidebar2/Sidebar2';
import SettingsArea from '../../components/SettingsArea/SettingsArea';

const Home = () => {
  return (
    <div className="settingsPage">
      <Sidebar2 />
      <SettingsArea />
    </div>
  );
};

export default Home;
