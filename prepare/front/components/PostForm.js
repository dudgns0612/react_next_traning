import React, { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import useInput from '../hooks/useInput';
import {
  addPostRequestAction,
  uploadImagesRequestAction,
  removeImageAction,
} from '../reducers/post';

const PostForm = () => {
  const { imagePaths, addPostDone, addPostLoading } = useSelector((state) => state.post);
  const [text, onChangeText, setText] = useInput('');
  const dispatch = useDispatch();

  useEffect(() => {
    // 추가 성공 시
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요.');
    }

    const formData = new FormData();
    imagePaths.forEach((path) => formData.append('image', path));
    formData.append('content', text);

    return dispatch(addPostRequestAction(formData));
  }, [text, imagePaths]);

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    const imageFormData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      imageFormData.append('image', file);
    });

    dispatch(uploadImagesRequestAction(imageFormData));
  }, []);

  // 이미지 제거 이벤트
  const onClickRemoveImage = useCallback(
    (index) => () => {
      console.log(index);
      dispatch(removeImageAction(index));
    },
    []
  );

  return (
    <Form
      style={{ margin: '10px 0 20px' }}
      name="image"
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={148}
        placeholder="내용을 입력하세요."
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button
          type="primary"
          style={{ float: 'right' }}
          htmlType="submit"
          loading={addPostLoading}
        >
          작성
        </Button>
      </div>
      <div>
        {imagePaths.map((path, index) => (
          <div key={path} style={{ display: 'inline-block' }}>
            <img
              src={`http://localhost:3065/images/${path}`}
              style={{ width: '200px' }}
              alt={path}
            />
            <div>
              <Button onClick={onClickRemoveImage(index)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
