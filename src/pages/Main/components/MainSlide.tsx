import React, { useState, useEffect, useRef } from 'react';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import ItemProduct from '../../../components/ItemProduct/ItemProduct';
import './MainSlide.scss';

const MainSlide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sources, setSources] = useState([]);
  const slideRef = useRef(null);
  const ONE_PAGE = 4;
  const totalPage = Math.ceil(sources.length / ONE_PAGE) - 1;
  const width = (totalPage + 1) * 100 + '%';

  useEffect(() => {
    fetch('data/MainSlide.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setSources(data);
      });
  }, []);

  const nextSlide = () => {
    if (currentSlide >= totalPage) {
      return;
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      return;
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = 'transform 0.7s ease-in-out';
    slideRef.current.style.transform = `translateX(-${
      currentSlide * (100 / (totalPage + 1))
    }%)`;
    const itemRatio = 100 / (totalPage + 1) / ONE_PAGE;

    if (currentSlide === totalPage && sources.length % ONE_PAGE !== 0) {
      slideRef.current.style.transform = `translateX(-${
        (100 / (totalPage + 1)) * totalPage -
        itemRatio * (ONE_PAGE - (sources.length % ONE_PAGE))
      }%)`;
    }
  }, [currentSlide, totalPage, sources.length]);

  const moveDot = index => {
    setCurrentSlide(index);
  };

  return (
    <div className="mainSlide">
      <h2 className="title">BEST OF WEDIDAS</h2>
      <div className="slideContainer">
        <div className="slideWrap" ref={slideRef} style={{ width: width }}>
          {sources.map(source => (
            <ItemProduct
              className="slideItem"
              key={source.productId}
              data={source}
            />
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        style={{ opacity: currentSlide === 0 ? 0 : 1 }}
        className="prevBtn slideBtn"
      >
        <BsArrowLeft />
      </button>
      <button
        onClick={nextSlide}
        style={{ opacity: currentSlide >= totalPage ? 0 : 1 }}
        className="nextBtn slideBtn"
      >
        <BsArrowRight />
      </button>
      <div className="paginationWrap">
        {Array.from({ length: totalPage + 1 }).map((_, index) => (
          <div
            key={index}
            onClick={() => moveDot(index)}
            className={`pagination ${currentSlide === index ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MainSlide;
