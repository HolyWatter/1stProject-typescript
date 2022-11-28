import React, { FC } from "react";
import "./CartHeader.scss";

interface Props {
  length: number;
  sumTotalPrice: string;
}

const CartHeader: FC<Props> = ({ length, sumTotalPrice }) => {
  return (
    <div className="cartHeader">
      <p className="cartText">장바구니</p>
      <p>
        전체 ({length} 총 주문 상품)
        <span className="cartHeaderPrice"> {sumTotalPrice} 원</span>
      </p>
      <p className="cartHeaderText">
        장바구니의 제품들은 예약되지 않습니다. - 결제를 완료하고 구입까지
        끝마치세요.
      </p>
    </div>
  );
};

export default CartHeader;
