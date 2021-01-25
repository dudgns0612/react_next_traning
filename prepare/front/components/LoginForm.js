import React, { useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';

import useInput from '../hooks/useInput';
import { logInRequestAction } from '../reducers/user';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = () => {
  const [email, onChangeEmail] = useInput('');
  const { logInLoading } = useSelector((state) => state.user);
  const [password, onChangePassword] = useInput('');
  const dispatch = useDispatch();

  const onSubmitForm = useCallback(() => {
    dispatch(logInRequestAction({ email, password }));
  }, [email, password, dispatch]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <br />
        <Input name="user-email" type="email" value={email} onChange={onChangeEmail} />
      </div>
      <div>
        <label htmlFor="user-password">패스워드</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={logInLoading}>
          로그인
        </Button>
        <Link href="/signup">
          <Button>
            <a>회원가입</a>
          </Button>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;
