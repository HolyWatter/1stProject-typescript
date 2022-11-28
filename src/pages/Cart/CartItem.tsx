import React, { FC, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { SlArrowDown } from "react-icons/sl";
import { api } from "../../config";
import "./CartItem.scss";

interface Data {
  quantity: string;
  footSize: number;
  name: string;
  cartId: number;
  thumbnailUrl: string;
  productOptionId: number;
  productId: number;
  price: string;
  stock: number;
}

interface Props {
  data: Data;
  priceToString: (price: number) => string;
  deleteCartItem: (id: number) => void;
}

const CartItem: FC<Props> = ({ data, priceToString, deleteCartItem }) => {
  const [isSelect, setIsSelect] = useState(false);
  const [numberOfShoe, setNumberOfShoe] = useState(data.quantity);

  const numberOfShoeClick = (e: React.MouseEvent<HTMLElement>) => {
    const count = (e.target as HTMLInputElement).value;
    setNumberOfShoe((e.target as HTMLInputElement).value);
    setIsSelect(false);
    changeStock(parseInt(count));
  };

  const clickSelectBtn = () => {
    setIsSelect((prev) => !prev);
  };

  const clickOutside = (e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).className !== ".selectList" && isSelect) {
      setIsSelect(false);
    }
  };

  const headers: HeadersInit = new Headers();

  useEffect(() => {
    headers.set("content-type", "application/json");
    headers.set("authorization", localStorage.getItem("token") || "");
  });

  const clickHeart = () => {
    fetch(`${api.wishlists}`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        productId: data.productId,
      }),
    });
  };

  const clickDelete = () => {
    fetch(`${api.carts}?cartId=${data.cartId}`, {
      method: "DELETE",
      headers,
    });
  };

  const handleDelete = () => {
    deleteCartItem(data.productOptionId);
    clickDelete();
  };

  const changeStock = (count: number) => {
    fetch(
      `${api.carts}?cartId=${data.cartId}&quantity=${count}&stock=${data.stock}`,
      {
        method: "PATCH",
        headers,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "FAILED") {
          alert("재고가 없습니다.");
        }
        window.location.reload();
      });
  };

  return (
    <div className="cartItem" onClick={clickOutside}>
      <div>
        <img
          className="cartItemImg"
          alt="장바구니 아이템"
          src={data.thumbnailUrl}
        />
      </div>
      <div className="cartItemContent">
        <div>
          <div className="cartItemXbox">
            <span className="cartItemName">{data.name}</span>
            <span className="cartItemPrice">
              {priceToString(parseInt(data.price) * parseInt(numberOfShoe))}원
            </span>
            <AiOutlineClose onClick={handleDelete} />
          </div>
          <div className="cartItemHeartBox">
            <p>RED / OFF WHITE / SHOCKBLUE</p>
            <CiHeart onClick={clickHeart} />
          </div>
          <p>크기 : {data.footSize}</p>
        </div>
        <button onClick={clickSelectBtn} className="cartItemSelect">
          {numberOfShoe}
          <SlArrowDown />
        </button>
        {isSelect && (
          <ul className="selectList">
            {SIZE.map((el) => (
              <li
                className="listItem"
                value={el}
                key={el}
                onClick={numberOfShoeClick}
              >
                {el}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default CartItem;

const SIZE = [1, 2, 3, 4, 5, 6, 7, 8, 9];
