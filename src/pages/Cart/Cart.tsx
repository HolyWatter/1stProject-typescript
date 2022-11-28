import React, { useState, useEffect } from "react";
import CartHeader from "./CartHeader";
import CartItem from "./CartItem";
import CartAside from "./CartAside";
import { api } from "../../config";
import "./Cart.scss";

interface DataCartItem {
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

const Cart = () => {
  const [cartItem, setCartItem] = useState<DataCartItem[]>([]);
  const priceToString = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const headers: HeadersInit = new Headers();

  useEffect(() => {
    headers.set("Content-Type", "application/json");
    headers.set("authorization", localStorage.getItem("token") || "");
    fetch(`${api.carts}`, {
      method: "GET",
      headers,
    })
      .then((res) => res.json())
      .then((res) => setCartItem(res.selectCart));
  }, []);

  let initialPrice = 0;

  const sumTotalPrice = cartItem?.reduce(
    (prev, current) =>
      prev + parseInt(current.price) * parseInt(current.quantity),
    initialPrice
  );

  const deleteCartItem = (id: number) => {
    setCartItem(cartItem.filter((item) => item.productOptionId !== id));
  };

  return (
    <div className="cart">
      <div className="cartLeft">
        <CartHeader
          length={cartItem.length}
          sumTotalPrice={priceToString(sumTotalPrice)}
        />
        {cartItem.map((data) => (
          <CartItem
            key={data.productId}
            data={data}
            priceToString={priceToString}
            deleteCartItem={deleteCartItem}
          />
        ))}
      </div>
      <CartAside sumTotalPrice={priceToString(sumTotalPrice)} />
    </div>
  );
};
export default Cart;
