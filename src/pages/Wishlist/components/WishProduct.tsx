import React from 'react';
import { Link } from 'react-router-dom';
import { HiHeart } from 'react-icons/hi';
import './WishProduct.scss';
import { api } from '../../../config';

const WishProduct = ({ data, onRemove }) => {
  const handleWishClick = () => {
    onRemove(data.productId);
    deleteItem();
  };

  const deleteItem = () => {
    fetch(`${api.wishlists}?productId=${data.productId}`, {
      method: 'DELETE',
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
  };

  const priceToString = price => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  return (
    <div className="wishProduct">
      <Link to={`detail/${data.id}`}>
        <div className="itemProductImgBox">
          <HiHeart className="heartIcon" onClick={handleWishClick} />
          <img
            className="itemProductImg"
            src={data.thumbnailUrl}
            alt="신발사진"
          />
          <p className="itemPrice">{priceToString(parseInt(data.price))}</p>
        </div>
        <div className="itemTextBox">
          <p className="itemName">{data.name}</p>
          <p className="itemCategory">{data.categoryname}</p>
        </div>
      </Link>
    </div>
  );
};
export default WishProduct;
