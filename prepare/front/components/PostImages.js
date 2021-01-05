import React from 'react';
import PostForm from './PostForm';
import PropTypes from 'prop-types';

const PostImages = ({ images }) => {
  return <div>구현</div>;
};

PostForm.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImages;
