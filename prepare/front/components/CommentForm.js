import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { addCommentRequest } from '../reducers/post';
import useInput from '../hooks/useInput';

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentLoading } = useSelector((state) => state.post);
  const { addCommentDone } = useSelector((state) => state.post);
  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmitContent = useCallback(() => {
    dispatch(
      addCommentRequest({
        content: commentText,
        postId: post.id,
        userId: id,
      }),
    );
  }, [commentText, id]);

  return (
    <Form onFinish={onSubmitContent}>
      <Form.Item>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} />
        <Button
          type="primary"
          htmlType="submit"
          loading={addCommentLoading}
          style={{ float: 'right' }}
        >
          작성
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
