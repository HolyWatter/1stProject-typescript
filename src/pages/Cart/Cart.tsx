import React, { useState, useEffect } from 'react';
import CartHeader from './CartHeader';
import CartItem from './CartItem';
import CartAside from './CartAside';
import { api } from '../../config';
import './Cart.scss';

const Cart = () => {
  const [cartItem, setCartItem] = useState([]);
  const priceToString = price => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  useEffect(() => {
    fetch(`${api.carts}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(res => setCartItem(res.selectCart));
  }, []);

  let initialPrice = 0;

  const sumTotalPrice = cartItem?.reduce(
    (prev, current) =>
      prev + parseInt(current.price) * parseInt(current.quantity),
    initialPrice
  );

  const deleteCartItem = id => {
    setCartItem(cartItem.filter(item => item.productOptionId !== id));
  };

  return (
    <div className="cart">
      <div className="cartLeft">
        <CartHeader
          length={cartItem.length}
          sumTotalPrice={priceToString(sumTotalPrice)}
        />
        {cartItem.map(data => (
          <CartItem
            key={data.id}
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
