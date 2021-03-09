import React from 'react';
// import { useRouter } from 'next/router';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';
import { loadMyInfoRequestAction } from '../../reducers/user';
import { loadPostRequestAction } from '../../reducers/post';
import wrapper from '../../store/configureStore';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';

const Post = () => {
  const { singlePost } = useSelector((state) => state.post);
  // const router = useRouter();
  // const { id } = router.query;

  return (
    <AppLayout>
      <Head>
        <title>{singlePost.User.nickname}님의 글</title>
        <meta name="description" content={singlePost.content} />
        <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
        <meta property="og:description" content={singlePost.content} />
        {/* <meta
          property="og:image"
          content={
            singlePost.Images[0] ? singlePost.Images[0].src : 'https://nodebird.com/favicon.ico'
          }
        />
        <meta property="og:url" content={`https://nodebird.com/post/${id}`} /> */}
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log(context);
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch(loadMyInfoRequestAction());
  context.store.dispatch(loadPostRequestAction(context.params.id));

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Post;
