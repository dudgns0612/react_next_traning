import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Head from 'next/head';
import Router from 'next/router';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import {
  loadFollowersRequestAction,
  loadFollowingsRequestAction,
  loadMyInfoRequestAction,
} from '../reducers/user';
import { loadPostsRequestAction } from '../reducers/post';
import wrapper from '../store/configureStore';

const Profile = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadFollowersRequestAction());
    dispatch(loadFollowingsRequestAction());
  }, []);

  useEffect(() => {
    if (!(me && me?.id)) {
      Router.push('/');
    }
  }, [me, me?.id]);

  if (!me) {
    return null;
  }
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={me.Followings} />
        <FollowList header="팔로워 목록" data={me.Followers} />
      </AppLayout>
    </>
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
export default Profile;
