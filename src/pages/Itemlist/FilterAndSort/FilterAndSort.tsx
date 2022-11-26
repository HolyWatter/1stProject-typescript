import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import './FilterAndSort.scss';

const FilterAndSort = ({ setIsFilter, sortReset, clickSort }) => {
  const [isSelected, setIsSelected] = useState({
    new: false,
    low: false,
    high: false,
  });

  const clickReset = () => {
    setIsSelected({
      new: false,
      low: false,
      high: false,
    });
    sortReset();
  };

  const handleSelected = event => {
    const { name } = event.target;
    setIsSelected({
      new: false,
      low: false,
      high: false,
      [name]: !isSelected[name],
    });
    clickSort([name], isSelected[event.target.name]);
  };

  const clickClose = () => {
    setIsFilter(false);
  };

  return (
    <div className="filterAndSort">
      <div className="filterAndSortHeader">
        <span>Filter & Sort</span>
        <div className="filterAndSortBtnBox">
          <button
            className="filterAndSortReset"
            onClick={() => {
              clickReset();
            }}
          >
            모두지우기
          </button>
          <AiOutlineClose onClick={clickClose} className="filterAndSortClose" />
        </div>
      </div>
      <form
        onClick={e => {
          e.preventDefault();
        }}
      >
        <button
          className={`filterAndSortList ${
            isSelected.new ? 'selected' : 'bordernone'
          }`}
          onClick={e => {
            handleSelected(e);
          }}
          name="new"
        >
          최근 순
        </button>
        <button
          className={`filterAndSortList ${
            isSelected.low ? 'selected' : 'bordernone'
          }`}
          onClick={e => {
            handleSelected(e);
          }}
          name="low"
        >
          가격 낮은 순
        </button>
        <button
          className={`filterAndSortList ${
            isSelected.high ? 'selected' : 'bordernone'
          }`}
          onClick={e => {
            handleSelected(e);
          }}
          name="high"
        >
          가격 높은 순
        </button>
      </form>
    </div>
  );
};

export default FilterAndSort;
