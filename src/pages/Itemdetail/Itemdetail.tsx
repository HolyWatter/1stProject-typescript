import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BsArrow90DegLeft } from "react-icons/bs";
import { BiRuler } from "react-icons/bi";
import { TbHeading, TbTruckDelivery } from "react-icons/tb";
import { RiErrorWarningLine } from "react-icons/ri";
import { AiOutlineCheckCircle, AiOutlineCheck } from "react-icons/ai";
import { HiHome, HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import "./Itemdetail.scss";

interface Stock {
  stock: number;
  id: number;
  footSize: number;
}

interface Data {
  id: number;
  price: number;
  stocksize: Stock[];
  productId: number;
  stock: number;
  category: string;
  thumbnailUrl: string;
  images: string[];
  name: string;
}

const Itemdetail = () => {
  const navigate = useNavigate();
  const [productDetail, setProductDetail] = useState<Data[]>([]);
  const [productSize, setProductSize] = useState("");
  const [readmore, setReadmore] = useState(false);
  const [buttonToggle, setButtonToggle] = useState("");
  const { id } = useParams();

  const priceToString = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const toggleMenu = () => {
    setReadmore((readmore) => !readmore);
  };

  const toggleActive = (e: React.MouseEvent<HTMLButtonElement>) => {
    setButtonToggle((prev) => {
      return (e.target as HTMLInputElement).value;
    });
  };

  const saveSize = (event: React.MouseEvent<HTMLButtonElement>) => {
    setProductSize((event.target as HTMLInputElement).value);
  };

  const tokenAuthorization = localStorage.getItem("token");
  const headers: HeadersInit = new Headers();

  useEffect(() => {
    headers.set("Content-Type", "application/json");
    headers.set("authorization", tokenAuthorization || "");
  }, []);

  useEffect(() => {
    fetch(`http://10.58.52.160:3000/products/${id}`)
      .then((data) => data.json())
      .then((data) => setProductDetail(data.data));
  }, [id]);

  const sendtoCart = () => {
    fetch("http://10.58.52.114:3000/carts", {
      method: "POST",
      headers,
      body: JSON.stringify({
        productId: productDetail[parseInt(id!)].id,
        sizeId: productSize,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.MESSAGE === "SUCCESS") {
          localStorage.setItem("access-token", data.access_token);
          alert("Added to shopping cart!");
        } else if (data.MESSAGE === "Out of stock") {
          alert("Sorry, this product is out of stock");
        } else if (data.MESSAGE === "KEY_ERROR") {
          alert("Key-error occured");
        }
      });
  };

  const sendtoWishlist = () => {
    fetch("http://10.58.52.78:3000/wishlists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsImlhdCI6MTY2Njc4MjkzNywiZXhwIjoxNjY3NTYwNTM3fQ.CGpu7WbYq1-BGBX47SZG-jLkqeQgge-eYVCTbqdgJvI`,
      },
      body: JSON.stringify({
        productId: productDetail[parseInt(id!)]?.id,
      }),
    });
  };

  return (
    <div className="detailpage">
      <div className="detailpageDetailSection">
        <div className="imageList">
          <img
            className="productThumbnail"
            src={productDetail[parseInt(id!)].thumbnailUrl}
            alt="mainimage"
          />
          {readmore &&
            productDetail[parseInt(id!)]?.images.map((el: string) => (
              <img
                className="additionalThumbnail"
                key={el}
                src={el}
                alt="additionalimage"
              />
            ))}
          <button
            className={!readmore ? "showMoreButton" : "hideMoreButton"}
            onClick={toggleMenu}
          >
            <span>{!readmore ? "SHOW MORE" : "SHOW LESS"}</span>
            {!readmore ? (
              <IoIosArrowDown className="downArrowIcon" />
            ) : (
              <IoIosArrowUp className="downArrowIcon" />
            )}
          </button>
        </div>
        <div className="buttonList">
          <button className="highlightButton">
            <span>???????????????</span>
            <span>
              <IoIosArrowDown />
            </span>
          </button>
          <button>
            <span>??????</span>
            <span>
              <IoIosArrowDown />
            </span>
          </button>
          <button>
            <span>????????????</span>
            <span>
              <IoIosArrowDown />
            </span>
          </button>
          <button>
            <span>????????? ??????</span>
            <span>
              <IoIosArrowDown />
            </span>
          </button>
          <button className="reviewbutton">
            <span>??????</span>
            <span>
              <IoIosArrowDown />
            </span>
          </button>
        </div>
      </div>
      <div className="categoryLink">
        <div onClick={() => navigate(-1)}>
          <button className="linkWrapper">
            <span className="categoryInnerLink">
              <BsArrow90DegLeft className="arrowSpace" />
              ????????????
            </span>
          </button>
        </div>
        {LINK_COMPONENT.map((el) => (
          <span key={el.id} className="categoryInnerLink">
            <Link to={el.link}>{el.name}</Link>
          </span>
        ))}
      </div>
      <div className="detailpageSelectSection">
        <div className="topMostUpperElement">
          <div className="categoryAndReview">
            <p>{productDetail[parseInt(id!)]?.category}</p>
            <p>???????????????</p>
          </div>
          <div className="titlePriceColor">
            <p className="productName">{productDetail[parseInt(id!)]?.name}</p>
            <p className="price">
              {priceToString(Math.round(productDetail[parseInt(id!)]?.price))}
            </p>
            <p className="availableColors"> ??????/ ??????/ ??????</p>
          </div>
        </div>
        <div className="sizeSelector">
          <p className="availableSize"> ?????? ????????? ?????????</p>
          <div className="sizeButtonList">
            {productDetail[parseInt(id!)]?.stocksize
              ?.filter((data) => data.stock > 0)
              .map((item, idx) => (
                <button
                  value={item.id}
                  key={item.footSize}
                  className={
                    "sizeButton" + (idx === parseInt(buttonToggle)  ? "active" : "")
                  }
                  onClick={(e) => {
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
              ????????? ?????????
            </span>
          </div>
        </div>
        <div className="rightLowerButtonList">
          <div className="firstButtonRow">
            <button className="btn shoppingBagButton" onClick={sendtoCart}>
              <span>???????????? ??????</span>
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
              ?????? ?????? ?????? ?????? <HiOutlineArrowNarrowRight />
            </button>
          </div>
          <div className="listFAQ">
            <p className="listUpperMargin">
              <Link to="/shippingrefund">
                <TbTruckDelivery />
                ??????/??????
              </Link>
            </p>
            <p className="listUpperMargin">
              <Link to="/laundryinfo">
                <RiErrorWarningLine />
                ?????? ??? ?????? ??? ????????????
              </Link>
            </p>
            <p className="listUpperMargin">
              <Link to="/qc">
                <AiOutlineCheckCircle />
                ?????? ?????? ??? AS ??????
              </Link>
            </p>
            <p className="listUpperMargin">
              <Link to="/productassemblydate">
                <AiOutlineCheck />
                ?????? ???????????? ??????
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
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "Originals",
    link: "/originals",
  },
  {
    id: 3,
    name: "Shoes",
    link: "/shoes",
  },
];
