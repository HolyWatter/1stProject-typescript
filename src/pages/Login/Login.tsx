import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsCheck2, BsArrowRight } from 'react-icons/bs';
import Button from '../../components/Button/Button';
import './Login.scss';
import { api } from '../../config';

const Login = () => {
  const [userInfoValue, setUserInfoValue] = useState({ email: '', pw: '' });
  const navigate = useNavigate();

  const emailRegex =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

  const onChangeUserInfoValue = event => {
    setUserInfoValue({
      ...userInfoValue,
      [event.target.name]: event.target.value,
    });
  };
  const handleOnsubmit = e => {
    e.preventDefault();
    if (emailRegex.test(userInfoValue.email)) {
      fetch(`${api.signin}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          email: userInfoValue.email,
          password: userInfoValue.pw,
        }),
      })
        .then(response => {
          if (response.ok === true) {
            return response.json();
          }
          throw new Error('통신실패');
        })
        .then(data => {
          if (
            data.message === 'INVALID_PASSWORD' ||
            data.message === 'INVALID_EMAIL'
          ) {
            alert('이메일과 비밀번호를 다시 확인해 주세요.');
          } else {
            localStorage.setItem('token', data.accessToken);
            navigate('/');
          }
        });
    }
  };

  return (
    <div className="login">
      <div className="loginSection">
        <p className="title">로그인</p>
        <Link className="findPw" to="#!">
          비밀번호를 잊으셨나요
        </Link>
        <form className="loginBox" onSubmit={handleOnsubmit}>
          <div
            className={`inputBox ${
              emailRegex.test(userInfoValue.email) ? 'validationInputBox' : ''
            }`}
          >
            <input
              className="input"
              type="email"
              name="email"
              placeholder="이메일 *"
              value={userInfoValue.email}
              onChange={onChangeUserInfoValue}
              required
            />
            <span className="alert">
              {emailRegex.test(userInfoValue.email)
                ? ''
                : '이메일 주소가 유효하지 않습니다'}
            </span>
          </div>
          <div
            className={`inputBox ${
              userInfoValue.pw ? 'validationInputBox' : ''
            }`}
          >
            <input
              className="input"
              type="password"
              name="pw"
              placeholder="비밀번호 *"
              value={userInfoValue.pw}
              onChange={onChangeUserInfoValue}
              required
            />
            <span className="alert">
              {userInfoValue.pw ? '' : '패스워드를 입력하세요'}
            </span>
          </div>

          <Button>
            로그인 <BsArrowRight className="arrow" />
          </Button>
        </form>
      </div>
      <div className="signUpBox">
        <p className="title">가입하기</p>
        <p className="description">아디다스 클럽 멤버십 가입하기 : </p>
        <ul className="signUpListWrap">
          <li className="checkList">
            <BsCheck2 className="checkIcon" />
            멤버 레벨의 모든 리워드를 바로 누리세요
          </li>
          <li className="checkList">
            <BsCheck2 className="checkIcon" />
            한정판 제품 구입 기회 제공
          </li>
          <li className="checkList">
            <BsCheck2 className="checkIcon" />
            스포츠, 요가, 뮤직 이벤트 참여를 위해 레벨업 하세요
          </li>
          <li className="checkList">
            <BsCheck2 className="checkIcon" />
            아디클럽 멤버를 위한 특별한 혜택과 이벤트를 만나보세요
          </li>
        </ul>
        <p className="description">
          각 레벨별 리워드를 받기 위해 지금 가입하여 포인트를 쌓으세요.
          <br />
          아디다스의 베스트 제품을 지금 만나보세요.
        </p>
        <Button>
          가입하기 <BsArrowRight className="arrow" />
        </Button>
      </div>
    </div>
  );
};
export default Login;
