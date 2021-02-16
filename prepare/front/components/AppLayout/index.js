import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Menu, Row, Col } from 'antd';
import { SearchInput, Global } from './styles';

import UserProfile from '../UserProfile';
import LoginForm from '../LoginForm';

const AppLayout = ({ children }) => {
  const { me, logInDone } = useSelector((state) => state.user);

  return (
    <div>
      <Global />
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput enterButton />
        </Menu.Item>
        <Menu.Item>
          {logInDone || (
            <Link href="/signup">
              <a>회원가입</a>
            </Link>
          )}
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="https://naver.com" target="_blank" rel="noreferrer noopener">
            Naver
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
