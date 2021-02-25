import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Form, Input } from 'antd';
import useInput from '../hooks/useInput';
import { changeNicknameRequestAction } from '../reducers/user';

const NicknameForm = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 30px;
`;

const NicknameEditForm = () => {
  const [nickname, onChangeNickname] = useInput('');
  const dispatch = useDispatch();

  const onSearch = useCallback(() => {
    dispatch(changeNicknameRequestAction(nickname));
  }, [nickname]);

  return (
    <NicknameForm>
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        addonBefore="닉네임"
        enterButton="수정"
        onSearch={onSearch}
      />
    </NicknameForm>
  );
};

export default NicknameEditForm;
