import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WishProduct from './components/WishProduct';
import Button from '../../components/Button/Button';
import { api } from '../../config';
import './Wishlist.scss';

const Wishlist = () => {
  const [wishItemList, setWishItemList] = useState([]);

  useEffect(() => {
    fetch(`${api.wishlists}`, {
      method: 'GET',
      headers: {
        authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        setWishItemList(data.wishlists);
      });
  }, [wishItemList]);

  const onRemove = id => {
    setWishItemList(wishItemList.filter(item => item.productId !== id));
  };

  return (
    <div className="wishList">
      <p className="title">나의 관심 목록</p>
      <p className="productCount">총 {wishItemList.length} 주문상품</p>
      {wishItemList.length === 0 ? (
        <p>
          아직 관심 목록에 저장한 항목이 없습니다. 쇼핑을 시작하고 관심 목록에
          좋아하는 제품을 추가하세요.
        </p>
      ) : (
        <>
          <div className="wishListItem">
            {wishItemList?.map(item => (
              <WishProduct
                className="wishItem"
                key={item.productId}
                data={item}
                onRemove={onRemove}
              />
            ))}
          </div>
          <div className="signupBanner">
            <p className="signupTitle">관심 목록을 꼭 간직하세요</p>
            <p className="description">
              아디클럽에 가입하고 첫 번째 주문에 대한 15% 할인 바우처를
              받으세요. 로그인 하면 아이템을 저장할 수 있습니다.
            </p>

            <Link to="/signup">
              <Button>가입하기</Button>
            </Link>

            <p className="signin">아디클럽 회원이신가요?</p>
            <Link to="/login">로그인</Link>
          </div>
        </>
      )}
    </div>
  );
};
export default Wishlist;
