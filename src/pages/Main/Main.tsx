import MainSlide from './components/MainSlide';
import MainBanner from './components/MainBanner';
import './Main.scss';

const Main = () => {
  return (
    <div className="main">
      <MainBanner />
      <MainSlide />
    </div>
  );
};
export default Main;
