import React from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import Head from 'next/head';
import { Card, Avatar } from 'antd';
import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';
import { loadUserRequestAction } from '../reducers/user';

const About = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <AppLayout>
      <Head>
        <title> Hoon | NodeBird</title>
      </Head>
      {userInfo && (
        <Card
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.Posts}
            </div>,
            <div key="followings">
              팔로잉
              <br />
              {userInfo.Followings}
            </div>,
            <div key="followers">
              팔로워
              <br />
              {userInfo.Followers}
            </div>,
          ]}
        >
          <Card.Meta avatar={<Avatar>{userInfo.nickname[0]}</Avatar>} title={userInfo.nickname} />
        </Card>
      )}
    </AppLayout>
  );
};

export const getStaticProps = wrapper.getStaticProps(async (context) => {
  context.store.dispatch(loadUserRequestAction(1));
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default About;
