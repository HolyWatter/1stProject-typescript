import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import './ItemProduct.scss';

const ItemProduct = ({ data }) => {
  const [isWish, setIsWish] = useState(false);
  const handleWishClick = () => {
    setIsWish(!isWish);
  };
  const priceToString = price => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const clickHeart = () => {
    fetch('http://10.58.52.114:3000/wishlists', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        productId: data.productId,
      }),
    });
  };
  return (
    <div className="itemProduct">
      <Link to={`/detail/${data.id}`}>
        <div className="itemProductImgBox">
          <img
            className="itemProductImg"
            src={data.thumbnailUrl}
            alt="신발사진"
          />
          <p className="itemPrice">{priceToString(parseInt(data.price))} 원</p>
        </div>
        <div className="itemTextBox">
          <p className="itemName">{data.name}</p>
          <p className="itemCategory">{data.category}</p>
        </div>
      </Link>
      {!isWish ? (
        <HiOutlineHeart
          className="heartIcon"
          onClick={() => {
            handleWishClick();
            clickHeart();
          }}
        />
      ) : (
        <HiHeart className="heartIcon" onClick={handleWishClick} />
      )}
    </div>
  );
};
export default ItemProduct;
