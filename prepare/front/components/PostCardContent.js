import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const PostCardContent = ({ postData }) => {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((post, index) => {
        if (post.match(/(#[^\s#]+)/g)) {
          return (
            <Link href={`/hashtag/${post.slice(1)}`} key={index}>
              <a>{post}</a>
            </Link>
          );
        }

        return post;
      })}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
