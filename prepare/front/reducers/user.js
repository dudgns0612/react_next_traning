// 액션 정의
export const loginAction = (data) => ({
  type: 'LOG_IN',
  data,
});

export const logoutAction = () => ({
  type: 'LOG_OUT',
});

export const initialState = {
  isLoggedIn: false,
  user: null,
  signUpData: {},
  loginData: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        user: action.data,
        isLoggedIn: true,
      };
    case 'LOG_OUT':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default reducer;
