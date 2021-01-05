import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { Form, Input, Button } from 'antd';

const CommentForm = ({ post }) => {
  const [commentText, onChangeCommentText] = useInput('');
  const onSubmitContent = useCallback(() => {}, []);

  return (
    <Form onFinish={onSubmitContent}>
      <Form.Item>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} />
        <Button>작성</Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
