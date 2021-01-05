export const initialState = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
};

const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';

// 액션 정의
export const loginAction = (data) => ({
  type: LOG_IN,
  data,
});

export const logoutAction = () => ({
  type: LOG_OUT,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        me: action.data,
        isLoggedIn: true,
      };
    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      };
    default:
      return state;
  }
};

export default reducer;
