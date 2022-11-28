import React, { FC, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./FilterAndSort.scss";

interface Props {
  setIsFilter: React.Dispatch<React.SetStateAction<boolean>>;
  sortReset: () => void;
  clickSort: (isSelected: string) => void;
}

interface IsSelect {
  [key: string]: boolean;
}

const FilterAndSort: FC<Props> = ({ setIsFilter, sortReset, clickSort }) => {
  const [isSelected, setIsSelected] = useState<IsSelect>({
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

  const handleSelected = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = (event.target as HTMLInputElement); 
    //이렇게 해도되는겨?
    setIsSelected({
      new: false,
      low: false,
      high: false,
      [name]: !isSelected[name],
    });
    clickSort(name);
  };

  const clickClose = () => {
    setIsFilter(false);
  };

  return (
    <div className="filterAndSort">
      <div className="filterAndSortHeader">
        <span>Filter & Sort</span>
        <div className="filterAndSortBtnBox">
          <button className="filterAndSortReset" onClick={clickReset}>
            모두지우기
          </button>
          <AiOutlineClose onClick={clickClose} className="filterAndSortClose" />
        </div>
      </div>
      <button
        className={`filterAndSortList ${
          isSelected.new ? "selected" : "bordernone"
        }`}
        onClick={handleSelected}
        name="new"
      >
        최근 순
      </button>
      <button
        className={`filterAndSortList ${
          isSelected.low ? "selected" : "bordernone"
        }`}
        onClick={handleSelected}
        name="low"
      >
        가격 낮은 순
      </button>
      <button
        className={`filterAndSortList ${
          isSelected.high ? "selected" : "bordernone"
        }`}
        onClick={handleSelected}
        name="high"
      >
        가격 높은 순
      </button>
    </div>
  );
};

export default FilterAndSort;
