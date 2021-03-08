import produce from 'immer';

export const initialState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePost: true,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  retweetLoading: false,
  retweetDone: false,
  retweetError: null,
};

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const likePostRequestAction = (data) => ({
  type: LIKE_POST_REQUEST,
  data,
});

export const unlikePostRequestAction = (data) => ({
  type: UNLIKE_POST_REQUEST,
  data,
});

export const loadPostRequestAction = (data) => ({
  type: LOAD_POST_REQUEST,
  data,
});

export const addPostRequestAction = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const removePostRequestAction = (data) => ({
  type: REMOVE_POST_REQUEST,
  data,
});

export const addCommentRequestAction = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

export const uploadImagesRequestAction = (data) => ({
  type: UPLOAD_IMAGES_REQUEST,
  data,
});

export const retweetRequestAction = (data) => ({
  type: RETWEET_REQUEST,
  data,
});

export const removeImageAction = (data) => ({
  type: REMOVE_IMAGE,
  data,
});

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPOstError = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.hasMorePost = action.data.length === 10;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPOstError = action.error;
        break;
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPOstError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.mainPosts.unshift(action.data);
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.imagePaths = [];
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPOstError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePOstError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.mainPosts = state.mainPosts.filter((post) => post.id !== action.data.PostId);
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePOstError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS:
        const commentAddPost = draft.mainPosts.find((post) => post.id === action.data.PostId);
        commentAddPost.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePOstError = null;
        break;
      case LIKE_POST_SUCCESS:
        const likePost = draft.mainPosts.find((post) => post.id === action.data.PostId);
        likePost.Likers.push({ id: action.data.UserId });
        draft.likePostLoading = false;
        draft.likePostDone = true;
        break;
      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePOstError = action.error;
        break;
      case UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true;
        draft.unlikePostDone = false;
        draft.unlikePOstError = null;
        break;
      case UNLIKE_POST_SUCCESS:
        const unlikePost = draft.mainPosts.find((post) => post.id === action.data.PostId);
        unlikePost.Likers = unlikePost.Likers.filter((liker) => liker.id !== action.data.UserId);
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
        break;
      case UNLIKE_POST_FAILURE:
        draft.unlikePostLoading = false;
        draft.unlikePOstError = action.error;
        break;
      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      case UPLOAD_IMAGES_SUCCESS:
        draft.imagePaths = action.data;
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        break;
      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;
      case RETWEET_REQUEST:
        draft.retweetLoading = true;
        draft.retweetDone = false;
        draft.retweetError = null;
        break;
      case RETWEET_SUCCESS:
        draft.retweetLoading = false;
        draft.retweetDone = true;
        draft.mainPosts.unshift(action.data);
        break;
      case RETWEET_FAILURE:
        draft.retweetLoading = false;
        draft.retweetError = action.error;
        break;
      case REMOVE_IMAGE:
        draft.imagePaths = draft.imagePaths.filter((path, index) => index !== action.data);
        break;
      default:
        break;
    }
  });

export default reducer;
