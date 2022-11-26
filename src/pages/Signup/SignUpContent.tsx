import React from 'react';
import { FaTruck } from 'react-icons/fa';
import { RiCoupon3Line } from 'react-icons/ri';
import { GrMoney } from 'react-icons/gr';

import './SignUpContent.scss';

const SignUpContent = () => {
  return (
    <div className="signUpContent">
      <p className="freeSignUpText">아디클럽 무료 가입</p>
      <ul className="benefitBox">
        <li className="benefitBoxList">
          <FaTruck className="icon" />
          <p>5만원 이상 무료배송</p>
        </li>
        <li className="benefitBoxList">
          <RiCoupon3Line className="icon" />
          <p>할인쿠폰</p>
        </li>
        <li className="benefitBoxList">
          <GrMoney className="icon" />
          <p>포인트 적립</p>
        </li>
      </ul>
      <p>
        아디클럽 멤버들은 최고의 아디다스 경험을 할 수 있습니다. 5만원 이상
        무료배송, 익스클루시브, 할인 혜택을 받으세요. 아디클럽에 가입하시려면
        먼저 통신사를 통해 본인인증을 받아야 합니다.
      </p>
    </div>
  );
};

export default SignUpContent;
