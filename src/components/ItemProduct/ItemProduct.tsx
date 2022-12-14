import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import "./ItemProduct.scss";

interface Data {
  thumbnailUrl: string;
  price: number;
  name: string;
  categoryname: string;
}

interface Props {
  data: Data;
}

const ItemProduct: FC<Props> = ({ data }) => {
  const [isWish, setIsWish] = useState(false);
  const handleWishClick = () => {
    setIsWish(!isWish);
  };
  const priceToString = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="itemProduct">
      <Link to="/">
        <div className="itemProductImgBox">
          <img
            className="itemProductImg"
            src={data.thumbnailUrl}
            alt="신발사진"
          />
          <p className="itemPrice">{priceToString(data.price)}원</p>
        </div>
        <div className="itemTextBox">
          <p className="itemName">{data.name}</p>
          <p className="itemCategory">{data.categoryname}</p>
        </div>
      </Link>
      {!isWish ? (
        <HiOutlineHeart className="heartIcon" onClick={handleWishClick} />
      ) : (
        <HiHeart className="heartIcon" onClick={handleWishClick} />
      )}
    </div>
  );
};
export default ItemProduct;
