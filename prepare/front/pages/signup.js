import React, { useState, useEffect, useCallback } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { END } from 'redux-saga';
import axios from 'axios';
import { Form, Input, Checkbox, Button } from 'antd';
import styled from 'styled-components';
import { signUpRequestAction, SIGN_UP_DONE_RESET, loadMyInfoRequestAction } from '../reducers/user';
import useInput from '../hooks/useInput';
import AppLayout from '../components/AppLayout';
import { loadPostsRequestAction } from '../reducers/post';
import wrapper from '../store/configureStore';

const ErrorMessage = styled.div`
  color: red;
`;

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, logInDone } = useSelector((state) => state.user);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(password !== e.target.value);
    },
    [password]
  );

  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState('');
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }

    if (!term) {
      return setTermError(true);
    }

    dispatch(
      signUpRequestAction({
        email,
        password,
        nickname,
      })
    );
  }, [password, term, passwordCheck]);

  useEffect(() => {
    if (logInDone) {
      Router.replace('/');
    }
  }, [logInDone]);

  useEffect(() => {
    if (signUpDone) {
      dispatch({ type: SIGN_UP_DONE_RESET });
      Router.push('/');
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  return (
    <AppLayout>
      <Head>
        <meta charSet="utf-8" />
        <title>회원가입 | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
        </div>
        <div>
          <label htmlFor="user-nickname">닉네임</label>
          <br />
          <Input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input
            name="user-password"
            type="password"
            value={password}
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호 체크</label>
          <br />
          <Input
            name="user-password-check"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
        </div>
        <Checkbox name="user-term" checked={term} onChange={onChangeTerm} style={{ marginTop: 5 }}>
          회원가입에 동의합니다.
        </Checkbox>
        {termError && <div style={{ color: 'red' }}>약관에 동의하셔야 합니다.</div>}
        <div style={{ marginTop: 15 }}>
          <Button type="primary" htmlType="submit" loading={signUpLoading}>
            가입하기
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

// 화면을 그리기전에 실행됨.
// 실행 결과를 Hydrate로 전달함.
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  console.log('server side context : ', context);
  context.store.dispatch(loadMyInfoRequestAction());
  context.store.dispatch(loadPostsRequestAction());
  // request가 끝날때 까지 기다린다.
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Signup;
