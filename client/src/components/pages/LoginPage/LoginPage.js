import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, authCheck } from '../../../_actions/user_action';
import { NavLink } from 'react-router-dom';
import palette from '../../../utils/palette';

const LoginPage = ({ history }) => {
  const dispatch = useDispatch();
  const { login, userError, userData } = useSelector((state) => ({
    login: state.user.login,
    userError: state.user.userError,
    userData: state.user.userData,
  }));

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 로그인 오류 처리
  useEffect(() => {
    if (userError) {
      if (userError.response.status === 401) {
        // 서버 예외 처리 오류 message
        setError(userError.response.data.message);
        // setError('id 또는 비밀번호가 틀렸습니다.');
        return;
      } else {
        setError('로그인 오류');
        return;
      }
    }
  }, [userError]);

  // 로그인 성공 처리
  useEffect(() => {
    if (login.loginSuccess) {
      history.push('/');
    }
  }, [history, login.loginSuccess, userData.isAuth]);

  const onIdHandler = (e) => {
    setId(e.target.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const onSumbitHandler = (e) => {
    e.preventDefault();
    if ([id, password].includes('')) {
      setError('빈 칸을 입력하세요.');
      return;
    }
    dispatch(loginUser({ id, password }));
    dispatch(authCheck());
  };

  // 비밀번호 표기 / 숨기기
  const onShowPassword = (e) => {
    const password_input = e.target.previousElementSibling.previousElementSibling;
    if (password_input.type === 'password') {
      password_input.type = 'text';
      e.target.innerText = '숨기기';
    } else {
      password_input.type = 'password';
      e.target.innerText = '비밀번호 표시';
    }
  };

  const onCheckHandler = (e) => {
    const loing_btn = document.querySelector('.login_btn');
    if (id.length >= 1 && password.length >= 7) {
      loing_btn.disabled = false;
    } else {
      loing_btn.disabled = true;
    }
  };

  return (
    <LoginContainer>
      <div className='login_form_box'>
        <h1 className='title'>Instagram</h1>
        <form className='login_form' onSubmit={onSumbitHandler}>
          <div className='input_box'>
            <input
              type='text'
              value={id}
              onChange={onIdHandler}
              onKeyUp={onCheckHandler}
              required
            />
            <div className='placeholder'>전화번호, 사용자 이름 또는 이메일</div>
          </div>
          <div className='input_box'>
            <input
              type='password'
              value={password}
              onChange={onPasswordHandler}
              onKeyUp={onCheckHandler}
              required
            />
            <div className='placeholder'>비밀번호</div>
            <div className='show_password' onClick={onShowPassword}>
              비밀번호 표시
            </div>
          </div>
          <button className='login_btn' type='submit' disabled>
            로그인
          </button>
          <div className='line_box'>
            <span className='line'></span>
            <span className='text'>또는</span>
            <span className='line'></span>
          </div>
          {error ? <ErrorMessage>{error}</ErrorMessage> : null}
          <NavLink to='#' className='link'>
            비밀번호를 잊으셨나요?
          </NavLink>
        </form>
        <div className='btm'>
          <span>계정이 없으신가요?</span>
          <NavLink to='/register'>가입하기</NavLink>
        </div>
      </div>
    </LoginContainer>
  );
};

export default withRouter(LoginPage);

const ErrorMessage = styled.div`
  color: red;
  margin: 10px 0;
  font-weight: 600;
`;

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  background: ${palette.gray[0]};

  .login_form_box {
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

  .login_form_box .login_form {
    display: flex;
    flex-direction: column;
    align-items: center;
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

  .login_btn {
    width: 80%;
    color: #fff;
    background: #228be6;
    border: none;
    padding: 5px 9px;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
  }

  .login_btn:disabled {
    background: #d0ebff;
    pointer-events: none;
  }

  .line_box {
    width: 80%;
    display: flex;
    align-items: center;
    margin: 20px 0;
    color: #868e96;
  }

  .line_box .line {
    flex: 1;
    height: 1px;
    background: #868e96;
  }

  .line_box .text {
    padding: 0 10px;
  }

  .fb_link {
    width: 80%;
    text-align: center;
  }

  .link,
  .icon {
    margin: 10px 0;
    color: #364fc7;
    font-weight: 600;
  }

  .btm {
    width: 100%;
    margin-top: 20px;
    border: 1px solid #e9ecef;
    text-align: center;
    padding: 20px 40px;
    color: #adb5bd;
  }

  .btm a {
    color: #1971c2;
    font-weight: 600;
  }
`;

// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { withRouter } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser, authCheck } from '../../../_actions/user_action';

// const LoginPage = ({ history }) => {
//   const dispatch = useDispatch();
//   const { login, userError, userData } = useSelector((state) => ({
//     login: state.user.login,
//     userError: state.user.userError,
//     userData: state.user.userData,
//   }));

//   const [id, setId] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   // 로그인 오류 처리
//   useEffect(() => {
//     if (userError) {
//       if (userError.response.status === 401) {
//         // 서버 예외 처리 오류 message
//         setError(userError.response.data.message);
//         // setError('id 또는 비밀번호가 틀렸습니다.');
//         return;
//       } else {
//         setError('로그인 오류');
//         return;
//       }
//     }
//   }, [userError]);

//   // 로그인 성공 처리
//   useEffect(() => {
//     if (login.loginSuccess) {
//       history.push('/');
//     }
//   }, [history, login.loginSuccess, userData.isAuth]);

//   const onIdHandler = (e) => {
//     setId(e.target.value);
//   };

//   const onPasswordHandler = (e) => {
//     setPassword(e.target.value);
//   };

//   const onSumbitHandler = (e) => {
//     e.preventDefault();
//     if ([id, password].includes('')) {
//       setError('빈 칸을 입력하세요.');
//       return;
//     }
//     dispatch(loginUser({ id, password }));
//     dispatch(authCheck());
//   };

//   return (
//     <LoginContainer>
//       <form classNameName='loginForm' onSubmit={onSumbitHandler}>
//         <label>Id</label>
//         <input type='id' value={id} onChange={onIdHandler} />
//         <label>Password</label>
//         <input type='password' value={password} onChange={onPasswordHandler} />
//         {error ? <div>{error}</div> : ''}
//         <button type='sumbit'>Login</button>
//       </form>
//     </LoginContainer>
//   );
// };

// export default withRouter(LoginPage);

// const LoginContainer = styled.div`
//   width: 100%;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   .loginForm {
//     display: flex;
//     flex-direction: column;
//   }
// `;
