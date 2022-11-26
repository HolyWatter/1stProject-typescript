import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../config';
import './SignUpForm.scss';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [userInfo, setUsernfo] = useState({
    email: '',
    password: '',
    name: '',
    birthday: '',
    phone_number: '',
  });
  const handleInput = event => {
    const { name, value } = event.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };
  const emailRegex =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const signUp = event => {
    event.preventDefault();
    if (
      emailRegex.test(userInfo.email) &&
      passwordRegex.test(userInfo.password)
    ) {
      fetch(`${api.signup}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: userInfo.email,
          password: userInfo.password,
          name: userInfo.name,
          birthday: userInfo.birthday,
          phoneNumber: userInfo.phone_number,
          point: 300000,
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.message == 'FAILED') {
            alert('이미 가입한 메일입니다.');
          } else {
            alert('회원가입이 완료되었습니다.');
            navigate('/login');
          }
        });
    } else {
      alert('양식을 다시 확인해 주세요');
    }
  };

  return (
    <form onSubmit={signUp} className="signUpForm">
      <div className="inputBox emailInputBox">
        <p className="signUpText">회원가입</p>
        <input
          className={userInfo.name === '' ? 'input' : 'green'}
          placeholder="이름을 입력하세요"
          type="text"
          onChange={handleInput}
          name="name"
          required
        />
        <input
          className={emailRegex.test(userInfo.email) ? 'green' : 'input'}
          placeholder="이메일을 입력하세요"
          type="email"
          onChange={handleInput}
          name="email"
          required
        />
        <input
          className={passwordRegex.test(userInfo.password) ? 'green' : 'input'}
          placeholder="패스워드를 입력하세요(대문자, 특수문자포함 8자이상)"
          type="password"
          onChange={handleInput}
          name="password"
          required
        />
        <input
          className={userInfo.phone_number === '' ? 'input' : 'green'}
          placeholder="전화번호를 입력하세요 예시)010-1234-5678"
          type="pattern"
          pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
          onChange={handleInput}
          name="phone_number"
          required
        />
        <input
          className={userInfo.birthday === '' ? 'input' : 'green'}
          placeholder="생년월일을 입력하세요 예)20001231"
          type="tel"
          onChange={handleInput}
          name="birthday"
          required
        />
        <button className="btn">회원가입</button>
      </div>
    </form>
  );
};
export default SignUpForm;
