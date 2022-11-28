import React, { FC } from "react";
import { Link } from "react-router-dom";
import { HiHeart } from "react-icons/hi";
import "./WishProduct.scss";
import { api } from "../../../config";
import { useEffect } from "react";

interface Data {
  productId: number;
  price: string;
  id: number;
  thumbnailUrl: string;
  name: string;
  categoryname: string;
}

interface Props {
  data: Data;
  onRemove: (id: number) => void;
}

const WishProduct: FC<Props> = ({ data, onRemove }) => {
  const handleWishClick = () => {
    onRemove(data.productId);
    deleteItem();
  };
  const headers: HeadersInit = new Headers();

  useEffect(() => {
    headers.set("authorization", localStorage.getItem("token") || "");
  }, []);

  const deleteItem = () => {
    fetch(`${api.wishlists}?productId=${data.productId}`, {
      method: "DELETE",
      headers,
    });
  };

  const priceToString = (price: string) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
          <p className="itemPrice">{priceToString(data.price)}</p>
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
