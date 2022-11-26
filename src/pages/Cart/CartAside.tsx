import React from 'react';
import { AiOutlineCreditCard } from 'react-icons/ai';
import { SiNaver } from 'react-icons/si';
import './CartAside.scss';

const CartAside = ({ sumTotalPrice }) => {
  return (
    <div className="cartAside">
      <button className="btn purchaseBtn">구매</button>
      <div className="purchaseBox">
        <p className="orderSummary">주문요약</p>
        <div className="purchaseBoxFlex">
          <p className="boxText">총 주문 상품</p>
          <p className="boxText">{sumTotalPrice} 원</p>
        </div>
        <div className="purchaseBoxFlex">
          <p className="boxText">배송비</p>
          <p className="boxText">무료</p>
        </div>
        <div className="purchaseBoxFlex">
          <p className="purchaseTotalText">합계</p>
          <p className="purchaseTotalText">{sumTotalPrice} 원</p>
        </div>
      </div>
      <input className="promotion" placeholder="프로모션 코드를 입력하세요" />
      <div className="methodFlex">
        <AiOutlineCreditCard className="paykoIcon" />
        <p className="paykoText">PAYKO</p>
        <SiNaver className="naverIcon" />
        <p className="naverText">pay</p>
      </div>
    </div>
  );
};

export default CartAside;
