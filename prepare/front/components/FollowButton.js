import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { followRequestAction, unFollowRequestAction } from '../reducers/user';

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { me, followLoading, unFollowLoading } = useSelector((state) => state.user);
  const isFollow = me?.Followings.find((following) => following === post.User.id);
  const onClickButton = useCallback(() => {
    if (isFollow) {
      dispatch(unFollowRequestAction(post.User.id));
    } else {
      dispatch(followRequestAction(post.User.id));
    }
  }, [isFollow]);

  return (
    <Button loading={followLoading || unFollowLoading} onClick={onClickButton}>
      {isFollow ? '언팔로우' : '팔로우'}
    </Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
