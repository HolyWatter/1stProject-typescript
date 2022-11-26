import React from 'react';
import { Link } from 'react-router-dom';
import { FOOTER_TOP_LIST } from './data';
import { FOOTER_BOTTOM_LIST } from './data';
import './Footer.scss';
const Footer = () => {
  return (
    <div className="footer">
      <div className="footerTop">
        <div className="menuWrap">
          {FOOTER_TOP_LIST.map(lists => {
            return (
              <div className="listWrap" key={lists.id}>
                <p className="title">{lists.title}</p>
                <ul className="linkWrap">
                  {lists.content.map((list, idx) => {
                    return (
                      <li key={`${idx}_${list.listmenu}`}>
                        <Link to={list.url}>{list.listmenu}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
        <p className="footerInfo">
          위디다스코리아(유) | 서울특별시 강남구 테헤란로 427 10층 | 대표자:
          정도영 | 사업자 등록번호: 123-45-678910 | 통신판매업신고:
          2022-서울강남-383838 | 개인정보관리책임자: 박성수 |
          호스팅서비스사업자: 위디다스코리아(유) | 고객센터: 1588-1234 | 이메일:
          service@github.wedidas.co.kr
        </p>
      </div>
      <div className="footerBottom">
        <ul className="footerBottomMenu">
          {FOOTER_BOTTOM_LIST.map(list => {
            return (
              <li key={list.id}>
                <Link>{list.title}</Link>
              </li>
            );
          })}
        </ul>
        <p className="copyRight">ⓒ wedidas Korea, LLC. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
