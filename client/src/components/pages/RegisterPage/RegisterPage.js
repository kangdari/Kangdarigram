import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import palette from '../../../utils/palette';

const RegisterPage = ({ history }) => {
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerBtn, setRegisterBtn] = useState(true); // 가입 버튼 활성화 설정
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 숨기기 / 보여주기

  const { register, userError } = useSelector((state) => ({
    register: state.user.register,
    userError: state.user.userError,
  }));

  // 회원가입 성공 시 login 이동
  useEffect(() => {
    if (register.registerSuccess) {
      history.push('/login');
    }
  }, [register.registerSuccess, history]);

  // 회원가입 오류
  useEffect(() => {
    if (userError && userError.response.status === 409) {
      // id 중복
      setError(userError.response.data.message);
      return;
    }
  }, [userError]);

  const IdHandler = (e) => {
    setId(e.target.value);
  };
  const NameHandler = (e) => {
    setName(e.target.value);
  };
  const PasswordHandler = (e) => {
    setPassword(e.target.value);
  };
  const ConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onSumbitHandler = (e) => {
    e.preventDefault();

    if ([password, confirmPassword, id].includes('')) {
      setError('빈칸을 입력하세요');
      return;
    }
    if (password !== confirmPassword) {
      setError('비밀번호가 서로 다릅니다');
      return;
    }

    dispatch(registerUser({ id, name, password, confirmPassword }));
  };

  // 비밀번호 표기 / 숨기기
  const onShowPassword = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };

  const onCheckHandler = () => {
    if (id.length >= 1 && password.length >= 7 && name.length >= 1 && confirmPassword.length >= 1) {
      setRegisterBtn(false);
    } else {
      setRegisterBtn(true);
    }
  };

  return (
    <ReisgerContainer>
      <div className='register_form_box'>
        <h1 className='title'>Instagram</h1>
        <form className='register_form' onSubmit={onSumbitHandler}>
          <span className='message'>친구들의 사진과 동영상을 보려면 가입하세요.</span>

          <div className='input_box'>
            <input type='text' value={id} onChange={IdHandler} onKeyUp={onCheckHandler} required />
            <div className='placeholder'>아이디</div>
          </div>

          <div className='input_box'>
            <input
              type='text'
              value={name}
              onChange={NameHandler}
              onKeyUp={onCheckHandler}
              required
            />
            <div className='placeholder'>사용자 이름</div>
          </div>

          <div className='input_box'>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={PasswordHandler}
              onKeyUp={onCheckHandler}
              required
            />
            <div className='placeholder'>비밀번호(7글자 이상)</div>
            <div className='show_password' onClick={onShowPassword}>
              {showPassword ? '숨기기' : '비밀번호 표시'}
            </div>
          </div>

          <div className='input_box'>
            <input
              type='password'
              value={confirmPassword}
              onChange={ConfirmPasswordHandler}
              onKeyUp={onCheckHandler}
              required
            />
            <div className='placeholder'>비밀번호 확인</div>
          </div>

          <button className='register_btn' type='submit' disabled={registerBtn}>
            가입
          </button>
          {error ? <ErrorMessage>{error}</ErrorMessage> : null}
        </form>
      </div>

      <div className='login_box'>
        <span>계정이 있으신가요?</span>
        <Link to='/login'>로그인</Link>
      </div>
    </ReisgerContainer>
  );
};

export default withRouter(RegisterPage);

const ErrorMessage = styled.div`
  color: red;
  margin: 15px 0 10px;
  font-weight: 600;
`;

const ReisgerContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${palette.gray[0]};
  font-size: 14px;

  .register_form_box {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    min-width: 400px;
    background: #fff;
    padding: 15px 30px;
    border-radius: 10px;
  }

  .title {
    font-size: 35px;
    font-weight: 600;
    margin: 30px 0;
    text-align: center;
  }

  .register_form_box .register_form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .register_form_box .register_form .message {
    margin: 0 30px 30px 30px;
    color: #adb5bd;
    font-weight: 600;
    font-size: 18px;
    text-align: center;
  }

  .input_box {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .input_box input {
    width: 100%;
    padding: 10px 0 1px 8px;
    height: 36px;
    background-color: #f1f3f5;
    border: 1px solid #e9ecef;
    border-radius: 4px;
    margin-bottom: 10px;
    outline: none;
  }

  .input_box .placeholder {
    position: absolute;
    top: 0;
    left: 10px;
    line-height: 36px;
    font-size: 12px;
    color: #adb5bd;
    user-select: none;
    pointer-events: none;
    transition: all 0.05s linear;
  }

  .input_box .show_password {
    position: absolute;
    top: 0;
    right: 10px;
    line-height: 36px;
    font-weight: 600;
    visibility: hidden;
    cursor: pointer;
    user-select: none;
  }

  .input_box input:valid ~ .placeholder {
    top: -8px;
    font-size: 8px;
  }

  .input_box input:valid ~ .show_password {
    opacity: 1;
    pointer-events: auto;
    visibility: visible;
  }

  .register_btn {
    width: 80%;
    color: #fff;
    background: #228be6;
    border: none;
    padding: 5px 9px;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
  }

  .register_btn:disabled {
    background: #d0ebff;
    pointer-events: none;
  }

  .login_box {
    margin-top: 20px;
    max-width: 400px;
    min-width: 400px;
    background: #fff;
    padding: 20px 40px;
    text-align: center;
    color: #adb5bd;
    border-radius: 8px;
  }

  .login_box a {
    color: #1971c2;
    font-weight: 600;
  }
`;
