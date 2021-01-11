export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: '제로초',
      },
      content: '1 번째 게시글 #태그 #익스프레스',
      Images: [
        {
          src: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
        },
        {
          src: 'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
        },
        {
          src: 'https://homepages.cae.wisc.edu/~ece533/images/frymire.png',
        },
      ],
      Comments: [
        {
          User: {
            nickname: 'nero',
          },
          content: '테스트 댓글',
        },
        {
          User: {
            nickname: 'hoons',
          },
          content: '좋네요',
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = 'ADD_POST';
export const addPost = () => ({
  type: ADD_POST,
});

const dummyPost = {
  id: 2,
  content: '더미',
  User: {
    id: 1,
    nickname: '제로초',
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
