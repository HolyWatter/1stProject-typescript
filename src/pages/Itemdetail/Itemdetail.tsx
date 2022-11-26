import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { BsArrow90DegLeft } from 'react-icons/bs';
import { BiRuler } from 'react-icons/bi';
import { TbHeading, TbTruckDelivery } from 'react-icons/tb';
import { RiErrorWarningLine } from 'react-icons/ri';
import { AiOutlineCheckCircle, AiOutlineCheck } from 'react-icons/ai';
import { HiHome, HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { FaRegHeart } from 'react-icons/fa';
import './Itemdetail.scss';

const Itemdetail = () => {
  const navigate = useNavigate();
  const [productDetail, setProductDetail] = useState([]);
  const [productSize, setProductSize] = useState('');
  const [readmore, setReadmore] = useState(false);
  const [buttonToggle, setButtonToggle] = useState('');
  const { id } = useParams;

  const priceToString = price => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const toggleMenu = () => {
    setReadmore(readmore => !readmore);
  };

  const toggleActive = e => {
    setButtonToggle(prev => {
      return e.target.value;
    });
  };

  const saveSize = event => {
    setProductSize(event.target.value);
  };

  const tokenAuthorization = localStorage.getItem('token');

  useEffect(() => {
    fetch(`http://10.58.52.160:3000/products/${id}`)
      .then(data => data.json())
      .then(data => setProductDetail(data.data));
  }, [id]);

  const sendtoCart = () => {
    fetch('http://10.58.52.114:3000/carts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: tokenAuthorization,
      },
      body: JSON.stringify({
        productId: productDetail[{ id }].id,
        sizeId: productSize,
      }),
    })
      .then(data => data.json())
      .then(data => {
        if (data.MESSAGE === 'SUCCESS') {
          localStorage.setItem('access-token', data.access_token);
          alert('Added to shopping cart!');
        } else if (data.MESSAGE === 'Out of stock') {
          alert('Sorry, this product is out of stock');
        } else if (data.MESSAGE === 'KEY_ERROR') {
          alert('Key-error occured');
        }
      });
  };

  const sendtoWishlist = () => {
    fetch('http://10.58.52.78:3000/wishlists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsImlhdCI6MTY2Njc4MjkzNywiZXhwIjoxNjY3NTYwNTM3fQ.CGpu7WbYq1-BGBX47SZG-jLkqeQgge-eYVCTbqdgJvI`,
      },
      body: JSON.stringify({
        productId: productDetail[{ id }]?.id,
      }),
    });
  };

  return (
    <div className="detailpage">
      <div className="detailpageDetailSection">
        <div className="imageList">
          <img
            className="productThumbnail"
            src={productDetail[{ id }]?.thumbnailUrl}
            alt="mainimage"
          />
          {readmore &&
            productDetail[{ id }]?.images.map(el => (
              <img
                className="additionalThumbnail"
                key={el}
                src={el}
                alt="additionalimage"
              />
            ))}
          <button
            className={!readmore ? 'showMoreButton' : 'hideMoreButton'}
            onClick={toggleMenu}
          >
            <span>{!readmore ? 'SHOW MORE' : 'SHOW LESS'}</span>
            {!readmore ? (
              <IoIosArrowDown className="downArrowIcon" />
            ) : (
              <IoIosArrowUp className="downArrowIcon" />
            )}
          </button>
        </div>
        <div className="buttonList">
          <button className="highlightButton">
            <span>하이라이트</span>
            <span>
              <IoIosArrowDown />
            </span>
          </button>
          <button>
            <span>정보</span>
            <span>
              <IoIosArrowDown />
            </span>
          </button>
          <button>
            <span>세부정보</span>
            <span>
              <IoIosArrowDown />
            </span>
          </button>
          <button>
            <span>스타일 방법</span>
            <span>
              <IoIosArrowDown />
            </span>
          </button>
          <button className="reviewbutton">
            <span>리뷰</span>
            <span>
              <IoIosArrowDown />
            </span>
          </button>
        </div>
      </div>
      <div className="categoryLink">
        <div onClick={() => navigate(-1)}>
          <Link className="linkWrapper">
            <span className="categoryInnerLink">
              <BsArrow90DegLeft className="arrowSpace" />
              뒤로가기
            </span>
          </Link>
        </div>
        {LINK_COMPONENT.map(el => (
          <span key={el.id} className="categoryInnerLink">
            <Link to={el.link}>{el.name}</Link>
          </span>
        ))}
      </div>
      <div className="detailpageSelectSection">
        <div className="topMostUpperElement">
          <div className="categoryAndReview">
            <p>{productDetail[{ id }]?.category}</p>
            <p>★★★★★</p>
          </div>
          <div className="titlePriceColor">
            <p className="productName">{productDetail[{ id }]?.name}</p>
            <p className="price">
              {priceToString(Math.round(productDetail[{ id }]?.price))}
            </p>
            <p className="availableColors"> 블루/ 레드/ 블랙</p>
          </div>
        </div>
        <div className="sizeSelector">
          <p className="availableSize"> 구입 가능한 사이즈</p>
          <div className="sizeButtonList">
            {productDetail[{ id }]?.stocksize
              ?.filter(data => data.stock > 0)
              .map((item, idx) => (
                <button
                  value={item.id}
                  key={item.footSize}
                  className={
                    'sizeButton' + (idx == buttonToggle ? 'active' : '')
                  }
                  onClick={e => {
                    saveSize(e);
                    toggleActive(e);
                  }}
                >
                  {item.footSize}
                </button>
              ))}
          </div>
          <div className="sizeGuide">
            <span className="rulerIcon">
              <BiRuler />
              사이즈 가이드
            </span>
          </div>
        </div>
        <div className="rightLowerButtonList">
          <div className="firstButtonRow">
            <button className="btn shoppingBagButton" onClick={sendtoCart}>
              <span>장바구니 담기</span>
              <span>
                <HiOutlineArrowNarrowRight />
              </span>
            </button>
            <button className="heartButton" onClick={sendtoWishlist}>
              <FaRegHeart />
            </button>
          </div>
          <div className="sencondButtonRow">
            <button className="recommendButton">
              다른 추천 제품 보기 <HiOutlineArrowNarrowRight />
            </button>
          </div>
          <div className="listFAQ">
            <p className="listUpperMargin">
              <Link to="/shippingrefund">
                <TbTruckDelivery />
                배송/반품
              </Link>
            </p>
            <p className="listUpperMargin">
              <Link to="/laundryinfo">
                <RiErrorWarningLine />
                세탁 및 취급 시 주의사항
              </Link>
            </p>
            <p className="listUpperMargin">
              <Link to="/qc">
                <AiOutlineCheckCircle />
                품질 보증 및 AS 정보
              </Link>
            </p>
            <p className="listUpperMargin">
              <Link to="/productassemblydate">
                <AiOutlineCheck />
                상품 제조연월 정보
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Itemdetail;

const LINK_COMPONENT = [
  {
    id: 1,
    name: 'Home',
    link: '/',
  },
  {
    id: 2,
    name: 'Originals',
    link: '/originals',
  },
  {
    id: 3,
    name: 'Shoes',
    link: '/shoes',
  },
];
