import { useState, useEffect } from 'react';
import { TbPlayerPlay, TbPlayerPause } from 'react-icons/tb';
import { GiSpeakerOff, GiSpeaker } from 'react-icons/gi';
import './MainBanner.scss';

const MainBanner = () => {
  const [isPlayToggle, setIsPlayToggle] = useState(true);
  const [isSoundToggle, setIsSoundToggle] = useState(true);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    if (isPlayToggle === true) {
      const timer = setInterval(() => {
        if (currentImage === 'show') {
          setCurrentImage('');
        } else if (currentImage === '') {
          setCurrentImage('show');
        }
      }, 3000);
      return () => {
        clearInterval(timer);
      };
    } else {
      return undefined;
    }
  }, [currentImage, isPlayToggle]);

  return (
    <div className="mainBanner">
      <div className="imgBox">
        <img
          className={currentImage}
          src="https://images.unsplash.com/photo-1590771129825-5422e5a76d03?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
          alt="사진"
        />
        <img
          src="https://images.unsplash.com/photo-1534211269469-314ffbac5b34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80"
          alt="사진"
        />
      </div>
      <div className="titleBox">
        <h2>
          THESE STRIPES ARE <br />
          FOREVER
        </h2>
        <p>3-스트라이프, 그 영원한 레거시</p>
        <button className="btn">구매하기</button>
      </div>
      <div className="btnBox">
        <button onClick={() => setIsPlayToggle(!isPlayToggle)}>
          {isPlayToggle ? <TbPlayerPause /> : <TbPlayerPlay />}
        </button>
        <button onClick={() => setIsSoundToggle(!isSoundToggle)}>
          {isSoundToggle ? <GiSpeaker /> : <GiSpeakerOff />}
        </button>
      </div>
    </div>
  );
};

export default MainBanner;
