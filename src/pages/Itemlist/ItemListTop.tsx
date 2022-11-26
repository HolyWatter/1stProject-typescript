import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineRollback } from 'react-icons/ai';
import { ImEqualizer } from 'react-icons/im';
import './ItemListTop.scss';

const ItemListTop = ({ clickFilter, gender, shoesData }) => {
  const navigate = useNavigate();
  const clickBack = () => {
    navigate(-1);
  };

  const clickGoMain = () => {
    navigate('/');
  };

  return (
    <div className="itemListTop">
      <div className="itemListTopToolBox">
        <span className="itemListTopBack underLine" onClick={clickBack}>
          <AiOutlineRollback />
          뒤로가기
        </span>
        <span className="itemListTopText underLine" onClick={clickGoMain}>
          Home
        </span>
        <span className="itemListTopText">/ {gender.toUpperCase()}</span>
      </div>
      <div className="itemListTopFlex">
        <div className="itemListTopCategoryAndItemNum">
          <h4 className="itemListTopCategory">{gender.toUpperCase()}</h4>
          <span className="itemListTopItemNum">[{shoesData.length}]</span>
        </div>
        <button onClick={clickFilter} className="filterAndSortBtn">
          Filter & Sort
          <ImEqualizer />
        </button>
      </div>
    </div>
  );
};

export default ItemListTop;
